'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

const projects = {
  ecommerce: {
    title: 'E-commerce Premium',
    description: 'Uma plataforma de e-commerce moderna e escalável, construída com Next.js e integrada com os principais gateways de pagamento.',
    longDescription: `Este projeto representa uma solução completa de e-commerce, desenvolvida com as mais recentes tecnologias web. 
    A plataforma oferece uma experiência de compra fluida e intuitiva, com recursos avançados como:
    • Carrinho de compras em tempo real
    • Integração com múltiplos gateways de pagamento
    • Sistema de recomendação de produtos
    • Painel administrativo completo
    • Otimização para SEO
    • Performance otimizada com Next.js`,
    image: '/portfolio/ecommerce.jpg',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    features: [
      'Interface moderna e responsiva',
      'Sistema de busca avançado',
      'Gestão de estoque em tempo real',
      'Analytics integrado',
      'Multi-idioma',
      'PWA (Progressive Web App)'
    ]
  },
  dashboard: {
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para análise de dados em tempo real, com visualizações personalizadas e relatórios automatizados.',
    longDescription: `Um dashboard empresarial completo que transforma dados complexos em insights acionáveis. 
    O sistema oferece:
    • Visualizações de dados em tempo real
    • Relatórios personalizáveis
    • Análise preditiva
    • Exportação de dados
    • Integração com múltiplas fontes de dados`,
    image: '/portfolio/dashboard.jpg',
    technologies: ['React', 'D3.js', 'Chart.js', 'Node.js', 'PostgreSQL', 'Redis'],
    features: [
      'Gráficos interativos',
      'Filtros avançados',
      'Alertas personalizados',
      'Exportação de relatórios',
      'API RESTful',
      'Autenticação segura'
    ]
  },
  mobile: {
    title: 'App Mobile',
    description: 'Aplicativo mobile multiplataforma desenvolvido com React Native, oferecendo uma experiência nativa em iOS e Android.',
    longDescription: `Um aplicativo mobile moderno que oferece uma experiência nativa em ambas as plataformas. 
    O app inclui:
    • Interface nativa para iOS e Android
    • Sincronização offline
    • Notificações push
    • Biometria e segurança
    • Integração com APIs nativas`,
    image: '/portfolio/mobile.jpg',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Jest', 'Cypress'],
    features: [
      'Design responsivo',
      'Modo offline',
      'Push notifications',
      'Biometric auth',
      'Deep linking',
      'Analytics integrado'
    ]
  }
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projeto não encontrado
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-blue-600">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Image */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sobre o Projeto
                </h2>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Tecnologias Utilizadas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Principais Funcionalidades
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <svg
                        className="h-5 w-5 text-primary-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 