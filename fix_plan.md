# Fix Plan

## Pending

### Spec 01 — Vite Build System (blocker for `npm run build`)
- [x] Install `vite` and `three` as npm dependencies; add `dev` and `build` scripts to `package.json`; create `vite.config.js`
- [x] Migrate `index.html`: remove CDN importmap `<script type="importmap">`, update entry `<script>` to `type="module" src="/src/main.js"` so Vite can bundle it
- [x] Verify `npm run build` exits 0 and `dist/` is produced with no errors

### Spec 05 — Stability & Performance
- [ ] Add `<div id="loading-overlay">` (visible by default, CSS pulse) and `<div id="context-lost-overlay">` (hidden) and `<p id="pointer-lock-error">` (hidden) to `index.html`
- [x] Fix `BulletSystem` material leak: replace per-bullet `new THREE.MeshBasicMaterial({ color })` in the spawn path with a module-level `Map<number, Material>` pool; add a `dispose()` method that clears and disposes all pooled materials
- [x] Fix `ParticleSystem` geometry leak: create a single shared `BoxGeometry` instance once and reuse it across all particles instead of `new THREE.BoxGeometry(...)` per effect
- [ ] Add `webglcontextlost` / `webglcontextrestored` event listeners to `renderer.domElement` in `Arena.js`; show/hide `context-lost-overlay`; restart loop on restore
- [ ] Add `pointerlockerror` event listener in `Game.js`; show `#pointer-lock-error` element when fired
- [ ] Hide `loading-overlay` in `main.js` after `Arena` and `Game` are fully constructed

### Spec 02 — Enemy AI Cover-Seeking & Retreat
- [ ] Add `retreatHPThreshold: 30` and `coverSeekRadius: 20` to `Config.enemy` in `Config.js`
- [ ] Create `src/ai/CoverPoints.js` exporting `extractCoverPoints(colliders)` — returns `{x, z}[]` of AABB face mid-points; add `console.assert` verifying ≥4 points for classic layout
- [ ] Add `coverChance` and `retreatEnabled` fields to all five tiers in `DifficultyManager.getProfile()` (tier 0: `coverChance=0, retreatEnabled=false` … tier 4: `coverChance=0.5, retreatEnabled=true`)
- [ ] Add `setCoverPoints(points)` method to `EnemyAI`; implement `cover` state in `#getMoveDirection` (move toward nearest cover point) and `#transitionState` (trigger when HP < 80% and `diff.coverChance > 0`)
- [ ] Add `retreat` state to `EnemyAI`: move away from player; switch to `cover` on arrival; after 3 s in cover switch back to `chase`; guard behind `diff.retreatEnabled`

### Spec 03 — Audio System
- [x] Add missing `GameEvents` constants (`PLAYER_SHOT`, `BULLET_HIT_WALL`, `BULLET_HIT_ENEMY`, `PLAYER_RELOADED`, `GRENADE_EXPLODE`, `PLAYER_DAMAGED`, `PICKUP_COLLECTED`, `ENEMY_DIED`, `GAME_STARTED`, `GAME_OVER`) to `EventBus.js` if absent
- [x] Create `src/systems/AudioSystem.js` with `AudioContext`-based synthesis: `playShot(weaponKey)`, `playImpactWall()`, `playImpactEnemy()`, `playReload()`, `playExplosion()`, `playDamage()`, `playPickup(type)`, `playEnemyDeath()`, `startAmbient()`, `stopAmbient()`, `setVolume(v)` / `get volume()`; volume persists to `localStorage` key `fps-arena-volume`
- [x] Instantiate `AudioSystem` in `Game.js`; call `init()` on first pointer-lock; subscribe to `EventBus` events and call the corresponding `AudioSystem` methods

### Spec 04 — Persistence
- [ ] Create `src/stores/PersistenceStore.js` with `getScores/saveScore/clearScores`, `getPlayerName/setPlayerName`, `getSkinIndex/setSkinIndex`, `getSensitivity/setSensitivity`, `getFOV/setFOV`, `getVolume/setVolume` — all using `fps-arena.` prefix; enforce 10-entry cap on scores
- [ ] Wire `PersistenceStore.getSensitivity()` into `Player.js` mouse-move handler and `PersistenceStore.getFOV()` into `Arena.js` camera initialisation
- [ ] Auto-fill player name input and skin selector from `PersistenceStore` on page load in `LobbyUI.js`/`main.js`; persist on "Play" click
- [ ] Add `⚙️ Settings` button + overlay panel to `index.html` / `LobbyUI.js` with sliders for sensitivity (0.1–5.0), FOV (60–120), and volume (0–100%); changes apply live and persist via `PersistenceStore`
- [ ] Enhance `UIManager.showGameOver(stats)`: call `PersistenceStore.saveScore(stats)` before render; show `🏆 New Personal Best!` banner when appropriate; render top-5 scores HTML table

## Completed
