// Pillpal service worker
const CACHE = 'pillpal-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((res) => {
        // Cache same-origin GETs as we go
        if (res && res.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});

// Allow the page to ask the SW to show a notification (works when the page is open;
// keeps a single notification surface for both foreground and SW-triggered cases).
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'NOTIFY') {
    self.registration.showNotification(data.title || 'Time for your medication', {
      body: data.body || '',
      tag: data.tag || 'pillpal-reminder',
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [120, 60, 120],
      data: { url: './index.html' },
      requireInteraction: false
    });
  }
});

// Periodic Background Sync (Chrome/Android only — best-effort top-up of reminders)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'pillpal-check') {
    event.waitUntil(checkDueDoses());
  }
});

async function checkDueDoses() {
  // The SW cannot read localStorage; we keep due reminders in IndexedDB-free storage
  // by having the page post a fresh schedule snapshot to the SW on each open.
  // For now this is a no-op; foreground scheduling is the source of truth.
  return;
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if ('focus' in w) return w.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
