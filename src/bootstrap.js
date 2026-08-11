// Keep the entry point deliberately tiny. A dynamic import lets the external
// startup watchdog report parse, compatibility, and dependency-load failures
// from the full application instead of leaving the loading overlay forever.
import('./main.js').catch(error => {
  window.__arenaFail?.(error);
  console.error('[Arena FPS] Startup failed:', error);
});

