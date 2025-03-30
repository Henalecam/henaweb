import {
  WebsiteIcon,
  BotIcon,
  ConsultingIcon,
  InnovationIcon,
  QualityIcon,
  CommitmentIcon,
} from './icons';

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const services = [
  {
    id: 'website-creation',
    title: 'Website Creation',
    description: 'We develop professional and responsive websites that represent your brand and achieve your business goals.',
    features: [
      'Modern and responsive design',
      'SEO optimization',
      'Social media integration',
      'Custom admin panel',
      'Ongoing technical support'
    ],
    icon: WebsiteIcon
  },
  {
    id: 'bot-automation',
    title: 'Bot Automation',
    description: 'We create intelligent bots that automate processes, improve customer service, and increase operational efficiency.',
    features: [
      'Customer service bots',
      'Internal process automation',
      'Integration with existing systems',
      'Data analysis and reporting',
      'Maintenance and support'
    ],
    icon: BotIcon
  },
  {
    id: 'digital-consulting',
    title: 'Digital Consulting',
    description: 'We offer specialized consulting to help your company in digital transformation and implementation of technological solutions.',
    features: [
      'Analysis of current processes',
      'Digital strategic planning',
      'Solution implementation',
      'Team training',
      'Continuous monitoring'
    ],
    icon: ConsultingIcon
  }
];

export const team = [
  {
    name: 'Henrique Alexandre de Camargo',
    role: 'Founder & Full Stack Developer',
    image: '/team/henrique.jpg',
    bio: 'Web development and automation specialist with over 5 years of experience in creating innovative digital solutions.'
  }
];

export const values = [
  {
    title: 'Innovation',
    description: 'Always seeking the best technologies and solutions for our clients.',
    icon: InnovationIcon
  },
  {
    title: 'Quality',
    description: 'Commitment to excellence in every project we undertake.',
    icon: QualityIcon
  },
  {
    title: 'Commitment',
    description: 'Total dedication to the success of our clients and their projects.',
    icon: CommitmentIcon
  }
];

export const testimonials = [
  {
    content: "A HenaWeb transformou completamente nossa presença online. O site ficou incrível e a automação que implementaram economiza muito tempo para nossa equipe.",
    author: "João Silva",
    role: "CEO, Tech Solutions",
    image: "/testimonials/joao.jpg"
  },
  {
    content: "Profissionais muito competentes e atenciosos. O bot de atendimento que desenvolveram para nossa empresa melhorou significativamente o atendimento aos clientes.",
    author: "Maria Santos",
    role: "Diretora de Marketing, Digital Store",
    image: "/testimonials/maria.jpg"
  },
  {
    content: "Excelente trabalho na criação do nosso site. Além de bonito e responsivo, é muito fácil de gerenciar. Recomendo fortemente!",
    author: "Pedro Oliveira",
    role: "Proprietário, Boutique Digital",
    image: "/testimonials/pedro.jpg"
  }
]; 