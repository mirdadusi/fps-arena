import { PersistenceStore } from '../stores/PersistenceStore.js';

/**
 * AudioSystem — synthesises all game sounds with the Web Audio API.
 * No external audio files needed; all sounds are generated programmatically.
 * Call `init()` after the first user gesture (pointer-lock acquired).
 */
export class AudioSystem {
  /** @type {AudioContext|null} */
  #ctx = null;
  /** @type {GainNode|null} */
  #masterGain = null;
  #enabled = false;
  #volume = 0.4;

  /** Ambient drone oscillators and gain, kept so we can stop them. */
  #ambientOsc1 = null;
  #ambientOsc2 = null;
  #ambientGain = null;
  #ambientRequested = false;
  #disposed = false;

  constructor() {
    this.#volume = PersistenceStore.getVolume();
  }

  /**
   * Must be called after a user gesture (pointer-lock).
   * Creates the AudioContext and master gain node.
   */
  init() {
    if (this.#disposed) return;
    if (this.#ctx) {
      if (this.#ctx.state === 'suspended') void this.#ctx.resume();
      if (this.#ambientRequested) this.#startAmbientNodes();
      return;
    }
    try {
      this.#ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.#masterGain = this.#ctx.createGain();
      this.#masterGain.gain.value = this.#volume;
      this.#masterGain.connect(this.#ctx.destination);
      this.#enabled = true;
      if (this.#ambientRequested) this.#startAmbientNodes();
    } catch (e) {
      console.warn('[AudioSystem] Failed to create AudioContext:', e);
    }
  }

  get isEnabled() { return this.#enabled; }
  get volume() { return this.#volume; }

  toggleMute() {
    if (!this.#ctx) return this.#enabled;
    this.#enabled = !this.#enabled;
    this.#masterGain.gain.value = this.#enabled ? this.#volume : 0;
    return this.#enabled;
  }

  setVolume(v) {
    this.#volume = Math.max(0, Math.min(1, v));
    if (this.#masterGain) this.#masterGain.gain.value = this.#volume;
    PersistenceStore.setVolume(this.#volume);
  }

  // ── Public playback API ───────────────────────────────────

  /**
   * @param {'rifle'|'shotgun'|'sniper'|'rocket'} weaponKey
   */
  playShot(weaponKey) {
    if (!this.#enabled) return;
    switch (weaponKey) {
      case 'rifle':   this.#playRifle();   break;
      case 'shotgun': this.#playShotgun(); break;
      case 'sniper':  this.#playSniper();  break;
      case 'rocket':  this.#playRocket();  break;
      default:        this.#playRifle();
    }
  }

  playImpactWall() {
    if (!this.#enabled) return;
    // White-noise tick (10 ms) at 0.3 volume
    const buf = this.#noiseBuffer(0.01);
    this.#playBuffer(buf, 0.3, 0);
  }

  playImpactEnemy() {
    if (!this.#enabled) return;
    // Mid-frequency thud: 300 Hz, 30 ms
    this.#playTone(300, 0.03, 'sine', 0.5, 0);
  }

  playReload() {
    if (!this.#enabled) return;
    // Two-tone click: 800 Hz (20 ms) then 600 Hz (20 ms) 300 ms later
    this.#playTone(800, 0.02, 'square', 0.35, 0);
    this.#playTone(600, 0.02, 'square', 0.35, 0.3);
  }

  playExplosion() {
    if (!this.#enabled) return;
    // Sub-bass burst (40 Hz, 500 ms) + noise layer
    this.#playTone(40, 0.5, 'sawtooth', 0.9, 0);
    const buf = this.#noiseBuffer(0.4);
    this.#playBuffer(buf, 0.7, 0);
  }

  playDamage() {
    if (!this.#enabled) return;
    // Low warning tone 200 Hz, pitch-shifted down over 100 ms
    const ctx = this.#ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.1);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.12);
    osc.connect(gain);
    gain.connect(this.#masterGain);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * @param {'health'|'ammo'|'shield'|'speed'|'damage'} type
   */
  playPickup(type) {
    if (!this.#enabled) return;
    switch (type) {
      case 'health':
        this.#playTone(440, 0.08, 'sine', 0.5, 0);
        this.#playTone(660, 0.08, 'sine', 0.5, 0.1);
        break;
      case 'ammo':
        this.#playTone(880, 0.05, 'sine', 0.4, 0);
        break;
      default:
        // shield / speed / damage: ascending three-tone chime
        this.#playTone(440, 0.06, 'sine', 0.45, 0);
        this.#playTone(550, 0.06, 'sine', 0.45, 0.08);
        this.#playTone(660, 0.06, 'sine', 0.45, 0.16);
    }
  }

  playEnemyDeath() {
    if (!this.#enabled) return;
    // Descending sweep 400→100 Hz over 200 ms
    const ctx = this.#ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.22);
    osc.connect(gain);
    gain.connect(this.#masterGain);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  startAmbient() {
    this.#ambientRequested = true;
    this.#startAmbientNodes();
  }

  #startAmbientNodes() {
    if (!this.#enabled || this.#ambientOsc1 || this.#disposed) return;
    const ctx = this.#ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    gain.connect(this.#masterGain);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55;
    osc1.connect(gain);
    osc1.start();

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 58;
    osc2.connect(gain);
    osc2.start();

    this.#ambientOsc1 = osc1;
    this.#ambientOsc2 = osc2;
    this.#ambientGain = gain;
  }

  stopAmbient() {
    this.#ambientRequested = false;
    if (!this.#ambientOsc1) return;
    try {
      this.#ambientOsc1.stop();
      this.#ambientOsc2.stop();
    } catch (_) { /* already stopped */ }
    this.#ambientGain.disconnect();
    this.#ambientOsc1 = null;
    this.#ambientOsc2 = null;
    this.#ambientGain = null;
  }

  /** Close the context so browser context limits are never consumed by restarts. */
  async dispose() {
    if (this.#disposed) return;
    this.stopAmbient();
    this.#disposed = true;
    this.#enabled = false;
    const ctx = this.#ctx;
    try { this.#masterGain?.disconnect(); } catch { /* already disconnected */ }
    this.#masterGain = null;
    this.#ctx = null;
    if (ctx && ctx.state !== 'closed') {
      try { await ctx.close(); } catch (error) {
        console.warn('[AudioSystem] Failed to close AudioContext:', error);
      }
    }
  }

  // ── Weapon synthesis ──────────────────────────────────────

  #playRifle() {
    // Short white-noise burst (5 ms) + 200 Hz tone decay 80 ms
    const buf = this.#noiseBuffer(0.005);
    this.#playBuffer(buf, 0.8, 0);
    this.#playTone(200, 0.08, 'sawtooth', 0.6, 0);
  }

  #playShotgun() {
    // Wide white-noise burst (15 ms) + low 80 Hz thump
    const buf = this.#noiseBuffer(0.015);
    this.#playBuffer(buf, 0.9, 0);
    this.#playTone(80, 0.12, 'sine', 0.8, 0);
  }

  #playSniper() {
    // High-pitched crack 1200 Hz (3 ms) + tail
    this.#playTone(1200, 0.003, 'square', 0.9, 0);
    this.#playTone(400, 0.06, 'sine', 0.3, 0.003);
  }

  #playRocket() {
    // Low rumble sweep 60→40 Hz over 200 ms
    const ctx = this.#ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.2);
    gain.gain.setValueAtTime(0.85, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.22);
    osc.connect(gain);
    gain.connect(this.#masterGain);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  // ── Low-level helpers ─────────────────────────────────────

  /** Play a single oscillator tone with exponential gain decay. */
  #playTone(freq, duration, type, peakGain, delaySeconds) {
    const ctx = this.#ctx;
    const start = ctx.currentTime + delaySeconds;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(peakGain, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(this.#masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.01);
  }

  /** Create a white-noise AudioBuffer of the given duration (seconds). */
  #noiseBuffer(duration) {
    const ctx = this.#ctx;
    const sampleRate = ctx.sampleRate;
    const frameCount = Math.max(1, Math.ceil(sampleRate * duration));
    const buf = ctx.createBuffer(1, frameCount, sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frameCount; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Play a pre-built AudioBuffer at a given gain and delay. */
  #playBuffer(buffer, peakGain, delaySeconds) {
    const ctx = this.#ctx;
    const start = ctx.currentTime + delaySeconds;
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(peakGain, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + buffer.duration + 0.01);
    source.connect(gain);
    gain.connect(this.#masterGain);
    source.start(start);
  }
}
