// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioSystem } from '../src/systems/AudioSystem.js';

class FakeNode {
  gain = {
    value: 0,
    setValueAtTime() {},
    linearRampToValueAtTime() {},
    exponentialRampToValueAtTime() {},
  };
  frequency = {
    value: 0,
    setValueAtTime() {},
    linearRampToValueAtTime() {},
    exponentialRampToValueAtTime() {},
  };
  connect() { return this; }
  disconnect() {}
  start() {}
  stop() {}
}

class FakeAudioContext {
  static instances = [];
  state = 'running';
  currentTime = 0;
  sampleRate = 8000;
  destination = new FakeNode();
  close = vi.fn(async () => { this.state = 'closed'; });
  resume = vi.fn(async () => {});
  constructor() { FakeAudioContext.instances.push(this); }
  createGain() { return new FakeNode(); }
  createOscillator() { return new FakeNode(); }
  createBufferSource() { return new FakeNode(); }
  createBuffer(_channels, frames) { return { duration: frames / this.sampleRate, getChannelData: () => new Float32Array(frames) }; }
}

beforeEach(() => {
  localStorage.clear();
  FakeAudioContext.instances = [];
  window.AudioContext = FakeAudioContext;
});

describe('AudioSystem', () => {
  it('is lazy and closes every context on disposal', async () => {
    for (let round = 0; round < 8; round++) {
      const audio = new AudioSystem();
      expect(FakeAudioContext.instances).toHaveLength(round);
      audio.startAmbient();
      audio.init();
      expect(FakeAudioContext.instances).toHaveLength(round + 1);
      const context = FakeAudioContext.instances[round];
      await audio.dispose();
      expect(context.close).toHaveBeenCalledOnce();
      expect(context.state).toBe('closed');
    }
  });
});
