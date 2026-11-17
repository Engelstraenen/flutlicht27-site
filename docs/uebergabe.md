# Übergabe – FLUTLICHT 27 (Stand 2026-11-17)

Neuer Chat startet hier. Danach `brief.md` und `storyboard.md` lesen. Es gelten `CLAUDE.md` und die Regeln aus `docs/uebergabe.md` (sjinn Unlimited, Antworten kurz auf Deutsch).

## Was das ist
Webseite für die fiktive Padelhalle FLUTLICHT 27. Video-Scrollytelling und Motion Design wechseln sich ab und gehen fließend ineinander über. Eigener Ordner: `flutlicht27-site/`. Branch: `feat/flutlicht27`.

## Alte Ordner (Eugen, 2026-11-17)
Eugen hat die alten Projektordner auf seinem Mac gelöscht (EISWERK und Co.). Auf GitHub sind sie noch da (`main` und dieser Branch enthalten `eiswerk-site/`, dazu die Repos `Engelstraenen/eiswerk-site` und `eiswerk-videos`). Deshalb:
- Die alten Ordner lokal **nicht** wiederherstellen. Beim Klonen nur das Nötige auschecken: `git sparse-checkout set flutlicht27-site .claude` (CLAUDE.md und die Dateien im Wurzelordner kommen automatisch mit).
- Auf GitHub nichts löschen ohne Eugens ausdrückliches OK.
- Wer den Canvas-Scrub von EISWERK als Vorlage braucht, liest ihn auf GitHub: https://github.com/Engelstraenen/eiswerk-site/blob/main/components/Experience.tsx

## Arbeitsweise (Eugen, 2026-11-17)
- Wenig fragen, machen. Keine Fragen, die schon beantwortet sind.
- Bilder über sjinn.ai im Browser, Unlimited. Immer auf GPT Image 2 und Nano Banana erzeugen. GPT Image 2 liefert meist die besseren Bilder.
- Reihenfolge Video: Look-Bilder → Eugen wählt → Storyboard → Frames → Modell-Empfehlung → Eugen bestätigt → Clips.

## Stand (2026-11-17, nach „GO“)
- **Seite v0 gebaut und gepusht.** Start: `pnpm -C flutlicht27-site install`, dann `pnpm -C flutlicht27-site dev` → http://localhost:4350. Build und Typecheck laufen durch, keine Konsolenfehler. Screenshots: `docs/v0-desktop.jpg`, `docs/v0-mobile.jpg`.
- Aufbau: `components/Stage.tsx` ist die gepinnte Bühne (jetzt 840vh, alle Kapitelgrenzen oben in `S`): Film 1 → Brücke A (Abtauchen auf den Court, Blau, Linien zeichnen sich) → Schlägerverleih (horizontale Fahrt, 6 SVG-Schläger) → Brücke B (Schläger schlägt Ball, Ball öffnet Film 2 als Kreis) → Film 2 (Match, Bar) → Brücke C (Bernstein, dann dunkel). Danach normaler Seitenfluss: `components/Play.tsx` (Hallenplan live, Match erstellen, Spieler gesucht, Rangliste, Americano, Schläger-Finder) und `components/Finale.tsx`.
- Die Filme liefen zuerst als Standbilder mit Kamerafahrt (`FILM1`, `FILM2` in `Stage.tsx`). Seit 03:30 laufen dort die Video-Drafts, siehe Abschnitt Videos.
- Stack bewusst schlank: Next.js, React, Lenis, eigene Scrub-Funktion. Noch kein GSAP, three.js, Tailwind (kommt mit den Videos und Partikeln, wie bei EISWERK).
- Bilder (sjinn, GPT Image 2, Unlimited, 0 Credits): Hallen-Master 4K aus A1 (mit A1 als Referenz neu erzeugt), dazu drei Keyframes in 4K: Court von oben (Übergangsbild Brücke A), Bar, Schlägerverleih. Web-Versionen in `public/img/` (2560 px). Übersicht `docs/look/keyframes-4k-uebersicht.jpg`. 4K-Originale (3584×2016):
  - Halle https://edit.comfyonline.app/result/dc3a0b5d-9c71-4892-9a50-34de61479316.png
  - Court von oben https://edit.comfyonline.app/result/e5b9596a-84e9-4711-9622-a8044f1644a5.png
  - Bar https://edit.comfyonline.app/result/12f0c4ad-fb42-4c06-9fe6-edd1dfa3c0d7.png
  - Verleih https://edit.comfyonline.app/result/0d6cb290-71f8-49c8-a84d-2e494f3a40e0.png
  Die Originale liegen noch nicht in Dropbox (`CLAUDE/Content/`), bitte dort sichern.
- `fpv.jpg`, `action.jpg` (A2, A3) und `match.jpg` (B3) sind noch 1K-Look-Bilder, `rental.jpg` ist noch nicht verbaut.
- Referenz-Upload auf sjinn ohne Dateidialog: Bild per `fetch` als Blob laden, als `File` per `DataTransfer` in `input[type=file]` setzen, `change` auslösen. Prompt-Feld per nativem Setter + `input`-Event füllen (Tippen hängt sonst an).
- Look festgelegt (Claude, Eugen kann ändern): A1 ist der Hallen-Master, A2 und A3 Vorlage für die Action-Shots. Nicht noch einmal nachfragen.
- Brief und Storyboard v1 sind geschrieben, von Eugen noch nicht ausdrücklich abgenommen.

## Videos (2026-11-17, 03:30)
- **Beide Scroll-Videos sind als Drafts da und eingebaut** (sjinn Unlimited, 0 Credits): Clip 1 Hallenflug (MiniMax H3 Unlimited, 768P), Clip 2 Match bis Bar (Wan 3.0 Unlimited, 480P). Prompts, Referenzbilder und Ergebnis-Links: `docs/video/prompts.md`.
- Einbau: `CLIP1`, `CLIP2` in `components/Stage.tsx`. Das Video wird per `currentTime` an den Scroll gebunden (All-Intra-Dateien in `public/video/`). Clip 1 läuft bis in Brücke A und endet auf dem Court von oben, dort übernehmen Court-Bild, Blau und Linien. Clip 2 startet auf dem Court von oben, der Ball der Brücke B öffnet es als Kreis.
- Die Standbilder (`FILM1`, `FILM2`) bleiben als Rückfall, falls ein Video nicht lädt.
- Geprüft per Playwright: Screenshot-Folge und Scroll-Aufnahme, keine Konsolenfehler.

## Eugens Urteil zu v1 (2026-11-17, 03:40)
- „Alles sehr geil, genau so stelle ich mir Scrollytelling vor.“ Die Richtung ist damit abgenommen.
- Zu lang: eine Minute Scrollen ist zu viel. **Bühne von 1400vh auf 840vh gekürzt** (`T` und `S` in `Stage.tsx`), Rangliste, Americano und Schläger-Finder liegen jetzt als Tabs in einem Block (`Extras` in `Play.tsx`).
- Fehler bei Sekunde 30 der Aufnahme: eine weiße Linie wird nach unten durchgezogen und verschwindet. Behoben in Brücke B: die zwei Hauptlinien der Grafik kommen vor dem Öffnen voll zurück und liegen deckungsgleich auf dem Linienkreuz im ersten Bild von Clip 2. Eugens Bestätigung dazu steht noch aus.

## 2K-Finale (2026-11-17, 04:15)
- Beide Clips in MiniMax H3 2K gerendert (4.500 Credits, von Eugen bestätigt) und eingebaut, Desktop 1080p und Handy 540p. Details und Links: `docs/video/prompts.md`.
- Clip 1: Gang-Flug auf Eugens Wunsch von 4 s auf 2 s gekürzt (Zeitraffer), Beats nachgezogen.
- Scroll-Aufnahme v3 an Eugen geschickt. Sein Urteil zu den 2K-Clips steht aus.
- Für Grokbot: `docs/fuer-grokbot.md` (Briefing, Regeln, Methode, Rollen: Grokbot managt, Claude baut).

## Nächste Schritte
1. Eugen die Seite als Link im normalen Browser zeigen (Vorschau-Regel in `CLAUDE.md`).
2. Eugens Urteil zu den 2K-Clips abwarten.
3. Brücken auf die finalen Clips abstimmen, Texte der Beats an die Bildinhalte anpassen.
4. A2, A3 in 4K sind nicht mehr nötig, solange die Videos tragen.
5. Mobile-Feinschliff Schlägerverleih, iOS-Test der Video-Steuerung, Lighthouse und A11y, Deploy nur nach OK.

## Skills (global in `~/.agents/skills`, am 2026-11-17 aktiviert)
cinematic-scroll-storytelling, gsap-scrolltrigger-storytelling, scroll-scrubbed-visual-sequence, cinematic-gsap-lenis-motion-system, horizontal-scroll-scenes, scroll-progress-timeline, scroll-scrubbed-word-reveal, animation-on-scroll, scroll-world-storytelling, build-threejs-scroll-worlds, gsap-web, svg-animation, lottie-animation. Dazu kinetic-typography, motion-art-direction, animation-principles.

Falls Claude Code sie nicht listet: `~/.agents/skills/Skills-verknuepfen.command` einmal doppelklicken, Claude Code neu starten.

Geparkt (nicht aktiv) unter `~/.agents/skills/_geparkt`: Gaming-Repos, MengTo-Skills, web-animation.
