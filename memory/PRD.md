# PRD — Parul's Birthday Website

## Original Problem Statement
"my friend brithday is coming up on september 26 i want to create website that wishes here birthday and provide here birthday wishes"

## Product Summary
An elegant, dreamy single-page birthday experience for Parul (birthday: September 26). Pastel editorial aesthetic with soft colors, glowing visuals, floating confetti, smooth momentum scrolling (Lenis) and Framer Motion animations.

## User Personas
- The friend (site creator) — wants a beautiful surprise page for Parul
- Parul (the recipient) — opens the page on/around Sept 26, interacts with candles and surprises

## Core Requirements (static)
- Elegant & dreamy aesthetic (soft pastels, glow, confetti)
- Live countdown to September 26
- Photo gallery / memory wall
- Interactive surprises (balloon pops, confetti)
- Microphone-enabled virtual cake: blow out candles to reveal a birthday message
- ~~Wish Wall~~ — REMOVED per user request (2026-09-25)

## Architecture
- Frontend: React + Tailwind + Framer Motion + Lenis + canvas-confetti (`/app/frontend`)
- Backend: FastAPI minimal (`/app/backend/server.py`) — health/root endpoints only; no DB features currently
- No active DB collections (wishes collection deprecated with Wish Wall removal)

## Implemented
- 2026-09-24: Hero, Countdown (Sept 26), Marquee, Chapters, Gallery (memory wall), SurpriseZone (balloon pops), CakeMoment (mic candle blowing), Footer, design system from design_guidelines.json
- 2026-09-24: FastAPI backend with wishes API (later removed)
- 2026-09-25: Removed Wish Wall (frontend section, nav link, backend /api/wishes endpoints, MongoDB usage) per user request
- 2026-09-25: Fixed microphone blow detection in CakeMoment — lower RMS threshold (0.035), smoothed volume with sustained-blow frame counting, noiseSuppression/echoCancellation disabled, AudioContext explicitly resumed; tap-to-blow fallback retained
- 2026-09-25: Memory wall now features the birthday cake photo with an always-visible "Happy Birthday Parul" text overlay

## Backlog (prioritized)
- P1: Swap placeholder gallery images with real personal photos of Parul (user-supplied)
- P2: Music toggle so the page plays a tune when opened
- P3: Optional gate/password lock to keep the site secret until September 26

## Next Tasks
1. Ask user for real photos of Parul to replace gallery placeholders
2. Confirm mic blowing works on the user's real device
