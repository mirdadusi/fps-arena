/**
 * ChatUI — in-game text chat overlay.
 * Enter to open, Escape to close, messages broadcast via callback.
 */
export class ChatUI {
  #el;
  #log;
  #input;
  #visible = false;
  #onSend = null;
  #lifetime = new Lifetime();

  constructor() {
    this.#el    = document.getElementById('chat-panel');
    this.#log   = document.getElementById('chat-log');
    this.#input = document.getElementById('chat-input');
    if (!this.#el) return;
    this.#bindKeys();
  }

  onSend(cb) { this.#onSend = cb; }

  #bindKeys() {
    this.#lifetime.listen(document, 'keydown', e => {
      if (e.code === 'Enter') {
        if (this.#visible) {
          this.#send();
        } else {
          this.open();
        }
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.code === 'Escape' && this.#visible) {
        this.close();
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  open() {
    if (!this.#el) return;
    this.#visible = true;
    this.#el.classList.add('active');
    this.#input.focus();
  }

  close() {
    if (!this.#el) return;
    this.#visible = false;
    this.#el.classList.remove('active');
    this.#input.value = '';
    this.#input.blur();
  }

  get isOpen() { return this.#visible; }

  #send() {
    const text = this.#input.value.trim();
    if (text.length > 0 && text.length <= 200) {
      this.#onSend?.(text);
    }
    this.close();
  }

  addMessage(name, text, color = '#fff') {
    if (!this.#log) return;
    const el = document.createElement('div');
    el.className = 'chat-msg';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'chat-name';
    nameSpan.style.color = color;
    nameSpan.textContent = name + ': ';
    const textNode = document.createTextNode(text);
    el.appendChild(nameSpan);
    el.appendChild(textNode);
    this.#log.appendChild(el);

    // Auto-scroll and limit messages
    while (this.#log.children.length > 50) this.#log.removeChild(this.#log.firstChild);
    this.#log.scrollTop = this.#log.scrollHeight;

    // Fade message after 8s
    this.#lifetime.timeout(() => {
      el.classList.add('fade');
      this.#lifetime.timeout(() => el.remove(), 1000);
    }, 8000);
  }

  addSystem(text) {
    this.addMessage('System', text, '#f80');
  }

  destroy() {
    this.close();
    this.#onSend = null;
    this.#lifetime.dispose();
    if (this.#log) this.#log.innerHTML = '';
  }
}
import { Lifetime } from '../core/Lifetime.js';
