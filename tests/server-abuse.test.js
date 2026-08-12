import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const PROJECT = fileURLToPath(new URL('..', import.meta.url));
const ALLOWED_ORIGIN = 'https://arena.test';
let serverProcess;
let wsURL;
let roomSequence = 0;

async function freePort() {
  const probe = createServer();
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const { port } = probe.address();
  await new Promise(resolve => probe.close(resolve));
  return port;
}

class Client {
  queue = [];
  waiters = [];

  constructor(socket) {
    this.socket = socket;
    socket.on('message', raw => {
      const message = JSON.parse(raw.toString());
      const waiterIndex = this.waiters.findIndex(waiter => waiter.type === message.type && waiter.predicate(message));
      if (waiterIndex >= 0) {
        const [waiter] = this.waiters.splice(waiterIndex, 1);
        clearTimeout(waiter.timer);
        waiter.resolve(message);
      } else {
        this.queue.push(message);
      }
    });
  }

  send(type, data = {}) { this.socket.send(JSON.stringify({ type, ...data })); }

  next(type, predicate = () => true, timeout = 1200) {
    const queuedIndex = this.queue.findIndex(message => message.type === type && predicate(message));
    if (queuedIndex >= 0) return Promise.resolve(this.queue.splice(queuedIndex, 1)[0]);
    return new Promise((resolve, reject) => {
      const waiter = { type, predicate, resolve, timer: 0 };
      waiter.timer = setTimeout(() => {
        const index = this.waiters.indexOf(waiter);
        if (index >= 0) this.waiters.splice(index, 1);
        reject(new Error(`Timed out waiting for ${type}`));
      }, timeout);
      this.waiters.push(waiter);
    });
  }

  async none(type, timeout = 120) {
    try {
      await this.next(type, () => true, timeout);
      return false;
    } catch {
      return true;
    }
  }

  async close() {
    if (this.socket.readyState === WebSocket.CLOSED) return;
    await new Promise(resolve => {
      const timer = setTimeout(resolve, 300);
      this.socket.once('close', () => { clearTimeout(timer); resolve(); });
      this.socket.close();
    });
  }
}

async function connectClient(origin = ALLOWED_ORIGIN) {
  const socket = new WebSocket(wsURL, { origin });
  const client = new Client(socket);
  await new Promise((resolve, reject) => {
    socket.once('open', resolve);
    socket.once('error', reject);
  });
  client.welcome = await client.next('WELCOME');
  return client;
}

async function pairedRoom() {
  const host = await connectClient();
  const guest = await connectClient();
  host.send('CREATE_ROOM', {
    name: `Test ${++roomSequence}`, arena: 'classic', maxPlayers: 4,
    botCount: 0, playerName: 'Host', gameMode: 'ffa', skinIndex: 0,
  });
  const created = await host.next('ROOM_CREATED');
  guest.send('JOIN_ROOM', { roomId: created.roomId, playerName: 'Guest', skinIndex: 1 });
  await guest.next('JOINED');
  await host.next('PLAYER_JOINED');
  return { host, guest, hostId: host.welcome.playerId, guestId: guest.welcome.playerId };
}

async function closeAll(...clients) {
  await Promise.all(clients.map(client => client.close()));
}

beforeAll(async () => {
  const port = await freePort();
  wsURL = `ws://127.0.0.1:${port}/ws`;
  serverProcess = spawn(process.execPath, ['server/index.js'], {
    cwd: PROJECT,
    env: {
      ...process.env,
      PORT: String(port),
      HOST: '127.0.0.1',
      ALLOWED_ORIGINS: ALLOWED_ORIGIN,
      MAX_MESSAGES_PER_SEC: '20',
      RECONNECT_GRACE_MS: '1000',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server did not start')), 5000);
    serverProcess.stdout.on('data', chunk => {
      if (chunk.toString().includes('FPS Arena server running')) {
        clearTimeout(timer);
        resolve();
      }
    });
    serverProcess.once('exit', code => reject(new Error(`Server exited early (${code})`)));
  });
});

afterAll(async () => {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  serverProcess.kill('SIGTERM');
  await new Promise(resolve => {
    const timer = setTimeout(resolve, 3500);
    serverProcess.once('exit', () => { clearTimeout(timer); resolve(); });
  });
});

describe.sequential('WebSocket abuse and recovery boundary', () => {
  it('issues an opaque reconnect token with every welcome', async () => {
    const client = await connectClient();
    expect(client.welcome.playerId).toMatch(/^p_/);
    expect(client.welcome.sessionToken).toMatch(/^[0-9a-f-]{36}$/);
    await client.close();
  });

  it('resumes an authenticated player inside an already-started match', async () => {
    const { host, guest, hostId } = await pairedRoom();
    const originalToken = host.welcome.sessionToken;
    host.send('START_GAME');
    await host.next('GAME_STARTED');
    await guest.next('GAME_STARTED');
    const hostClosed = new Promise(resolve => host.socket.once('close', resolve));
    host.socket.terminate();
    await hostClosed;

    const replacement = await connectClient();
    replacement.send('RESUME_SESSION', { sessionToken: originalToken });
    const resumed = await replacement.next('SESSION_RESUMED');
    expect(resumed).toMatchObject({ playerId: hostId, sessionToken: originalToken, gameStarted: true });
    expect((await guest.next('PLAYER_RECONNECTED')).playerId).toBe(hostId);
    await closeAll(replacement, guest);
  });

  it('rejects origins outside the allow-list', async () => {
    const socket = new WebSocket(wsURL, { origin: 'https://evil.test' });
    const result = await new Promise(resolve => {
      socket.once('open', () => resolve('opened'));
      socket.once('unexpected-response', (_request, response) => resolve(response.statusCode));
      socket.once('error', () => resolve('error'));
    });
    expect(result).not.toBe('opened');
    socket.terminate();
  });

  it('ignores malformed JSON without killing a healthy connection', async () => {
    const client = await connectClient();
    client.socket.send('{ definitely not json');
    client.send('LIST_ROOMS');
    expect((await client.next('ROOM_LIST')).rooms).toBeInstanceOf(Array);
    await client.close();
  });

  it('disconnects payloads above 16 KiB', async () => {
    const client = await connectClient();
    const closed = new Promise(resolve => client.socket.once('close', code => resolve(code)));
    client.socket.send('x'.repeat(17 * 1024));
    expect(await closed).toBe(1009);
  });

  it('disconnects message floods', async () => {
    const client = await connectClient();
    const closed = new Promise(resolve => client.socket.once('close', code => resolve(code)));
    for (let index = 0; index < 25; index++) client.send('LIST_ROOMS');
    expect(await closed).toBe(1008);
  });

  it('clamps room names, capacity, and bot count', async () => {
    const client = await connectClient();
    client.send('CREATE_ROOM', {
      name: 'x'.repeat(100), arena: 'classic', maxPlayers: 999, botCount: 999,
      playerName: 'Host', gameMode: 'ffa',
    });
    const created = await client.next('ROOM_CREATED');
    client.send('LIST_ROOMS');
    const highRoom = (await client.next('ROOM_LIST')).rooms.find(room => room.id === created.roomId);
    client.send('LEAVE_ROOM');
    client.send('CREATE_ROOM', {
      name: 'limits', arena: 'classic', maxPlayers: 1, botCount: -10,
      playerName: 'Host', gameMode: 'ffa',
    });
    const lowCreated = await client.next('ROOM_CREATED');
    client.send('LIST_ROOMS');
    const lowRoom = (await client.next('ROOM_LIST')).rooms.find(room => room.id === lowCreated.roomId);
    client.send('LEAVE_ROOM');
    expect(created.roomName).toHaveLength(24);
    expect(highRoom).toMatchObject({ maxPlayers: 8, botCount: 5 });
    expect(lowRoom).toMatchObject({ maxPlayers: 2, botCount: 0 });
    await client.close();
  });

  it('sanitizes arena, mode, team, and skin fields', async () => {
    const client = await connectClient();
    client.send('CREATE_ROOM', {
      name: 'sanitized', arena: '../../etc/passwd', maxPlayers: 4, botCount: 0,
      playerName: 'Host', gameMode: '<script>', team: '<img>', skinIndex: 999,
    });
    const created = await client.next('ROOM_CREATED');
    expect(created.gameMode).toBe('ffa');
    expect(created.players[0].team).toBeNull();
    expect(created.players[0].skinIndex).toBe(0);
    client.send('LEAVE_ROOM');
    await client.close();
  });

  it('preserves the Village arena through room creation and match start', async () => {
    const client = await connectClient();
    client.send('CREATE_ROOM', {
      name: 'Village', arena: 'village', maxPlayers: 4, botCount: 2,
      playerName: 'Explorer', gameMode: 'ffa', skinIndex: 0,
    });
    await client.next('ROOM_CREATED');
    client.send('START_GAME');
    expect((await client.next('GAME_STARTED')).arena).toBe('village');
    await client.close();
  });

  it('ignores self-hits and unknown targets', async () => {
    const { host, guest, hostId } = await pairedRoom();
    host.send('PLAYER_HIT', { targetId: hostId, damage: 20 });
    host.send('PLAYER_HIT', { targetId: 'missing-player', damage: 20 });
    expect(await guest.none('PLAYER_HIT')).toBe(true);
    await closeAll(host, guest);
  });

  it('caps client-reported damage at the weapon ceiling', async () => {
    const { host, guest, guestId } = await pairedRoom();
    host.send('PLAYER_HIT', { targetId: guestId, damage: 999999 });
    expect((await guest.next('PLAYER_HIT')).damage).toBe(100);
    await closeAll(host, guest);
  });

  it('rejects kill claims without an accepted lethal hit and replayed kills', async () => {
    const { host, guest, guestId } = await pairedRoom();
    host.send('PLAYER_KILLED', { targetId: guestId });
    expect(await guest.none('PLAYER_KILLED')).toBe(true);
    host.send('PLAYER_HIT', { targetId: guestId, damage: 100 });
    await guest.next('PLAYER_HIT');
    host.send('PLAYER_KILLED', { targetId: guestId });
    expect((await guest.next('PLAYER_KILLED')).targetId).toBe(guestId);
    host.send('PLAYER_KILLED', { targetId: guestId });
    expect(await guest.none('PLAYER_KILLED')).toBe(true);
    await closeAll(host, guest);
  });

  it('relays only bounded respawn positions and resets server-side damage state', async () => {
    const { host, guest, guestId } = await pairedRoom();
    host.send('PLAYER_HIT', { targetId: guestId, damage: 100 });
    await guest.next('PLAYER_HIT');
    guest.send('PLAYER_RESPAWN', { position: { x: 12, y: 1.7, z: -8 } });
    const respawn = await host.next('PLAYER_RESPAWN');
    expect(respawn).toMatchObject({ playerId: guestId, position: { x: 12, y: 1.7, z: -8 } });

    guest.send('PLAYER_RESPAWN', { position: { x: 1000, y: 0, z: 0 } });
    expect(await host.none('PLAYER_RESPAWN')).toBe(true);
    await closeAll(host, guest);
  });

  it('rate-limits hit messages independently of the general budget', async () => {
    const { host, guest, guestId } = await pairedRoom();
    host.send('PLAYER_HIT', { targetId: guestId, damage: 1 });
    host.send('PLAYER_HIT', { targetId: guestId, damage: 1 });
    await guest.next('PLAYER_HIT');
    expect(await guest.none('PLAYER_HIT')).toBe(true);
    await closeAll(host, guest);
  });

  it('bounds chat and rejects empty messages', async () => {
    const { host, guest } = await pairedRoom();
    host.send('CHAT_MESSAGE', { text: 'a'.repeat(500) });
    expect((await guest.next('CHAT_MESSAGE')).text).toHaveLength(200);
    host.send('CHAT_MESSAGE', { text: '' });
    expect(await guest.none('CHAT_MESSAGE')).toBe(true);
    await closeAll(host, guest);
  });

  it('relays only finite, bounded movement state', async () => {
    const { host, guest } = await pairedRoom();
    host.send('PLAYER_STATE', { position: { x: 'oops', y: 1, z: 0 }, rotation: { x: 0, y: 0 } });
    expect(await guest.none('PLAYER_STATE')).toBe(true);
    host.send('PLAYER_STATE', { position: { x: 2, y: 1.7, z: -3 }, rotation: { x: 0.2, y: 1 } });
    expect((await guest.next('PLAYER_STATE')).position).toEqual({ x: 2, y: 1.7, z: -3 });
    await closeAll(host, guest);
  });

  it('validates weapon, shot, and grenade payloads before relay', async () => {
    const { host, guest } = await pairedRoom();
    host.send('WEAPON_SWITCH', { weaponIndex: 99 });
    host.send('SHOOT', { origin: null, direction: { x: 0, y: 0, z: -1 } });
    host.send('GRENADE_THROW', { origin: { x: 0, y: 0, z: 0 }, direction: { x: Infinity, y: 0, z: 0 } });
    expect(await guest.none('WEAPON_SWITCH')).toBe(true);
    expect(await guest.none('PLAYER_SHOOT')).toBe(true);
    expect(await guest.none('GRENADE_THROW')).toBe(true);

    host.send('WEAPON_SWITCH', { weaponIndex: 2 });
    host.send('SHOOT', { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0, z: -1 } });
    host.send('GRENADE_THROW', { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0.5, z: -1 } });
    expect((await guest.next('WEAPON_SWITCH')).weaponIndex).toBe(2);
    expect((await guest.next('PLAYER_SHOOT')).direction.z).toBe(-1);
    expect((await guest.next('GRENADE_THROW')).direction.y).toBe(0.5);
    await closeAll(host, guest);
  });
});
