import {
  WebsiteIcon,
  BotIcon,
  ConsultingIcon,
  InnovationIcon,
  QualityIcon,
  CommitmentIcon,
} from './icons';

export const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Contato', href: '/contato' },
  { name: 'Portfólio', href: '/portfolio'}
];

export const services = [
  {
    id: 'websites',
    title: 'Desenvolvimento Web Premium',
    description: 'Criamos experiências digitais que não apenas impressionam, mas que transformam visitantes em clientes fiéis. Nossos sites são verdadeiras obras-primas tecnológicas que combinam design elegante com performance excepcional.',
    icon: WebsiteIcon,
    features: [
      'Sites institucionais que contam sua história de forma envolvente',
      'E-commerce otimizado para maximizar conversões e vendas',
      'Landing pages que convertem visitantes em leads qualificados',
      'Aplicações web personalizadas que revolucionam sua operação'
    ],
    image: '/services/websites.svg'
  },
  {
    id: 'automation',
    title: 'Automação Inteligente & IA',
    description: 'Liberte seu time de tarefas repetitivas com soluções de automação que não apenas economizam tempo, mas que também aprendem e evoluem com seu negócio. Transforme processos manuais em fluxos de trabalho inteligentes.',
    icon: BotIcon,
    features: [
      'Bots inteligentes que aprendem e se adaptam ao seu negócio',
      'Automação de processos que reduzem custos em até 60%',
      'Integração perfeita entre sistemas para operações mais eficientes',
      'Otimização de operações com IA e machine learning de ponta'
    ],
    image: '/services/automation.svg'
  },
  {
    id: 'consulting',
    title: 'Consultoria Estratégica Digital',
    description: 'Nossa consultoria vai além do código - é uma parceria estratégica que ajuda sua empresa a navegar no mundo digital com confiança e visão de futuro. Transformamos desafios em oportunidades de crescimento.',
    icon: ConsultingIcon,
    features: [
      'Análise profunda de arquitetura e performance para otimização máxima',
      'Revisão de código com foco em segurança e escalabilidade',
      'Otimização de performance que impressiona seus usuários',
      'Implementação das melhores práticas do mercado para resultados excepcionais'
    ],
    image: '/services/consulting.svg'
  }
];

export const values = [
  {
    title: 'Inovação Constante',
    description: 'Estamos sempre na vanguarda da tecnologia, explorando novas possibilidades e soluções que podem revolucionar seu negócio. Nossa busca por inovação é incessante, garantindo que você sempre esteja à frente da concorrência.',
    icon: InnovationIcon
  },
  {
    title: 'Excelência em Qualidade',
    description: 'Cada linha de código que escrevemos é uma promessa de qualidade. Nossos padrões são excepcionais, nossos testes são rigorosos, e nossa dedicação à excelência é inabalável. O resultado? Software que não apenas funciona, mas que se destaca.',
    icon: QualityIcon
  },
  {
    title: 'Compromisso Total',
    description: 'Seu sucesso é nossa prioridade número um. Trabalhamos lado a lado com você, mantendo uma comunicação transparente e entregando resultados que superam expectativas. Nossa dedicação ao seu projeto é pessoal e apaixonada.',
    icon: CommitmentIcon
  }
];

export const testimonials = [
  {
    name: 'Rodrigo Silva',
    role: 'CEO',
    company: 'TechStart Brasil',
    content: 'A HenaWeb não apenas construiu nosso site - eles transformaram nossa presença digital. O resultado foi além do que imaginávamos: um aumento de 150% no engajamento dos usuários e 80% mais conversões. A expertise e dedicação da equipe são impressionantes.',
    image: '/testimonials/rodrigo.jpg'
  },
  {
    name: 'Pedro Santos',
    role: 'Diretor de Marketing',
    company: 'E-commerce Plus',
    content: 'A parceria com a HenaWeb foi um divisor de águas para nosso e-commerce. A automação inteligente que implementaram reduziu nossos custos operacionais em 40% e aumentou a satisfação dos clientes. A comunicação transparente e o profissionalismo fizeram toda a diferença.',
    image: '/testimonials/pedro.jpg'
  },
  {
    name: 'Maria Oliveira',
    role: 'Gerente de Projetos',
    company: 'Inovação Digital',
    content: 'O que mais me impressionou foi a capacidade da HenaWeb de entender profundamente nossas necessidades e transformá-las em soluções tecnológicas elegantes. O projeto foi entregue antes do prazo e com uma qualidade excepcional. São verdadeiros parceiros estratégicos.',
    image: '/testimonials/maria.jpg'
  }
];

export const projects = [
  {
    id: 1,
    title: 'Dom Martiello',
    description: 'Nesse site temos uma pizzaria com um cardápio extremamente irresistível, com uma interface moderna e responsiva.Cada detalhe preparado com muito cuidado para que o cliente se sinta em casa.',
    image: '/portfolio/dom-martiello.png',
    link: 'https://slight-homeowners-556639.framer.app/'
  },
  {
    id: 2,
    title: 'Hac Landing Page',
    description: 'Uma simples landing page feito em uma página só que eu mesmo usava antes da criação deste em que está sendo publicado.',
    image: '/portfolio/hac.png',
    link: 'https://satisfied-guidance-466745.framer.app/'
  },
  {
    id: 3,
    title: 'Veneza',
    description: 'Um cardápio para um restaurante que preza pelo simples, com um cardápio mais simples e focado em um público mais requintado. O site foi feito em uma página só, com um menu de navegação e um cardápio com todos os produtos disponíveis.',
    image: '/portfolio/veneza.png',
    link: 'https://empowered-emojis-921453.framer.app/'
  }
]; 