/*
 * HenaWeb service worker: the case archive keeps working without signal.
 * - pages (navigations): network first, so a visitor online always gets the current site; each page read is
 *   kept, and offline it comes back from that copy, or the "sem_sinal.exe" page (/offline) when it was never read;
 *   a network that never answers gets the same, after 6 s (with a copy) or 12 s (without)
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
      // navigation preload: the page request starts while the worker is still waking up, instead of after it
      // (a sleeping worker cost each navigation its start-up time before the network was even asked)
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable().catch(() => {});
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
        const cache = await caches.open(PAGES);
        const network = (async () => {
          // the preloaded response when there is one (see activate), else a normal fetch
          const res = (await Promise.resolve(event.preloadResponse).catch(() => undefined)) || (await fetch(req));
          // keep a copy of real pages (not error pages, not redirects), keyed without query or hash
          if (res.ok && res.type === 'basic' && (res.headers.get('content-type') || '').includes('text/html')) {
            await cache.put(url.pathname, res.clone());
            trim(PAGES);
          }
          return res;
        })();
        // keep fetching (and refreshing the copy) even when the answer below doesn't wait for it
        event.waitUntil(network.catch(() => {}));
        const copy = await cache.match(url.pathname);
        // the copy says it is one: a Server-Timing entry the page reads back (NetStatus) to tell the reader they are
        // looking at the version kept on <date>, with a way to try the network again
        const marked = () => {
          const headers = new Headers(copy.headers);
          headers.set('Server-Timing', `hena-copy;desc="${copy.headers.get('date') || ''}"`);
          return new Response(copy.body, { status: copy.status, statusText: copy.statusText, headers });
        };
        const fallback = async () => (copy ? marked() : (await cache.match(OFFLINE)) || Response.error());
        // a connection that connects but never answers ("lie-fi": a weak signal, a captive Wi-Fi) used to leave the
        // page blank for as long as the browser cared to wait. The network still goes first; only if no answer has
        // started after a while does the reader get the copy this browser kept (6 s), or "sem_sinal.exe" for a page
        // never read here (12 s, so a merely slow server still gets its chance)
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        return Promise.race([network.catch(fallback), wait(copy ? 6000 : 12000).then(fallback)]);
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
