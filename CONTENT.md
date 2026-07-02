# Modello dei contenuti

I contenuti del sito sono file Markdown con frontmatter YAML, versionati nel
repo — niente CMS, niente database. Uno per file. Pensato per essere scritto a
mano **e** generato da agenti (che aggiungono un `.md` e aprono una PR).

```
content/
  projects/<slug>.md    → i miei progetti
  interests/<slug>.md   → interessi (palestra, gaming, musica, ...)
```

**Regole valide per entrambi i tipi:**

- Il nome file **deve** essere `<slug>.md` e combaciare con il campo `slug` del
  frontmatter. Disallineamento → errore.
- Solo i campi elencati qui sotto sono ammessi: un campo sconosciuto (es. un
  refuso `githbub`) fa **fallire** il caricamento con un errore chiaro. Voluto:
  meglio un errore in fase di build che una pagina renderizzata male.
- Campi mancanti o del tipo sbagliato → errore che indica file e campo.
- Il corpo dopo il frontmatter è Markdown libero.

Lo schema è definito in [`lib/content.ts`](lib/content.ts) con Zod ed è la
**fonte di verità** (sia per la validazione runtime sia per i tipi TypeScript).
Verifica con `npm run check:content`.

---

## projects

| Campo      | Tipo                          | Obbl. | Note                                             |
| ---------- | ----------------------------- | :---: | ------------------------------------------------ |
| `title`    | string (non vuota)            |  sì   | Titolo del progetto                              |
| `slug`     | string (non vuota)            |  sì   | = nome file senza `.md`; usato nell'URL          |
| `date`     | date (`YYYY-MM-DD`)           |  sì   | Ordina le liste (più recente prima)              |
| `status`   | `wip` \| `completed`          |  sì   | Stato del progetto                               |
| `summary`  | string (non vuota)            |  sì   | 1–2 righe, per le anteprime                      |
| `tags`     | string[]                      |  no   | Default `[]`; filtrabile                         |
| `stack`    | string[]                      |  no   | Default `[]`; tecnologie usate                   |
| `links`    | object                        |  no   | Default `{}`; vedi sotto                         |
| `cover`    | string                        |  no   | Path/URL immagine di copertina                   |
| `featured` | boolean                       |  no   | Default `false`; in evidenza in home             |

`links` ammette solo `demo`, `github`, `other`, tutti opzionali e tutti URL
validi (`https://...`).

### Esempio commentato

```markdown
---
title: Cittadella                 # obbligatorio
slug: cittadella                  # obbligatorio, = nome file (cittadella.md)
date: 2025-11-20                  # obbligatorio, YYYY-MM-DD
status: completed                 # wip | completed
summary: Gestionale per ...       # 1–2 righe
tags: [web, fullstack]            # opzionale
stack: [TypeScript, React]        # opzionale
links:                            # opzionale, solo demo/github/other, URL validi
  github: https://github.com/sonosaturn/cittadella
  demo: https://cittadella.example.com
cover: /covers/cittadella.png     # opzionale
featured: true                    # opzionale, default false
---

Qui il corpo in **Markdown** libero: descrizione, scelte tecniche, screenshot.
```

---

## interests

| Campo      | Tipo                                                  | Obbl. | Note                              |
| ---------- | ----------------------------------------------------- | :---: | --------------------------------- |
| `title`    | string (non vuota)                                    |  sì   | Titolo dell'interesse             |
| `slug`     | string (non vuota)                                    |  sì   | = nome file senza `.md`           |
| `date`     | date (`YYYY-MM-DD`)                                    |  sì   | Ordina le liste                   |
| `category` | `gym` \| `gaming` \| `music` \| `movies` \| `other`   |  sì   | Categoria; filtrabile             |
| `summary`  | string (non vuota)                                    |  sì   | 1–2 righe                         |
| `tags`     | string[]                                              |  no   | Default `[]`                      |
| `cover`    | string                                                |  no   | Path/URL immagine                 |

### Esempio commentato

```markdown
---
title: Palestra                   # obbligatorio
slug: palestra                    # obbligatorio, = nome file (palestra.md)
date: 2026-01-15                  # obbligatorio, YYYY-MM-DD
category: gym                     # gym | gaming | music | movies | other
summary: Allenamento in sala ...  # 1–2 righe
tags: [fitness, forza]            # opzionale
cover: /covers/palestra.jpg       # opzionale
---

Corpo in **Markdown** libero.
```

---

## API del loader

Da `lib/content.ts` (server-only):

- `getAllProjects(filter?)` → `Project[]`, ordinati per data desc. Filtro: `{ tag, status, featured }`.
- `getProjectBySlug(slug)` → `Project | undefined`.
- `getAllInterests(filter?)` → `Interest[]`, ordinati per data desc. Filtro: `{ tag, category }`.
- `getInterestBySlug(slug)` → `Interest | undefined`.

Ogni oggetto è il frontmatter tipizzato più `body: string` (il Markdown grezzo;
il rendering a HTML è responsabilità delle pagine, fase successiva).
