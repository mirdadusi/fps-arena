# Arena FPS

A 3D first-person shooter that runs entirely in the browser. Three.js and
WebGL for rendering, plain WebSockets for multiplayer, no engine and no build
framework beyond Vite.

Single-player against bots, or up to 8 players across free-for-all, team
deathmatch and capture-the-flag. Four weapons, grenades, pickups, four arena
layouts. All geometry, audio and effects are generated in code — there are no
texture, model or sound files in this repository.

## Run it

```bash
npm install
npm run build     # required — the server only serves dist/
npm start         # http://localhost:3000
```

For development with hot reload:

```bash
npm run dev       # http://localhost:5173 (single-player only)
npm start         # separately, for the multiplayer backend
```

`npm run dev` serves the client from source, so multiplayer needs `npm start`
running too — the lobby connects to `/ws` on the page's own origin.

## Configuration

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `3000` | HTTP + WebSocket port |
| `HOST` | `0.0.0.0` | Bind address |
| `ALLOWED_ORIGINS` | `*` | Comma-separated origins allowed to open a socket |
| `MAX_ROOMS` | `50` | Concurrent rooms before new ones are refused |
| `MAX_CONNECTIONS` | `200` | Concurrent sockets |
| `MAX_MESSAGES_PER_SEC` | `80` | Per-client budget; exceeding it disconnects |

Set `ALLOWED_ORIGINS` to your real origin in production. The default `*` is
convenient for local play and wrong for a public deployment.

## Deploying

The server serves `dist/` and nothing else, so `npm run build` must run first.
Put a reverse proxy in front to terminate TLS and map `/ws` to the game
server — the client connects to `wss://<your-host>/ws`, deriving both from the
page's own origin, so no port needs to be hardcoded.

## How multiplayer works

The server is a relay, not a simulation. It owns room membership, team
assignment and the scoreboard; clients own movement, hit detection and
physics, and broadcast their state at 20 Hz for peers to interpolate.

**This means the game is cheatable by design.** A modified client can claim
hits it did not land. The server rejects the impossible — damage above any
weapon's maximum, hits on players who are not in the room, hitting or killing
yourself, and hit messages arriving faster than any weapon fires — which
bounds the damage without pretending to be authoritative. Making it
cheat-proof means moving movement and hit detection server-side, which is a
different architecture than this project has.

Fine for playing with friends. Do not run a competitive ladder on it.

## Layout

```
src/
  Game.js            orchestrator; owns the loop and wires systems together
  entities/          player, enemy, weapon, remote player
  systems/           physics, bullets, particles, grenades, audio, teams
  world/             arena geometry and layouts
  ai/                enemy behaviour, cover selection, difficulty
  net/               WebSocket client
  ui/                HUD, lobby, chat, scoreboard, minimap, touch controls
  stores/            localStorage persistence
server/
  index.js           static files + WebSocket relay
  Room.js            room state, membership, scoring
```

Rendering uses a shared geometry and pooled particles; audio is synthesised
through the Web Audio API rather than loaded from files.

## Licence

MIT — see [LICENSE](LICENSE). Three.js is used under its own MIT licence.
