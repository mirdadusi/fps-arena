# Spec 02 — Enemy AI Enhancement: Cover-Seeking & Retreat

## Problem Statement

The current `EnemyAI` (`src/ai/EnemyAI.js`) uses a random state machine
(patrol / chase / strafe / flank / dodge) with no awareness of arena geometry.
Enemies walk through open space in predictable loops, ignoring cover blocks and pillars.
At low health they continue charging the player — they never retreat.

This makes combat feel repetitive and unfair at higher difficulty tiers, reducing the
fun-and-relaxing experience. Enemies should feel tactically alive: using cover to reload,
retreating when badly hurt, then re-engaging.

## Goals

- Add **cover-seeking** state: enemy moves toward the nearest cover object when under fire
- Add **retreat** state: enemy backs away and seeks cover when HP drops below a threshold
- Keep the existing patrol / chase / strafe / flank / dodge states intact (no regressions)
- Wire the new states into `DifficultyManager` profiles so higher tiers use them more
- All logic stays inside `src/ai/` — no changes to `Game.js` or `Enemy.js` geometry

## Non-Goals

- Full pathfinding (A* / navmesh) — simple greedy nearest-cover is sufficient
- Multi-enemy coordination (enemies sharing cover targets)
- Cover peeking animations — movement only, no animation changes
- Changes to multiplayer bot behaviour (remote bots are server-side)

## Technical Approach

### Cover Point Extraction (new helper)

Add `src/ai/CoverPoints.js`:

```js
/**
 * Extracts world-space cover positions from arena colliders.
 * Returns an array of {x, z} positions — one per AABB face midpoint at standing height.
 */
export function extractCoverPoints(colliders) { ... }
```

Called once at game start (from `Game.js` after `PhysicsSystem` is ready).
The result is passed into `EnemyAI` via a new `setCoverPoints(points)` method.

### New States in EnemyAI

**`cover`** state:
- Triggered when: enemy is being shot at (detect via `canSee` true + enemy HP < 80% max)
  OR random transition from `strafe` on tier ≥ 1 (15% chance per transition tick)
- Movement: move toward `#nearestCoverPoint()` until within 2 units or blocked
- Transition out: after `stateTimer` expires (1.5–3 s), switch back to `strafe` or `chase`
- While in cover: fire rate is halved (reloading behaviour)

**`retreat`** state:
- Triggered when: `enemy.hp < retreatHPThreshold` (Config value, default 30)
- Movement: move directly away from player (`toPlayer * -1`)
- On arrival at cover point (within 2 units): switch to `cover`
- Transition out: after 3 s in cover, switch to `chase` (re-engage)

### Config additions (`src/Config.js`)

```js
enemy: {
  ...existing...,
  retreatHPThreshold: 30,   // HP below which retreat triggers
  coverSeekRadius: 20,      // max distance to search for cover points
}
```

### DifficultyManager changes

Add `coverChance` and `retreatEnabled` to the returned profile:

| Tier | coverChance | retreatEnabled |
|------|------------|----------------|
| 0 (Normal) | 0 | false |
| 1 (Hard) | 0.10 | false |
| 2 (Veteran) | 0.20 | true |
| 3 (Nightmare) | 0.35 | true |
| 4 (Impossible) | 0.50 | true |

### State Transition Guard

`#transitionState` must only enter `cover` when `diff.coverChance > 0`
and `retreat` when `diff.retreatEnabled === true`.

## Acceptance Criteria

- [ ] `src/ai/CoverPoints.js` exists and exports `extractCoverPoints(colliders)`
- [ ] `extractCoverPoints` returns at least 4 cover positions for the `classic` arena layout (verified by a `console.assert` or unit-style log in dev mode)
- [ ] `EnemyAI` has a `setCoverPoints(points)` method; calling it before the first `update()` does not throw
- [ ] In-game at **Veteran** difficulty (tier 2) or above, enemy visibly moves toward a wall or cover block when its HP drops below 30 (manual playtest verification)
- [ ] In-game at **Hard** difficulty (tier 1), enemy occasionally moves toward cover during combat (coverChance 10%) — not always, but observable within 2–3 engagements
- [ ] At **Normal** difficulty (tier 0), enemy never enters `cover` or `retreat` states — behaviour is identical to the original code
- [ ] Enemy `retreat` state moves the enemy away from the player (position delta is in the opposite direction to `toPlayer`)
- [ ] No regressions: `patrol`, `chase`, `strafe`, `flank`, `dodge` states still function (enemy still attacks, bullets still fired)
- [ ] `Config.enemy.retreatHPThreshold` and `Config.enemy.coverSeekRadius` exist and are referenced by the AI
- [ ] `DifficultyManager.getProfile()` returns `coverChance` and `retreatEnabled` fields
- [ ] `npm run build` (after spec 01 is done) exits 0 with the AI changes applied
