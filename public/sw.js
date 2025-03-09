// sw.js - Service Worker ultra-compact pour AdaFiT
const CACHE_NAME = 'adafit-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.*.js',
  '/static/css/main.*.css',
  '/manifest.json',
  '/logo192.png'
];

// Installation: cache préventif
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation: nettoyage
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: stratégie cache-first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => 
      r || fetch(e.request).then(res => 
        caches.open(CACHE_NAME).then(c => {
          c.put(e.request, res.clone());
          return res;
        })
      )
    ).catch(() => new Response('Offline'))
  );
});