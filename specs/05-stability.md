# Spec 05 — Stability & Performance

## Problem Statement

The game has several robustness gaps that will cause problems for public web deployment:

1. **Memory leaks** — `BulletSystem` creates new `MeshBasicMaterial` objects per bullet
   instead of reusing them; `ParticleSystem` may accumulate undisposed geometries.
   Long play sessions will exhaust GPU memory.
2. **No error recovery** — if WebGL context is lost (mobile GPU suspend, tab switch on iOS)
   the game freezes silently with a black screen. No recovery attempt is made.
3. **No FPS cap / spiral of death protection** — if the frame takes >200 ms (background tab,
   heavy load) `dt` spikes and entities teleport, bullets skip walls, enemies escape bounds.
4. **No loading feedback** — the page is blank for 1–3 seconds while Three.js initialises.
   Users on slow connections assume it is broken and leave.
5. **Pointer-lock error handling** — if pointer lock fails (permissions policy on iOS Safari)
   the game silently fails; there is no fallback message.

## Goals

- Fix bullet material memory leak (pool materials per color, not per bullet)
- Add WebGL context-lost / context-restored handling with user notification
- Cap `dt` to 100 ms maximum to prevent spiral-of-death physics
- Add a loading progress overlay that disappears when the scene is ready
- Show a friendly error message when pointer lock is unavailable

## Non-Goals

- Full LOD (level-of-detail) system or dynamic quality scaling
- Worker threads or WASM
- Profiling tooling or automated perf benchmarks
- Fixing remote-player interpolation jitter (multiplayer-only)

## Technical Approach

### 1. Bullet material pool (BulletSystem.js)

Replace per-bullet `new THREE.MeshBasicMaterial({ color })` with a module-level
`Map<number, THREE.MeshBasicMaterial>` keyed by hex color.

```js
// Before (leaks a new material every shot):
const mat = new THREE.MeshBasicMaterial({ color });
const mesh = new THREE.Mesh(this.#geo, mat);

// After (reuse per color):
const mat = this.#getMaterial(color);   // from Map, create once
const mesh = new THREE.Mesh(this.#geo, mat);
```

When `BulletSystem` is destroyed (on game reset), call `mat.dispose()` on all pooled
materials and clear the map.

### 2. dt cap (Game.js game loop)

In the `requestAnimationFrame` callback in `Game.js`, clamp `dt`:

```js
const dt = Math.min((now - this.#prevTime) / 1000, 0.1);  // max 100 ms
```

This prevents physics explosions when the tab is backgrounded.

### 3. WebGL context lost / restored (Arena.js)

On the renderer's `canvas`, listen for `webglcontextlost` and `webglcontextrestored`:

```js
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  showContextLostOverlay();   // render a DOM overlay: "GPU context lost — click to reload"
  cancelAnimationFrame(this.#animFrame);
});

renderer.domElement.addEventListener('webglcontextrestored', () => {
  hideContextLostOverlay();
  // Re-init renderer state and restart the game loop
  renderer.setSize(window.innerWidth, window.innerHeight);
  requestAnimationFrame(() => this.#loop());
});
```

The overlay is a full-screen semi-transparent `<div>` with id `context-lost-overlay`
(add to `index.html`, hidden by default). Clicking it does `location.reload()`.

### 4. Loading overlay (index.html + main.js)

Add a `<div id="loading-overlay">` (full-screen, dark background, centred text)
to `index.html`, visible by default.

In `src/main.js`, after `new Arena(...)` and `new Game(...)` are constructed
(all Three.js resources allocated), call:

```js
document.getElementById('loading-overlay').style.display = 'none';
```

Loading overlay text: `"Loading Arena FPS…"` with a CSS pulse animation.

### 5. Pointer-lock error handling (Game.js)

Wrap `document.body.requestPointerLock()` in a try/catch and also listen for the
`pointerlockerror` event:

```js
document.addEventListener('pointerlockerror', () => {
  // Show a DOM message: pointer lock unavailable, describe keyboard-only mode
  document.getElementById('pointer-lock-error').style.display = 'block';
});
```

Add `<p id="pointer-lock-error" style="display:none">` to `index.html` with
message: `"⚠️ Pointer lock not available. Touch controls or keyboard/mouse without
lock will still work."`.

### 6. Particle geometry reuse (ParticleSystem.js)

Audit `ParticleSystem.js` — if it creates a new `BufferGeometry` per particle effect,
replace with a single shared `SphereGeometry` (or `BoxGeometry`) reused across all
particles. Call `.dispose()` on any per-effect geometries that are removed from scene.

## Acceptance Criteria

- [ ] After 200 bullet shots in a single game session, the number of `THREE.MeshBasicMaterial` instances in memory does not grow unboundedly — the material pool Map size is ≤ 5 entries (one per unique bullet color)
- [ ] `dt` in the game loop is capped: when the browser tab is sent to background for 5 seconds and brought back, entities do not teleport and the game continues normally
- [ ] `index.html` contains a `<div id="loading-overlay">` that is visible on page load
- [ ] The loading overlay disappears automatically once the game lobby is ready (no manual user action needed)
- [ ] `index.html` contains a `<div id="context-lost-overlay">` (hidden by default)
- [ ] The `webglcontextlost` event listener is present on `renderer.domElement` (verifiable by reading `Arena.js` source)
- [ ] `index.html` contains a `<p id="pointer-lock-error">` element (hidden by default)
- [ ] The `pointerlockerror` event listener is registered in `Game.js` and shows the error element when fired
- [ ] `BulletSystem` has a method (e.g. `dispose()`) that clears and disposes all pooled materials
- [ ] `npm run build` exits 0 with all stability changes applied
- [ ] No `THREE.MeshBasicMaterial` constructor calls remain inside the `BulletSystem.spawn()` hot path (only the `#getMaterial()` pool accessor)
