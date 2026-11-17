# FLUTLICHT 27 – Zusammenfassung für Grokbot

Stand: 17.11.2026, 04:05 Uhr. Geschrieben von Claude im Auftrag von Eugen.

Zweck: Du sollst sehen, was aus Eugens Briefing in einer Sitzung entstanden ist und wie es gebaut wurde. Künftig arbeiten wir zusammen: **Du managst, Claude baut.**

## 1. Eugens Arbeitsanweisung (01:12 Uhr, sinngemäß vollständig)

Eine Webseite für eine fiktive Padelhalle, mit Scrollytelling. Das Scroll-Video muss richtig gut sein und sich mit Motion Design abwechseln.

- **Halle:** blauer Boden, dunkle Wände, Flutlicht, ungefähr 8 Courts. Nicht auf jedem Court wird gespielt. Gespielt wird 2 gegen 2. Die Halle ist gut besucht, Gäste schauen den Spielen zu.
- **Angebot:** Schläger ausleihen, Theke/Bar mit Softdrinks und Cocktails.
- **Video:** eine Art Präsentationsvideo der Halle. Die Drohne fliegt in die Halle oder startet dort, fliegt einen Choreo-Flow mit richtig dynamischen Action-Shots. Das Scrollytelling zeigt alles, was die Halle bietet.
- **Wechsel:** Danach geht es in Motion Design über, dort sieht man den Schlägerverleih als Animation, gescrollt wird von links nach rechts. Der Übergang von Video zu Motion Design soll fließend sein, und aus dem Motion Design geht es genauso fließend zurück ins Video.
- **Funktionen:** Match-Funktionen, Spielersuche und ein paar coole Extras, damit die Seite außergewöhnlich wird.

## 2. Eugens Regeln aus dieser Sitzung

- Weniger fragen, mehr machen. Nichts fragen, was schon einmal geklärt wurde.
- Bilder über sjinn.ai im Browser, auf Unlimited. Immer auf GPT Image 2 **und** Nano Banana erzeugen. GPT Image 2 liefert meist die besseren Bilder.
- Videos erst auf Unlimited in niedriger Auflösung testen. Erst wenn der Test gut ist, bezahlt in höchster Auflösung rendern.
- Unlimited-Video geht praktisch nur einmal am Tag schnell. Der zweite Lauf dauert 45 bis 50 Minuten.
- Das Projekt bekommt einen eigenen Ordner für Claude Code.

## 3. Was entstanden ist

| Uhrzeit | Ergebnis | Kosten |
|---|---|---|
| 01:20 | 6 Look-Bilder der Halle (3 × GPT Image 2, 3 × Nano Banana 2) | 0 Credits |
| 02:00 | Hallen-Master in 4K, dazu 3 Schlüsselbilder: Court von oben, Bar, Schlägerverleih | 0 Credits |
| 02:10 | Seite v0: Scroll-Bühne, Schlägerverleih, Match-Demo, Finale | – |
| 03:30 | 2 Video-Tests je 15 s: Hallenflug (MiniMax H3 Unlimited, 768p), Match bis Bar (Wan 3.0 Unlimited, 480p) | 0 Credits |
| 03:35 | Videos an den Scroll gebunden, Scroll-Aufnahme der ganzen Seite | – |
| 03:45 | Nach Eugens Urteil: Seite um 40 % gekürzt, Linien-Fehler behoben | – |
| 03:47 | Beide Videos final in MiniMax H3 2K bestellt, mit den Tests als Bewegungsvorlage | 4.500 Credits |

Eugens Urteil zur ersten Fassung: „Alles sehr geil, genau so stelle ich mir Scrollytelling vor.“ Zwei Korrekturen: die Seite war mit einer Minute Scrollen zu lang, und bei Sekunde 30 tauchte eine weiße Linie auf und verschwand wieder. Beides ist behoben, Eugens Bestätigung zur Linie steht noch aus.

**Offen:** Die 2K-Videos rendern noch (Stand 04:05). Danach werden sie für die Seite umgerechnet und eingebaut.

## 4. So läuft die Seite ab

1. **Hallenflug (Video):** Start über den Zuschauern, Flug durch den Mittelgang, über zwei Matches.
2. **Brücke A:** Die Drohne taucht senkrecht auf den Court ab. Das echte Blau füllt das Bild und wird zur Grafik, die Court-Linien zeichnen sich weiter.
3. **Schlägerverleih (Motion Design):** sechs gezeichnete Schläger, die Seite fährt von links nach rechts.
4. **Brücke B:** Ein Grafik-Schläger schlägt den Ball. Der Ball öffnet als Kreis das nächste Video.
5. **Match bis Bar (Video):** Ball springt auf, Drohne schießt hoch ins Match, über das jubelnde Publikum, landet an der Bar.
6. **Spielen:** Hallenplan mit Live-Belegung der 8 Courts, Match erstellen, „Spieler gesucht“ mit Level-Filter. Als Reiter: Schläger-Finder, Rangliste, Americano-Generator. Alles klickbar, mit Beispieldaten.
7. **Finale:** Court buchen.

## 5. Warum das auf Anhieb getragen hat

Die Reihenfolge war entscheidend, nicht das einzelne Werkzeug.

1. **Erst der Look, dann alles andere.** Sechs Hallenbilder, eines wird zum Hallen-Master. Jedes weitere Bild bekommt den Master als Referenz, damit es dieselbe Halle bleibt.
2. **Übergangsbilder zuerst festlegen.** Das Bild „Court von oben“ (nur Blau und ein Linienkreuz) ist gleichzeitig Endbild von Clip 1, Startbild der Grafik und Startbild von Clip 2. Deshalb wirken die Übergänge fließend: Video und Grafik zeigen an der Nahtstelle dasselbe Bild.
3. **Jeder Clip ist ein One-Take mit festem Start- und Endbild.** Im Prompt steht: Bild 1 ist das exakte Startbild, Bild 2 das exakte Endbild, dazwischen die Kamerafahrt in Sekundenabschnitten. Keine Schnitte, kein Text im Bild.
4. **Kostenlos testen, dann bezahlen.** Die Tests kosten nichts. Für das Finale dient der Test als Bewegungsvorlage, damit das teure Video dieselbe Fahrt zeigt, die Eugen schon abgenommen hat.
5. **Video am Scroll statt abspielen.** Die Clips sind so kodiert, dass jedes Einzelbild direkt anspringbar ist. Die Scroll-Position bestimmt, welches Bild gezeigt wird.
6. **Vor jeder Meldung prüfen.** Nach jeder Änderung wurde die Seite gebaut, als Screenshot-Folge und als Scroll-Video aufgenommen und erst dann gemeldet.

Ehrlich dazu: Nicht alles saß beim ersten Versuch. Ein Klassen-Konflikt im Code hat Buttons verschoben, zwei Bild-Prompts wurden anfangs vermischt abgeschickt, und die zwei Korrekturen von Eugen kamen obendrauf. Alles wurde in derselben Sitzung behoben.

## 6. Wo alles liegt

- GitHub: `Engelstraenen/3d-scroll-websites`, Branch `feat/flutlicht27`, Ordner `flutlicht27-site/`
- Stand und nächste Schritte: `flutlicht27-site/docs/uebergabe.md`
- Konzept: `docs/brief.md`, `docs/storyboard.md`
- Bilder und Bild-Prompts: `docs/look/`
- Video-Prompts und Ergebnis-Links: `docs/video/prompts.md`
- Die Scroll-Bühne: `components/Stage.tsx`. Die Funktionen: `components/Play.tsx`.

Noch nicht gelöst: Ein eigenes GitHub-Repo für die Padelhalle konnte Claude nicht anlegen (keine Berechtigung in der Sitzung, GitHub-Anmeldung im Browser schlug fehl). Auf Eugens Mac liegt der Ordner deshalb noch nicht.

## 7. Zusammenarbeit ab jetzt: du managst, Claude baut

**Deine Aufgaben (Management)**
- Eugens Wünsche sammeln und in klare Aufträge übersetzen.
- Die Liste der offenen Punkte führen und Prioritäten setzen.
- Ergebnisse gegen Eugens Briefing prüfen, bevor sie zu ihm gehen.
- Entscheidungen von Eugen einholen, gebündelt und nur, wenn sie wirklich fehlen.

**Claudes Aufgaben (Umsetzung)**
- Bilder, Videos, Code, Tests, Sicherung auf GitHub.
- Nach jedem Schritt die Übergabe-Datei aktualisieren.

**So gibst du Claude einen Auftrag**
1. Was soll am Ende da sein? Ein Satz.
2. Was ist schon entschieden? Damit Claude nicht nachfragt.
3. Worauf bezieht es sich? Datei, Kapitel oder Stelle im Video.
4. Was kostet Credits und ist das freigegeben? Bezahlte Renderings startet Claude nur mit Eugens Ja zur Summe.

**So gibst du Feedback, das sofort umsetzbar ist**
- Zeitpunkt in der Scroll-Aufnahme nennen („bei Sekunde 19“).
- Sagen, was zu sehen ist, und was stattdessen zu sehen sein soll.
- Ein Punkt pro Zeile.

**Was Claude von dir braucht, wenn du selbst Entwürfe machst**
Schick den Entwurf mit Ziel und Stand. Claude geht ihn durch und schreibt konkrete Verbesserungen zurück. Claude kann dich nicht direkt ansprechen, der Weg läuft über Eugen oder über Dateien im Repo.
