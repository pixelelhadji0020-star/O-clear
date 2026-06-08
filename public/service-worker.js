/* ══════════════════════════════════════════════════
   O'Clear Lavage — Service Worker
   Stratégie : Network First + Cache Fallback
   ══════════════════════════════════════════════════ */

const CACHE_NAME = "oclear-v1";

// Assets critiques mis en cache dès l'installation
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

/* ── Installation ── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activation : purge des vieux caches ── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* ── Fetch : Network First, Cache Fallback ── */
self.addEventListener("fetch", (event) => {
  // Ignorer les requêtes non-GET et les ressources externes (Calendly, fonts)
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Mise à jour du cache avec la réponse fraîche
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() =>
        // Mode hors-ligne : servir depuis le cache
        caches.match(event.request).then((cached) => cached || caches.match("/index.html"))
      )
  );
});
