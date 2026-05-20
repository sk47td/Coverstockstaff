const CACHE_NAME = 'phonezone-v1';
const ASSETS = [
  './',
  './index.html',
  './staff.html',
  './manifest.json',
  './app-icon.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// Install Service Worker and cache essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate and remove older caches if any
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
});

// Network-first strategy for smooth updates
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firebase') || e.request.url.includes('firestore')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

