---
title: JPokeBattle
slug: jpokebattle
date: 2024-09-01
status: completed
summary: Simulatore di battaglie Pokémon in Java ispirato ai titoli GameBoy — esplorazione su mappa e combattimento a turni completo. Progetto in coppia.
tags: [java, game, desktop]
stack: [Java, Maven]
links:
  github: https://github.com/lucadevivo/JPokeBattle
---

JPokeBattle è un simulatore di combattimenti Pokémon ispirato ai classici per
GameBoy, sviluppato **in coppia** (con Luca De Vivo). Ricrea le due metà del
gioco originale: una fase di **esplorazione su mappa** e un **sistema di
combattimento a turni** completo.

## Cosa c'è dentro

- **Mappa ed esplorazione:** gestione delle collisioni, NPC e transizioni tra
  aree, con asset grafici e sonori dedicati.
- **Combattimento a turni:** meccaniche di lotta complete, apprendimento di
  nuove mosse ed **evoluzioni** dei Pokémon.

## Build

Progetto **Java** (JDK 17+) con build gestita da **Maven**. `mvn clean package`
produce un JAR eseguibile che include tutte le risorse (immagini, suoni, mappe),
avviabile con `java -jar`. Migrato da Eclipse a un setup moderno (VS Code +
Maven).
