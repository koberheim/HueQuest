const CACHE_NAME = 'huequest-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './game.js',
    './manifest.json'
];

// Install service worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
