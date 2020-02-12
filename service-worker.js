var cachePrefix = 'switch-';
// Change the version number in the following line each time any of the cached files change. 
var cacheName = cachePrefix + '-v3';

self.addEventListener('activate', function(activateEvent) {
    activateEvent.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key.startsWith(cachePrefix)) {
                    console.log('[service-worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    )
});

// Override network requests by returning from cache if the network request fails. 
self.addEventListener('fetch', function(fetchEvent) {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(function(cachedResponse) {
        console.log('[service-worker] Fetching resource: '+fetchEvent.request.url);
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