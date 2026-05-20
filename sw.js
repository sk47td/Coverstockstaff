const CACHE_NAME = 'phonezone-v2';
const ASSETS = [
  './',
  './index.html',
  './staff.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firebase') || e.request.url.includes('firestore')) return;
  if (!e.request.url.startsWith('http')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
