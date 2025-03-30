'use client';

import { Button } from './ui/Button';
import Container from './ui/Container';

export default function Hero() {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.1),transparent_50%)]"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(30,64,175,0.08),transparent_50%)]"></div>
      </div>

      <Container className="relative z-10">
        <div className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                <span className="block text-gray-900 dark:text-white mb-2">Transforme seu negócio</span>
                <span className="block text-blue-600 dark:text-blue-500">com soluções digitais</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Desenvolvimento de sites profissionais e automação inteligente para otimizar seus processos e aumentar sua produtividade.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  href="/contato"
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Solicite uma Consultoria
                </Button>
                <Button
                  href="/servicos"
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-900/50"
                >
                  Nossos Serviços
                </Button>
              </div>
            </div>
            
            {/* Decorative illustration */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent dark:from-blue-600/10 rounded-3xl"></div>
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-grid-gray-900/[0.03] dark:bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-transparent dark:from-blue-600/20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 