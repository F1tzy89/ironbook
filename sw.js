/* Ironbook service worker: app works offline; app files update in the background. */
const CACHE = "ironbook-v2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
const CDN = ["unpkg.com", "cdn.jsdelivr.net", "fastly.jsdelivr.net"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Network first so updates arrive; fall back to the cached copy offline.
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
  } else if (CDN.includes(url.hostname)) {
    // Barcode decoder (incl. its WebAssembly file) and text-recognition libraries: cache after first use.
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    })));
  }
  // Everything else (GitHub, Open Food Facts, USDA, Anthropic) goes straight to the network.
});
