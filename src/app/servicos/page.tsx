import Header from '../components/Header';
import Footer from '../components/Footer';

const services = [
  {
    id: 'criacao-de-sites',
    title: 'Criação de Sites',
    description: 'Desenvolvemos sites profissionais e responsivos que representam sua marca e alcançam seus objetivos de negócio.',
    features: [
      'Design moderno e responsivo',
      'Otimização para SEO',
      'Integração com redes sociais',
      'Painel administrativo personalizado',
      'Suporte técnico contínuo'
    ],
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'automacao-de-bots',
    title: 'Automação de Bots',
    description: 'Criamos bots inteligentes que automatizam processos, melhoram o atendimento ao cliente e aumentam a eficiência operacional.',
    features: [
      'Bots de atendimento ao cliente',
      'Automação de processos internos',
      'Integração com sistemas existentes',
      'Análise de dados e relatórios',
      'Manutenção e suporte'
    ],
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'consultoria-digital',
    title: 'Consultoria Digital',
    description: 'Oferecemos consultoria especializada para ajudar sua empresa na transformação digital e implementação de soluções tecnológicas.',
    features: [
      'Análise de processos atuais',
      'Planejamento estratégico digital',
      'Implementação de soluções',
      'Treinamento de equipe',
      'Acompanhamento contínuo'
    ],
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Nossos Serviços
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Soluções digitais completas para transformar seu negócio
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <div className="flex items-center">
                    <div className="text-blue-600">
                      {service.icon}
                    </div>
                    <h2 className="ml-4 text-3xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a
                      href="/contato"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 