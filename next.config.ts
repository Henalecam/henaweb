import type { NextConfig } from 'next';
import { execFileSync } from 'node:child_process';
import { pastimes } from './src/lib/pastimes';

// Content-Security-Policy. Scripts stay 'unsafe-inline' because the pages are static (a nonce would
// force dynamic rendering) and Next/JSON-LD/analytics bootstraps are inline; the policy still pins
// where scripts, requests, frames and forms may go. Origins: Meta Pixel, GA4 (incl. Signals) and
// Clarity, plus vercel.live for the toolbar on preview deployments. 'wasm-unsafe-eval' is for the
// meshopt decoder that unpacks the hero model.
// Ships as Report-Only: violations only show up in the browser console. Once a production session
// with consent accepted shows no "[Report Only]" warnings, flip CSP_ENFORCE to true.
const CSP_ENFORCE = false;
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://*.clarity.ms https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.facebook.com https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.clarity.ms https://c.bing.com https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' blob: data: https://*.facebook.com https://connect.facebook.net https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.clarity.ms https://c.bing.com https://vercel.live wss://ws-us3.pusher.com",
  "media-src 'self' blob: data:",
  "worker-src 'self' blob:",
  "frame-src 'self' https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // browsers ignore (and warn about) this one in a report-only policy
  ...(CSP_ENFORCE ? ['upgrade-insecure-requests'] : []),
].join('; ');

// date of the last commit, baked in at build: the footer says when the site last changed (a shallow clone
// without history falls back to the build date)
function lastUpdate() {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (iso) return iso;
  } catch {}
  return new Date().toISOString();
}

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_UPDATED: lastUpdate() },
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          { key: CSP_ENFORCE ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only', value: csp },
        ],
      },
      // the service worker must never be held by a cache, or a fix to it would take a day to reach visitors
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
      // static media in public/ is served with max-age=0, so every visit re-asks for the 440 KB model and the
      // screenshots; a day of freshness (and a week of stale-while-revalidate) skips those round trips while a
      // replaced file (same name) still shows up within a day
      ...['/models/:path*', '/cases/:path*', '/clients/:path*', '/team/:path*'].map((source) => ({
        source,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      })),
    ];
  },
  async redirects() {
    return [
      { source: '/sobre', destination: '/#studio', permanent: true },
      { source: '/servicos', destination: '/#capacidades', permanent: true },
      { source: '/portfolio', destination: '/#projetos', permanent: true },
      { source: '/contato', destination: '/#contato', permanent: true },
      { source: '/blog', destination: '/', permanent: false },
      // the usual names for a link-in-bio page, typed from memory or a printed card
      { source: '/bio', destination: '/links', permanent: true },
      { source: '/link', destination: '/links', permanent: true },
      // guessable variants of real addresses (typed by hand, read aloud, half-remembered): straight to
      // the page instead of the 404's "did you mean" (singular/plural, English, Portuguese synonyms)
      { source: '/caso/:slug', destination: '/casos/:slug', permanent: true },
      { source: '/caso', destination: '/casos', permanent: true },
      { source: '/projetos', destination: '/casos', permanent: true },
      { source: '/projeto/:slug', destination: '/casos/:slug', permanent: true },
      { source: '/cases', destination: '/casos', permanent: true },
      // slug pattern without dots: /cases/ is also the public folder of the screenshots (/cases/diconta.jpg),
      // which a bare :slug redirected to /casos/diconta.jpg and broke every case image
      { source: '/cases/:slug([a-z0-9-]+)', destination: '/casos/:slug', permanent: true },
      { source: '/servico/:slug', destination: '/servicos/:slug', permanent: true },
      { source: '/faq', destination: '/#perguntas', permanent: true },
      { source: '/perguntas', destination: '/#perguntas', permanent: true },
      // the side projects: spoken-aloud names for the arcade page, and short links to each game
      // (henaweb.com/fortrex) that can go on a story or a chat; temporary, since a game may move
      ...['/passa-tempo', '/passatempos', '/jogos', '/games', '/fliperama', '/arcade'].map((source) => ({
        source,
        destination: '/passatempo',
        permanent: true,
      })),
      ...pastimes.map((p) => ({ source: `/${p.slug}`, destination: p.url, permanent: false })),
      // v1 campaign pages: keep ads and indexed links alive
      { source: '/lp', destination: '/#contato', permanent: false },
      { source: '/prospecto/:path*', destination: '/#contato', permanent: false },
    ];
  },
};

export default nextConfig;
