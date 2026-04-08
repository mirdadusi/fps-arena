/**
 * Simple publish / subscribe event bus (Observer pattern).
 * Decouples game systems — they communicate through events, not direct references.
 */
export class EventBus {
  #listeners = new Map();

  /**
   * Subscribe to an event.
   * @param {string} event
   * @param {Function} callback
   * @returns {Function} unsubscribe function
   */
  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    this.#listeners.get(event)?.forEach(cb => cb(data));
  }
}

/** Well-known event names — avoids magic strings throughout the codebase. */
export const GameEvents = Object.freeze({
  PLAYER_DAMAGED:   'player:damaged',
  PLAYER_DIED:      'player:died',
  PLAYER_SHOT:      'player:shot',
  PLAYER_RELOADED:  'player:reloaded',

  ENEMY_DAMAGED:    'enemy:damaged',
  ENEMY_KILLED:     'enemy:killed',
  ENEMY_DIED:       'enemy:died',
  ENEMY_SPAWNED:    'enemy:spawned',
  ENEMY_FIRED:      'enemy:fired',

  BULLET_HIT_WALL:  'bullet:hitWall',
  BULLET_HIT_ENEMY: 'bullet:hitEnemy',

  WEAPON_FIRED:     'weapon:fired',
  WEAPON_RELOAD:    'weapon:reload',
  WEAPON_RELOADED:  'weapon:reloaded',

  GRENADE_EXPLODE:  'grenade:explode',

  PICKUP_COLLECTED: 'pickup:collected',

  KILL_FEED:        'ui:killFeed',
  GAME_RESET:       'game:reset',
  GAME_STARTED:     'game:started',
  GAME_OVER:        'game:over',
  POINTER_LOCKED:   'input:locked',
  POINTER_UNLOCKED: 'input:unlocked',
});
