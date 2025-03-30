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
];

export const services = [
  {
    id: 'websites',
    title: 'Desenvolvimento Web',
    description: 'Criação de websites modernos e responsivos com as melhores tecnologias do mercado.',
    icon: WebsiteIcon,
    features: [
      'Sites institucionais',
      'E-commerce',
      'Landing pages',
      'Aplicações web personalizadas'
    ]
  },
  {
    id: 'automation',
    title: 'Automação',
    description: 'Automatização de processos e desenvolvimento de bots para aumentar a eficiência do seu negócio.',
    icon: BotIcon,
    features: [
      'Bots personalizados',
      'Automação de processos',
      'Integração de sistemas',
      'Otimização de fluxos de trabalho'
    ]
  },
  {
    id: 'consulting',
    title: 'Consultoria Técnica',
    description: 'Consultoria especializada em desenvolvimento e arquitetura de software.',
    icon: ConsultingIcon,
    features: [
      'Análise de arquitetura',
      'Revisão de código',
      'Otimização de performance',
      'Melhores práticas'
    ]
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
    title: 'Inovação',
    description: 'Buscamos constantemente novas tecnologias e metodologias para oferecer soluções modernas e eficientes. Mantemos-nos atualizados com as últimas tendências do mercado para garantir resultados excepcionais.',
    icon: InnovationIcon
  },
  {
    title: 'Qualidade',
    description: 'Comprometimento com a excelência em cada linha de código. Seguimos as melhores práticas de desenvolvimento, realizamos testes rigorosos e garantimos a manutenibilidade dos projetos.',
    icon: QualityIcon
  },
  {
    title: 'Compromisso',
    description: 'Dedicação total ao sucesso dos projetos, mantendo comunicação transparente e cumprindo prazos. Tratamos cada projeto como único, garantindo atenção personalizada às necessidades específicas.',
    icon: CommitmentIcon
  }
];

export const testimonials = [
  {
    name: 'Rodrigo',
    role: 'CEO',
    company: 'Empresa ABC',
    content: 'A HenaWeb superou todas as nossas expectativas. O profissionalismo e qualidade do trabalho são excepcionais.',
    image: '/testimonials/joao.jpg'
  },
  {
    name: 'Pedro',
    role: 'Diretor de Marketing',
    company: 'Empresa XYZ',
    content: 'Excelente experiência de trabalho. Entregas pontuais e comunicação clara durante todo o processo.',
    image: '/testimonials/pedro.jpg'
  },
  {
    name: 'Maria',
    role: 'Gerente de Projetos',
    company: 'Empresa DEF',
    content: 'A HenaWeb foi fundamental para o sucesso do nosso projeto. O desenvolvimento foi rápido e de alta qualidade.',
    image: '/testimonials/maria.jpg'
  }
]; 