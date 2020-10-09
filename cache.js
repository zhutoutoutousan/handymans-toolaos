// https://developer.mozilla.org/en-US/docs/Web/API/Cache
let CACHE_VERSION = 1;
let CURRENT_CACHES = {
    font: 'font-cache-v' + CACHE_VERSION;
}

self.addEventListener('activate', function(event) {
    let expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
    event.waitUntil(
        caches.keys().
    )
})