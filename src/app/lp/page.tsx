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
      <Section className="relative isolate pt-24 sm:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
        <AnimatedBackground />
        <div className="max-w-4xl text-center mx-auto">
          <ScrollAnimation>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-white/20">
              Novidade: prazos reduzidos para LPS — 5 a 10 dias úteis
            </span>
          </ScrollAnimation>
          <ScrollAnimation delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white">
              Encontre seu plano ideal em segundos
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="mt-4 text-indigo-100 text-lg">
              Responda um quiz rápido. Sem preços na tela — mostramos a melhor rota e conectamos você.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50"
              >
                Começar o quiz
              </a>
              <TrackedCta href={buildWhatsappLink(
                "Olá! Vim da landing e quero um diagnóstico rápido.",
                utmQuery
              )}>
                Falar no WhatsApp agora
              </TrackedCta>
            </div>
          </ScrollAnimation>
          <p className="mt-3 text-xs text-indigo-100/80">
            Sem compromisso. Resposta em até 24h úteis.
          </p>
        </div>
        {/* Sticky CTA Mobile */}
        <div className="fixed inset-x-0 bottom-0 z-40 bg-indigo-700/90 backdrop-blur supports-[backdrop-filter]:bg-indigo-700/60 p-3 sm:hidden">
          <a
            href="#quiz"
            className="inline-flex w-full items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-semibold text-indigo-700 shadow-sm"
          >
            Começar o quiz
          </a>
        </div>
      </Section>

      {/* Benefícios/Serviços rápidos */}
      <Section variant="dark">
        <SectionHeader
          title="O que podemos fazer por você"
          description="Serviços com foco em conversão e eficiência operacional"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <ScrollAnimation key={svc.id}>
              <Card className="h-full">
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

      {/* Quiz de recomendação */}
      <Section id="quiz">
        <Quiz utmQuery={utmQuery} />
      </Section>

      {/* FAQ/CTA final */}
      <Section variant="dark">
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
          <Card className="h-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                Garanta prioridade esta semana
              </h3>
              <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                Vagas limitadas para novos projetos. Fale agora e receba um diagnóstico inicial gratuito.
              </p>
              <a
                href={buildWhatsappLink(
                  "Olá! Vim da landing e quero prioridade para iniciar esta semana.",
                  utmQuery
                )}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Falar agora no WhatsApp
              </a>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}