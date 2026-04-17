import Sites from './components/Sites';
import Sistemas from './components/Sistemas';
import Automations from './components/Automations';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative bg-blue-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Portfólio
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Conheça um pouco mais sobre os meus projetos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Curriculo e Perfil Secao */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8 transform transition-all hover:shadow-xl">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Henrique Alexandre de Camargo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Fundador da HenaWeb & Desenvolvedor Full Stack Sênior. Com mais de 4 anos de experiência construindo sistemas escaláveis, arquiteturas complexas e automações inteligentes com Node.js, Ruby on Rails, PHP e o ecossistema React.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/Henrique A - P.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Baixar Currículo
              </a>
              <a 
                href="https://linkedin.com/in/henalecam" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <img src="/social-icons/linkedin.svg" className="w-5 h-5 mr-2" alt="LinkedIn Icon" />
                Meu LinkedIn
              </a>
            </div>
          </div>
        </section>
        <section id="sites" className="mb-12">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-1 md:gap-8">
            <Sites />
          </div>
        </section>
        <section id="sistemas" className="mb-12">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-1 md:gap-8">
            <Sistemas />
          </div>
        </section>
        <section id="automacoes" className="mb-12">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-1 md:gap-8">
            <Automations />
          </div>
        </section>
      </div>
    </div>
  );
}