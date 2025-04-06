import dynamic from 'next/dynamic';
import { services, testimonials, projects } from './constants';
import SectionHeader from './components/SectionHeader';
import Services from './components/Services';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollAnimation from './components/ScrollAnimation';
import { Card } from './components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';

const HeroAnimation = dynamic(() => import('./components/HeroAnimation'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800" />
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section with 3D Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollAnimation>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Transforme sua Presença Digital em uma Experiência Extraordinária
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Nossa missão é criar experiências digitais que não apenas impressionam, mas que impulsionam seu negócio para novos patamares. Sites e aplicações web que combinam arte e tecnologia para resultados excepcionais.
            </p>
            <a
              href="/contato"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Comece Agora
            </a>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "100+", text: "Projetos Entregues" },
              { number: "50+", text: "Clientes Satisfeitos" },
              { number: "5+", text: "Anos de Experiência" }
            ].map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-500 dark:text-indigo-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.text}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <SectionHeader
              title="Nossos Serviços"
              description="Soluções tecnológicas que revolucionam seu negócio"
            />
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <Services />
          </ScrollAnimation>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nossos Projetos"
            description="Conheça alguns dos nossos trabalhos mais recentes e veja como transformamos ideias em realidade digital."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} variant="hover" className="overflow-hidden">
                <div className="relative h-48 w-full">
            <Image
                    src={project.image}
                    alt={`${project.title} - Projeto desenvolvido pela HenaWeb`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    href={project.link} target = "_blank"
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-secondary-900"
                  >
                    Ver Projeto
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <SectionHeader
              title="Tecnologias que Utilizamos"
              description="Stack de ponta para criar experiências digitais extraordinárias"
            />
          </ScrollAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker'].map((tech, index) => (
              <ScrollAnimation key={index} delay={index * 0.05}>
                <div
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-300 text-center shadow-sm hover:shadow-md"
                >
                  <img
                    src={`/icons/${tech.toLowerCase().replace('.', '')}.svg`}
                    alt={`${tech} - Tecnologia utilizada pela HenaWeb`}
                    className="w-12 h-12 mx-auto mb-4"
                    loading="lazy"
                  />
                  <div className="text-gray-900 dark:text-gray-300">{tech}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <ScrollAnimation className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar sua Presença Digital?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Vamos criar algo extraordinário juntos. Nossa equipe está pronta para transformar sua visão em realidade.
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            Entre em Contato
          </a>
        </ScrollAnimation>
      </section>

      <Footer />
      </main>
  );
}
