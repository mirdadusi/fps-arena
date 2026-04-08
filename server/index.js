import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { Room } from './Room.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const PORT = parseInt(process.env.PORT || '3000', 10);

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml',
};

// ── Static file server ──────────────────────────────────────
const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);

  // Prevent path traversal
  const resolved = join(filePath);
  if (!resolved.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  try {
    const data = await readFile(resolved);
    res.writeHead(200, { 'Content-Type': MIME[extname(resolved)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not Found');
  }
});

// ── WebSocket server ────────────────────────────────────────
const wss = new WebSocketServer({ server: httpServer });
const rooms = new Map();
let playerCounter = 0;
let roomCounter = 0;

function genId(prefix) { return `${prefix}_${++playerCounter}_${Date.now().toString(36)}`; }

wss.on('connection', (ws) => {
  const playerId = genId('p');
  let currentRoomId = null;

  ws.send(JSON.stringify({ type: 'WELCOME', playerId }));

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {

      case 'CREATE_ROOM': {
        const roomId = genId('r');
        const room = new Room(roomId,
          String(msg.name || 'Arena').slice(0, 24),
          String(msg.arena || 'classic'),
          Math.min(Math.max(parseInt(msg.maxPlayers) || 4, 2), 8),
          Math.min(Math.max(parseInt(msg.botCount) || 0, 0), 5),
          playerId,
          String(msg.gameMode || 'ffa'));
        const team = msg.gameMode === 'ffa' ? null : (msg.team || 'red');
        room.addPlayer(playerId, ws, String(msg.playerName || 'Player').slice(0, 16), team, msg.skinIndex || 0);
        rooms.set(roomId, room);
        currentRoomId = roomId;
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
        const team = room.gameMode === 'ffa' ? null : (msg.team || room.getAutoTeam());
        const { color, isHost } = room.addPlayer(playerId, ws, String(msg.playerName || 'Player').slice(0, 16), team, msg.skinIndex || 0);
        currentRoomId = msg.roomId;
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
        if (room) room.broadcast({ type: 'PLAYER_STATE', playerId, position: msg.position, rotation: msg.rotation }, playerId);
        break;
      }

      case 'SHOOT': {
        const room = rooms.get(currentRoomId);
        if (room) room.broadcast({ type: 'PLAYER_SHOOT', playerId, origin: msg.origin, direction: msg.direction }, playerId);
        break;
      }

      case 'PLAYER_HIT': {
        const room = rooms.get(currentRoomId);
        if (room) room.broadcast({ type: 'PLAYER_HIT', attackerId: playerId, targetId: msg.targetId, damage: msg.damage });
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
        const attacker = room.players.get(playerId);
        const target = room.players.get(msg.targetId);
        if (attacker) attacker.kills++;
        if (target) target.deaths++;
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
        if (room) room.broadcast({ type: 'WEAPON_SWITCH', playerId, weaponIndex: msg.weaponIndex }, playerId);
        break;
      }

      case 'GRENADE_THROW': {
        const room = rooms.get(currentRoomId);
        if (room) room.broadcast({ type: 'GRENADE_THROW', playerId, origin: msg.origin, direction: msg.direction }, playerId);
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
  }

  ws.on('close', leaveCurrentRoom);
});

httpServer.listen(PORT, () => {
  console.log(`\n  FPS Arena server running at http://localhost:${PORT}\n`);
});
