/**
 * Contact details, WhatsApp link builder and the main nav: the only parts of the content that every page's
 * client code needs (header, footer, floating button). Kept apart from content.ts so those components
 * don't ship the whole site copy (cases, symptoms, FAQ…) to the browser; content.ts re-exports them.
 */
export const site = {
  name: 'HenaWeb',
  legalName: 'Henaweb Ltda',
  /** Shown in the footer (and the Organization JSON-LD) once filled in, e.g. '00.000.000/0001-00'. */
  cnpj: '',
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
  { label: 'Clientes', href: '/#clientes' },
  { label: 'Capacidades', href: '/#capacidades' },
  { label: 'Setor público', href: '/#govtech' },
  // one entry for the cases: the home section, which links on to the full /casos archive
  { label: 'Casos', href: '/#projetos' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Studio', href: '/#studio' },
];
