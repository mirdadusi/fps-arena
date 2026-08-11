(function () {
  'use strict';

  var pendingError = '';
  var startupTimer = 0;

  function renderFailure(message) {
    var overlay = document.getElementById('loading-overlay');
    if (!overlay) {
      pendingError = message;
      return;
    }

    var title = document.getElementById('loading-message');
    var detail = document.getElementById('loading-detail');
    var retry = document.getElementById('loading-retry');
    if (title) title.textContent = 'Arena FPS could not start';
    if (detail) {
      detail.textContent = message;
      detail.style.display = 'block';
    }
    if (retry) {
      retry.style.display = 'block';
      retry.onclick = function () { window.location.reload(); };
    }
  }

  window.__arenaReady = function () {
    window.__arenaBooted = true;
    window.clearTimeout(startupTimer);
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.remove();
  };

  window.__arenaFail = function (reason) {
    window.clearTimeout(startupTimer);
    var message = reason && reason.message ? reason.message : String(reason || 'Unknown startup error');
    renderFailure(message);
  };

  window.addEventListener('error', function (event) {
    if (!window.__arenaBooted) window.__arenaFail(event.error || event.message || 'A startup script failed to load.');
  });
  window.addEventListener('unhandledrejection', function (event) {
    if (!window.__arenaBooted) window.__arenaFail(event.reason || 'A startup task failed.');
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (pendingError) renderFailure(pendingError);
  });

  startupTimer = window.setTimeout(function () {
    if (!window.__arenaBooted) {
      renderFailure('The game bundle did not finish loading. Reload the page or open the game URL with a trailing slash.');
    }
  }, 10000);
}());

