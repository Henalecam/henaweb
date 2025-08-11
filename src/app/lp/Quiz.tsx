'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import ScrollAnimation from '../components/ScrollAnimation';

type ServiceKey = 'websites' | 'automation' | 'consulting';

interface QuizProps {
  utmQuery: string; // includes leading &utm_... or empty string
}

interface AnswersState {
  service?: ServiceKey;
  projectType?: string;
  urgency?: 'now' | 'soon' | 'exploring';
  budget?: '1k' | '2k' | 'unknown';
}

function buildWhatsappLink(phone: string, message: string, utmQuery: string) {
  const base = `https://api.whatsapp.com/send?phone=${phone}`;
  const text = encodeURIComponent(message);
  return `${base}&text=${text}${utmQuery}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Quiz({ utmQuery }: QuizProps) {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersState>({});

  const totalSteps = 4;

  function next() {
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function select<K extends keyof AnswersState>(key: K, value: AnswersState[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    next();
  }

  const result = useMemo(() => {
    if (step < totalSteps) return null;

    const { service, projectType, budget } = answers;

    type Recommendation = {
      title: string;
      subtitle: string;
      serviceId: ServiceKey | 'sales';
      features: string[];
      ctaLabel: string;
      message: string;
    };

    const SALES: Recommendation = {
      title: 'Falar com um vendedor',
      subtitle: 'Seu projeto parece exigir um escopo sob medida',
      serviceId: 'sales',
      features: [
        'Diagnóstico gratuito de 15 minutos',
        'Desenho de escopo e roadmap',
        'Orçamento personalizado',
      ],
      ctaLabel: 'Falar com um vendedor',
      message: `Olá! Quero falar com um vendedor sobre um projeto de ${service === 'websites' ? 'Desenvolvimento Web' : service === 'automation' ? 'Automação & IA' : 'Consultoria'}.`,
    };

    // Helper to craft plan rec w/o prices
    const mkRec = (
      svc: ServiceKey,
      tierName: string,
      subtitle: string,
      features: string[],
    ): Recommendation => ({
      title: `${tierName} — ${svc === 'websites' ? 'Desenvolvimento Web' : svc === 'automation' ? 'Automação & IA' : 'Consultoria'}`,
      subtitle,
      serviceId: svc,
      features,
      ctaLabel: 'Quero começar',
      message: `Olá! Quero começar com ${tierName} em ${svc === 'websites' ? 'Desenvolvimento Web' : svc === 'automation' ? 'Automação & IA' : 'Consultoria'}.`,
    });

    // Routing by service and complexity while respecting max R$ 2.000 (no price display)
    if (service === 'websites') {
      if (projectType === 'ecommerce' || projectType === 'custom') {
        return SALES; // complex
      }
      if (projectType === 'institutional') {
        // Intermediário excede 2k; sugerir Essencial como ponto de partida
        return mkRec('websites', 'Essencial', 'Comece com uma landing enxuta e evolua para institucional', [
          'Landing de alta conversão (até 5 seções)',
          'Design responsivo e SEO básico',
          'Integração WhatsApp/Formulário',
        ]);
      }
      // landing
      return mkRec('websites', 'Essencial', 'Ideal para validar ofertas e rodar tráfego', [
        'Landing de alta conversão (até 5 seções)',
        'Design responsivo e SEO básico',
        'Integração WhatsApp/Formulário',
      ]);
    }

    if (service === 'automation') {
      if (projectType === 'multi' || projectType === 'ai_complex') {
        return SALES; // complex
      }
      // tarefa simples
      return mkRec('automation', 'Essencial', 'Automatize uma tarefa e ganhe tempo imediato', [
        'Fluxo simples no/low-code',
        'Integração pontual entre sistemas',
        'Monitoramento básico',
      ]);
    }

    if (service === 'consulting') {
      if (projectType === 'package8h') {
        return SALES; // acima de 2k
      }
      if (projectType === 'package4h') {
        // 4h é viável (< 2k)
        return mkRec('consulting', 'Pro (4h)', 'Sessões focadas para avançar com segurança', [
          'Pacote de 4 horas',
          'Revisão de arquitetura/código',
          'Relatório de recomendações',
        ]);
      }
      // diagnóstico
      return mkRec('consulting', 'Essencial (1h)', 'Diagnóstico para direcionar decisões rápidas', [
        'Sessão de até 1h',
        'Checklist de melhorias',
        'Plano de ação inicial',
      ]);
    }

    return SALES;
  }, [answers, step, totalSteps]);

  const phone = '5541991559480';

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 opacity-50 blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-fuchsia-400/20 to-cyan-400/20" />
      </div>
      <ScrollAnimation>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 backdrop-blur dark:bg-indigo-400/10 dark:text-indigo-200 dark:ring-indigo-400/30">
            <span>Responda em menos de 30s</span>
          </div>
          <h3 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-secondary-900 dark:text-white">
            Descubra o plano ideal para seu projeto
          </h3>
          <p className="mt-3 text-base sm:text-lg text-secondary-600 dark:text-secondary-300">
            Sem exibir valores — mostramos a melhor rota e conectamos você rapidamente.
          </p>
        </div>
      </ScrollAnimation>

      {/* Progress */}
      <div className="mt-8">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary-200/80 dark:bg-secondary-700">
          <motion.div
            className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-white/20 mix-blend-overlay" />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-400">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-6 rounded-full px-3 inline-flex items-center justify-center border text-[11px] ${i < step ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/70 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 border-secondary-200 dark:border-secondary-700'}`}
              >
                Etapa {i + 1}
              </div>
            ))}
          </div>
          <span>
            {Math.min(step, totalSteps)} / {totalSteps}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step-0" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-2xl font-semibold">O que você precisa agora? 🧩</h4>
                <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-300">Escolha um serviço.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('service', 'websites')} className="group rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">
                    <div className="text-left">
                      <div className="text-base font-semibold">Desenvolvimento Web 🌐</div>
                      <div className="mt-1 text-xs text-secondary-600 dark:text-secondary-400">Sites e landing pages</div>
                    </div>
                  </button>
                  <button onClick={() => select('service', 'automation')} className="group rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">
                    <div className="text-left">
                      <div className="text-base font-semibold">Automação & IA 🤖</div>
                      <div className="mt-1 text-xs text-secondary-600 dark:text-secondary-400">Fluxos e integrações</div>
                    </div>
                  </button>
                  <button onClick={() => select('service', 'consulting')} className="group rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">
                    <div className="text-left">
                      <div className="text-base font-semibold">Consultoria Técnica 🧠</div>
                      <div className="mt-1 text-xs text-secondary-600 dark:text-secondary-400">Sessões e revisão</div>
                    </div>
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 1 && answers.service === 'websites' && (
            <motion.div key="step-1-web" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-xl font-semibold">Qual tipo de projeto web? 🌐</h4>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('projectType', 'landing')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Landing page</button>
                  <button onClick={() => select('projectType', 'institutional')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Site institucional</button>
                  <button onClick={() => select('projectType', 'ecommerce')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">E-commerce / App sob medida</button>
                </div>
                <div className="mt-4">
                  <button onClick={prev} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Voltar</button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 1 && answers.service === 'automation' && (
            <motion.div key="step-1-auto" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-xl font-semibold">O que deseja automatizar? ⚙️</h4>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('projectType', 'simple')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Tarefa simples</button>
                  <button onClick={() => select('projectType', 'multi')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Fluxos multi-etapas</button>
                  <button onClick={() => select('projectType', 'ai_complex')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Integração complexa com IA</button>
                </div>
                <div className="mt-4">
                  <button onClick={prev} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Voltar</button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 1 && answers.service === 'consulting' && (
            <motion.div key="step-1-cons" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-xl font-semibold">Qual modalidade de consultoria? 🎯</h4>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('projectType', 'diagnostic')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Diagnóstico (1h)</button>
                  <button onClick={() => select('projectType', 'package4h')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Pacote 4h</button>
                  <button onClick={() => select('projectType', 'package8h')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Pacote 8h</button>
                </div>
                <div className="mt-4">
                  <button onClick={prev} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Voltar</button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-2" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-xl font-semibold">Qual a urgência? ⏱️</h4>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('urgency', 'now')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Para esta semana</button>
                  <button onClick={() => select('urgency', 'soon')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Em 2–4 semanas</button>
                  <button onClick={() => select('urgency', 'exploring')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Estou explorando</button>
                </div>
                <div className="mt-4">
                  <button onClick={prev} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Voltar</button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step-3" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 sm:p-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60 shadow-soft">
                <h4 className="text-xl font-semibold">Tem uma faixa de orçamento em mente?</h4>
                <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-300">Se não souber ainda, tudo bem.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => select('budget', '1k')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Até R$ 1.000</button>
                  <button onClick={() => select('budget', '2k')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Até R$ 2.000</button>
                  <button onClick={() => select('budget', 'unknown')} className="rounded-xl border border-secondary-200 dark:border-secondary-700 p-4 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition shadow-sm hover:shadow">Não sei ainda</button>
                </div>
                <div className="mt-4">
                  <button onClick={prev} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Voltar</button>
                </div>
              </Card>
            </motion.div>
          )}

          {step >= totalSteps && result && (
            <motion.div key="result" variants={fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-0 overflow-hidden shadow-soft">
                <div className="relative">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/15 via-fuchsia-600/15 to-cyan-600/15" />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-400/10 dark:text-indigo-200 dark:ring-indigo-400/30">Recomendado</span>
                    </div>
                    <h4 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">{result.title}</h4>
                    <p className="mt-1 text-secondary-600 dark:text-secondary-300">{result.subtitle}</p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-secondary-700 dark:text-secondary-200">
                      {result.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a
                        href={buildWhatsappLink(phone, result.message, utmQuery)}
                        className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-soft hover:shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
                      >
                        {result.ctaLabel}
                      </a>
                      <a
                        href={buildWhatsappLink(phone, 'Olá! Gostaria de tirar dúvidas rápidas sobre o melhor plano para mim.', utmQuery)}
                        className="inline-flex items-center justify-center rounded-lg bg-secondary-100 px-5 py-3 text-base font-semibold text-secondary-800 ring-1 ring-secondary-200 hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-100 dark:ring-secondary-700"
                      >
                        Tirar dúvidas
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="mt-4 text-center">
                <button onClick={() => { setStep(0); setAnswers({}); }} className="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-200">Refazer quiz</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}