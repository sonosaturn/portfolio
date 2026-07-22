---
title: Cittadella
slug: cittadella
date: 2026-06-25
status: wip
summary: Gioco da tavolo multiplayer in tempo reale (compravendita e aste, tema originale "Cittadella"), server-autoritativo e scalabile orizzontalmente. Core completo e in produzione.
tags: [multiplayer, realtime, fullstack, web]
stack: [Next.js, TypeScript, TailwindCSS, NestJS, Socket.io, PostgreSQL, Prisma, Redis, BullMQ, Supabase]
links:
  demo: https://monopoly-ruby.vercel.app
  github: https://github.com/sonosaturn/monopoly
featured: true
---

Cittadella è un gioco da tavolo multiplayer online ispirato al Monopoly:
compravendita di proprietà, aste, scambi e gestione del debito, giocato in
tempo reale tra più giocatori.

Il **core è completo e gira in produzione** (frontend su Vercel, backend su
Railway, DB e auth su Supabase); resta un progetto **vivo**: continuo ad
aggiungere regole e feature, tracciate in `KNOWN_GAPS.md`.

## Architettura

Frontend **Next.js 14** (App Router) con Zustand per lo state, backend
**NestJS** che espone sia API HTTP sia un layer **Socket.io** (namespace
`/game`) per gli eventi di partita. Lo stato canonico vive su **PostgreSQL**
(via Prisma) e **Redis**; l'autenticazione è delegata a **Supabase Auth**, con
i token verificati lato backend in ES256 via JWKS, senza secret condivisi.

## Real-time e anti-cheat server-autoritativo

Il cuore del progetto è il modello real-time: ogni azione del client è un
`GameIntent` tipizzato che **il server valida e applica** prima di ri-emettere
lo stato aggiornato a tutti. Il client non è mai fonte di verità: non può
falsificare mosse, saldi o proprietà; l'engine di gioco è puro e vive solo
lato server. La partita gira su **più istanze** dietro nginx grazie al
`redis-adapter` di Socket.io per il broadcast cross-istanza, a un lock
distribuito per `gameId` e ai timer su **BullMQ**, con recovery idempotente al
boot che ricostruisce le partite in corso.

## Sicurezza, CI e osservabilità

Rate limiting a due livelli (HTTP throttler + sliding window Redis sui
WebSocket), CORS whitelist, helmet e logging strutturato JSON. **CI a 6 job**
su ogni push; osservabilità con pino, endpoint `/health` e `/metrics`
(Prometheus), Sentry opzionale e cancellazione account GDPR.
