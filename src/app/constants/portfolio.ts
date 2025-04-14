export type PortfolioItem = {
  name: string;
  description: string;
  link: string;
  image: string;
  category: 'sites' | 'systems' | 'automations';
};

export const portfolioItems: PortfolioItem[] = [
  {
    name: 'Dom Martiello',
    description: 'Nesse site temos uma pizzaria com um cardápio extremamente irresistível, com uma interface moderna e responsiva.Cada detalhe preparado com muito cuidado para que o cliente se sinta em casa.',
    link: 'https://slight-homeowners-556639.framer.app/',
    image: '/portfolio/dom-martiello.png',
    category: 'sites',
  },
  {
    name: 'Hac Landing Page',
    description: 'Uma simples landing page feito em uma página só que eu mesmo usava antes da criação deste em que está sendo publicado.',
    link: 'https://satisfied-guidance-466745.framer.app/',
    image: '/portfolio/hac.png',
    category: 'sites',
  },
  {
    name: 'Veneza',
    description: 'Um cardápio para um restaurante que preza pelo simples, com um cardápio mais simples e focado em um público mais requintado. O site foi feito em uma página só, com um menu de navegação e um cardápio com todos os produtos disponíveis.',
    link: 'https://empowered-emojis-921453.framer.app/',
    image: '/portfolio/veneza.png',
    category: 'sites',
  },
  {
    name: "Lawyer Studio",
    description: "Landing page for lawyers, modern design, professional and focused on capturing leads.",
    link: "https://firebase-lawyer-studio.vercel.app/",
    image: "/portfolio/lawyer-camargo.png",
    category: "sites",

  },
  {
    name: 'Sistema Exemplo 2',
    description: 'Descrição do sistema exemplo 2.',
    link: 'https://sistema2.com',
    image: '/portfolio/dom-martiello.png',
    category: 'systems',
  },
  {
    name: 'Agente de IA para Atendimento ao Cliente',
    description:
      'atendimento ao cliente, onde um agente de IA responde aos clientes de forma autônoma, fornecendo suporte e informações de maneira eficiente.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: 'Coleta de Leads via Google',
    description:
      'Automação para busca de leads através do Google, identificando todos os comércios na região selecionada, facilitando a prospecção e o alcance de novos clientes.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: 'Abordagem de Leads Automatizada',
    description:
      'Automação que realiza a abordagem inicial dos leads coletados, engajando potenciais clientes de forma automática e personalizada.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: "Boas-Vindas e Onboarding",
    description:
      "Melhora a experiência inicial do cliente. Envia e-mail de boas-vindas personalizado e pode acionar sequências de onboarding. Adiciona clientes a segmentos específicos.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Recuperação de Carrinho Abandonado",
    description:
      "Recupera vendas perdidas no e-commerce. Envia e-mails de lembrete quando clientes não finalizam a compra, podendo incluir descontos e incentivos.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Solicitação e Gestão de Feedback",
    description:
      "Simplifica a coleta e gestão de feedback. Após uma compra, envia e-mail solicitando avaliação e pode alertar a equipe ou publicar feedbacks positivos.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Geração de Relatórios e Dashboards",
    description:
      "Cria e distribui relatórios e dashboards de negócios. Coleta dados de várias fontes e gera relatórios periódicos para as partes interessadas.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Recuperação de Leads",
    description:
      "Reengaja leads que esfriaram. Rastreia interações e aciona esforços de divulgação personalizados, como e-mails e ofertas, para reconquistar esses leads.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Segmentação Dinâmica de Clientes",
    description:
      "Segmenta clientes dinamicamente, monitorando suas ações. Atualiza segmentos para campanhas direcionadas, ofertas personalizadas ou mensagens customizadas.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
];