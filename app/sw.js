// Story Magic Service Worker v3.3
// Keep CACHE in sync with APP_VERSION in index.html.
const VERSION = '3.4';
const CACHE = 'story-magic-v' + VERSION;
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Boogaloo&family=Baloo+2:wght@700;800&display=swap';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];
// Real API hosts: always network, never cached.
const API_HOSTS = [
  'api.groq.com',
  'api.elevenlabs.io',
  'api.openai.com',
  'texttospeech.googleapis.com',
  'generativelanguage.googleapis.com',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const NETWORK_TIMEOUT_MS = 4000;

// Install: precache same-origin core (must succeed); fonts are best-effort.
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    try { await cache.add(FONT_CSS); } catch (_) { /* offline fonts are optional */ }
    await self.skipWaiting();
  })());
});

// Activate: drop old caches, take control.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request, fallbackUrl) {
  return new Promise(resolve => {
    let settled = false;
    const fromCache = async () => (await caches.match(request)) || (fallbackUrl && (await caches.match(fallbackUrl)));
    const timer = setTimeout(async () => {
      const c = await fromCache();
      if (c && !settled) { settled = true; resolve(c); }
    }, NETWORK_TIMEOUT_MS);
    fetch(request).then(res => {
      clearTimeout(timer);
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(request, clone));
      }
      if (!settled) { settled = true; resolve(res); }
    }).catch(async () => {
      clearTimeout(timer);
      if (settled) return;
      const c = await fromCache();
      settled = true;
      resolve(c || Response.error());
    });
  });
}

function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(res => {
      if (res && res.status === 200 && res.type !== 'opaque') {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(request, clone));
      }
      return res;
    });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // API calls: straight to network.
  if (API_HOSTS.includes(url.hostname)) {
    e.respondWith(fetch(req).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Fonts: cache-first so they work offline.
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(cacheFirst(req).catch(() => Response.error()));
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const isPage = req.mode === 'navigate' || /\/(index\.html|manifest\.json)?$/.test(url.pathname);

  // App shell (HTML + manifest): network-first, cached copy when offline/slow.
  if (sameOrigin && isPage) {
    e.respondWith(networkFirst(req, './index.html'));
    return;
  }

  // Everything else (icons, screenshots, other GETs): cache-first.
  e.respondWith(cacheFirst(req).catch(() => Response.error()));
});
