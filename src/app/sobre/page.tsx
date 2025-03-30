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
                    src="/images/team/henrique.jpg"
                    alt="Henrique Silva"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Henrique Silva
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mt-1">
                    Desenvolvedor Full Stack
                  </p>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Especializado em desenvolvimento web moderno, com foco em React, Next.js e tecnologias JavaScript/TypeScript.
                    Apaixonado por criar soluções elegantes e eficientes que proporcionam experiências excepcionais aos usuários.
                  </p>
                  <div className="mt-6 flex space-x-4">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
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