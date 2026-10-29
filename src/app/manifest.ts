import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HenaWeb · Studio de engenharia de software',
    short_name: 'HenaWeb',
    description: 'Sistemas sob medida, sistemas para o setor público, automação com IA e sites.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#140c2e',
    theme_color: '#140c2e',
    lang: 'pt-BR',
    dir: 'ltr',
    categories: ['business', 'productivity'],
    // long-press on the installed icon (Android) / right-click (desktop)
    shortcuts: [
      { name: 'Abrir um caso', short_name: 'Contato', description: 'Formulário de contato com diagnóstico', url: '/#contato', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Casos resolvidos', short_name: 'Casos', description: 'Projetos entregues pela HenaWeb', url: '/casos', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Passa tempo', short_name: 'Jogos', description: 'Jogos e experimentos das horas vagas', url: '/passatempo', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
      { name: 'Procurar pista', short_name: 'Buscar', description: 'Busca no site: casos, serviços e perguntas', url: '/?pista=', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    ],
    icons: [
      { src: '/icon.png', sizes: '48x48', type: 'image/png' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
