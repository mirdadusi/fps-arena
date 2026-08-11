import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NetworkManager } from '../src/net/NetworkManager.js';

class FakeWebSocket {
  static OPEN = 1;
  static instances = [];
  readyState = 0;
  sent = [];

  constructor(url) {
    this.url = url;
    FakeWebSocket.instances.push(this);
  }

  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.();
  }

  receive(message) {
    this.onmessage?.({ data: JSON.stringify(message) });
  }

  send(data) { this.sent.push(JSON.parse(data)); }

  close(code = 1000, reason = '') {
    const wasOpen = this.readyState !== 3;
    this.readyState = 3;
    if (wasOpen) this.onclose?.({ code, reason });
  }
}

beforeEach(() => {
  FakeWebSocket.instances = [];
  vi.useFakeTimers();
});

describe('NetworkManager reconnect', () => {
  it('resumes the original authenticated session after a dropped socket', async () => {
    const manager = new NetworkManager({ WebSocketImpl: FakeWebSocket, reconnectDelays: [10] });
    const reconnected = vi.fn();
    manager.on('reconnected', reconnected);
    const connecting = manager.connect('ws://arena.test/ws');
    const first = FakeWebSocket.instances[0];
    first.open();
    first.receive({ type: 'WELCOME', playerId: 'p-original', sessionToken: 'secret-token' });
    await connecting;

    first.close(1006, 'wifi lost');
    await vi.advanceTimersByTimeAsync(10);
    const second = FakeWebSocket.instances[1];
    second.open();
    second.receive({ type: 'WELCOME', playerId: 'p-temp', sessionToken: 'temp-token' });
    expect(second.sent).toContainEqual({ type: 'RESUME_SESSION', sessionToken: 'secret-token' });
    second.receive({ type: 'SESSION_RESUMED', playerId: 'p-original', sessionToken: 'secret-token' });

    expect(manager.connected).toBe(true);
    expect(manager.playerId).toBe('p-original');
    expect(reconnected).toHaveBeenCalledOnce();
    manager.destroy();
  });

  it('does not reconnect after an intentional disconnect', async () => {
    const manager = new NetworkManager({ WebSocketImpl: FakeWebSocket, reconnectDelays: [5] });
    const connecting = manager.connect('ws://arena.test/ws');
    FakeWebSocket.instances[0].open();
    await connecting;
    manager.disconnect();
    await vi.advanceTimersByTimeAsync(100);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });
});
