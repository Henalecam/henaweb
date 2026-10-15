/** Landing pages per service. Each one targets a distinct search intent. */

export type ServicePage = {
  slug: string;
  name: string;
  /** <title> (the layout appends "· HenaWeb") */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  h1: string;
  h1Accent: string;
  intro: string;
  problems: string[];
  deliverables: { title: string; body: string }[];
  stack: string[];
  examples: { name: string; href?: string; note: string }[];
  faq: { q: string; a: string }[];
};

export const services: ServicePage[] = [
  {
    slug: 'sistemas-sob-medida',
    name: 'Sistemas sob medida',
    seoTitle: 'Desenvolvimento de sistemas sob medida, ERP e SaaS',
    seoDescription:
      'Desenvolvimento de sistemas web sob medida: ERPs, plataformas SaaS, painéis e portais feitos para o jeito que a sua empresa trabalha. Studio em Curitiba.',
    keywords: ['desenvolvimento de sistemas sob medida', 'sistema web personalizado', 'ERP sob medida', 'desenvolvimento SaaS', 'software house Curitiba', 'sistema para empresas'],
    h1: 'Sistemas sob medida para a sua',
    h1Accent: 'operação.',
    intro:
      'Quando a planilha não dá mais conta e o software de prateleira obriga a empresa a mudar o jeito de trabalhar, é hora de um sistema próprio. Desenhamos e construímos ERPs, plataformas SaaS, painéis e portais internos em volta do seu processo.',
    problems: [
      'Informação espalhada em planilhas, e-mails e grupos de mensagem',
      'Software pronto que exige gambiarras para encaixar no processo',
      'Retrabalho para consolidar dados e gerar relatórios',
      'Sistema antigo que ninguém tem coragem de mexer',
    ],
    deliverables: [
      { title: 'Imersão e escopo', body: 'Mapa do processo, regras de negócio e um escopo priorizado pelo que traz mais resultado primeiro.' },
      { title: 'Protótipo navegável', body: 'Você testa as telas e os fluxos antes da primeira linha de código de produção.' },
      { title: 'Sistema em produção', body: 'Entregas a cada 15 dias em ambiente real, com testes automatizados e revisão de código.' },
      { title: 'Evolução contínua', body: 'Monitoramento, suporte e um roadmap de melhorias depois do lançamento.' },
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Ruby on Rails', 'PHP', 'PostgreSQL', 'Docker', 'AWS'],
    examples: [
      { name: 'Diconta', href: 'https://diconta.vercel.app/dashboard', note: 'ERP contábil com financeiro, notas fiscais, multi-CNPJ e histórico de auditoria.' },
      { name: 'Dropcota', href: 'https://dropcota.fun', note: 'Plataforma de rifas e sorteios com gestão de participantes e sorteio automatizado.' },
      { name: 'Scheduly', href: 'https://scheduly-eta.vercel.app/', note: 'Agendamento em linguagem natural com IA.' },
    ],
    faq: [
      {
        q: 'Quanto custa desenvolver um sistema sob medida?',
        a: 'Depende do escopo. Depois da imersão entregamos um escopo priorizado com prazo e investimento por etapa, para você decidir com clareza o que entra primeiro.',
      },
      {
        q: 'Quanto tempo leva para o sistema ficar pronto?',
        a: 'A imersão e o protótipo levam de 2 a 6 semanas. A partir daí entregamos versões funcionando a cada 15 dias, então você começa a usar partes do sistema antes do fim do projeto.',
      },
      {
        q: 'O código fica com a minha empresa?',
        a: 'Sim. O código, o banco de dados e a documentação são seus, hospedados em uma conta da sua empresa.',
      },
      {
        q: 'Vocês integram com os sistemas que já usamos?',
        a: 'Sim. Integramos via API com ERPs, CRMs, gateways de pagamento, WhatsApp e bancos de dados existentes.',
      },
    ],
  },
  {
    slug: 'sistemas-publicos',
    name: 'Sistemas públicos',
    seoTitle: 'Sistemas para o setor público e GovTech',
    seoDescription:
      'Sistemas para órgãos públicos: workflows de aprovação, gestão de verbas e editais, trilha de auditoria, LGPD, acessibilidade eMAG e WCAG e login gov.br.',
    keywords: ['sistemas para o setor público', 'govtech', 'software para prefeituras', 'sistema para órgão público', 'gestão de verbas e editais', 'acessibilidade eMAG'],
    h1: 'Sistemas públicos com',
    h1Accent: 'padrão de produto.',
    intro:
      'Software público costuma ser lento, confuso e caro de manter. Levamos o rigor de produto para dentro do governo: fluxos claros para o servidor, transparência para o cidadão e rastreabilidade para o controle.',
    problems: [
      'Processos de aprovação que dependem de papel, e-mail e planilha',
      'Dificuldade de prestar contas e responder a órgãos de controle',
      'Sistemas legados sem acessibilidade e difíceis de manter',
      'Dados que não conversam entre secretarias e órgãos',
    ],
    deliverables: [
      { title: 'Workflow configurável', body: 'Solicitação, análise, parecer, aprovação e execução com alçadas, prazos e responsáveis.' },
      { title: 'Trilha de auditoria', body: 'Cada ação registrada, versionada e rastreável, pronta para a prestação de contas.' },
      { title: 'Acessibilidade e LGPD', body: 'eMAG e WCAG 2.2 AA desde o protótipo, minimização e mascaramento de dados pessoais.' },
      { title: 'Integração e transparência', body: 'Login gov.br, SSO, APIs de outros órgãos e painéis públicos com exportação em dados abertos.' },
    ],
    stack: ['PHP', 'Node.js', 'React', 'PostgreSQL', 'Docker', 'gov.br', 'Dados abertos'],
    examples: [
      { name: 'Gestão de projetos e repasse de verbas', note: 'Fluxo completo da solicitação de verba à prestação de resultados, com cada etapa auditável.' },
      { name: 'Workflows de parecer e aprovação', note: 'Alçadas, prazos e assinatura digital no lugar de processos em papel e e-mail.' },
      { name: 'Painéis de transparência', note: 'Indicadores públicos com exportação em formatos abertos.' },
    ],
    faq: [
      {
        q: 'Vocês atendem secretarias, autarquias e universidades públicas?',
        a: 'Sim. Construímos para secretarias, autarquias, universidades públicas, fundações, consórcios e câmaras.',
      },
      {
        q: 'Os sistemas seguem as normas de acessibilidade do governo?',
        a: 'Sim. Trabalhamos com o eMAG e a WCAG 2.2 nível AA desde o protótipo, e não como ajuste no fim do projeto.',
      },
      {
        q: 'Como fica a LGPD?',
        a: 'Aplicamos privacidade desde o desenho: coletamos só o necessário, controlamos o acesso por perfil e mascaramos dados pessoais em telas e relatórios.',
      },
    ],
  },
  {
    slug: 'automacao-e-ia',
    name: 'Automação & IA',
    seoTitle: 'Automação com n8n e agentes de IA para empresas',
    seoDescription:
      'Automação de processos com n8n, agentes de IA e integrações entre CRM, WhatsApp e banco de dados. Menos trabalho repetitivo e cada lead rastreado.',
    keywords: ['automação n8n', 'agente de IA para empresas', 'automação de processos', 'chatbot WhatsApp com IA', 'integração CRM WhatsApp', 'automação de atendimento'],
    h1: 'Automação e IA que devolvem',
    h1Accent: 'horas ao seu time.',
    intro:
      'Copiar dados de um sistema para outro, responder a mesma pergunta cem vezes, montar o mesmo relatório toda segunda. Automatizamos esse trabalho com n8n, agentes de IA e integrações bem feitas, com rastreabilidade do começo ao fim.',
    problems: [
      'WhatsApp lotado de perguntas repetidas',
      'Leads que se perdem entre o anúncio, o CRM e o vendedor',
      'Relatórios montados à mão toda semana',
      'Sistemas que não conversam e exigem copia e cola',
    ],
    deliverables: [
      { title: 'Mapa de automações', body: 'Levantamos os fluxos repetitivos e priorizamos pelo tempo que devolvem ao time.' },
      { title: 'Fluxos em n8n', body: 'Integrações entre CRM, WhatsApp, planilhas, ERPs e bancos de dados, com logs e alertas.' },
      { title: 'Agentes de IA', body: 'Atendimento que responde o frequente e passa o resto para uma pessoa, com contexto.' },
      { title: 'Rastreabilidade', body: 'Cada lead e cada execução registrados, com dashboards para acompanhar resultados.' },
    ],
    stack: ['n8n', 'LLMs', 'WhatsApp API', 'CRM', 'Node.js', 'PostgreSQL', 'Webhooks'],
    examples: [
      { name: 'Agente de atendimento no WhatsApp', note: 'Responde dúvidas frequentes 24 horas e encaminha casos complexos para a equipe.' },
      { name: 'Captação e follow-up de leads', note: 'Do anúncio ao CRM sem perda, com abordagem automática e acompanhamento.' },
      { name: 'Relatórios automáticos', note: 'Dados consolidados e dashboards atualizados sem trabalho manual.' },
    ],
    faq: [
      {
        q: 'O que é o n8n?',
        a: 'É uma plataforma de automação de fluxos que conecta sistemas por API. Pode rodar na nuvem ou em servidor próprio, o que ajuda no controle dos dados.',
      },
      {
        q: 'A IA vai responder meus clientes sozinha?',
        a: 'Ela responde o que é frequente e seguro, e passa para uma pessoa tudo que foge do roteiro. Você define os limites.',
      },
      {
        q: 'Funciona com o CRM que já uso?',
        a: 'Na maioria dos casos, sim. Integramos com CRMs, planilhas e sistemas que tenham API ou exportação de dados.',
      },
    ],
  },
  {
    slug: 'sites-e-produtos',
    name: 'Sites & produtos',
    seoTitle: 'Criação de sites, landing pages e produtos digitais',
    seoDescription:
      'Criação de sites institucionais, landing pages e produtos digitais com design forte, SEO técnico e performance, feitos com rigor de engenharia.',
    keywords: ['criação de sites', 'landing page', 'site institucional', 'design de produto digital', 'SEO técnico', 'site para empresa Curitiba'],
    h1: 'Sites e produtos com',
    h1Accent: 'engenharia de verdade.',
    intro:
      'Um site bonito que não carrega ou não aparece no Google não traz cliente. Criamos sites institucionais, landing pages e produtos digitais com design marcante, SEO técnico e performance desde o primeiro dia.',
    problems: [
      'Site que não traz contatos',
      'Página lenta no celular',
      'Empresa que não aparece nas buscas do Google',
      'Visual que não passa a confiança que o negócio tem',
    ],
    deliverables: [
      { title: 'Estratégia e conteúdo', body: 'Mensagem clara, estrutura de páginas e textos pensados para quem decide a compra.' },
      { title: 'Design de produto', body: 'Identidade visual aplicada, interações e versões para celular e computador.' },
      { title: 'SEO técnico', body: 'Metadados, dados estruturados, sitemap, velocidade e acessibilidade bem feitos.' },
      { title: 'Medição', body: 'Analytics e pixels configurados para saber de onde vem cada contato.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js', 'Vercel'],
    examples: [
      { name: 'Contacerta', href: 'https://contacerta.vercel.app/', note: 'Site de escritório contábil com diagnóstico gratuito e quiz de qualificação.' },
      { name: 'Camargo Legal', href: 'https://firebase-lawyer-studio.vercel.app/', note: 'Landing de advocacia trabalhista com calculadora de direitos.' },
      { name: 'NEXT Card', href: 'https://fintech-henaweb.vercel.app/', note: 'Produto financeiro com cartão interativo e jornada de solicitação.' },
    ],
    faq: [
      {
        q: 'O site vai aparecer no Google?',
        a: 'Entregamos a base técnica completa de SEO: metadados, dados estruturados, sitemap, velocidade e acessibilidade. O posicionamento depende também de conteúdo e tempo, e orientamos você nisso.',
      },
      {
        q: 'Vou conseguir editar o conteúdo?',
        a: 'Sim. Quando faz sentido, conectamos um painel de conteúdo para você atualizar textos, imagens e posts sem depender de nós.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
