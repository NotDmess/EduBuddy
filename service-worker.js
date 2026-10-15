// EduBuddy PWA Service Worker (v2)
// Provides complete offline caching for app shell, modular scripts, stylesheets, and assets.

const V = 'edubuddy-v3';
const SHELL = [
  './',
  'index.html',
  'styles.css',
  'css/app.css',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'src/core/app.js',
  'src/core/router.js',
  'src/core/events.js',
  'src/core/state.js',
  'src/core/config.js',
  'src/services/storage.js',
  'src/services/auth.js',
  'src/services/supabase.js',
  'src/services/migration.js',
  'src/shared/utils.js',
  'src/shared/modal.js',
  'src/features/quiz.js',
  'src/features/lesson.js',
  'src/features/booking.js',
  'src/features/chat.js',
  'src/features/financial.js',
  'src/features/safety.js',
  'src/features/schedule.js',
  'src/features/profile.js',
  'src/features/riwayat.js',
  'src/features/learning.js',
  'src/features/diagnostik.js',
  'src/features/mediasi.js',
  'src/views/templates.js',
  'src/views/beranda.view.js',
  'src/views/diagnostik.view.js',
  'src/views/jadwal.view.js',
  'src/views/belajar.view.js',
  'src/views/mediasi.view.js',
  'src/views/aman.view.js',
  'src/views/profil.view.js',
  'src/views/ekonomi.view.js',
  'src/views/chat.view.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(V)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches
      .keys()
      .then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;

  const url = new URL(r.url);

  // Security: NEVER cache external API requests (e.g. Supabase Auth/Database),
  // authenticated endpoints, or sensitive user records in the shared offline cache.
  if (url.origin !== self.location.origin) {
    return; // Pass through to network directly without touching CacheStorage
  }

  // Do not cache dynamic API paths or auth queries
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/rest/v1/') || url.pathname.includes('/auth/v1/')) {
    return;
  }

  e.respondWith(
    caches.match(r).then(hit => {
      const net = fetch(r)
        .then(res => {
          if (res && res.ok && res.type === 'basic') {
            const cp = res.clone();
            caches.open(V).then(c => c.put(r, cp));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
