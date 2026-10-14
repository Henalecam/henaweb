# HenaWeb — v2

Site institucional da HenaWeb, studio de engenharia de software (sistemas sob medida, sistemas públicos, automação & IA).

## Identidade

**Museu assombrado vaporwave**: céu de pôr do sol com sol listrado e chão de grade neon nas seções escuras, papel creme com retícula nas claras, janelas Windows 95, contorno grosso + sombra dura de desenho dos anos 70 em cards e botões, e personagens próprios: Davi de corpo inteiro como o medroso da turma (`DavidToon`), o fantasma de lanterna (`Phantom`) e a van (`Van`), que aparecem no caso, no hambúrguer e na perseguição do rodapé (`Chase`). Paleta e utilitários (`.sky`, `.sun`, `.grid-floor`, `.win`, `.toon`, `.tape`, `.chrome`, `.paper`, `.checker`) em `src/app/globals.css`.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (tokens em `src/app/globals.css`)
- **GSAP 3** (ScrollTrigger + SplitText) e **Lenis** para scroll suave
- **Three.js** — Davi de Michelangelo em meio-tom (`src/lib/davidScene.ts`): campo de fluxo + busto iluminado como mármore renderizados em baixa resolução e desenhados como pontos, com separação RGB e glitch. O olhar segue o cursor e a estátua acompanha o scroll do hero ao manifesto (`src/components/DavidStage.tsx`).
- Modelo em `public/models/detective.glb` (442 KB, meshopt + quantização)
- Seção **O Caso do Sistema Assombrado** (`src/components/Mystery.tsx`): homenagem original aos desenhos de mistério dos anos 70 — ilustração SVG própria, sem nomes, personagens ou marcas de terceiros.
- **Processo como hambúrguer** (`src/components/Process.tsx`): cada etapa derruba uma camada no sanduíche ao rolar.
- **Abra um caso** (`src/components/Contact.tsx`): sintomas → diagnóstico preliminar ao vivo, enviado junto com o briefing.
- **Resend** para o formulário de contato (`src/app/api/contact/route.ts`)

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `RESEND_API_KEY` | Envio do briefing por e-mail (sem ela a API responde 503) |
| `CONTACT_TO` | Destino dos briefings (padrão: henrique@henaweb.com) |
| `CONTACT_FROM` | Remetente, ex.: `HenaWeb <site@henaweb.com>` (domínio verificado no Resend). Sem ela usa `onboarding@resend.dev`, que só entrega para o dono da conta Resend |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (opcional) |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (opcional) |

O Meta Pixel está fixo em `src/app/layout.tsx` e dispara `Lead` quando o formulário é enviado.

## Conteúdo

Todo o texto, projetos, processo e trajetória ficam em `src/lib/content.ts`.
As rotas antigas (`/sobre`, `/servicos`, `/portfolio`, `/contato`) redirecionam para as âncoras da home (`next.config.ts`).

## Acessibilidade e performance

- `prefers-reduced-motion`: desliga Lenis, animações de scroll e renderiza o shader em um único quadro.
- Sem JavaScript o conteúdo continua visível (preloader escondido via `<noscript>`).
- Cursor customizado só em dispositivos com ponteiro fino.
