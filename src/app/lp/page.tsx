import type { Metadata } from "next";
import { services } from "../constants";
import { Section, SectionHeader } from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Planos e Serviços – HenaWeb | Landing",
  description:
    "Escolha o plano ideal para seu projeto: Websites, Automação/IA e Consultoria com valores por nível de complexidade. Fale agora no WhatsApp e comece hoje.",
};

const WHATSAPP_NUMBER = "5541991559480";

type DifficultyTier = "Básico" | "Intermediário" | "Avançado";

interface PricingTier {
  difficulty: DifficultyTier;
  priceBRL: number; // preço base em BRL
  features: string[];
  note?: string;
}

interface ServicePricing {
  serviceId: string;
  title: string;
  tiers: PricingTier[];
}

const pricingTable: ServicePricing[] = [
  {
    serviceId: "websites",
    title: "Desenvolvimento Web",
    tiers: [
      {
        difficulty: "Básico",
        priceBRL: 1490,
        features: [
          "Landing page única (até 5 sessões)",
          "Design responsivo",
          "SEO básico",
          "Integração WhatsApp/Formulário",
        ],
        note: "Ideal para campanhas de tráfego e validação de oferta",
      },
      {
        difficulty: "Intermediário",
        priceBRL: 3490,
        features: [
          "Site institucional (até 5 páginas)",
          "Blog básico",
          "Otimização de performance",
          "Integrações (Analytics, Pixel, e-mail)",
        ],
      },
      {
        difficulty: "Avançado",
        priceBRL: 7990,
        features: [
          "E-commerce ou app web sob medida",
          "Checkout/assinaturas",
          "Infra/SEO avançados",
          "Componentes personalizados",
        ],
      },
    ],
  },
  {
    serviceId: "automation",
    title: "Automação & IA",
    tiers: [
      {
        difficulty: "Básico",
        priceBRL: 990,
        features: [
          "Automação simples (no-code/low-code)",
          "Integração 1→1 (ex.: planilha → e-mail)",
          "Monitoramento básico",
        ],
      },
      {
        difficulty: "Intermediário",
        priceBRL: 2990,
        features: [
          "Fluxos multi-etapas",
          "Integração entre 2–3 sistemas",
          "Rotinas programadas",
        ],
      },
      {
        difficulty: "Avançado",
        priceBRL: 6990,
        features: [
          "Pipelines complexos com IA",
          "Integração APIs/DB",
          "Observabilidade e logs",
        ],
      },
    ],
  },
  {
    serviceId: "consulting",
    title: "Consultoria Técnica",
    tiers: [
      {
        difficulty: "Básico",
        priceBRL: 490,
        features: [
          "Diagnóstico pontual",
          "Sessão até 1h",
          "Checklist de melhorias",
        ],
        note: "Valor por sessão",
      },
      {
        difficulty: "Intermediário",
        priceBRL: 1490,
        features: [
          "Pacote de 4 horas",
          "Revisão de arquitetura/código",
          "Relatório de recomendações",
        ],
      },
      {
        difficulty: "Avançado",
        priceBRL: 2990,
        features: [
          "Pacote de 8 horas",
          "Suporte na implementação",
          "Acompanhamento assíncrono",
        ],
      },
    ],
  },
];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

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

export default function LandingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const utmQuery = buildUtmQueryString(searchParams);

  return (
    <main className="bg-white dark:bg-secondary-900">
      {/* Hero de Conversão */}
      <Section className="pt-20 sm:pt-28 pb-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Tenha um site que vende e automações que economizam tempo
          </h1>
          <p className="mt-4 text-indigo-100 text-lg">
            Planos sob medida para sua necessidade: escolha o nível de complexidade e comece hoje mesmo.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={buildWhatsappLink(
                "Olá! Vim da landing e quero um orçamento.",
                utmQuery
              )}
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50"
            >
              Falar no WhatsApp agora
            </a>
            <Link
              href={`/contato${utmQuery ? `?${utmQuery.slice(1)}` : ""}`}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-500/20 px-5 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/40 hover:bg-indigo-500/30"
            >
              Ver opções de contato
            </Link>
          </div>
          <p className="mt-3 text-xs text-indigo-100/80">
            Sem compromisso. Resposta em até 24h úteis.
          </p>
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
            <Card key={svc.id} className="h-full">
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
          ))}
        </div>
      </Section>

      {/* Tabela de preços por dificuldade */}
      <Section>
        <SectionHeader
          title="Planos por nível de complexidade"
          description="Valores de referência — personalizados após entendermos seu contexto."
        />

        <div className="mt-12 space-y-16">
          {pricingTable.map((group) => (
            <div key={group.serviceId}>
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
                {group.title}
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.tiers.map((tier) => {
                  const message = `Olá! Tenho interesse no serviço: ${group.title} — Plano ${tier.difficulty} (${formatBRL(
                    tier.priceBRL
                  )}). Podemos conversar?`;
                  const wa = buildWhatsappLink(message, utmQuery);

                  return (
                    <Card key={tier.difficulty} variant="hover" className="h-full">
                      <div className="p-6">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {tier.difficulty}
                          </span>
                          <span className="text-xs text-secondary-500 dark:text-secondary-400">
                            a partir de
                          </span>
                        </div>
                        <div className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white">
                          {formatBRL(tier.priceBRL)}
                        </div>
                        {tier.note && (
                          <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                            {tier.note}
                          </p>
                        )}
                        <ul className="mt-6 space-y-2 text-sm text-secondary-600 dark:text-secondary-300">
                          {tier.features.map((f, i) => (
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
                        <div className="mt-6 flex gap-3">
                          <a
                            href={wa}
                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
                          >
                            Quero este plano
                          </a>
                          <Link
                            href={`/contato${utmQuery ? `?${utmQuery.slice(1)}` : ""}`}
                            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-200 hover:bg-primary-50 dark:text-primary-300 dark:ring-primary-900/50 dark:hover:bg-primary-950/30"
                          >
                            Falar depois
                          </Link>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Garantia/FAQ/CTA final */}
      <Section variant="dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <SectionHeader title="Perguntas frequentes" />
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-white">
                  Os valores são fixos?
                </h4>
                <p className="mt-2 text-secondary-600 dark:text-secondary-300">
                  São referências. Após entendermos seu objetivo, enviamos uma proposta personalizada com escopo e prazo.
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