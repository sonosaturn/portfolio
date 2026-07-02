---
title: Cittadella
slug: cittadella
date: 2026-06-25
status: wip
summary: Gioco da tavolo multiplayer in tempo reale (compravendita e aste, tema originale "Cittadella") con backend NestJS scalabile orizzontalmente.
tags: [multiplayer, realtime, fullstack, web]
stack: [Next.js, TypeScript, TailwindCSS, NestJS, Socket.io, PostgreSQL, Prisma, Redis, Supabase]
links:
  github: https://github.com/sonosaturn/monopoly
featured: true
---

Cittadella è un gioco da tavolo multiplayer online ispirato al Monopoly:
compravendita di proprietà, aste, scambi e gestione del debito, giocato in
tempo reale tra più giocatori.

Il core è completo e gira in produzione (multiplayer real-time, scalabilità
orizzontale, auth); resta un progetto **vivo** — continuo ad aggiungere regole
e feature, tracciate in `KNOWN_GAPS.md`.

## Architettura

Frontend **Next.js 14** (App Router) con Zustand per lo state, backend
**NestJS** che espone sia API HTTP sia un layer **Socket.io** (namespace
`/game`) per gli eventi di partita. Lo stato canonico vive su **PostgreSQL**
(via Prisma) e **Redis**; l'autenticazione è delegata a **Supabase Auth**, con
i token verificati lato backend in ES256 via JWKS — nessun secret condiviso.

## Real-time e scalabilità

Il cuore del progetto è il modello real-time: ogni azione è un `GameIntent`
tipizzato che il server valida e applica, ri-emettendo lo stato aggiornato a
tutti i client. La partita gira su **più istanze** dietro nginx grazie al
`redis-adapter` di Socket.io per il broadcast cross-istanza, a un lock
distribuito per `gameId` e ai timer su BullMQ, con recovery idempotente al boot.

## Sicurezza e osservabilità

Rate limiting a due livelli (HTTP throttler + sliding window Redis sui
WebSocket), CORS whitelist, helmet, e logging strutturato JSON. Osservabilità
con pino, endpoint `/health` e `/metrics` (Prometheus), Sentry opzionale.
