import dynamic from 'next/dynamic';
import { services, testimonials, projects } from './constants';
import SectionHeader from './components/SectionHeader';
import Services from './components/Services';
import ScrollAnimation from './components/ScrollAnimation';
import { Card } from './components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from './components/ui/Section';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';

const HeroAnimation = dynamic(() => import('./components/HeroAnimation'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" />
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section with 3D Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollAnimation>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-pulse-slow drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
              Transforme sua Presença Digital em uma Experiência Extraordinária
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto drop-shadow-sm font-light">
              Nossa missão é criar experiências digitais que não apenas impressionam, mas que impulsionam seu negócio para novos patamares. Sites e aplicações web que combinam arte e tecnologia para resultados excepcionais.
            </p>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <a
                href="/contato"
                className="relative inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform group-hover:scale-105 border border-indigo-400/50"
              >
                Comece Agora
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { number: "100+", text: "Projetos Entregues" },
              { number: "50+", text: "Clientes Satisfeitos" },
              { number: "4+", text: "Anos de Experiência" }
            ].map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="flex flex-col items-center justify-center text-center p-6 relative group">
                  <div className="text-4xl md:text-5xl font-light text-indigo-600 dark:text-indigo-400 mb-2 tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium text-xs md:text-sm tracking-widest uppercase mt-2">
                    {stat.text}
                  </div>
                  {/* Subtle divider line instead of full borders */}
                  {index !== 2 && (
                    <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                  )}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 dark:bg-[#0f1219] relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-slate-50 dark:to-[#0f1219] pointer-events-none -mt-40 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <SectionHeader
              title="Depoimentos"
              description="O que nossos clientes dizem sobre nossos serviços"
            />
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <Testimonials />
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
              <Card key={project.id} variant="hover" className="overflow-hidden bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-gray-100 dark:border-slate-700/50 shadow-xl group hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <Image
                    src={project.image}
                    alt={`${project.title} - Projeto desenvolvido pela HenaWeb`}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
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
                  className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-slate-700/50 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="relative w-12 h-12 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={`/icons/${tech.toLowerCase().replace('.', '')}.svg`}
                      alt={`${tech} - Tecnologia utilizada pela HenaWeb`}
                      fill
                      className="object-contain filter dark:brightness-200 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-gray-900 dark:text-gray-200 font-medium">{tech}</div>
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
    </main>
  );
}
