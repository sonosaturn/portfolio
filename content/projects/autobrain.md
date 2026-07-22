---
title: AutoBrain
slug: autobrain
date: 2026-05-15
status: wip
summary: 'Ecosistema "second brain" autonomo e auto-riparante: RAG sui propri documenti più un assistente vocale agentico (Jarvis) che scrive e corregge il proprio codice. Costruito sul free tier di Gemini.'
tags: [ai, rag, agents, voice]
stack: [Python, Gemini, ChromaDB, Vosk, Obsidian, Tkinter]
links:
  github: https://github.com/sonosaturn/AutoBrain
featured: true
---

AutoBrain è un ecosistema **second brain** potenziato ad AI: mette insieme un
sistema **RAG** per la gestione della conoscenza e **Jarvis**, un assistente
vocale autonomo capace di migliorare sé stesso. Nato con una filosofia
**"zero-budget"** (solo Gemini free tier e Vosk offline) per dimostrare che
conta più l'architettura del costo dei token.

## Second Brain (RAG)

Ingerisce PDF, DOCX e file di testo estraendone chunk semantici, indicizzati in
**ChromaDB** per ricerche vettoriali veloci dentro un vault **Obsidian**. La
conoscenza diventa un knowledge graph navigabile.

## Jarvis: voce e motore agentico

Interfaccia **vocale hands-free** basata su **Vosk** (speech-to-text offline) e
**Gemini** per logica e sintesi vocale. Ma Jarvis non si limita a parlare:
**scrive e modifica il proprio codice sorgente**. Se incontra un errore lo
registra nel vault e innesca un ciclo di **auto-riparazione ogni 2 ore**; una
volta al giorno l'agente "Creative Leader" analizza il codebase, propone nuove
feature e le delega all'agente sviluppatore.

## Il resto dello stack

GUI olografica "Arc Reactor" in **Tkinter** con feedback visivo sugli stati
cognitivi (ascolto / ragionamento / risposta), integrazione con **GitNexus**
perché gli agenti capiscano la struttura del codice prima di modificarlo, e una
dashboard di osservabilità che traccia token e costi. Architettura *Hub & Spoke*
con modelli diversi per voce (veloce) e ragionamento (profondo).

> Progetto **work in progress**, per ora tarato su Windows.
