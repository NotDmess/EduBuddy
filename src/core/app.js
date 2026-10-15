// EduBuddy Main Application Entry Point
// Bootstraps session state, initializes event bus, starts routing, and registers PWA service worker.

import { state, setME, setUid } from './state.js';
import { sget, sset, uget } from '../services/storage.js';
import { render } from './router.js';
import { initGlobalEvents } from './events.js';

// Feature modules & services
import { initAuth } from '../services/auth.js';
import '../shared/modal.js';
import '../shared/utils.js';
import '../features/quiz.js';
import '../features/lesson.js';
import '../features/booking.js';
import '../features/chat.js';
import '../features/financial.js';
import '../features/safety.js';
import '../features/schedule.js';
import '../features/profile.js';
import '../features/riwayat.js';
import '../features/learning.js';
import '../features/diagnostik.js';

/**
 * Initializes active session state via Supabase Auth or guest mode.
 */
function initSession() {
  initAuth();
}

/**
 * Dismisses splash screen after brand animation duration.
 */
function initSplash() {
  setTimeout(function () {
    const s = document.getElementById('splash');
    if (s) s.remove();
  }, 2000);
}

/**
 * Registers PWA service worker over HTTPS or local development environments.
 */
function initServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js').catch(function () {});
    });
  }
}

/**
 * Main application initialization.
 */
export function initApp() {
  initSession();
  initGlobalEvents();
  initSplash();
  initServiceWorker();

  window.addEventListener('hashchange', render);
  render();
}

// Auto-run when DOM content is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

