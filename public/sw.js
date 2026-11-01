/*
 * HenaWeb service worker: the case archive keeps working without signal.
 * - pages (navigations): network first, so a visitor online always gets the current site; each page read is
 *   kept, and offline it comes back from that copy, or the "sem_sinal.exe" page (/offline) when it was never read
 * - Next's hashed build files (/_next/static): cache first, they never change under the same name
 * - same-origin images: served from the copy while a fresh one is fetched behind it
 * Every cache is capped, oldest out first. Nothing cross-origin (analytics, WhatsApp) is touched.
 */
const V = 'v1';
const PAGES = `pages-${V}`;
const STATIC = `static-${V}`;
const MEDIA = `media-${V}`;
const OFFLINE = '/offline';
const LIMIT = { [PAGES]: 40, [STATIC]: 160, [MEDIA]: 80 };

async function trim(name) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (const k of keys.slice(0, Math.max(0, keys.length - LIMIT[name]))) await cache.delete(k);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // the offline page and the build files it needs to render with its styles
      const res = await fetch(OFFLINE, { cache: 'no-store' });
      if (!res.ok) return;
      const html = await res.clone().text();
      await (await caches.open(PAGES)).put(OFFLINE, res);
      const assets = [...new Set([...html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]))];
      const statics = await caches.open(STATIC);
      await Promise.all(assets.map((a) => statics.add(a).catch(() => {})));
    })(),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set(Object.keys(LIMIT));
      for (const k of await caches.keys()) if (!keep.has(k)) await caches.delete(k);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          // keep a copy of real pages (not error pages, not redirects), keyed without query or hash
          if (res.ok && res.type === 'basic' && (res.headers.get('content-type') || '').includes('text/html')) {
            const cache = await caches.open(PAGES);
            await cache.put(url.pathname, res.clone());
            trim(PAGES);
          }
          return res;
        } catch {
          const cache = await caches.open(PAGES);
          return (await cache.match(url.pathname)) || (await cache.match(OFFLINE)) || Response.error();
        }
      })(),
    );
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC);
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) {
          await cache.put(req, res.clone());
          trim(STATIC);
        }
        return res;
      })(),
    );
    return;
  }

  if (req.destination === 'image' || url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(MEDIA);
        const hit = await cache.match(req);
        const fresh = fetch(req)
          .then(async (res) => {
            if (res.ok) {
              await cache.put(req, res.clone());
              trim(MEDIA);
            }
            return res;
          })
          .catch(() => hit || Response.error());
        if (hit) {
          event.waitUntil(fresh);
          return hit;
        }
        return fresh;
      })(),
    );
  }
});
