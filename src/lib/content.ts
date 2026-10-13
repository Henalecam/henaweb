export const site = {
  name: 'HenaWeb',
  url: 'https://henaweb.com',
  city: 'Curitiba, PR',
  coords: '25.4284° S · 49.2733° W',
  whatsapp: '5541999155948',
  whatsappDisplay: '+55 41 99915-5948',
  email: 'henrique@henaweb.com',
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/henaweb/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/henaweb/' },
    { name: 'GitHub', href: 'https://github.com/henaweb' },
  ],
};

export const whatsappLink = (text = 'Olá! Quero conversar sobre um projeto com a HenaWeb.') =>
  `https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent(text)}`;

export const nav = [
  { label: 'Capacidades', href: '/#capacidades' },
  { label: 'Setor público', href: '/#govtech' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Studio', href: '/#studio' },
];

export const manifesto =
  'Todo processo confuso esconde um sistema claro. Nosso trabalho é encontrar esse sistema e dar forma a ele: arquitetura feita para durar, telas que se explicam sozinhas e código que a próxima equipe agradece.';

export const capabilities = [
  {
    id: 'I',
    slug: 'sistemas-sob-medida',
    title: 'Sistemas sob medida',
    lead: 'ERPs, plataformas SaaS, painéis e portais internos desenhados em volta do jeito que a sua operação funciona de verdade.',
    tags: ['ERP', 'SaaS', 'Dashboards', 'APIs', 'Integrações', 'Multi-tenant'],
    examples: ['Diconta: ERP contábil multi-CNPJ', 'Dropcota: plataforma de sorteios', 'Scheduly: agenda com IA'],
  },
  {
    id: 'II',
    slug: 'sistemas-publicos',
    title: 'Sistemas públicos',
    lead: 'Plataformas para órgãos e instituições públicas: workflows de aprovação, gestão de verbas e editais, transparência e serviços ao cidadão.',
    tags: ['GovTech', 'eMAG / WCAG', 'LGPD', 'Auditoria', 'gov.br', 'Dados abertos'],
    examples: ['Gestão de projetos e repasse de verbas', 'Workflows de parecer e aprovação', 'Painéis de transparência'],
  },
  {
    id: 'III',
    slug: 'automacao-e-ia',
    title: 'Automação & IA',
    lead: 'Agentes de IA, fluxos em n8n e integrações entre CRM, WhatsApp e banco de dados. O trabalho repetitivo sai das mãos do seu time.',
    tags: ['n8n', 'Agentes de IA', 'WhatsApp', 'CRM', 'Rastreabilidade', 'LLMs'],
    examples: ['Agente de atendimento 24/7 no WhatsApp', 'Captação e follow-up automático de leads', 'Relatórios e dashboards gerados sozinhos'],
  },
  {
    id: 'IV',
    slug: 'sites-e-produtos',
    title: 'Produtos & web',
    lead: 'Sites institucionais, landing pages e design de produto com o mesmo rigor de engenharia que aplicamos aos sistemas.',
    tags: ['Design de produto', 'Sites', 'Landing pages', 'SEO técnico', 'Performance'],
    examples: ['Contacerta: site de escritório contábil', 'Camargo Legal: landing de advocacia', 'NEXT Card: produto financeiro'],
  },
];

export const govPillars = [
  { k: 'Acessibilidade', v: 'eMAG + WCAG 2.2 AA desde o protótipo' },
  { k: 'LGPD by design', v: 'Minimização, consentimento e mascaramento de dados' },
  { k: 'Trilha de auditoria', v: 'Cada ação registrada, versionada e rastreável' },
  { k: 'Workflow', v: 'Pareceres, alçadas e prazos configuráveis' },
  { k: 'Integração', v: 'Login gov.br, SSO e APIs de outros órgãos' },
  { k: 'Transparência', v: 'Painéis públicos e exportação em dados abertos' },
];

export const govFlow = ['Solicitação', 'Análise', 'Parecer', 'Aprovação', 'Execução', 'Resultados'];

export type MockVariant = 'ledger' | 'raffle' | 'insights' | 'calendar' | 'bank' | 'site';

export type Project = {
  name: string;
  kind: string;
  summary: string;
  href: string;
  highlights: string[];
  challenge: string;
  built: string;
  /** full-page desktop capture + mobile capture in /public/cases; falls back to `mock` */
  shot?: { desktop: string; mobile: string; height: number };
  mock?: { variant: MockVariant; hue: number };
};

export const projects: Project[] = [
  {
    name: 'Diconta',
    kind: 'ERP contábil',
    summary: 'ERP para escritórios de contabilidade: financeiro, notas fiscais, documentos, tarefas e indicadores fiscais em um único painel.',
    href: 'https://diconta.vercel.app/dashboard',
    challenge: 'Escritórios contábeis controlam clientes, notas, documentos e obrigações em ferramentas espalhadas.',
    built: 'Um ERP único com financeiro, notas fiscais, documentos, tarefas, multi-CNPJ e histórico de auditoria.',
    highlights: ['Multi-CNPJ', 'Assinatura digital', 'Histórico de auditoria', 'Integrações'],
    shot: { desktop: '/cases/diconta.jpg', mobile: '/cases/diconta-m.jpg', height: 2700 },
  },
  {
    name: 'Scheduly',
    kind: 'Agendamento com IA',
    summary: 'Agendamento em linguagem natural: o cliente diz o que precisa e a IA entende, sugere horários e organiza a agenda.',
    href: 'https://scheduly-eta.vercel.app/',
    challenge: 'Agendar por mensagem vira um vai-e-vem de horários que consome a equipe.',
    built: 'O cliente escreve como fala; a IA entende o pedido, sugere horários livres e confirma sozinha.',
    highlights: ['Linguagem natural', 'Sugestão de horários', 'Painel admin'],
    shot: { desktop: '/cases/scheduly.jpg', mobile: '/cases/scheduly-m.jpg', height: 900 },
  },
  {
    name: 'EcoBrain',
    kind: 'Finanças pessoais + IA',
    summary: 'Gestão financeira pessoal com IA que categoriza transações, prevê gastos e sugere onde economizar.',
    href: 'https://ecobrain.vercel.app/',
    challenge: 'Ninguém mantém a planilha de gastos em dia. E, mesmo em dia, ela não diz o que fazer com o dinheiro.',
    built: 'Categorização automática das transações, previsão de gastos e recomendações geradas por IA.',
    highlights: ['Categorização automática', 'Previsão de gastos', 'Recomendações'],
    shot: { desktop: '/cases/ecobrain.jpg', mobile: '/cases/ecobrain-m.jpg', height: 900 },
  },
  {
    name: 'Dropcota',
    kind: 'Plataforma de sorteios',
    summary: 'Plataforma completa de rifas e sorteios com gestão de participantes, sorteio automatizado e controle de prêmios.',
    href: 'https://dropcota.fun',
    challenge: 'Rifas e sorteios feitos à mão geram desconfiança e muito controle manual.',
    built: 'Plataforma com gestão de participantes, sorteio automatizado e controle de prêmios do começo ao fim.',
    highlights: ['Sorteio automatizado', 'Gestão de participantes', 'Controle de prêmios'],
    mock: { variant: 'raffle', hue: 20 },
  },
  {
    name: 'NEXT Card',
    kind: 'Produto financeiro',
    summary: 'Experiência de cartão digital: narrativa de produto, cartão interativo e jornada de solicitação.',
    href: 'https://fintech-henaweb.vercel.app/',
    challenge: 'Produtos financeiros digitais precisam explicar valor e passar segurança em poucos segundos.',
    built: 'Narrativa de produto, cartão interativo e jornada de solicitação pensada primeiro para o celular.',
    highlights: ['Cartão interativo', 'Jornada de solicitação', 'Mobile-first'],
    shot: { desktop: '/cases/fintech.jpg', mobile: '/cases/fintech-m.jpg', height: 2700 },
  },
  {
    name: 'Contacerta',
    kind: 'Site · Contabilidade',
    summary: 'Site para escritório contábil com diagnóstico gratuito, quiz de qualificação e conteúdo para gerar confiança.',
    href: 'https://contacerta.vercel.app/',
    challenge: 'Escritórios contábeis têm dificuldade de transformar visitas no site em clientes.',
    built: 'Site com diagnóstico gratuito, quiz de qualificação e conteúdo que gera confiança antes do contato.',
    highlights: ['Quiz de qualificação', 'Blog', 'Diagnóstico gratuito'],
    shot: { desktop: '/cases/contacerta.jpg', mobile: '/cases/contacerta-m.jpg', height: 2700 },
  },
  {
    name: 'Camargo Legal',
    kind: 'Site · Advocacia',
    summary: 'Landing de advocacia trabalhista com calculadora de direitos e contato direto pelo WhatsApp.',
    href: 'https://firebase-lawyer-studio.vercel.app/',
    challenge: 'Quem tem um problema trabalhista não sabe se tem direito e acaba desistindo de procurar ajuda.',
    built: 'Landing com calculadora de direitos e contato direto pelo WhatsApp para casos qualificados.',
    highlights: ['Calculadora de direitos', 'WhatsApp', 'Captação de leads'],
    shot: { desktop: '/cases/camargo.jpg', mobile: '/cases/camargo-m.jpg', height: 2700 },
  },
];

export const process = [
  {
    n: 'I',
    title: 'Imersão',
    layer: 'O pão de baixo: a base que segura tudo',
    ingredients: ['Entrevistas com quem usa', 'Mapa do processo', 'Escopo priorizado'],
    deliverable: 'Mapa do processo + escopo priorizado',
    time: '1 a 2 semanas',
    body: 'Entramos na operação: entrevistamos quem usa, mapeamos regras, exceções e gargalos. Saímos com escopo, riscos e prioridades claros.',
  },
  {
    n: 'II',
    title: 'Arquitetura',
    layer: 'A carne: a estrutura do sistema',
    ingredients: ['Modelo de dados', 'Fluxos e permissões', 'Protótipo navegável'],
    deliverable: 'Protótipo navegável + modelo de dados',
    time: '1 a 3 semanas',
    body: 'Modelagem de dados, fluxos e um protótipo navegável. Você valida o sistema antes da primeira linha de código de produção.',
  },
  {
    n: 'III',
    title: 'Construção',
    layer: 'Queijo, alface e tomate: uma camada por sprint',
    ingredients: ['Sprints de 15 dias', 'Testes automatizados', 'Deploy em ambiente real'],
    deliverable: 'Versões funcionando a cada sprint',
    time: 'Sprints quinzenais',
    body: 'Entregas em ambiente real a cada ciclo, com testes, revisão de código e visibilidade total do que está sendo feito.',
  },
  {
    n: 'IV',
    title: 'Evolução',
    layer: 'O pão de cima, com a bandeirinha da próxima versão',
    ingredients: ['Monitoramento', 'Suporte', 'Roadmap de melhorias'],
    deliverable: 'Monitoramento, suporte e roadmap',
    time: 'Contínuo',
    body: 'Lançar é o começo. Acompanhamos o uso, corrigimos rápido e seguimos melhorando o sistema com você.',
  },
];

export const stack = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Ruby on Rails', 'PHP', 'PostgreSQL',
  'MongoDB', 'Docker', 'AWS', 'n8n', 'LLMs', 'Tailwind', 'Three.js',
];

export const facts = [
  { n: '1', l: 'time só, da conversa ao deploy' },
  { n: '15', l: 'dias entre uma entrega e outra' },
  { n: '0', l: 'caixa-preta. Você acompanha tudo' },
];

export const principles = [
  { n: 'I', title: 'Quem desenha, codifica', body: 'A mesma equipe que conversa com você escreve o sistema. Nada se perde entre a reunião e o deploy.' },
  { n: 'II', title: 'Protótipo antes do código', body: 'Você navega pelo sistema antes de ele existir. Errar no protótipo custa horas; errar em produção custa meses.' },
  { n: 'III', title: 'Escopo honesto', body: 'Dizemos o que cabe no prazo e no orçamento, e também o que não cabe. Prioridade clara vale mais que promessa grande.' },
  { n: 'IV', title: 'Feito para durar', body: 'Testes, documentação e observabilidade desde o início, para o sistema continuar saudável depois da entrega.' },
];

export type Symptom = { id: string; label: string; suspect: string; capability: string; firstStep: string };

export const symptoms: Symptom[] = [
  {
    id: 'planilhas',
    label: 'Planilhas que não conversam',
    suspect: 'Dados espalhados em arquivos soltos',
    capability: 'Sistema sob medida',
    firstStep: 'Mapear as planilhas e unificar tudo em um banco de dados com painel próprio.',
  },
  {
    id: 'retrabalho',
    label: 'Retrabalho e copia-e-cola',
    suspect: 'Tarefas manuais repetidas toda semana',
    capability: 'Automação & IA',
    firstStep: 'Automatizar primeiro o fluxo que mais se repete e medir as horas devolvidas ao time.',
  },
  {
    id: 'aprovacao',
    label: 'Aprovações que somem no e-mail',
    suspect: 'Fluxo sem dono e sem rastreio',
    capability: 'Sistema público',
    firstStep: 'Desenhar o fluxo de aprovação com alçadas, prazos e trilha de auditoria.',
  },
  {
    id: 'legado',
    label: 'Sistema legado assombrado',
    suspect: 'Código antigo que ninguém quer tocar',
    capability: 'Sistema sob medida',
    firstStep: 'Diagnóstico técnico e um plano de migração por partes, sem parar a operação.',
  },
  {
    id: 'atendimento',
    label: 'WhatsApp lotado de perguntas repetidas',
    suspect: 'Atendimento sem triagem',
    capability: 'Automação & IA',
    firstStep: 'Um agente de IA que responde o frequente e passa o resto para uma pessoa.',
  },
  {
    id: 'presenca',
    label: 'Site que não traz clientes',
    suspect: 'Presença digital sem estratégia',
    capability: 'Site / produto',
    firstStep: 'Uma página focada em conversão, com medição desde o primeiro dia.',
  },
];

export const projectTypes = ['Sistema sob medida', 'Sistema público', 'Automação & IA', 'Site / produto'];
export const timelines = ['Para ontem', '1 a 3 meses', '3 a 6 meses', 'Sem pressa'];

export const faq = [
  {
    q: 'O que a HenaWeb faz?',
    a: 'Somos um studio de engenharia de software em Curitiba. Desenvolvemos sistemas sob medida, sistemas para o setor público, automações com n8n e IA, e sites e produtos digitais.',
  },
  {
    q: 'Vocês atendem fora de Curitiba?',
    a: 'Sim. Atendemos empresas e órgãos públicos de todo o Brasil e do exterior, com reuniões online e entregas em ambiente real a cada 15 dias.',
  },
  {
    q: 'Como começa um projeto?',
    a: 'Com uma imersão de 1 a 2 semanas: conversamos com quem usa o processo, mapeamos regras e gargalos e saímos com escopo, riscos e prioridades claros.',
  },
  {
    q: 'Quanto custa um sistema sob medida?',
    a: 'Depende do escopo. Depois da imersão você recebe um escopo priorizado com prazo e investimento por etapa, para decidir o que entra primeiro.',
  },
  {
    q: 'Vocês fazem sistemas para prefeituras e órgãos públicos?',
    a: 'Sim. Construímos workflows de aprovação, gestão de verbas e editais e painéis de transparência, com trilha de auditoria, LGPD e acessibilidade eMAG e WCAG.',
  },
  {
    q: 'O código e os dados ficam com a minha empresa?',
    a: 'Sim. Código, banco de dados e documentação são seus, hospedados em uma conta da sua organização.',
  },
];

export const homeFaq = [
  {
    q: 'O que a HenaWeb faz?',
    a: 'Somos um studio de engenharia de software em Curitiba. Projetamos e desenvolvemos sistemas sob medida, sistemas para o setor público, automações com IA e sites, do primeiro protótipo à produção.',
  },
  {
    q: 'Vocês atendem fora de Curitiba?',
    a: 'Sim. Atendemos empresas e órgãos públicos de todo o Brasil e também do exterior, com reuniões remotas e entregas acompanhadas a cada 15 dias.',
  },
  {
    q: 'Quanto custa um sistema sob medida?',
    a: 'Depende do escopo. Começamos com uma imersão e entregamos um escopo priorizado com prazo e investimento por etapa, para você decidir o que entra primeiro.',
  },
  {
    q: 'Em quanto tempo o primeiro resultado aparece?',
    a: 'Em poucas semanas você navega por um protótipo do sistema. Depois disso, a cada 15 dias recebe uma versão funcionando em ambiente real.',
  },
  {
    q: 'O código e os dados ficam com a minha empresa?',
    a: 'Sim. Código, banco de dados e documentação são seus e ficam em contas da sua empresa ou do seu órgão.',
  },
  {
    q: 'Vocês fazem sistemas para prefeituras e órgãos públicos?',
    a: 'Sim. Desenvolvemos workflows de aprovação, gestão de verbas e editais e painéis de transparência, com trilha de auditoria, LGPD e acessibilidade eMAG e WCAG.',
  },
];
