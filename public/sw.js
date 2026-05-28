const CACHE_NAME = "abatur-v1";
const URLS_TO_CACHE = [
  "/",
  "/favicon.png",
  "/manifest.json",
  "/hero.jpg",
  "/founder1.jpg",
  "/founder2.jpg",
  "/mission1.jpg",
  "/mission2.jpg",
  "/mission3.jpg",
  "/mission4.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        if (fetchResponse.status === 200 && event.request.method === "GET") {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return fetchResponse;
      });
    }).catch(() => caches.match("/"))
  );
});