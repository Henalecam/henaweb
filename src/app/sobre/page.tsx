import Image from 'next/image';
import { Section, SectionHeader } from '../components/ui/Section';
import { values } from '../constants';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main>
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
              Nosso Fundador
            </h2>
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Bio Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all">
              <div className="md:flex">
                <div className="relative w-full md:w-1/3 aspect-square bg-gray-100 dark:bg-gray-900">
                  <Image
                    src="/team/henrique.png"
                    alt="Henrique Alexandre de Camargo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Henrique Alexandre de Camargo
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mt-1 font-semibold text-lg">
                    Dev. Fullstack Sênior & Especialista em Automação
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-md">
                    Com mais de 4 anos atuando na engenharia de software corporativa, construo aplicações web inteligentes 
                    e arquiteturas escaláveis. Minha expertise se estende por <strong className="text-blue-600 dark:text-blue-400 font-semibold">Ruby on Rails, Node.js, PHP, React e AWS</strong>. 
                    Sou apaixonado por transformar ideias complexas — desde sistemas de ERP com renderização 3D a automações multicanal com n8n — 
                    em soluções limpas e que verdadeiramente geram valor para as empresas.
                  </p>
                  <div className="mt-8 flex space-x-5">
                    <a href="https://github.com/henalecam" target="_blank" rel="noopener noreferrer" 
                       className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <span className="sr-only">GitHub</span>
                      <img src="/social-icons/github.svg" alt="GitHub" className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/in/henalecam" target="_blank" rel="noopener noreferrer"
                       className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <img src="/social-icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=5541999155948&text=Ol%C3%A1%2C+Henrique!+Quero+transformar+meu+neg%C3%B3cio+digital."
                       target="_blank" rel="noopener noreferrer"
                       className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <span className="sr-only">WhatsApp</span>
                      <img src="/social-icons/whatsapp.svg" alt="WhatsApp" className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Experience */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
                Trajetória Profissional
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-300 dark:before:via-blue-900 before:to-transparent">
                
                {/* Exp 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-600 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 md:group-odd:text-right">
                    <div className="flex flex-col md:group-odd:items-end">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">2025 - Presente</span>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">Dev. Fullstack Sênior (PHP)</h4>
                      <p className="text-sm text-gray-500 font-medium">Governo do Paraná (SETI)</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                      Desenvolvimento end-to-end de um sistema completo de gestão de projetos universitários, controlando desde solicitações de verbas e aprovações até os resultados finais.
                    </p>
                  </div>
                </div>

                {/* Exp 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-500 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 md:group-odd:text-right">
                    <div className="flex flex-col md:group-odd:items-end">
                      <span className="text-blue-500 dark:text-blue-400 font-bold">2025 - Presente</span>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">Especialista em Automação (n8n)</h4>
                      <p className="text-sm text-gray-500 font-medium">Katsuki</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                      Implementação de fluxos de automação hiper-personalizados para o mercado imobiliário. Rastreabilidade completa de leads com n8n, integrando CRMs avançados e dashboards.
                    </p>
                  </div>
                </div>

                {/* Exp 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-400 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 md:group-odd:text-right">
                    <div className="flex flex-col md:group-odd:items-end">
                      <span className="text-blue-400 font-bold">2024 - 2025</span>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">Dev. Fullstack Pleno (Ruby)</h4>
                      <p className="text-sm text-gray-500 font-medium">AvantSoft (EUA)</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                      Criação de ERP para indústria de mármore. Desenvolvimento de módulos vitais para otimização de corte de peças e ferramentas interativas para visualização 3D e precificação instantânea.
                    </p>
                  </div>
                </div>

                {/* Exp 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-300 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 md:group-odd:text-right">
                    <div className="flex flex-col md:group-odd:items-end">
                      <span className="text-blue-400 font-bold">2023 - 2024</span>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">Dev. Fullstack Pleno (Node.js)</h4>
                      <p className="text-sm text-gray-500 font-medium">Novi Sistemas</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                      Desenvolvimento de features para tracking de manufatura logística e integrações diretas entre e-commerces B2C gigantes como Shopify, Amazon e Mercado Livre.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Education */}
            <div className="mt-16 bg-blue-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-blue-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Educação e Especializações</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-white">Ciência da Computação</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">Estácio de Sá</p>
                  <p className="text-gray-500 text-xs mt-2">2022 - 2026</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-white">Web Programming</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">CS50 Harvard</p>
                  <p className="text-gray-500 text-xs mt-2">2022 - 2023</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-white">Ignite React.js</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">Rocketseat</p>
                  <p className="text-gray-500 text-xs mt-2">2020 - 2022</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
} 