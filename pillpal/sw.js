// Pillpal service worker
const CACHE = 'pillpal-v5';
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
        if (res && res.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});

// Receive NOTIFY postMessages from the page to show notifications via the SW
// (used by foreground catch-up and the test button).
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'NOTIFY') {
    const dose = data.doseData || {};
    const opts = {
      body: data.body || '',
      tag: data.tag || 'pillpal-reminder',
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [120, 60, 120],
      data: { url: './index.html', ...dose },
      requireInteraction: !!data.withActions,
    };
    if (data.withActions && dose.medId) {
      opts.actions = [
        { action: 'taken', title: '\u2713 Took it' },
        { action: 'snooze', title: 'Snooze 10m' },
      ];
    }
    self.registration.showNotification(data.title || 'Time for your medication', opts);
  }
});

// Periodic Background Sync — low-frequency fallback (browser controls timing).
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'pillpal-refresh') {
    event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const c of clients) c.postMessage({ type: 'SYNC_REFRESH' });
    }));
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action;
  const data = event.notification.data || {};

  event.waitUntil((async () => {
    // "Took it" action
    if (action === 'taken' && data.medId && data.time && data.dateKey) {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      let delivered = false;
      for (const c of clients) {
        c.postMessage({ type: 'DOSE_ACTION', action: 'taken', medId: data.medId, time: data.time, dateKey: data.dateKey });
        delivered = true;
        if ('focus' in c) { try { await c.focus(); } catch (e) {} }
        break;
      }
      if (!delivered && self.clients.openWindow) {
        await self.clients.openWindow(`./index.html#dose=${encodeURIComponent(data.medId)}|${data.dateKey}|${data.time}|taken`);
      }
      return;
    }

    // "Snooze 10m" action — re-schedule via showTrigger when supported
    if (action === 'snooze' && data.medId) {
      const fireAt = Date.now() + 10 * 60 * 1000;
      const baseTag = (event.notification.tag || 'pillpal-dose') + '-snooze-' + Date.now();
      const opts = {
        body: event.notification.body,
        tag: baseTag,
        icon: './icon-192.png',
        badge: './icon-192.png',
        vibrate: [120, 60, 120],
        requireInteraction: true,
        data,
        actions: [
          { action: 'taken', title: '\u2713 Took it' },
          { action: 'snooze', title: 'Snooze 10m' },
        ],
      };
      try {
        if (typeof TimestampTrigger !== 'undefined') {
          opts.showTrigger = new TimestampTrigger(fireAt);
          await self.registration.showNotification(event.notification.title, opts);
        } else {
          setTimeout(() => self.registration.showNotification(event.notification.title, opts), 10 * 60 * 1000);
        }
      } catch (e) { /* ignore */ }
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of clients) c.postMessage({ type: 'DOSE_ACTION', action: 'snooze', medId: data.medId, time: data.time, dateKey: data.dateKey });
      return;
    }

    // Default tap (no action button): open / focus the app
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of clients) {
      if ('focus' in c) { try { return await c.focus(); } catch (e) {} }
    }
    if (self.clients.openWindow) return self.clients.openWindow(data.url || './index.html');
  })());
});
