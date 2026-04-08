# Arena FPS — Agent Overview

## What This Project Is

A browser-based 3D first-person shooter built with **Three.js** and **vanilla JavaScript (ES modules)**.
It supports single-player (bots), multiplayer (WebSocket), TDM, and CTF modes.
The goal is to deploy it as a public website that gives players fun and relaxing sessions.

## Repository Layout

```
fps-arena/
├── index.html              # Entry point — inline importmap for Three.js CDN
├── src/
│   ├── main.js             # Bootstrap: lobby UI → Game instantiation
│   ├── Config.js           # Frozen config object — ALL game constants live here
│   ├── EventBus.js         # Tiny pub/sub used for decoupled game events
│   ├── Game.js             # Central mediator: owns all systems, runs the game loop
│   ├── ai/
│   │   ├── DifficultyManager.js  # Strategy: returns difficulty profile from kill count
│   │   └── EnemyAI.js            # State-machine: patrol/chase/strafe/flank/dodge
│   ├── entities/
│   │   ├── Player.js       # First-person movement, input (keyboard/mouse/touch)
│   │   ├── Enemy.js        # Three.js mech-soldier model + animations
│   │   ├── Weapon.js       # Multi-weapon system (rifle/shotgun/sniper/rocket)
│   │   └── RemotePlayer.js # Interpolated remote player for multiplayer
│   ├── systems/
│   │   ├── PhysicsSystem.js  # AABB collision + raycast line-of-sight
│   │   ├── BulletSystem.js   # Object pool for bullets + hit detection
│   │   ├── ParticleSystem.js # Particle effects (wall hits, blood, explosions)
│   │   ├── GrenadeSystem.js  # Grenade throw, physics, explosion
│   │   └── TeamManager.js    # Team assignment, flag carriers (CTF)
│   ├── world/
│   │   ├── Arena.js          # Three.js scene builder (floor/walls/lighting/renderer)
│   │   └── ArenaLayouts.js   # Data-driven layouts: classic / warehouse / colosseum / ...
│   ├── pickups/
│   │   └── PickupSystem.js   # Health/ammo/shield/speed/damage pickups
│   └── ui/
│       ├── HUD.js            # DOM HUD (HP bar, ammo, score, kill feed, powerups)
│       ├── UIManager.js      # Overlay screens (click-to-start blocker, game-over)
│       ├── Minimap.js        # Canvas minimap
│       ├── Scoreboard.js     # Tab scoreboard
│       ├── ChatUI.js         # Multiplayer chat
│       ├── LobbyUI.js        # Room browser, match settings
│       └── TouchControls.js  # On-screen joystick for mobile
├── server/
│   ├── index.js             # Node.js HTTP + WebSocket server (multiplayer only)
│   └── Room.js              # Room state, game-loop, broadcast
├── package.json             # Currently only ws dependency; no bundler yet
└── specs/                   # ← YOU ARE HERE — feature specifications
```

## Key Patterns

| Pattern | Where Used |
|---------|-----------|
| Mediator | `Game.js` — coordinates all systems |
| State machine | `EnemyAI.js` — patrol/chase/strafe/flank/dodge |
| Strategy | `DifficultyManager.js` — swappable profiles |
| Builder | `Arena.js` — builds world from layout data |
| Object pool | `BulletSystem.js` — reuses bullet meshes |
| Observer | `EventBus.js` — decoupled game events |

## How to Run (Current)

```bash
node server/index.js   # serves on port 3000
# open http://localhost:3000 in browser
```

Three.js is loaded via CDN importmap in `index.html` — no bundler currently.

## How to Run (After Vite Migration)

```bash
npm install
npm run dev    # dev server on http://localhost:5173
npm run build  # static dist/ for hosting
npm run start  # Node.js WebSocket server on port 3000 (multiplayer)
```

## Configuration

All tunable game constants are in `src/Config.js` — a frozen object.
**Never hardcode values; always reference Config.**

## Testing

- No automated test suite yet (see `specs/05-stability.md`)
- Build verification: `npm run build` must exit 0 with no errors
- Manual smoke test: game loads, player can move + shoot, enemy spawns and attacks

## Conventions

- ES module imports — always use `.js` extension
- Private class fields use `#` prefix
- Tauri/Node APIs are never used in `src/` — browser-only code
- All HTML output must be escaped before insertion (XSS prevention)
- `Config` is the single source of truth — do not duplicate magic numbers

## Current Gaps (Addressed by Specs)

1. No build system — Three.js from CDN, not bundled (`specs/01-web-deployment.md`)
2. Enemy AI has no cover-seeking or retreat logic (`specs/02-enemy-ai-cover.md`)
3. No audio system — game is completely silent (`specs/03-audio-system.md`)
4. No persistence — scores and settings are lost on reload (`specs/04-persistence.md`)
5. Memory leaks + no error recovery (`specs/05-stability.md`)
