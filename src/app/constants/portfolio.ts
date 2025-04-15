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
    description: 'Site moderno para pizzaria gourmet, com design responsivo e interface intuitiva. Cardápio digital interativo que destaca a qualidade dos produtos e proporciona uma experiência gastronômica única aos clientes.',
    link: 'https://slight-homeowners-556639.framer.app/',
    image: '/portfolio/dom-martiello.png',
    category: 'sites',
  },
  {
    name: 'Hac Landing Page',
    description: 'Landing page profissional com design minimalista e alta taxa de conversão. Desenvolvida com foco em performance e experiência do usuário, utilizando as mais recentes tecnologias web.',
    link: 'https://satisfied-guidance-466745.framer.app/',
    image: '/portfolio/hac.png',
    category: 'sites',
  },
  {
    name: 'Veneza',
    description: 'Site elegante para restaurante fine dining, com cardápio digital sofisticado. Design clean que reflete a exclusividade do estabelecimento, proporcionando uma experiência digital refinada aos clientes.',
    link: 'https://empowered-emojis-921453.framer.app/',
    image: '/portfolio/veneza.png',
    category: 'sites',
  },
  {
    name: "Camargo Leal",
    description: "Landing page especializada para advocacia trabalhista, com design profissional e estratégia focada em captação de leads. Interface moderna que transmite confiança e autoridade, ideal para conectar o escritório com potenciais clientes.",
    link: "https://firebase-lawyer-studio.vercel.app/",
    image: "/portfolio/lawyer-camargo.png",
    category: "sites",
  },
  {
    name: 'Diconta',
    description: 'Sistema ERP completo para escritórios de contabilidade, desenvolvido para otimizar a gestão financeira, cálculos tributários e relatórios contábeis. Interface intuitiva que simplifica processos complexos e aumenta a produtividade da equipe.',
    link: 'https://diconta.vercel.app/dashboard',
    image: '/portfolio/diconta.png',
    category: 'systems',
  },
  {
    name: 'Agente de IA para Atendimento ao Cliente',
    description: 'Solução avançada de atendimento automatizado que utiliza Inteligência Artificial para oferecer suporte 24/7. Capaz de entender contexto, resolver problemas e escalar conforme necessário.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: 'Coleta de Leads via Google',
    description: 'Automação inteligente que mapeia e identifica potenciais clientes através do Google Maps, analisando dados de localização e perfil de negócios para gerar leads qualificados.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: 'Abordagem de Leads Automatizada',
    description: 'Sistema automatizado de nurturing que personaliza a comunicação com leads baseado em comportamento e interesses, aumentando significativamente as taxas de conversão.',
    link: '#',
    image: '/portfolio/automation.svg',
    category: 'automations',
  },
  {
    name: "Boas-Vindas e Onboarding",
    description: "Automação que personaliza a jornada inicial do cliente, enviando conteúdo relevante e instruções no momento certo. Aumenta o engajamento e reduz o tempo de adaptação do usuário.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Recuperação de Carrinho Abandonado",
    description: "Sistema inteligente que monitora e recupera vendas perdidas, com sequência automatizada de e-mails personalizados e ofertas especiais para reconquistar clientes indecisos.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Solicitação e Gestão de Feedback",
    description: "Automatização completa do processo de coleta e análise de feedback, com gatilhos inteligentes para solicitar avaliações e sistema de gestão de reputação integrado.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Geração de Relatórios e Dashboards",
    description: "Automação que transforma dados brutos em insights acionáveis, gerando relatórios personalizados e dashboards interativos para tomada de decisão baseada em dados.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Recuperação de Leads",
    description: "Sistema automatizado que identifica e reengaja leads inativos através de campanhas personalizadas, utilizando análise comportamental para maximizar as chances de conversão.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  },
  {
    name: "Segmentação Dinâmica de Clientes",
    description: "Automação que categoriza clientes em tempo real com base em comportamento e interações, permitindo comunicação altamente personalizada e ofertas direcionadas.",
    link: "#",
    image: "/portfolio/automation.svg",
    category: "automations",
  }
];