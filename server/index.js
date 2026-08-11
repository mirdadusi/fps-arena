import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, sep } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { WebSocketServer } from 'ws';
import { Room } from './Room.js';
import { normalizePublicPath } from './StaticRouter.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT = join(__dirname, '..');

// Serve the built bundle only. Serving the project root would publish src/,
// server/, and .git/ — the whole working tree, history included — and the
// root index.html cannot run in a browser anyway: it imports the bare
// specifier 'three', which only the Vite build resolves.
const ROOT = join(PROJECT, 'dist');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

/** Comma-separated origins allowed to open a socket, or '*' to allow any. */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',').map(s => s.trim()).filter(Boolean);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav',
};

let missingBuildWarned = false;

// ── Static file server ──────────────────────────────────────
const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  // The public/canonical URL uses /arena-fps. Support it alongside root and
  // force the trailing slash so Vite's relative ./assets URLs resolve inside
  // the subdirectory instead of incorrectly resolving from the host root.
  const route = normalizePublicPath(url.pathname, url.search);
  if (route.redirect) {
    res.writeHead(308, { Location: route.redirect });
    res.end();
    return;
  }
  const filePath = join(ROOT, route.pathname === '/' ? 'index.html' : route.pathname);

  // join() normalises away ../ segments, so anything that escapes dist/ is
  // rejected here rather than reaching the filesystem.
  if (filePath !== ROOT && !filePath.startsWith(ROOT + sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  try {
    const data = await readFile(filePath);
    const shortLived = filePath.endsWith('index.html') || filePath.endsWith('startup-watchdog.js');
    res.writeHead(200, {
      'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': shortLived ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(data);
  } catch {
    if (!existsSync(join(ROOT, 'index.html')) && !missingBuildWarned) {
      missingBuildWarned = true;
      console.error('\n  No dist/ build found. Run `npm run build` first.\n');
    }
    res.writeHead(404); res.end('Not Found');
  }
});

// ── WebSocket server ────────────────────────────────────────
const wss = new WebSocketServer({
  server: httpServer,
  // A player state message is a few hundred bytes; a chat line is capped at
  // 200 chars. 16 KB is generous and stops a client from forcing large
  // allocations on the server.
  maxPayload: 16 * 1024,
  verifyClient({ origin }, done) {
    if (ALLOWED_ORIGINS.includes('*') || !origin) return done(true);
    if (ALLOWED_ORIGINS.includes(origin)) return done(true);
    done(false, 403, 'Origin not allowed');
  },
});
const rooms = new Map();
let playerCounter = 0;
let roomCounter = 0;

/** Caps so one client cannot exhaust the process. */
const MAX_ROOMS = parseInt(process.env.MAX_ROOMS || '50', 10);
const MAX_CONNECTIONS = parseInt(process.env.MAX_CONNECTIONS || '200', 10);
/** Player state is sent ~20x/s; this leaves generous headroom before cutoff. */
const MAX_MESSAGES_PER_SEC = parseInt(process.env.MAX_MESSAGES_PER_SEC || '80', 10);
/** Damage is client-reported, so cap it at more than any weapon can deal. */
const MAX_DAMAGE = 100;
const MIN_MS_BETWEEN_HITS = 40;
const RECONNECT_GRACE_MS = parseInt(process.env.RECONNECT_GRACE_MS || '20000', 10);
const sessions = new Map();

function genId(prefix) { return `${prefix}_${++playerCounter}_${Date.now().toString(36)}`; }

/**
 * Teams and skins come from the client and are echoed to every other player,
 * so they are constrained to known values here rather than trusted. An
 * unvalidated team string reached innerHTML in the lobby list.
 */
const TEAMS = new Set(['red', 'blue']);
const GAME_MODES = new Set(['ffa', 'tdm', 'ctf']);
const ARENAS = new Set(['classic', 'warehouse', 'colosseum', 'fortress', 'village']);
const SKIN_COUNT = 8;

function cleanTeam(value, fallback = 'red') {
  return TEAMS.has(value) ? value : fallback;
}

function cleanSkin(value) {
  const n = Number.parseInt(value, 10);
  return Number.isInteger(n) && n >= 0 && n < SKIN_COUNT ? n : 0;
}

function cleanMode(value) { return GAME_MODES.has(value) ? value : 'ffa'; }
function cleanArena(value) { return ARENAS.has(value) ? value : 'classic'; }

function cleanVector(value, maxMagnitude = 100) {
  if (!value || typeof value !== 'object') return null;
  if (typeof value.x !== 'number' || typeof value.y !== 'number' || typeof value.z !== 'number') return null;
  const { x, y, z } = value;
  if (![x, y, z].every(Number.isFinite)) return null;
  if (Math.abs(x) > maxMagnitude || Math.abs(y) > maxMagnitude || Math.abs(z) > maxMagnitude) return null;
  return { x, y, z };
}

function cleanRotation(value) {
  if (!value || typeof value !== 'object') return null;
  if (typeof value.x !== 'number' || typeof value.y !== 'number') return null;
  const { x, y } = value;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (Math.abs(x) > Math.PI || Math.abs(y) > Math.PI * 4) return null;
  return { x, y };
}

wss.on('connection', (ws) => {
  if (wss.clients.size > MAX_CONNECTIONS) {
    ws.close(1013, 'Server full');
    return;
  }

  let playerId = genId('p');
  let currentRoomId = null;
  let sessionToken = randomUUID();
  let session = {
    token: sessionToken,
    playerId,
    roomId: null,
    ws,
    cleanupTimer: null,
  };
  sessions.set(sessionToken, session);

  // Sliding one-second budget. A client that floods is disconnected rather
  // than throttled: at this rate it is broken or hostile, not slow.
  let windowStart = Date.now();
  let messagesThisWindow = 0;
  let lastHitAt = 0;

  // Drop sockets that stop responding, so dead players leave their rooms
  // instead of holding a slot forever.
  let alive = true;
  ws.on('pong', () => { alive = true; });
  const heartbeat = setInterval(() => {
    if (!alive) { ws.terminate(); return; }
    alive = false;
    ws.ping();
  }, 30000);

  ws.send(JSON.stringify({ type: 'WELCOME', playerId, sessionToken }));

  ws.on('message', (raw) => {
    const now = Date.now();
    if (now - windowStart >= 1000) { windowStart = now; messagesThisWindow = 0; }
    if (++messagesThisWindow > MAX_MESSAGES_PER_SEC) {
      ws.close(1008, 'Rate limit exceeded');
      return;
    }

    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (!msg || typeof msg.type !== 'string') return;

    switch (msg.type) {

      case 'RESUME_SESSION': {
        const prior = sessions.get(String(msg.sessionToken || ''));
        if (!prior || prior === session) {
          ws.send(JSON.stringify({ type: 'RESUME_FAILED', message: 'Session expired' }));
          break;
        }

        const priorRoom = prior.roomId ? rooms.get(prior.roomId) : null;
        const priorPlayer = priorRoom?.players.get(prior.playerId);
        if (prior.roomId && !priorPlayer) {
          sessions.delete(prior.token);
          ws.send(JSON.stringify({ type: 'RESUME_FAILED', message: 'Match no longer available' }));
          break;
        }

        if (prior.cleanupTimer) clearTimeout(prior.cleanupTimer);
        prior.ws?.close(1000, 'Session resumed elsewhere');
        sessions.delete(sessionToken); // discard this socket's temporary session

        session = prior;
        session.ws = ws;
        session.cleanupTimer = null;
        sessionToken = prior.token;
        playerId = prior.playerId;
        currentRoomId = prior.roomId;
        if (priorPlayer) priorPlayer.ws = ws;

        ws.send(JSON.stringify({
          type: 'SESSION_RESUMED',
          sessionToken,
          playerId,
          roomId: currentRoomId,
          gameStarted: !!priorRoom?.started,
          players: priorRoom?.getPlayerList() || [],
        }));
        priorRoom?.broadcast({ type: 'PLAYER_RECONNECTED', playerId }, playerId);
        break;
      }

      case 'CREATE_ROOM': {
        if (rooms.size >= MAX_ROOMS) {
          ws.send(JSON.stringify({ type: 'ERROR', message: 'Server is at capacity.' }));
          break;
        }
        const roomId = genId('r');
        const gameMode = cleanMode(msg.gameMode);
        const room = new Room(roomId,
          String(msg.name || 'Arena').slice(0, 24),
          cleanArena(msg.arena),
          Math.min(Math.max(parseInt(msg.maxPlayers) || 4, 2), 8),
          Math.min(Math.max(parseInt(msg.botCount) || 0, 0), 5),
          playerId,
          gameMode);
        const team = gameMode === 'ffa' ? null : cleanTeam(msg.team);
        room.addPlayer(playerId, ws, String(msg.playerName || 'Player').slice(0, 16), team, cleanSkin(msg.skinIndex));
        rooms.set(roomId, room);
        currentRoomId = roomId;
        session.roomId = roomId;
        ws.send(JSON.stringify({
          type: 'ROOM_CREATED', roomId, roomName: room.name,
          players: room.getPlayerList(), gameMode: room.gameMode,
        }));
        break;
      }

      case 'LIST_ROOMS': {
        const list = [];
        for (const r of rooms.values()) { if (!r.started && !r.isFull()) list.push(r.toJSON()); }
        ws.send(JSON.stringify({ type: 'ROOM_LIST', rooms: list }));
        break;
      }

      case 'JOIN_ROOM': {
        const room = rooms.get(msg.roomId);
        if (!room || room.started || room.isFull()) {
          ws.send(JSON.stringify({ type: 'ERROR', message: 'Room not available' }));
          break;
        }
        const team = room.gameMode === 'ffa' ? null : cleanTeam(msg.team, room.getAutoTeam());
        const { color, isHost } = room.addPlayer(playerId, ws, String(msg.playerName || 'Player').slice(0, 16), team, cleanSkin(msg.skinIndex));
        currentRoomId = msg.roomId;
        session.roomId = msg.roomId;
        ws.send(JSON.stringify({
          type: 'JOINED', roomId: room.id, roomName: room.name,
          playerId, isHost, players: room.getPlayerList(),
          gameMode: room.gameMode, team,
        }));
        room.broadcast({ type: 'PLAYER_JOINED', playerId, name: msg.playerName, color, team, players: room.getPlayerList() }, playerId);
        break;
      }

      case 'LEAVE_ROOM': { leaveCurrentRoom(); break; }

      case 'START_GAME': {
        const room = rooms.get(currentRoomId);
        if (!room || room.hostId !== playerId) break;
        room.started = true;
        const playerInfo = room.getPlayerList();
        for (const [pid, p] of room.players) {
          p.ws.send(JSON.stringify({
            type: 'GAME_STARTED', arena: room.arena, botCount: room.botCount,
            players: playerInfo, playerName: p.name,
            gameMode: room.gameMode, team: p.team,
          }));
        }
        break;
      }

      case 'PLAYER_STATE': {
        const room = rooms.get(currentRoomId);
        const position = cleanVector(msg.position, 100);
        const rotation = cleanRotation(msg.rotation);
        if (room && position && rotation) room.broadcast({ type: 'PLAYER_STATE', playerId, position, rotation }, playerId);
        break;
      }

      case 'SHOOT': {
        const room = rooms.get(currentRoomId);
        const origin = cleanVector(msg.origin, 100);
        const direction = cleanVector(msg.direction, 2);
        if (room && origin && direction) room.broadcast({ type: 'PLAYER_SHOOT', playerId, origin, direction }, playerId);
        break;
      }

      // Hit detection stays on the client — the server does not simulate
      // positions or line of sight, so it cannot confirm a hit really landed.
      // What it can do is reject the impossible: absurd damage, hits on
      // players who are not here, shooting yourself, and machine-gun hit
      // spam. That bounds cheating without a netcode rewrite.
      case 'PLAYER_HIT': {
        const room = rooms.get(currentRoomId);
        if (!room) break;
        if (msg.targetId === playerId) break;
        if (!room.players.has(msg.targetId)) break;
        if (now - lastHitAt < MIN_MS_BETWEEN_HITS) break;
        lastHitAt = now;

        const damage = msg.damage;
        if (!Number.isFinite(damage) || damage <= 0) break;

        const appliedDamage = Math.min(damage, MAX_DAMAGE);
        const target = room.players.get(msg.targetId);
        target.hp = Math.max(0, target.hp - appliedDamage);
        target.lastDamagedBy = playerId;
        room.broadcast({
          type: 'PLAYER_HIT',
          attackerId: playerId,
          targetId: msg.targetId,
          damage: appliedDamage,
        });
        break;
      }

      case 'PICKUP_COLLECTED': {
        const room = rooms.get(currentRoomId);
        if (room) room.broadcast({ type: 'PICKUP_COLLECTED', playerId, pickupId: msg.pickupId }, playerId);
        break;
      }

      case 'PLAYER_KILLED': {
        const room = rooms.get(currentRoomId);
        if (!room) break;

        // Both players must be in this room, and nobody scores off themselves.
        const attacker = room.players.get(playerId);
        const target = room.players.get(msg.targetId);
        if (!attacker || !target || msg.targetId === playerId) break;
        if (target.hp > 0 || target.lastDamagedBy !== playerId) break;

        attacker.kills++;
        target.deaths++;
        target.hp = 100;
        target.lastDamagedBy = null;
        room.broadcast({ type: 'PLAYER_KILLED', killerId: playerId, targetId: msg.targetId, players: room.getPlayerList() });
        break;
      }

      // ── New message types ───────────────────────────────

      case 'CHAT_MESSAGE': {
        const room = rooms.get(currentRoomId);
        if (!room) break;
        const player = room.players.get(playerId);
        if (!player) break;
        const text = String(msg.text || '').slice(0, 200);
        if (text.length === 0) break;
        room.broadcast({
          type: 'CHAT_MESSAGE', playerId,
          name: player.name, text, color: player.color,
        }, playerId);
        break;
      }

      case 'WEAPON_SWITCH': {
        const room = rooms.get(currentRoomId);
        const weaponIndex = Number.parseInt(msg.weaponIndex, 10);
        if (room && Number.isInteger(weaponIndex) && weaponIndex >= 0 && weaponIndex <= 3) {
          room.broadcast({ type: 'WEAPON_SWITCH', playerId, weaponIndex }, playerId);
        }
        break;
      }

      case 'GRENADE_THROW': {
        const room = rooms.get(currentRoomId);
        const origin = cleanVector(msg.origin, 100);
        const direction = cleanVector(msg.direction, 2);
        if (room && origin && direction) room.broadcast({ type: 'GRENADE_THROW', playerId, origin, direction }, playerId);
        break;
      }
    }
  });

  function leaveCurrentRoom() {
    if (!currentRoomId) return;
    const room = rooms.get(currentRoomId);
    if (room) {
      room.removePlayer(playerId);
      room.broadcast({ type: 'PLAYER_LEFT', playerId, players: room.getPlayerList() });
      if (room.isEmpty()) rooms.delete(currentRoomId);
    }
    currentRoomId = null;
    session.roomId = null;
  }

  ws.on('close', () => {
    clearInterval(heartbeat);
    if (session.ws !== ws) return;
    session.ws = null;
    const room = currentRoomId ? rooms.get(currentRoomId) : null;
    const player = room?.players.get(playerId);
    if (room?.started && player) {
      player.ws = null;
      room.broadcast({ type: 'PLAYER_DISCONNECTED', playerId, graceMs: RECONNECT_GRACE_MS }, playerId);
      session.cleanupTimer = setTimeout(() => {
        if (session.ws) return;
        leaveCurrentRoom();
        sessions.delete(session.token);
      }, RECONNECT_GRACE_MS);
    } else {
      leaveCurrentRoom();
      sessions.delete(session.token);
    }
  });

  // Without this an unhandled socket error would take the process down.
  ws.on('error', () => {
    clearInterval(heartbeat);
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log(`\n  FPS Arena server running at http://localhost:${PORT}`);
  console.log(`  serving ${ROOT}`);
  if (!existsSync(join(ROOT, 'index.html'))) {
    console.log('  WARNING: no build found — run `npm run build` first.');
  }
  console.log(`  origins: ${ALLOWED_ORIGINS.join(', ')}\n`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`\n  ${signal} received, shutting down`);
    for (const client of wss.clients) client.close(1001, 'Server shutting down');
    httpServer.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
  });
}
