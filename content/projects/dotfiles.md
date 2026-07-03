---
title: Dotfiles — Ricing Hyprland
slug: dotfiles
date: 2026-06-01
status: wip
summary: Ricing completo di EndeavourOS + Hyprland (Wayland), tema Tokyo Night — configurazione modulare e coerente su tutto lo stack, con installer idempotente. In arrivo una palette dinamica dal wallpaper.
tags: [linux, wayland, hyprland, ricing]
stack: [Hyprland, Waybar, Quickshell, QML, Bash, zsh]
links:
  github: https://github.com/sonosaturn/dotfiles
---

Il mio ambiente desktop su **EndeavourOS + Hyprland** (Wayland): un ricing
completo a tema **Tokyo Night**, con configurazione modulare e coerente dal
compositor fino a GTK, icone e cursore.

## Lo stack

Compositor **Hyprland** (config modulare), barra **Waybar** con moduli custom
(meteo, updates, mpris), launcher **rofi**, terminale **kitty**, shell **zsh +
starship**, notifiche **mako**, lockscreen/idle **hyprlock + hypridle**.
Wallpaper animati via **mpvpaper**, più le utility Wayland: cliphist per la
clipboard, grim/slurp/swappy per gli screenshot, hyprpicker per i colori.

## Dashboard in Quickshell

Un control center in **Quickshell (QML)**, richiamabile con `SUPER+D`: overlay
non-modale e trascinabile con posizione persistente, a schede — mixer audio
Pipewire con selettore device, calendario e gestione sessione
(blocca / esci / riavvia / spegni).

## Installer

I dotfiles vivono in `~/dotfiles` e sono collegati a `~/.config` via symlink.
`install.sh` è **idempotente**: installa i pacchetti (pacman + AUR via yay) e
crea i link, salvando in `.bak` i file esistenti prima di sovrascrivere.

## In programma

Passare a una **palette dinamica generata dal wallpaper** con `matugen`: i
colori dell'intero desktop derivati automaticamente dall'immagine di sfondo.
