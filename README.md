# portfolio

Il mio sito personale: progetti (informatica) e interessi, scritti in chiaro.
Tema warm dark, palette amber desaturato.

**Live:** https://portfolio-navy-eight-65.vercel.app

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS v4** (design system a token in `app/globals.css`)
- Contenuti **markdown-in-repo** (niente CMS, niente DB) validati con **Zod**
- Rendering markdown: `react-markdown` + `remark-gfm` + `rehype-highlight`
- Deploy su **Vercel** (auto-deploy a ogni push su `main`)

## Struttura

```
app/                 # route (App Router): home, /projects, /interests + [slug]
  opengraph-image.tsx  # anteprima social generata (next/og)
  sitemap.ts, robots.ts, icon.svg
components/           # Header, Footer, card, explorer con filtri, Markdown, Chip
content/
  projects/<slug>.md   # i progetti
  interests/<slug>.md  # gli interessi
lib/
  content.ts         # schemi Zod (fonte di verità) + loader tipizzato
  site.ts            # metadata sito, social, URL di produzione
  format.ts, labels.ts, og.tsx
scripts/
  check-content.ts   # gate: valida tutti i .md  →  npm run check:content
  shot.mjs           # screenshot Playwright per check visivi
```

## Sviluppo

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # build di produzione
npm run check:content  # valida i contenuti (frontmatter + slug)
```

## Aggiungere un contenuto

> Questa è anche la **doc per il futuro sistema di agenti**: aggiungere un
> contenuto = creare **un file** `.md` e aprire una PR. Nessun codice da toccare.

1. Crea un file in `content/projects/<slug>.md` (o `content/interests/<slug>.md`).
   Il **nome file deve combaciare** con il campo `slug` del frontmatter.
2. Compila il frontmatter YAML. I campi ammessi e i loro tipi sono documentati,
   con esempi, in **[`CONTENT.md`](./CONTENT.md)** — la fonte di verità è lo
   schema Zod in [`lib/content.ts`](./lib/content.ts).
3. Scrivi il corpo in Markdown libero (titoli, liste, tabelle, blocchi di codice
   con syntax highlighting: sono già stilizzati).
4. Verifica con `npm run check:content`.

La pagina compare da sola: entra nella lista (con filtri per tag/status o
categoria), ottiene la sua pagina di dettaglio `/{sezione}/<slug>`, la sua
anteprima social e la voce in sitemap.

### Perché è a prova di agente

Gli schemi sono **strict**: un campo sconosciuto (un refuso tipo `githbub`), un
tipo sbagliato o uno slug che non combacia col nome file fanno **fallire la
build con un errore chiaro** che indica file e campo. Meglio un errore in fase
di build che una pagina renderizzata male.

Esempio minimo (progetto):

```markdown
---
title: Nome progetto
slug: nome-progetto        # = nome file (nome-progetto.md)
date: 2026-06-25           # YYYY-MM-DD, ordina le liste
status: wip                # wip | completed
summary: Una o due righe per l'anteprima.
tags: [web, ai]            # opzionale, filtrabile
stack: [Next.js, Go]       # opzionale
links:                     # opzionale (solo demo/github/other, URL validi)
  github: https://github.com/...
featured: true             # opzionale, in evidenza in home
---

Corpo in **Markdown** libero.
```

## Deploy

Push su `main` → Vercel builda e pubblica. Se colleghi un dominio custom,
aggiorna `site.url` in [`lib/site.ts`](./lib/site.ts) (base per canonical, OG e
sitemap).
