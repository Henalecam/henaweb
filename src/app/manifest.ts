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
    // the richer install sheet (Chrome/Edge show these in the "Instalar" dialog): real captures of the site,
    // one phone and one desktop size each. Regenerate if these pages change a lot
    screenshots: [
      { src: '/screenshots/casos-narrow.webp', sizes: '390x844', type: 'image/webp', form_factor: 'narrow', label: 'Arquivo de casos resolvidos' },
      { src: '/screenshots/servico-narrow.webp', sizes: '390x844', type: 'image/webp', form_factor: 'narrow', label: 'Página de serviço: Sistemas sob medida' },
      { src: '/screenshots/passatempo-narrow.webp', sizes: '390x844', type: 'image/webp', form_factor: 'narrow', label: 'Passa tempo: os jogos da casa' },
      { src: '/screenshots/casos-wide.webp', sizes: '1440x900', type: 'image/webp', form_factor: 'wide', label: 'Arquivo de casos resolvidos' },
      { src: '/screenshots/servico-wide.webp', sizes: '1440x900', type: 'image/webp', form_factor: 'wide', label: 'Página de serviço: Sistemas sob medida' },
      { src: '/screenshots/passatempo-wide.webp', sizes: '1440x900', type: 'image/webp', form_factor: 'wide', label: 'Passa tempo: os jogos da casa' },
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
