# FLUTLICHT 27 – Scrollytelling-Seite (Demo)

Fiktive Padelhalle mit 8 Courts. Video-Scrollytelling (Drohnenflug) im Wechsel mit Motion Design.

- **Live:** https://engelstraenen.github.io/flutlicht27-site/
- **Bauanleitung (alle Prompts, Aufbau, Schritte):** [`docs/bauanleitung-grokbot.md`](docs/bauanleitung-grokbot.md)
- **Übergabe/Stand:** [`docs/uebergabe.md`](docs/uebergabe.md)
- **Video-Originale (2560×1440, MiniMax H3 2K):** [`masters/`](masters/) – Web-Fassungen in `public/video/` (1080p Desktop, 720p Handy, All-Intra für Scroll-Steuerung)

## Starten
```bash
pnpm install
pnpm dev            # http://localhost:4350
```

## Statisch bauen (GitHub Pages)
```bash
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/flutlicht27-site npx next build   # Ergebnis in out/, Branch gh-pages
```

Stack: Next.js (App Router), React, TypeScript, Lenis. Namen, Preise und Zeiten sind Platzhalter.
