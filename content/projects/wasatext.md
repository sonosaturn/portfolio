---
title: WASAText
slug: wasatext
date: 2025-06-15
status: completed
summary: App di messaggistica istantanea (chat 1:1 e di gruppo, foto, reazioni) — backend Go dietro un'API REST specificata in OpenAPI, frontend Vue, tutto containerizzato. Progetto d'esame individuale.
tags: [web, backend, api, fullstack]
stack: [Go, OpenAPI, Vue.js, JavaScript, SQLite, Docker]
links:
  github: https://github.com/sonosaturn/wasaText
featured: true
---

WASAText è un'app di messaggistica istantanea in stile WhatsApp, realizzata come
**progetto d'esame individuale** per il corso di *Web and Software Architecture*
(Sapienza): login, ricerca utenti e profili, conversazioni 1:1 e di gruppo,
invio di messaggi e foto, reazioni e inoltro.

## Contratto prima del codice

L'API è progettata **a partire dalla specifica OpenAPI 3.0** (`doc/api.yaml`):
il contratto REST — risorse `session`, `conversations`, `messages`, `users` —
è la fonte di verità, e backend e frontend vi si conformano. Un approccio
design-first che tiene allineati client e server.

## Backend Go

Il server è scritto in **Go**: un daemon `webapi` che espone gli endpoint REST,
con la persistenza su **SQLite** isolata in un package `database` dedicato
(query per conversazioni, messaggi e utenti). Autenticazione a token di sessione,
CORS e logging via `gorilla/handlers`, healthcheck separato per le probe.

## Frontend e deploy

Frontend **Vue.js** (single-page, Bootstrap) che consuma l'API. L'intero stack
è **containerizzato**: `Dockerfile` separati per backend e frontend e un
`docker-compose` per avviarli insieme. Dipendenze vendored (Go modules + Yarn
offline mirror) per build riproducibili.
