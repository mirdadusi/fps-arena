# Arena FPS

A 3D first-person shooter that runs entirely in the browser. Three.js and
WebGL for rendering, plain WebSockets for multiplayer, no engine and no build
framework beyond Vite.

Single-player against bots, or up to 8 players across free-for-all, team
deathmatch and capture-the-flag. Four weapons, grenades, pickups, and five
maps. All geometry, audio and effects are generated in code — there are no
texture, model or sound files in this repository.

## Run it

```bash
npm install
npm run build     # required — the server only serves dist/
npm test          # unit, lifecycle, AI, reconnect, and WebSocket abuse tests
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

The built server accepts both `/` and the canonical `/arena-fps/` path;
`/arena-fps` redirects to the trailing-slash form so relative hashed assets do
not resolve from the wrong directory. A CSP-compatible startup watchdog turns
module failures into a visible error and reload action instead of an endless
loading overlay.

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

Bots use short-term perception memory, predictive aim, tactical range control,
cover scoring, obstacle avoidance, squad separation, and stuck recovery. A
custom bot face photo can be uploaded in Settings; it is cropped locally and
never sent to the server. Right mouse aims down sights and rifles support
hold-to-fire.

Village Survival is a separate procedural environment, so the four competitive
arena layouts remain unchanged. It adds enterable houses and a barn, forest
concealment, hills, rock cover, jumpable logs, a cave, and a crouch-only escape
passage. `Space` jumps and `Ctrl`/`C` crouches; the same actions are available
on touch devices. Bots use authored navigation links through doors and the cave,
investigate gunfire without seeing through walls, and select hiding or ambush
positions while searching.

Transient multiplayer disconnects automatically retry with bounded backoff.
The server holds the player's match slot briefly and resumes it with an opaque
session token, instead of requiring a page reload.

## Tests

```bash
npm test
npm run test:coverage
npm audit
```

The suite includes real repeated `Game` construction/teardown regressions for
both arena and Village worlds, GPU and AudioContext disposal checks, vertical
movement and tactical navigation tests, reconnect tests, and 14 WebSocket abuse
tests against a live child server. See
[`docs/architecture.md`](docs/architecture.md) for ownership boundaries and
the remaining server-authority tradeoff.

## Licence

MIT — see [LICENSE](LICENSE). Three.js is used under its own MIT licence.
