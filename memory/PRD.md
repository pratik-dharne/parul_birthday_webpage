# PRD — Parul's Birthday Celebration Website

## Original Problem Statement
"my friend brithday is coming up on september 26 i want to create website that wishes here birthday and provide here birthday wishes" — friend name: **Parul**, birthday **September 26**.

## User Personas
- The friend (site owner) who creates and shares the site with Parul and their circle
- Parul (the birthday celebrant, primary audience)
- Friends/family visitors who leave wishes on the message wall

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis + canvas-confetti (CRA/craco, port 3000)
- Backend: FastAPI (port 8001, /api prefix) + MongoDB via motor
- No authentication — public celebration page; wish wall is open by design

## Core Requirements (static)
1. Kinetic dreamy hero with masked line reveal — "Happy Birthday, Parul"
2. Live countdown to September 26 (auto-rolls to next year; celebration state on the day)
3. Birthday wishes / manifesto chapters section
4. Photo gallery (bento grid, placeholder images to swap with real photos)
5. Interactive surprises: poppable balloons + confetti, "Make a wish" cannon
6. Message wall: visitors post wishes (name, tag, message, accent color) stored in MongoDB
7. Interactive cake: Parul blows out candles via microphone (tap fallback); hidden birthday message + confetti reveal when all flames are out

## Implemented
- 2026-09-01: Full site built and verified — Hero (parallax floating balloons, masked reveal), Countdown (live ticking, verified 24 days remaining), editorial marquee, 4 manifesto chapters, bento photo gallery, balloon-pop surprise zone with confetti, wish wall (POST/GET /api/wishes, seeded 2 sample wishes), footer. Lenis smooth scroll + framer-motion reveals throughout. Verified via curl (API post/list) and Playwright (balloon pop, wish submit, all sections render).
- 2026-09-01: Cake Moment section (#cake) — 5 striped candles with flickering CSS flames on a two-tier pastel cake; blow-out via microphone (Web Audio RMS detection with strength meter) OR tap-each-flame fallback; when all flames are out: smoke wisps, double confetti cannon, and a hidden "Happy Birthday, Parul." message card reveals with a relight button. Verified via Playwright (tap path, message + relight confirmed). Mic path built but not testable headless.

## Backlog
- P0: Replace gallery placeholder photos with real photos of Parul
- P1: Background music toggle (soft instrumental)
- P1: Shareable link button / QR for sending to friends
- P2: Password-gate so Parul only sees it on her birthday
- P2: Photo upload for visitors (needs object storage integration)
- P2: Animated candle-blowing (mic input) moment

## Next Tasks
1. Swap gallery images with personal photos
2. Add music toggle
3. Optional: gate the site until Sept 26
