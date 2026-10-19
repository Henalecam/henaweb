/** "Quanto custa um sistema sob medida?" → "quanto-custa-um-sistema-sob-medida" (for anchor ids). */
export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');

export const faqId = (question: string) => `pergunta-${slugify(question)}`;
