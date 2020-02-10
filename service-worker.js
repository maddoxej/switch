var cachePrefix = 'switch-';
// Change the version number in the following line each time any of the cached files changes. 
var cacheName = cachePrefix + '-v1';

var filesToCache = ['index.html','switch.js','switch.css','favicon.ico'];

self.addEventListener('install', function(installEvent) {
  console.log('[Service Worker] Install');
  installEvent.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all files');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(activateEvent) {
    activateEvent.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key.startsWith(cachePrefix)) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    )
});


self.addEventListener('fetch', function(fetchEvent) {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(function(cachedResponse) {
        console.log('[Service Worker] Fetching resource: '+fetchEvent.request.url);
        return cachedResponse || fetch(fetchEvent.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: ' + fetchEvent.request.url);
            cache.put(fetchEvent.request, response.clone());
            return response;
          });
        });
      })
    );
  });