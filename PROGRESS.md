# Progress

Stato di avanzamento del portfolio, per fasi. Aggiornato a ogni fase conclusa.
(Il modello dei contenuti è documentato a parte in [`CONTENT.md`](./CONTENT.md).)

## Fase 0 — Setup, design system, deploy ✅

- Next.js 16 (App Router) + TypeScript + TailwindCSS v4.
- Design system dark, accento cyan, come token in `app/globals.css` (`@theme`).
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

## Fase 2 — Layout / navigazione 🔜

Home vera, header/footer definitivi, routing verso le sezioni. Liste
progetti/interessi in forma base. (Dettaglio ricco + rendering markdown + filtri = Fase 3.)

## Fase 3 — Pagine dettaglio + filtri

Rendering markdown completo dei progetti, pagine dettaglio, filtri per tag/status/categoria.

## Fase 4 — Contenuti reali

Riscrittura `palestra.md` e aggiunta contenuti veri (progetti + interessi).
