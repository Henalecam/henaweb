import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HenaWeb · Studio de engenharia de software',
    short_name: 'HenaWeb',
    description: 'Sistemas sob medida, sistemas para o setor público, automação com IA e sites.',
    start_url: '/',
    display: 'standalone',
    background_color: '#140c2e',
    theme_color: '#140c2e',
    lang: 'pt-BR',
    icons: [
      { src: '/icon.png', sizes: '48x48', type: 'image/png' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
