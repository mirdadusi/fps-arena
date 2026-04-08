# Spec 03 — Audio System: Web Audio API

## Problem Statement

The game is completely silent. There are no gunfire sounds, no impact feedback,
no ambient music. For a shooter game this is a major gap in the "fun and relaxing"
experience — audio is ~40% of game feel. Players on modern browsers expect sound.

## Goals

- Create a lightweight `AudioSystem` class in `src/systems/AudioSystem.js`
  using the **Web Audio API** (no external libraries, no file downloads)
- Synthesise all sounds programmatically with oscillators and noise buffers
  so the game remains fully self-contained (no `.mp3`/`.ogg` asset files needed)
- Play sounds for: gunfire (per weapon type), bullet impact (wall + enemy), reload,
  grenade explosion, player taking damage, enemy death, pickup collection
- Add optional looping ambient drone for atmosphere (relaxing background hum)
- Expose a master volume control that persists to `localStorage`
- Integrate with `Game.js` via `EventBus` events — no direct coupling

## Non-Goals

- Music tracks or recorded audio samples (`.mp3`, `.wav`)
- 3D positional audio (spatial panning) — stereo only for now
- Audio for multiplayer remote-player events
- Sound settings screen UI (volume slider only, no per-channel controls)
  — the full settings screen is covered in `specs/04-persistence.md`

## Technical Approach

### `src/systems/AudioSystem.js`

```js
export class AudioSystem {
  #ctx;          // AudioContext
  #masterGain;   // GainNode — master volume
  #enabled;

  constructor() { ... }   // lazy-init AudioContext on first user gesture
  init() { ... }          // must be called after a user gesture (pointer lock)

  // Playback methods
  playShot(weaponKey) { ... }       // rifle/shotgun/sniper/rocket — different tones
  playImpactWall() { ... }
  playImpactEnemy() { ... }
  playReload() { ... }
  playExplosion() { ... }
  playDamage() { ... }              // when player is hit
  playPickup(type) { ... }          // health/ammo/shield/speed/damage
  playEnemyDeath() { ... }
  startAmbient() { ... }            // low drone loop
  stopAmbient() { ... }

  setVolume(v) { ... }              // 0.0 – 1.0, saved to localStorage
  get volume() { ... }
  get isEnabled() { ... }
}
```

### Sound Design (synthesised)

| Event | Synthesis |
|-------|----------|
| Rifle shot | Short white-noise burst (5 ms) + 200 Hz tone decay 80 ms |
| Shotgun shot | Wide white-noise burst (15 ms) + low 80 Hz thump |
| Sniper shot | High-pitched crack 1200 Hz (3 ms) + tail |
| Rocket launch | Low rumble sweep 60→40 Hz over 200 ms |
| Wall impact | White-noise tick (10 ms) at 0.3 volume |
| Enemy impact | Mid-frequency thud (300 Hz, 30 ms) |
| Reload | Two-tone click sequence (800 Hz → 600 Hz, 20 ms each, 300 ms apart) |
| Explosion | Sub-bass burst (40 Hz, 500 ms) + noise layer |
| Player damage | Low warning tone 200 Hz, 100 ms, pitch-shifted down |
| Pickup (health) | Rising two-tone chime 440 → 660 Hz |
| Pickup (ammo) | Single 880 Hz click |
| Pickup (shield/speed/damage) | Three-tone ascending chime |
| Enemy death | Descending 400→100 Hz sweep, 200 ms |
| Ambient drone | Looping 55 Hz + 58 Hz (slight beating) at 0.05 volume |

### EventBus Integration

`AudioSystem` subscribes to these `GameEvents` in `EventBus.js`:

| Event | Audio response |
|-------|---------------|
| `PLAYER_SHOT` | `playShot(weaponKey)` |
| `BULLET_HIT_WALL` | `playImpactWall()` |
| `BULLET_HIT_ENEMY` | `playImpactEnemy()` |
| `PLAYER_RELOADED` | `playReload()` |
| `GRENADE_EXPLODE` | `playExplosion()` |
| `PLAYER_DAMAGED` | `playDamage()` |
| `PICKUP_COLLECTED` | `playPickup(type)` |
| `ENEMY_DIED` | `playEnemyDeath()` |
| `GAME_STARTED` | `startAmbient()` |
| `GAME_OVER` | `stopAmbient()` |

If any of these `GameEvents` constants are missing from `EventBus.js`, add them.

### Volume persistence

`setVolume` writes `'fps-arena-volume'` key to `localStorage`.
Constructor reads it back (defaults to `0.4` if absent).

### AudioContext unlock

Browser policy requires AudioContext to start after a user gesture.
Call `audioSystem.init()` inside the pointer-lock acquired handler in `Game.js`.

### Master volume HUD element

Add a small `🔊` button to the existing HUD (top-right corner, `index.html`).
Clicking it toggles mute (volume 0 ↔ previous volume).
No volume slider needed in this spec (see `specs/04-persistence.md` for full settings).

## Acceptance Criteria

- [ ] `src/systems/AudioSystem.js` exists and exports `AudioSystem`
- [ ] `AudioSystem` constructor does not throw and does not create an `AudioContext` until `init()` is called
- [ ] `init()` creates an `AudioContext` without throwing (tested by calling it after a simulated user gesture in the browser console)
- [ ] Firing the rifle in-game produces a short audible sound (white-noise burst)
- [ ] Firing the shotgun produces a noticeably different (wider/lower) sound than the rifle
- [ ] Firing the sniper produces a sharp high-pitched crack
- [ ] A bullet impacting a wall produces a soft tick sound
- [ ] A grenade explosion produces a deep boom distinct from gunfire
- [ ] The player receiving damage triggers a warning tone
- [ ] Collecting a health pickup produces an ascending chime
- [ ] The ambient drone starts when the game begins and stops at game-over
- [ ] Master volume is read from `localStorage` on init (value persists across page reloads)
- [ ] The `🔊` mute-toggle button exists in the HUD and toggles sound on/off
- [ ] All sounds play without `AudioContext` warnings in the browser console
- [ ] `npm run build` exits 0 with the audio changes applied
