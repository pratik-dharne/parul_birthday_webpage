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
- 2026-09-25: Real photos of Parul added to memory wall (5 user-supplied photos in /app/frontend/public/photos/: sunflowers night street, orange selfie, graduation, white traditional outfit, 4-photo collage) alongside the cake overlay tile; graduation photo cropped to remove a video play-button artifact
- 2026-09-25: Music toggle (MusicToggle.jsx) — floating button bottom-right, plays a Web Audio synthesized "Happy Birthday" melody on loop; auto-starts after unlock (falls back to first tap anywhere due to browser autoplay policy)
- 2026-09-25: Password gate (PasswordGate.jsx) — site hidden until Sept 26 (auto-opens on/after); early-access password "parul26" remembered via localStorage
- 2026-09-25: Candle mic sensitivity loosened further (RMS threshold 0.028, 6 sustained frames)
- 2026-09-25: Fuller celebration on all candles out — 3-wave confetti (incl. star shapes) + richer Happy Birthday arrangement (melody + fifth + octave voices + sparkle finish)
- 2026-09-25: Candle flames made bigger/brighter (glow halo, white core) after user reported candles not looking lit; added always-visible "Relight candles" button whenever any candle is out
- 2026-09-25: Music toggle now plays a real vocal "Happy Birthday" song naming Parul (OpenAI TTS via Emergent key, voice shimmer, saved at /app/frontend/public/audio/happy-birthday-parul.mp3, loops); instrumental synth kept only for the candle-celebration fanfare

## Backlog (prioritized)
- P1: Confirm mic blowing works on a real device; tune threshold again if needed
- P2: Replace the cake stock photo with a real photo of Parul's cake if the user has one

## Next Tasks
1. User verifies the birthday tune and mic blowing on their own device
2. Share the site with Parul on September 26
