import dynamic from 'next/dynamic';
import { services, testimonials } from './constants';
import SectionHeader from './components/SectionHeader';
import Services from './components/Services';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollAnimation from './components/ScrollAnimation';

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

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <SectionHeader
              title="O que Nossos Clientes Dizem"
              description="Descubra como transformamos ideias em resultados extraordinários"
            />
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
                >
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500">
                      <img
                        src={`/testimonials/${testimonial.name.toLowerCase()}.jpg`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</h4>
                      <p className="text-indigo-500 dark:text-indigo-400 text-sm">{testimonial.role}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <svg
                      className="absolute -top-4 -left-4 h-8 w-8 text-indigo-500 dark:text-indigo-400 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">5.0</span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
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

      {/* Processes Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <SectionHeader
              title="Nossa Metodologia"
              description="Um processo inovador que transforma ideias em experiências digitais extraordinárias"
            />
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              {
                number: "1",
                title: "Descoberta & Estratégia",
                description: "Imersão profunda no seu negócio para criar uma estratégia digital vencedora",
                items: [
                  "Análise completa de requisitos e objetivos de negócio",
                  "Pesquisa avançada de mercado e análise competitiva",
                  "Definição clara de escopo e entregáveis estratégicos",
                  "Planejamento personalizado com roadmap detalhado"
                ],
                highlight: "Entendemos seu negócio como ninguém"
              },
              {
                number: "2",
                title: "Design & Experiência",
                description: "Criação de interfaces que encantam e convertem visitantes em clientes fiéis",
                items: [
                  "Wireframes e protótipos interativos de alta fidelidade",
                  "Design de interface moderno, intuitivo e memorável",
                  "Design responsivo otimizado para todos os dispositivos",
                  "Otimização contínua da experiência do usuário"
                ],
                highlight: "Designs que inspiram e convertem"
              },
              {
                number: "3",
                title: "Desenvolvimento & Excelência",
                description: "Construção com tecnologias de ponta e padrões de qualidade internacionais",
                items: [
                  "Desenvolvimento frontend com React e Next.js de última geração",
                  "Backend robusto, escalável e de alta performance",
                  "Integrações avançadas com APIs e serviços externos",
                  "Testes automatizados e otimização contínua"
                ],
                highlight: "Código que define o futuro"
              },
              {
                number: "4",
                title: "Lançamento & Evolução",
                description: "Implantação suave e suporte contínuo para garantir seu crescimento digital",
                items: [
                  "Implantação segura com monitoramento em tempo real",
                  "Monitoramento proativo de performance e segurança",
                  "Manutenção preventiva e suporte técnico dedicado",
                  "Evolução contínua baseada em métricas e feedback"
                ],
                highlight: "Suporte que faz a diferença"
              }
            ].map((step, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center group relative">
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-indigo-200 dark:bg-indigo-800 transform -translate-y-1/2" />
                  )}
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-indigo-500 dark:bg-indigo-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {step.highlight}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                  <ul className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
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
                    alt={tech}
                    className="w-12 h-12 mx-auto mb-4"
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
