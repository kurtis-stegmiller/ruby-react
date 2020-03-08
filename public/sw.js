self.addEventListener('fetch', function(event) {
    // console.log('[Service Worker] Fetching something ....', event);
    event.respondWith(fetch(event.request));
});