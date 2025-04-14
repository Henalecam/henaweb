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