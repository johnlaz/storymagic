// Story Magic Service Worker v1.0
const CACHE = 'story-magic-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Boogaloo&family=Baloo+2:wght@700;800&display=swap',
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first for API calls, cache first for assets
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Always network for API calls
  if (
    url.includes('groq.com') ||
    url.includes('googleapis.com') ||
    url.includes('generativelanguage') ||
    url.includes('elevenlabs.io') ||
    url.includes('openai.com') ||
    url.includes('texttospeech')
  ) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Cache first for fonts & static assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
