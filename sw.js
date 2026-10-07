// Story Magic: retires the old root-scope service worker.
// The app now lives in /app/ with its own worker (app/sw.js). Installs made from the old
// root URL fetch this file on their next update check, clear the old cache, and unregister.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k === 'story-magic-v1' || k === 'story-magic-v2').map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});
