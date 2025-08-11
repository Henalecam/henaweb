import type { Metadata } from "next";
import { services } from "../constants";
import { Section, SectionHeader } from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import Link from "next/link";
import dynamic from "next/dynamic";

const ScrollAnimation = dynamic(() => import("../components/ScrollAnimation"), { ssr: false });
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { ssr: false });
const TrackedCta = dynamic(() => import("./TrackedCta"), { ssr: false });
const Quiz = dynamic(() => import("./Quiz"), { ssr: false });
const BackToTop = dynamic(() => import("../components/back-to-top/BackToTop"), { ssr: false });
const Testimonials = dynamic(() => import("../components/Testimonials"), { ssr: false });

export const metadata: Metadata = {
  title: "Planos e Serviços – HenaWeb | Landing",
  description:
    "Escolha o plano ideal para seu projeto: Websites, Automação/IA e Consultoria com valores por nível de complexidade. Fale agora no WhatsApp e comece hoje.",
  alternates: { canonical: "/lp" },
};

const WHATSAPP_NUMBER = "5541991559480";

function buildUtmQueryString(searchParams: { [key: string]: string | string[] | undefined }) {
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const entries = keys
    .map((k) => (searchParams[k] ? `${k}=${encodeURIComponent(String(searchParams[k]))}` : null))
    .filter(Boolean) as string[];
  return entries.length ? `&${entries.join("&")}` : "";
}

function buildWhatsappLink(message: string, utmQuery: string) {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;
  const text = encodeURIComponent(message);
  return `${base}&text=${text}${utmQuery}`;
}

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Serviços HenaWeb",
    description: "Desenvolvimento Web, Automação/IA e Consultoria",
    provider: { "@type": "Organization", name: "HenaWeb" },
    areaServed: "Brazil",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

export default function LandingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const utmQuery = buildUtmQueryString(searchParams);

  return (
    <main className="bg-white dark:bg-secondary-900">
      <JsonLd />
      {/* Hero de Conversão */}
      <Section className="relative isolate pt-20 sm:pt-28 pb-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500">
        <AnimatedBackground />
        <div className="max-w-4xl text-center mx-auto">
          <ScrollAnimation>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-indigo-50 ring-1 ring-white/20">
              ✨ Novidade: prazos reduzidos para LPS — 5 a 10 dias úteis
            </span>
          </ScrollAnimation>
          <ScrollAnimation delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Encontre seu plano ideal em segundos ⚡
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="mt-3 text-indigo-50 text-base sm:text-lg max-w-2xl mx-auto">
              Responda um quiz rápido. Sem preços na tela — indicamos a melhor rota para seu contexto e conectamos você a um especialista.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3}>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-base font-semibold text-indigo-700 shadow-soft hover:bg-indigo-50 w-full sm:w-auto"
                aria-label="Começar o quiz de recomendação"
              >
                🚀 Começar o quiz
              </a>
              <TrackedCta
                href={buildWhatsappLink(
                  "Olá! Vim da landing e quero um diagnóstico rápido.",
                  utmQuery
                )}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-white shadow-soft hover:bg-emerald-600 w-full sm:w-auto"
              >
                💬 Falar no WhatsApp agora
              </TrackedCta>
            </div>
          </ScrollAnimation>
          <p className="mt-2 text-xs text-indigo-50/90">
            ⏱️ Sem compromisso. Resposta em até 24h úteis.
          </p>

          {/* Indicador para rolar */}
          <ScrollAnimation delay={0.45}>
            <div className="mt-8 hidden sm:flex flex-col items-center gap-2 text-indigo-50/90">
              <span className="text-xs">Desça para saber mais</span>
              <svg className="w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </ScrollAnimation>
        </div>
        {/* Sticky CTA Mobile */}
        <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden">
          <div className="mx-3 mb-3 rounded-2xl bg-white/90 p-2 shadow-2xl ring-1 ring-indigo-100 backdrop-blur">
            <div className="flex gap-2">
              <a
                href="#quiz"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-indigo-700"
              >
                🚀 Quiz
              </a>
              <a
                href={buildWhatsappLink(
                  "Olá! Vim da landing e quero um diagnóstico rápido.",
                  utmQuery
                )}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-emerald-600"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Social proof / métricas */}
      <Section variant="dark" className="py-10 sm:py-16">
        <ScrollAnimation>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-secondary-900 dark:text-white">📈 150%</div>
              <div className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">aumento médio de engajamento</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-secondary-900 dark:text-white">💡 40%</div>
              <div className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">redução de custos com automação</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-secondary-900 dark:text-white">🚀 +100</div>
              <div className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">projetos e diagnósticos entregues</div>
            </div>
          </div>
        </ScrollAnimation>
      </Section>

      {/* Benefícios/Serviços rápidos - Mobile carrossel + Grid desktop */}
      <Section variant="dark" className="pt-10 sm:pt-16">
        <SectionHeader
          title="O que podemos fazer por você"
          description="Serviços com foco em conversão e eficiência operacional"
        />
        {/* Mobile: carrossel horizontal com snap */}
        <div className="mt-6 md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
          {services.map((svc) => (
            <ScrollAnimation key={svc.id} className="snap-center shrink-0 min-w-[85%]">
              <Card className="h-full shadow-soft">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {svc.icon && (
                      <div className="text-indigo-600 dark:text-indigo-400">
                        <svc.icon />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-secondary-900 dark:text-white">
                        {svc.title}
                      </h3>
                      <p className="mt-1 text-secondary-600 dark:text-secondary-400 text-sm">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-secondary-600 dark:text-secondary-300">
                    {svc.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
        {/* Desktop: grid tradicional */}
        <div className="mt-12 hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <ScrollAnimation key={svc.id}>
              <Card className="h-full shadow-soft">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {svc.icon && (
                      <div className="text-indigo-600 dark:text-indigo-400">
                        <svc.icon />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                        {svc.title}
                      </h3>
                      <p className="mt-2 text-secondary-600 dark:text-secondary-400 text-sm">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-secondary-600 dark:text-secondary-300">
                    {svc.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </Section>

      {/* Como funciona */}
      <Section className="pt-10 sm:pt-16">
        <SectionHeader
          title="Como vamos do diagnóstico à entrega 🧭"
          description="Um caminho claro para sair da ideia e chegar ao resultado com previsibilidade"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Diagnóstico rápido',
              desc: 'Entendemos o momento do seu negócio e traçamos o plano ideal para avançar sem desperdícios.'
            },
            {
              step: '2',
              title: 'Protótipo & validação',
              desc: 'Iteramos com você em versões leves para validar cedo e acelerar a entrega final.'
            },
            {
              step: '3',
              title: 'Entrega com impacto',
              desc: 'Publicação assistida, acompanhamento e melhoria contínua focados em resultado.'
            }
          ].map((item) => (
            <ScrollAnimation key={item.step}>
              <Card className="h-full shadow-soft">
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-soft">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold text-secondary-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-secondary-600 dark:text-secondary-300 text-sm">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
        <ScrollAnimation delay={0.1}>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href="#quiz"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-soft hover:bg-indigo-700 w-full sm:w-auto"
            >
              🚀 Começar agora
            </a>
            <TrackedCta href={buildWhatsappLink(
              "Olá! Quero entender qual o melhor caminho para meu projeto.",
              utmQuery
            )} className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-white shadow-soft hover:bg-emerald-600 w-full sm:w-auto">
              💬 Falar com especialista
            </TrackedCta>
          </div>
        </ScrollAnimation>
      </Section>

      {/* Quiz de recomendação */}
      <Section
        id="quiz"
        className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-cyan-50 dark:from-secondary-900 dark:via-secondary-900/90 dark:to-secondary-800"
      >
        <AnimatedBackground />
        <Quiz utmQuery={utmQuery} />
      </Section>

      {/* Depoimentos */}
      <Section variant="dark" className="pt-10 sm:pt-16">
        <Testimonials />
      </Section>

      {/* FAQ/CTA final */}
      <Section variant="dark" className="pt-10 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <SectionHeader title="Perguntas frequentes" />
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-white">
                  Como funciona o orçamento?
                </h4>
                <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                  Após o quiz, direcionamos você para a melhor rota e enviamos uma proposta personalizada conforme seu contexto.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-white">
                  Qual o prazo de entrega?
                </h4>
                <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                  Landing pages costumam sair entre 5–10 dias úteis. Projetos maiores variam conforme escopo.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-white">
                  Como funciona o pagamento?
                </h4>
                <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                  50% na aprovação e 50% na entrega. Para consultoria, cobramos por pacote de horas.
                </p>
              </div>
            </div>
          </div>
          <Card className="h-full shadow-soft">
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                Garanta prioridade esta semana 🔥
              </h3>
              <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                Vagas limitadas para novos projetos. Fale agora e receba um diagnóstico inicial gratuito.
              </p>
              <a
                href={buildWhatsappLink(
                  "Olá! Vim da landing e quero prioridade para iniciar esta semana.",
                  utmQuery
                )}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-soft hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                💬 Falar agora no WhatsApp
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* Botão flutuante de voltar ao topo */}
      <BackToTop />
    </main>
  );
}