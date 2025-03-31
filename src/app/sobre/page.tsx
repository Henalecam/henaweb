import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { values } from '../constants';

export default function SobrePage() {
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
              Sobre a HenaWeb
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Transformando ideias em realidade digital, com foco em qualidade, inovação e resultados.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Nossa Missão
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Impulsionar o crescimento digital das empresas através de soluções tecnológicas inovadoras e personalizadas.
              Nossa missão é criar experiências digitais excepcionais que não apenas atendam às necessidades atuais,
              mas também antecipem as demandas futuras do mercado.
            </p>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Buscamos constantemente a excelência em desenvolvimento web, combinando tecnologias modernas
              com práticas ágeis para entregar projetos que fazem a diferença no mundo digital.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Nossos Valores
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105"
                >
                  <div className="text-blue-600 mb-4">
                    {value.icon()}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Desenvolvedor
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="relative w-full md:w-1/3 aspect-square">
                  <Image
                    src="/team/henrique.png"
                    alt="Henrique Alexandre de Camargo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Henrique Alexandre de Camargo
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mt-1">
                    Desenvolvedor Full Stack
                  </p>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Especializado em desenvolvimento web moderno, com foco em React, Next.js e tecnologias JavaScript/TypeScript.
                    Apaixonado por criar soluções elegantes e eficientes que proporcionam experiências excepcionais aos usuários.
                  </p>
                  <div className="mt-6 flex space-x-4">
                    <a href="https://github.com/henalecam" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">GitHub</span>
                      <img src="/social-icons/github.svg" alt="GitHub" className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/in/henalecam" target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">LinkedIn</span>
                      <img src="/social-icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=5541999155948&text=Ol%C3%A1%2C+Henrique!+Gostaria+de+conversar+sobre+um+projeto."
                       target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">WhatsApp</span>
                      <img src="/social-icons/whatsapp.svg" alt="WhatsApp" className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 