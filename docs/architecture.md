# Architecture and ownership

`Game` remains the composition root: it creates one match and owns everything
whose lifetime is one match. It is intentionally an orchestrator, not a place
for reusable implementation details.

## Match ownership tree

```text
Game
├── Lifetime                 DOM listeners, subscriptions, respawn timers
├── Arena                    renderer, world scene, world GPU resources
├── Player + Weapon          input and first-person model
├── Enemy + EnemyAI[]        bot presentation and tactical controller
├── gameplay systems         bullets, particles, grenades, pickups, teams
├── multiplayer views        RemotePlayer[]
├── AudioSystem              exactly one AudioContext
└── match UI                 HUD, chat, scoreboard, touch, overlays
```

Construction and teardown are symmetric. `Game.destroy()` is idempotent and
unwinds the tree before disposing the arena. `Lifetime` owns reversible browser
effects; `disposeObject3D` owns the generic Three.js traversal rule. Entity and
system `destroy()`/`dispose()` methods release resources they created. The bot
portrait texture is the exception: it is shared by all enemies and therefore
owned and disposed once by `Game`.

## Extracted boundaries

- `EnemyAI` owns perception, memory, tactical state, predictive targeting, and
  allocation-free steering. `Game` only passes the player and squad state and
  consumes shot directions.
- `VillageWorld` owns procedural environment geometry while `VillageTerrain`
  is the single shared height equation for rendering and physics. Competitive
  arenas remain data-only layouts.
- `PhysicsSystem` owns stance-aware 3D collision, terrain height, ceiling
  clearance and line of sight. `NavigationGraph` owns authored door/cave routes
  and performs A* only when a bot changes waypoint, not in the frame hot path.
- `WeaponModelFactory` owns procedural model construction. `Weapon` owns weapon
  state and feel (ADS, recoil spring, switching, reload, fire cadence).
- `NetworkManager` owns socket state, retry backoff, and session resume. Game
  code receives semantic connection events rather than manipulating sockets.
- `PersistenceStore` is the only local-storage boundary. Uploaded portraits are
  resized before persistence and are never included in network messages.

## Deliberate constraint

The server now validates and bounds relay payloads, rate-limits hits, and only
accepts a kill after an accepted lethal hit. It still does not simulate player
movement or raycasts. Fully authoritative competitive play would require a
fixed-tick server simulation, input commands instead of position claims, lag
compensation, and server-owned projectiles. That is a product-level netcode
rewrite, not a safe refactor of this browser-first friends-and-bots game.

## Test layers

- Pure/unit: lifetime scopes, disposal, persistence, rooms, vertical physics,
  terrain agreement, navigation, and difficulty.
- Behavioral: tactical bot acquisition, survival, predictive shooting, hearing,
  jumping, crouching and cave-route selection.
- Browser-like integration: complete `Game` restart cycles with a fake renderer
  and real DOM listener accounting.
- Network integration: a live WebSocket server process receives malformed,
  oversized, forged, and rate-limited messages.

Coverage is generated with `npm run test:coverage`. The live server tests run
out-of-process, so V8's in-process percentage does not credit `server/index.js`;
their assertions still exercise the actual server entry point over WebSocket.
