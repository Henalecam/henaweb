import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    // baseline hardening; no CSP yet because the pixel, GA and Clarity load third-party scripts
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/sobre', destination: '/#studio', permanent: true },
      { source: '/servicos', destination: '/#capacidades', permanent: true },
      { source: '/portfolio', destination: '/#projetos', permanent: true },
      { source: '/contato', destination: '/#contato', permanent: true },
      { source: '/blog', destination: '/', permanent: false },
      // v1 campaign pages: keep ads and indexed links alive
      { source: '/lp', destination: '/#contato', permanent: false },
      { source: '/prospecto/:path*', destination: '/#contato', permanent: false },
    ];
  },
};

export default nextConfig;
