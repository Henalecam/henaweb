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
      { src: '/icon.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
