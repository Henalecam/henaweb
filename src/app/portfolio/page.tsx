'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { Card } from '../components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    description: 'Uma plataforma de e-commerce moderna e escalável, construída com Next.js e integrada com os principais gateways de pagamento.',
    image: '/portfolio/ecommerce.jpg',
    link: '/portfolio/ecommerce'
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para análise de dados em tempo real, com visualizações personalizadas e relatórios automatizados.',
    image: '/portfolio/dashboard.jpg',
    link: '/portfolio/dashboard'
  },
  {
    id: 3,
    title: 'App Mobile',
    description: 'Aplicativo mobile multiplataforma desenvolvido com React Native, oferecendo uma experiência nativa em iOS e Android.',
    image: '/portfolio/mobile.jpg',
    link: '/portfolio/mobile'
  }
];

export default function PortfolioPage() {
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
              Nosso Portfólio
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Conheça alguns dos nossos projetos mais recentes e veja como transformamos ideias em realidade digital.
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} variant="hover" className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <Link
                    href={project.link}
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-secondary-900"
                  >
                    Ver Projeto
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 