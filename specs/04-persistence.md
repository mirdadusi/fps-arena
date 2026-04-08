# Spec 04 — Persistence: High Scores & Player Settings

## Problem Statement

Every time the player reloads the page all game state is lost:
- High score and best streak reset to zero
- Player name, chosen skin, and mouse sensitivity must be re-entered
- There is no leaderboard or personal-best motivation to keep playing

Persistence via `localStorage` is entirely sufficient — no server needed.
This is low-risk, high-payoff for player retention.

## Goals

- Persist the **top-10 high score table** (score, kills, time, streak, date) across reloads
- Auto-fill the **player name** and **skin selection** from the last session
- Persist **mouse sensitivity** setting and **FOV** setting
- Show a **personal best** highlight in the game-over screen
- Add a minimal **Settings panel** reachable from the lobby

## Non-Goals

- Server-side leaderboard (global scores across players)
- Account creation or authentication
- Settings beyond sensitivity, FOV, and volume (graphics quality is out of scope)
- Cloud sync or cross-device persistence

## Technical Approach

### `src/stores/PersistenceStore.js`

Single module wrapping `localStorage`. All keys use the `fps-arena.` prefix.

```js
export const PersistenceStore = {
  // High scores
  getScores()                  // returns array of up to 10 ScoreEntry
  saveScore(entry)             // inserts, sorts desc by score, trims to 10
  clearScores()

  // Player profile
  getPlayerName()              // returns string, default 'Player'
  setPlayerName(name)
  getSkinIndex()               // returns number 0–7, default 0
  setSkinIndex(idx)

  // Settings
  getSensitivity()             // returns number 0.1–5.0, default 1.0
  setSensitivity(v)
  getFOV()                     // returns number 60–120, default 75
  setFOV(v)
  getVolume()                  // returns number 0.0–1.0, default 0.4
  setVolume(v)
};
```

**ScoreEntry shape:**
```js
{ score: number, kills: number, time: string, maxStreak: number, date: string }
```

### Lobby: auto-fill name and skin

In `src/main.js` (or `LobbyUI.js`), read `PersistenceStore.getPlayerName()` and
`PersistenceStore.getSkinIndex()` and pre-fill the lobby name input and skin selector
on page load. On "Play" click, call `setPlayerName` / `setSkinIndex` before starting.

### Settings Panel (Lobby overlay)

Add a `⚙️ Settings` button to the lobby screen (`index.html`).
Clicking it shows a panel (simple `<div>` overlay, same dark style as the existing UI) with:

| Control | Range | Default |
|---------|-------|---------|
| Mouse sensitivity slider | 0.1 – 5.0 | 1.0 |
| FOV slider | 60 – 120 | 75 |
| Volume slider | 0 – 100% | 40% |

Changes apply immediately (live preview) and persist via `PersistenceStore`.

### Sensitivity + FOV wiring

- `Player.js` `#onMouseMove`: multiply `e.movementX/Y` by `sensitivity * 0.002`
  (currently hardcoded `0.002` — make it `sensitivity * 0.002` where `sensitivity`
  comes from `PersistenceStore.getSensitivity()`, defaulting to 1.0)
- `Arena.js` `#initCamera`: read FOV from `PersistenceStore.getFOV()` instead of
  hardcoded `75`

### Game-Over Screen Enhancement

`UIManager.showGameOver(stats)` currently shows a single line of text.
Enhance it to also show:
1. A **"🏆 New Personal Best!"** banner when `stats.score > PersistenceStore.getScores()[0]?.score`
2. A **Top 5 scores table** (score, kills, time, date) rendered as an HTML table
3. The current session's stats highlighted in the table

`UIManager` must call `PersistenceStore.saveScore(stats)` **before** rendering
so the new score appears in the table.

## Acceptance Criteria

- [ ] `src/stores/PersistenceStore.js` exists and exports `PersistenceStore`
- [ ] After completing a game, `localStorage` contains an `fps-arena.scores` key with a JSON array of at least one entry
- [ ] Reloading the page and completing another game results in `fps-arena.scores` having two entries (scores are cumulative, not replaced)
- [ ] After 11 games the scores array never exceeds 10 entries (oldest low score is evicted)
- [ ] The player name entered in the lobby is pre-filled on next page load
- [ ] The skin index selected in the lobby is pre-selected on next page load
- [ ] A `⚙️ Settings` button exists in the lobby and opens a settings panel
- [ ] Moving the sensitivity slider and saving changes the effective mouse turn speed in-game (low value = slow turn, high value = fast turn)
- [ ] Moving the FOV slider and saving changes the camera FOV (60 looks zoomed-in, 120 looks wide-angle)
- [ ] Volume setting in the settings panel writes to `localStorage` as `fps-arena.volume` and the AudioSystem reads it on next init (consistent with spec 03)
- [ ] The game-over screen shows a high-score table with at least the top 5 entries
- [ ] The `🏆 New Personal Best!` banner appears only when the current score exceeds the previous best
- [ ] `PersistenceStore.getPlayerName()` returns `'Player'` when no value is stored
- [ ] `PersistenceStore.getSensitivity()` returns `1.0` when no value is stored
- [ ] `npm run build` exits 0 with the persistence changes applied
