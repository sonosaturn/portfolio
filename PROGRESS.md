# Progress

Stato di avanzamento del portfolio, per fasi. Aggiornato a ogni fase conclusa.
(Il modello dei contenuti è documentato a parte in [`CONTENT.md`](./CONTENT.md).)

## Fase 0 — Setup, design system, deploy ✅

- Next.js 16 (App Router) + TypeScript + TailwindCSS v4.
- Design system dark, accento amber desaturato (era cyan), come token in `app/globals.css` (`@theme`).
- Root layout con header/footer minimali; home placeholder.
- Repo GitHub `sonosaturn/portfolio`, deploy Vercel con auto-deploy su push a `main`.
- Live: https://portfolio-navy-eight-65.vercel.app

## Fase 1 — Architettura contenuti ✅

- `content/projects/*.md` e `content/interests/*.md` (markdown + frontmatter, no CMS/DB).
- Schemi Zod in `lib/content.ts` = fonte di verità (validazione runtime + tipi TS).
- Frontmatter strict (anti-typo, agent-friendly); slug = nome file.
- Loader `getAll*` / `get*BySlug` con sort per data e filtri; errori chiari per `.md` malformati.
- Contenuti di prova: `cittadella` (project), `palestra` (interest, segnaposto).
- Verifica: `npm run check:content`. Schemi documentati in `CONTENT.md`.

## Fase 2 — Layout / navigazione ✅

Home vera, header/footer definitivi, routing verso le sezioni. Liste
progetti/interessi in forma base.

## Fase 3 — Sezione progetti (dettaglio + filtri + contenuti reali) ✅

- Lista `/projects`: griglia di card con filtri client per **status** e **tag**
  (combinabili); conteggio con singolare/plurale corretto (`lib/format.ts`).
- Card arricchite: tag, stack, badge status (wip=amber / completed=teal), link demo/code.
- Dettaglio `/projects/[slug]`: rendering markdown completo (`react-markdown` + GFM +
  `rehype-highlight`), syntax highlighting e `.prose` on-palette, cover se presente.
- Contenuti reali: `cittadella`, `wasatext`, `jpokebattle`, `autobrain`, `dotfiles`
  (featured: cittadella, wasatext, autobrain).
- Fix Instagram reale in `lib/site.ts`.

## Fase 4 — Sezione interessi ✅

Specchio della Fase 3 per `/interests`, riusando i componenti:
- Lista `/interests`: griglia di card con filtro client per **categoria**
  (`InterestsExplorer`); conteggio voce/voci corretto. `Chip` estratta e condivisa
  con i progetti; label categoria centralizzate in `lib/labels.ts`.
- Card interessi con tag (parità con le card progetti).
- Dettaglio `/interests/[slug]`: rendering markdown completo (stesso `Markdown`),
  categoria + data + tag + cover se presente.
- Sezione marcata **work in progress**: gli articoli veri arriveranno con la
  fase 2.0 (automazione contenuti). `palestra.md` resta segnaposto.
