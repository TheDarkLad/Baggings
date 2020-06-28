var version = 'v4::';

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
            .open(version + 'fundamentals')
            .then(function (cache) {
                return cache.addAll([
                    'manifest.json',
                    'favicon.ico',
                ]);
            })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (cached) {
                var networked = fetch(event.request)
                    // We handle the network request with success and failure scenarios.
                    .then(fetchedFromNetwork, unableToResolve)
                    // We should catch errors on the fetchedFromNetwork handler as well.
                    .catch(unableToResolve);

                return cached || networked;

                function fetchedFromNetwork(response) {
                    /* We copy the response before replying to the network request.
                       This is the response that will be stored on the ServiceWorker cache.
                    */
                    var cacheCopy = response.clone();

                    caches
                        // We open a cache to store the response for this request.
                        .open(version + 'pages')
                        .then(function add(cache) {
                            cache.put(event.request, cacheCopy);
                        });

                    return response;
                }

                function unableToResolve() {
                    return new Response('<h1>Service Unavailable</h1>', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    });
                }
            })
    );
});

self.addEventListener("activate", function (event) {

    event.waitUntil(
        caches

            .keys()
            .then(function (keys) {
                // We return a promise that settles when all outdated caches are deleted.
                return Promise.all(
                    keys
                        .filter(function (key) {
                            // Filter by keys that don't start with the latest version prefix.
                            return !key.startsWith(version);
                        })
                        .map(function (key) {
                            /* Return a promise that's fulfilled
                               when each outdated cache is deleted.
                            */
                            return caches.delete(key);
                        })
                );
            })
    );
});