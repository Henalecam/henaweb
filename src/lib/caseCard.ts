/** Renders the "ficha do caso" as a 1080x1350 PNG, ready to download or share. */

export type CaseCardData = {
  caseNo: string;
  symptoms: string[];
  suspect: string;
  capability: string;
  firstStep: string;
  timeline: string;
  /** name · company, when typed in the form */
  client?: string;
};

const INK = '#140a26';

const fontOf = (cssVar: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return v ? `${v}, ${fallback}` : fallback;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderCaseCard(d: CaseCardData): Promise<Blob> {
  await document.fonts.ready;
  const groovy = fontOf('--font-shrikhand', 'Georgia, serif');
  const sans = fontOf('--font-geist', 'system-ui, sans-serif');
  const mono = fontOf('--font-geist-mono', 'monospace');
  const serif = fontOf('--font-instrument', 'Georgia, serif');

  const W = 1080;
  const H = 1350;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;

  // night background with a sunset glow
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#140c2e');
  bg.addColorStop(1, '#2b1a58');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, 700);
  glow.addColorStop(0, 'rgba(60,198,180,0.35)');
  glow.addColorStop(1, 'rgba(60,198,180,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // the file card: hard shadow + outline
  const x = 80;
  const y = 120;
  const w = W - 160;
  const h = H - 260;
  ctx.fillStyle = INK;
  ctx.fillRect(x + 16, y + 16, w, h);
  ctx.fillStyle = '#fdf3e1';
  ctx.fillRect(x, y, w, h);
  ctx.lineWidth = 8;
  ctx.strokeStyle = INK;
  ctx.strokeRect(x, y, w, h);

  // tab
  ctx.fillStyle = '#f7931e';
  ctx.fillRect(x, y, w, 96);
  ctx.strokeRect(x, y, w, 96);
  ctx.fillStyle = INK;
  ctx.font = `700 30px ${mono}`;
  ctx.textBaseline = 'middle';
  ctx.fillText(`FICHA DO CASO Nº ${d.caseNo}`, x + 40, y + 50);
  ctx.textAlign = 'left';

  // the rubber stamp sits across the tab's edge, top right: lower down it landed on the text of a full
  // file (every symptom ticked wraps the first step into the stamp's spot)
  ctx.save();
  ctx.translate(x + w - 200, y + 100);
  ctx.rotate(-0.12);
  ctx.fillStyle = '#fdf3e1';
  ctx.fillRect(-165, -40, 330, 80);
  ctx.strokeStyle = '#d7263d';
  ctx.lineWidth = 7;
  ctx.strokeRect(-165, -40, 330, 80);
  ctx.fillStyle = '#d7263d';
  ctx.font = `700 32px ${mono}`;
  ctx.textAlign = 'center';
  ctx.fillText('EM INVESTIGAÇÃO', 0, 3);
  ctx.restore();

  // a long list of symptoms tightens the whole file up so it still fits the card
  const many = d.symptoms.length > 3;
  const gap = many ? 18 : 30;
  let cy = y + 170;
  const label = (t: string) => {
    ctx.font = `700 24px ${mono}`;
    ctx.fillStyle = 'rgba(20,10,38,0.55)';
    ctx.fillText(t.toUpperCase(), x + 50, cy);
    ctx.fillStyle = INK;
    cy += 46;
  };

  label('Suspeito principal');
  ctx.font = `${many ? 56 : 64}px ${groovy}`;
  ctx.fillStyle = '#c2410c';
  for (const l of wrap(ctx, d.suspect, w - 100)) {
    ctx.fillText(l, x + 50, cy + 10);
    cy += many ? 62 : 72;
  }
  cy += gap;

  label('Sintomas relatados');
  ctx.font = `${many ? 30 : 34}px ${sans}`;
  ctx.fillStyle = INK;
  for (const s of d.symptoms) {
    ctx.fillText(`✓  ${s}`, x + 50, cy);
    cy += many ? 42 : 50;
  }
  cy += gap;

  label('Especialidade indicada');
  ctx.font = `600 ${many ? 34 : 40}px ${sans}`;
  // two or three specialties used to run off the card in one line
  for (const l of wrap(ctx, d.capability, w - 100)) {
    ctx.fillText(l, x + 50, cy);
    cy += many ? 44 : 50;
  }
  cy += gap;

  label('Primeira diligência');
  ctx.font = `italic ${many ? 38 : 44}px ${serif}`;
  for (const l of wrap(ctx, d.firstStep, w - 100)) {
    ctx.fillText(l, x + 50, cy);
    cy += many ? 46 : 54;
  }
  cy += many ? 10 : 20;
  label(`Prazo desejado: ${d.timeline}`);
  // the label line doesn't wrap: a long name · company is cut to fit the card's width
  if (d.client) label(`Cliente: ${d.client.length > 46 ? `${d.client.slice(0, 45)}…` : d.client}`);

  // footer
  ctx.fillStyle = '#f7931e';
  ctx.font = `56px ${groovy}`;
  ctx.textAlign = 'left';
  ctx.fillText('HenaWeb', 80, H - 70);
  ctx.fillStyle = '#fdf3e1';
  ctx.font = `24px ${mono}`;
  ctx.textAlign = 'right';
  ctx.fillText(`henaweb.com · ${new Date().toLocaleDateString('pt-BR')}`, W - 80, H - 86);
  ctx.fillText('mistérios resolvidos sob medida', W - 80, H - 52);

  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/png'));
}

/** Shares the card on phones that support files in the Web Share API; downloads it otherwise. */
export async function shareOrDownload(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  // share sheet only on phones; on a computer a direct download is what people expect
  if (window.matchMedia('(pointer: coarse)').matches && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: 'Ficha do caso · HenaWeb' });
      return;
    } catch {
      return; // the person closed the share sheet
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
