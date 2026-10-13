import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
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
