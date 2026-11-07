/**
 * "Passa tempo": side projects Henrique builds in his spare time, each on its own subdomain.
 * Only facts we know go here (name, address, whether it is a game); each one opens in a new tab.
 */
export type Pastime = {
  slug: string;
  name: string;
  url: string;
  /** the button's verb: games are played, everything else is opened */
  action: 'Jogar' | 'Abrir';
  /** cabinet colours: screen gradient and accent */
  from: string;
  to: string;
  accent: string;
};

export const pastimes: Pastime[] = [
  { slug: 'fortrex', name: 'Fortrex', url: 'https://fortrex.henaweb.com', action: 'Jogar', from: '#3b0a1e', to: '#f7931e', accent: '#ffb347' },
  { slug: 'arena', name: 'Arena', url: 'https://arena.henaweb.com', action: 'Jogar', from: '#120626', to: '#3cc6b4', accent: '#01cdfe' },
  { slug: 'forno', name: 'Forno', url: 'https://forno.henaweb.com', action: 'Abrir', from: '#2a1300', to: '#e3b44f', accent: '#f9e27d' },
];
