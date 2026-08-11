import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { Lifetime } from '../src/core/Lifetime.js';
import { disposeObject3D } from '../src/rendering/disposeObject3D.js';
import { EventBus } from '../src/EventBus.js';

class CountingTarget extends EventTarget {
  listeners = new Map();

  addEventListener(type, handler, options) {
    super.addEventListener(type, handler, options);
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(handler);
  }

  removeEventListener(type, handler, options) {
    super.removeEventListener(type, handler, options);
    this.listeners.get(type)?.delete(handler);
  }

  get listenerCount() {
    let total = 0;
    for (const handlers of this.listeners.values()) total += handlers.size;
    return total;
  }
}

describe('Lifetime', () => {
  it('returns listeners to baseline through repeated construction and teardown', () => {
    const documentTarget = new CountingTarget();
    const windowTarget = new CountingTarget();
    const baseline = documentTarget.listenerCount + windowTarget.listenerCount;

    for (let round = 0; round < 8; round++) {
      const lifetime = new Lifetime();
      lifetime.listen(documentTarget, 'keydown', () => {});
      lifetime.listen(documentTarget, 'mousedown', () => {});
      lifetime.listen(documentTarget, 'pointerlockchange', () => {});
      lifetime.listen(windowTarget, 'resize', () => {});
      expect(documentTarget.listenerCount + windowTarget.listenerCount).toBe(baseline + 4);
      lifetime.dispose();
      lifetime.dispose();
      expect(documentTarget.listenerCount + windowTarget.listenerCount).toBe(baseline);
    }
  });

  it('cancels owned timers and runs cleanups in reverse order', () => {
    vi.useFakeTimers();
    const calls = [];
    const lifetime = new Lifetime();
    lifetime.add(() => calls.push('first'));
    lifetime.timeout(() => calls.push('timer'), 10);
    lifetime.add(() => calls.push('last'));
    lifetime.dispose();
    vi.runAllTimers();
    expect(calls).toEqual(['last', 'first']);
    vi.useRealTimers();
  });
});

describe('disposeObject3D', () => {
  it('disposes shared geometry, material, and texture exactly once', () => {
    const root = new THREE.Group();
    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    root.add(new THREE.Mesh(geometry, material), new THREE.Mesh(geometry, material));
    const geometryDispose = vi.spyOn(geometry, 'dispose');
    const materialDispose = vi.spyOn(material, 'dispose');
    const textureDispose = vi.spyOn(texture, 'dispose');

    disposeObject3D(root);

    expect(geometryDispose).toHaveBeenCalledTimes(1);
    expect(materialDispose).toHaveBeenCalledTimes(1);
    expect(textureDispose).toHaveBeenCalledTimes(1);
  });
});

describe('EventBus', () => {
  it('supports unsubscribe and complete teardown', () => {
    const bus = new EventBus();
    const callback = vi.fn();
    const off = bus.on('tick', callback);
    bus.emit('tick', 1);
    off();
    bus.emit('tick', 2);
    bus.on('tick', callback);
    bus.clear();
    bus.emit('tick', 3);
    expect(callback).toHaveBeenCalledOnce();
  });
});
