importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

const CACHE_NAME = 'generative-ai-labs-cache-v1';

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/style.css', revision: '1' },
  { url: '/icon-192x192.png', revision: '1' },
  { url: '/icon-512x512.png', revision: '1' }
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.setCatchHandler(({event}) => {
  if (event.request.destination === 'document') {
    return caches.match('/');
  }
});
