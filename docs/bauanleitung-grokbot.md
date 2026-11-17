# FLUTLICHT 27 – Bauanleitung für Grokbot

Stand: 17.11.2026. Von Claude (Head of Creative / Head of Design) für Grokbot.

**Rollen:** Claude gibt Konzept, Aufbau, Prompts und Abnahme vor. Grokbot baut nach dieser Anleitung. Wenn etwas unklar ist oder ein Ergebnis abweicht: erst bei Claude nachfragen, nicht raten. Eugen entscheidet über Geld und gibt das Endurteil.

**Ziel dieses Tests:** Grokbot baut dieselbe Seite mit denselben Bildern und Videos nach, ohne sjinn.ai. Das Ergebnis wird gegen die Referenz verglichen (Abnahme in Abschnitt 9).

---

## 0. Die Regeln (gelten für jeden Schritt)

1. **Erst Bilder, dann Videos, dann Code.** Nie umgekehrt.
2. **Jedes Video hat ein festes Startbild und ein festes Endbild.** Das Endbild eines Videos ist genau das Bild, mit dem die nächste Grafik beginnt. Daraus entstehen die fließenden Übergänge.
3. **Jedes Bild auf zwei Modellen erzeugen** (GPT Image 2 und Nano Banana 2 oder deren Nachfolger), das bessere nehmen.
4. **Videos erst günstig testen** (niedrige Auflösung, kostenlos, wenn möglich). Erst wenn Eugen den Test abnimmt, in höchster Auflösung bezahlt rendern. **Vorher Eugen den Preis nennen und sein OK abwarten.**
5. **Kein Text, keine Logos im Bild.** Alle Schrift kommt aus dem Code.
6. **Leute:** etwa halb Frauen, halb Männer, alle Hautfarben, Alter 20 bis 60, verschiedene Größen, Statur, Haare und Klamotten in vielen Farben. Niemand doppelt. Jede Person bleibt das ganze Video gleich. Spieler laufen nie durch Netz, Glas oder andere Spieler.
7. **Vor jeder Meldung prüfen:** Bildbogen aus jedem Video ziehen (1–3 Bilder pro Sekunde) und auf Morphen, doppelte Personen, Körper durch Gegenstände und Text im Bild absuchen. Seite bauen, Screenshots Desktop (1440×900) und Handy (390×844), erst dann melden.
8. **Eugen wenig fragen.** Nur bei Geld und bei echten Geschmacksentscheidungen.

---

## 1. Die Story (Ablauf der Seite)

Eine gepinnte Bühne, durch die man scrollt. Video und Motion Design wechseln sich ab, jede Naht ist ein Match-Cut.

| # | Kapitel | Art | Was man sieht | Übergang ins nächste |
|---|---|---|---|---|
| 1 | Ankommen | Video 1 | Drohne startet über den Zuschauern, Flug durch den Mittelgang, über zwei gemischte Doppel, Sturz senkrecht auf einen Court | Endbild = blauer Court von oben mit weißem Linienkreuz in der Mitte |
| 2 | Brücke A | Grafik | Das Court-Bild wird flaches Blau, die Linien zeichnen sich als Grafik weiter | – |
| 3 | Schlägerverleih | Motion Design | 6 gezeichnete Schläger, Seite fährt von links nach rechts, Preise | – |
| 4 | Brücke B | Grafik | Grafik-Schläger schlägt einen Ball, der Ball öffnet als Kreis das nächste Video | Startbild Video 2 = derselbe Court von oben |
| 5 | Match | Video 2 | Ball springt auf, Drohne steigt hoch ins gemischte Doppel, kreist, am Ende Smash direkt in die Linse | Endbild = gelber Ball füllt das ganze Bild |
| 6 | Spielersuche | Motion Design | Ganze Fläche gelb (Ballfarbe). Court zeichnet sich, Ballweg mit Aufprall, Score 0 → 15 → 30 → 40 → Spiel, drei Mitspieler fliegen ein, ein freier Platz „Dein Platz“, Knopf „Match finden“ | – |
| 7 | Brücke E | Grafik | Ein Ball fällt von oben auf die Theke, um ihn herum öffnet sich Video 3 als Kreis | Startbild Video 3 = gelber Ball liegt mittig auf der Theke |
| 8 | Bar & Halle | Video 3 | Barkeeperin reicht Cocktail, Anstoßen, Kamera fährt rückwärts an der Bar entlang, steigt auf, kippt senkrecht nach unten | Endbild = ganze Halle exakt von oben, 8 Courts (2 Reihen à 4) |
| 9 | Brücke C | Grafik | Weiße Rahmen zeichnen sich exakt um die 8 Courts, füllen sich blau, Video dunkelt ab, der Plan schiebt sich unter die Überschrift „Finde dein Match.“ | Danach folgt der Abschnitt „Spielen“ mit demselben Hallenplan |
| 10 | Spielen | normale Seite | Hallenplan mit Live-Belegung, Match erstellen, Spieler gesucht, Tabs: Schläger-Finder, Rangliste, Americano-Generator | – |
| 11 | Finale | normale Seite | FLUTLICHT 27, „Court buchen“ | – |

---

## 2. Design (CI)

- **Farben:** Court-Blau `#1848d8`, tiefes Blau `#0f2f9a`, Schwarz `#0b0d12`, Kohle `#1a1d24`, Hell `#f4f7ff`, Ball-Gelb `#d8ff3c`, Bernstein (Bar) `#f2a23a`.
- **Schrift:** eine Familie, Archivo (Variable Font, lokal eingebunden).
  - Überschriften: Großbuchstaben, Gewicht 850–900, Breite 118 %, kursiv, Laufweite −0,025 em, Zeilenhöhe 0,9.
  - Kleine Labels (Kicker, Navigation): Gewicht 650–700, Breite 125 %, Laufweite 0,12–0,2 em, Großbuchstaben, 10–13 px.
  - Fließtext: Gewicht 420, normale Breite, 17 px.
- **Haltung:** Nacht-Session, Flutlicht, Sport-Werbefilm. Keine Standard-Verläufe, keine austauschbaren Hero-Layouts.

---

## 3. Bilder (Schlüsselbilder)

Format immer 16:9, höchste Auflösung (4K). Modell: eines, das ein **Referenzbild bearbeiten** kann (GPT Image 2, Nano Banana 2 oder Nachfolger). Bei jedem Bild „Referenz“ = das genannte vorherige Bild hochladen.

### 3.1 Look-Bilder (Startpunkt, ohne Referenz)
Drei Prompts, je auf beiden Modellen. Daraus wird das beste Weitwinkel-Bild der „Hallen-Look“.

**Weitwinkel (wird zum Hallen-Look):**
```
Photorealistic cinematic wide establishing shot from a drone hovering high near the ceiling at one end of a large modern indoor padel hall, looking down the central aisle. Eight padel courts in two rows of four, vivid blue court surfaces with crisp white lines, glass walls with black steel frames and black mesh fencing. Matte dark anthracite walls and black ceiling with exposed trusses. Powerful LED floodlights create bright pools of light on the courts with soft haze and light beams, deep contrast. Doubles matches two against two on five of the courts, players mid-rally in sportswear, three courts empty. Busy atmosphere: spectators standing along the glass and sitting at high tables watching, a warmly lit bar counter with bottles and cocktails glowing at the far end, a racket rental counter with rackets on a wall rack at the side. No text, no logos, no signage lettering. Shot on a cinema camera, 16mm wide angle, crisp detail, premium sports venue look.
```

**FPV durch den Gang (nur Look-Vorlage):**
```
Photorealistic cinematic low-angle FPV drone shot flying fast at chest height down the central aisle of a large modern indoor padel hall, dynamic ultra wide angle with slight motion blur at the edges. Padel courts on both sides, eight courts in total, vivid blue court surfaces with white lines, glass walls with black steel frames. Matte dark anthracite walls and black ceiling, rows of powerful LED floodlights overhead with visible light beams in light haze, strong contrast, blue light reflecting on the glass. On the nearest court a doubles match two against two, one player jumping for a powerful smash with the ball frozen in the air, sweat and energy. Other courts with doubles matches, two courts empty. Spectators with drinks lean on the railing and sit at high tables watching, a warmly lit cocktail bar in the background on the right, a racket rental wall with padel rackets on the left. No text, no logos, no lettering. High-end sports commercial look, shallow haze, crisp detail.
```

**Schräg über dem Court (nur Look-Vorlage):**
```
Photorealistic cinematic drone shot from a dramatic tilted diagonal angle, about four meters above one blue padel court during an intense doubles rally, two against two, one player lunging low for the ball near the glass wall, another at the net with racket raised. Vivid blue court surface with white lines fills the lower half of the frame. Behind it the large modern indoor padel hall opens up with seven more courts, glass walls with black steel frames, matte black walls and dark ceiling. Moody high-contrast floodlight look: bright white LED floodlights with lens flares and visible beams through haze, deep shadows, subtle cool blue and warm amber accents. A crowd of spectators along the glass and at high tables with drinks, a glowing bar with cocktails in the background, padel rackets displayed on a rental wall. No text, no logos, no lettering. Premium night-session atmosphere, anamorphic cinema look, crisp detail.
```

### 3.2 Hallen-Master 4K (Referenz: gewähltes Weitwinkel-Bild)
```
Recreate the attached reference image as an ultra high resolution 4K photograph. Keep EXACTLY the same indoor padel hall, the same camera position and wide-angle perspective, the same composition and layout: central aisle, eight blue padel courts in two rows of four with white lines, glass walls with black steel frames, dark anthracite walls and black ceiling with trusses, LED floodlights with light beams in soft haze, warmly lit bar at the far end, racket rental wall on the left, spectators at high tables in the foreground, doubles matches on the courts. Same colors, same lighting, same mood. Only add much more fine detail, sharpness and realistic texture. No text, no logos, no lettering, no watermark.
```

### 3.3 Halle mit gemischten Leuten = **Startbild Video 1** (Referenz: Hallen-Master)
Wichtig: Ohne diesen Schritt sehen alle Spieler gleich aus (alles Männer in Weiß). Das hat Eugen bemängelt.
```
Edit the attached reference image. Keep EXACTLY the same indoor padel hall, the same camera position and angle, the same composition, the same eight blue courts in two rows of four, glass walls, central aisle, floodlights with haze, warm bar at the far end, racket wall on the left, tables and stools, the same lighting and colors. ONLY change the people, so that the crowd is clearly mixed and no two people look alike.

On every active court a mixed doubles match, two against two, women and men together, for example: a blonde woman with a long ponytail in a coral top and white skirt; a Black man with short hair in a neon yellow shirt; a red-haired woman with a braid in a teal tank top and black leggings; a tall man with brown hair and a beard in a white shirt and navy shorts; an East Asian woman with a black bob and a visor in a lilac top; a dark-skinned woman with long braids in white; a grey-haired man in a black shirt; a brown-haired woman with a bun in an orange top.

Spectators in the foreground and along the courts: about half women and half men, different skin tones (fair, tan, brown, dark), different hair (long, short, curly, blonde, red, brown, black, grey, bald), different ages from 20 to 60, different outfits in different colors (hoodies, denim jackets, sport dresses, t-shirts, caps, bright colors), not everyone in black.

Photorealistic ultra-detailed 4K photograph, natural body proportions, sharp faces, no text, no logos, no lettering.
```

### 3.4 Court von oben = **Endbild Video 1 und Startbild Video 2** (Referenz: Hallen-Master)
Das wichtigste Bild der Seite. Prüfen: nur Blau und ein weißes Linienkreuz genau in der Bildmitte, keine Spieler, kein Netz.
```
Same indoor padel hall as in the attached reference image, same blue court surface, same floodlight mood. New camera position: a drone looking straight down from directly above one padel court, perfectly top-down and perfectly symmetrical, the camera very close to the floor so the vivid blue court surface fills the entire frame edge to edge. Only the crisp white court lines are visible: the center service line running vertically through the middle of the frame and one horizontal service line. No players, no net, no glass, no walls, no shadows of people. Even floodlight with a very soft bright pool in the center, fine artificial turf texture with a little sand. No text, no logos, no lettering. Ultra high resolution 4K photograph.
```

### 3.5 Ball füllt das Bild = **Endbild Video 2** (ohne Referenz)
```
Extreme close-up photograph, the final frame of a sports film: a bright neon-yellow padel ball (color close to #d8ff3c) flying straight into the camera lens, so close that the fuzzy felt ball fills the ENTIRE 16:9 frame edge to edge, no background visible at all. Sharp felt fibers in the center, one smooth curved white seam running across the frame, very slight radial motion blur toward the edges, soft floodlight glow on the upper left of the felt. Photorealistic, ultra-detailed 4K, no text, no logos, no lettering.
```

### 3.6 Bar (Referenz: Hallen-Master), danach Bar mit gemischten Leuten (Referenz: Bar)
Bar, erster Schritt:
```
Same indoor padel hall as in the attached reference image, same dark anthracite walls, same floodlights and haze, the blue padel courts with glass walls visible in the background. New camera position: a drone gliding at eye level toward the long bar counter of the hall. Warm amber backlit shelves with bottles, a bartender in a black shirt pouring a colorful cocktail with ice and a slice of orange, soft drinks and cocktails lined up on the dark counter, guests on bar stools with drinks turned toward the courts and watching a doubles match through the glass. Warm amber bar light against the cool blue light of the courts. Lively, well visited, premium night-session atmosphere. No text, no logos, no lettering, blank bottle labels. Cinematic wide angle, shallow haze, ultra high resolution 4K photograph.
```
Bar, gemischte Leute:
```
Edit the attached reference image. Keep EXACTLY the same bar scene, the same camera position and angle, the same composition, the long dark bar counter, the warm amber backlit bottle shelves, the cocktails and glasses on the counter, the blue padel court behind the glass with floodlights and haze, the same lighting and colors. ONLY change the people, so that everyone looks clearly different and the crowd is mixed.

Bartender on the left: a woman with dark skin and short natural curly hair, black apron over a black shirt, pouring the same cocktail from the shaker.

Guests on the bar stools, from front to back, all different: a red-haired woman with long wavy hair in a green denim jacket; a Black man with a shaved head in a mustard hoodie; a blonde woman with a short bob in a white sport dress; a South Asian man with curly black hair and glasses in a striped shirt; a woman with long brown hair in a ponytail in a burgundy top; an older man with grey hair and a beard in a navy polo; an East Asian woman with straight black hair in an olive bomber jacket. Different ages from 20 to 60, different skin tones, colorful clothes, not everyone in black.

On the court behind the glass a mixed doubles match: two women and two men in different colored sports outfits (coral, teal, neon yellow, white).

Photorealistic ultra-detailed 4K photograph, natural body proportions, sharp faces, no text, no logos, no lettering.
```

### 3.7 Ball auf der Theke = **Startbild Video 3** (Referenz: Bar mit gemischten Leuten)
Prüfen: Ball liegt waagerecht mittig (ca. 51 % der Breite), auf ca. 66 % der Höhe, Durchmesser ca. 26 % der Bildhöhe. Der Code lässt den Grafik-Ball genau dort landen.
```
Edit the attached reference image. Same bar of the same padel hall, same warm amber backlit bottle shelves, same dark stone bar counter, same light and colors. New camera position: a close-up at counter height. In the EXACT CENTER of the frame a single bright neon-yellow padel ball (color close to #d8ff3c) rests on the dark bar counter, sharp, its height about 22 percent of the frame height, with a soft reflection on the counter. Next to it on the right a tall cocktail glass with ice and an orange slice, a little out of focus. Behind, strongly blurred in warm bokeh: the bartender woman, mixed guests on bar stools and the blue court behind the glass. Shallow depth of field, photorealistic ultra-detailed 4K, no text, no logos, no lettering.
```

### 3.8 Halle exakt von oben = **Endbild Video 3** (Referenz: Halle mit gemischten Leuten)
Prüfen: 8 Courts als Hochkant-Rechtecke, 2 Reihen à 4, Gang waagerecht durch die Mitte. Nano Banana hat hier nur 4 Courts geliefert, GPT Image 2 war richtig.
```
Use the attached reference image only for the look of the hall (same blue courts, same dark anthracite floor and walls, same floodlights and haze, same warm amber bar, same mix of people). New camera: a perfectly straight top-down aerial view at 90 degrees from high above, as if the roof were removed.

Layout, very important: eight blue padel courts in two rows of four. Four courts side by side in the upper half of the frame, four courts side by side in the lower half, separated by one straight horizontal concrete aisle through the middle of the frame. Every court is a portrait rectangle (long side vertical) with white lines and a thin dark net running horizontally across its middle; the glass walls show as thin bright outlines. The eight courts together fill about 80 percent of the frame width, symmetric and centered, evenly spaced. Along the left edge the warm amber lit bar seen from above.

Six courts are being played, four players each, mixed doubles, women and men in many different colorful outfits (coral, teal, neon yellow, lilac, white, orange, black); two courts are empty. Spectators at small round high tables along the aisle seen from above. Photorealistic ultra-detailed 4K drone photograph, no text, no logos, no lettering, no numbers.
```

### 3.9 Schlägerverleih (optional, Referenz: Hallen-Master)
Wird auf der Seite derzeit nicht gezeigt (der Verleih ist gezeichnet), nur als Reserve.
```
Same indoor padel hall as in the attached reference image, same dark anthracite walls, same floodlights and haze, the blue padel courts with glass walls visible in the background. New camera position: a drone at chest height in front of the racket rental counter. A dark wall rack with spot lighting presents about twenty padel rackets in neat rows, each racket with a different bold colorful design, perforated round heads, short handles with wrist straps. In front a dark counter with tubes of yellow padel balls, a friendly staff member in a black shirt hands a racket to two players in sportswear. Cool blue light from the courts on the right. No text, no logos, no lettering, no brand marks on the rackets. Cinematic wide angle, shallow haze, ultra high resolution 4K photograph.
```

---

## 4. Videos

**Modell:** eines, das **Startbild und Endbild** annimmt und den Prompt genau befolgt (wir haben MiniMax H3 genommen; Alternativen mit Start-/Endbild sind z. B. Kling, Veo, Seedance, Wan, Hailuo, Funktionen beim Anbieter prüfen). 16:9. Erst Test in niedriger Auflösung, nach Eugens OK dieselbe Fahrt in 2K.

Im Prompt ist @Image1 das Startbild und @Image2 das Endbild. Wenn das Werkzeug die Bilder anders benennt, die Namen im Prompt anpassen.

### Video 1 – Ankommen (15 s)
Startbild 3.3, Endbild 3.4.
```
STRICT ONE-TAKE. Generate exactly 15 seconds, horizontal 16:9, photorealistic premium sports film, ONE single uninterrupted FPV drone shot from the first to the last frame. No cuts, no jump cuts, no dissolves, no fades, no time jumps, no text, no logos, no lettering.

REFERENCE BINDING: @Image1 is the exact OPENING FRAME: the video starts on this exact image (the same indoor padel hall, eight blue courts in two rows of four, central aisle, floodlights with haze, warm bar at the far end, racket wall on the left, a mixed crowd of spectators at high tables in the foreground). Preserve the hall, the colors, the lighting and every person exactly. @Image2 is the exact FINAL FRAME: the video ends on this exact image (top-down view of the blue court surface filling the whole frame, one vertical and one horizontal white line crossing in the center).

PEOPLE, VERY IMPORTANT: every person keeps exactly the same face, body, skin tone, hair and clothes from the first to the last second. No morphing, no melting, no merging bodies, no duplicated people, no people appearing or vanishing, no changing faces. The players are mixed doubles, women and men, all clearly different: blonde woman with ponytail in coral top and white skirt, Black man in neon yellow shirt, red-haired woman in teal top and black leggings, man with brown hair in white shirt and navy shorts, and others as in @Image1. Natural anatomy, two arms, two legs, one racket per player. Players never pass through the net, the glass or each other.

CAMERA CHOREOGRAPHY, fast but smooth cinematic FPV drone:
0-2s: the drone lifts off from the opening position above the spectators and shoots forward into the central aisle between the glass courts.
2-6s: it banks left and sweeps low past a mixed doubles rally: the blonde woman in coral jumps and hits a powerful smash, the yellow ball flies past the lens, the Black man in neon yellow lunges for it, glass walls and floodlights streak by.
6-10s: the drone rolls right across the net of the neighbouring court, the red-haired woman in teal plays a volley at the net against the man in white, spectators cheering behind the glass, floodlight flares.
10-15s: the drone climbs above the center of an empty court, tilts straight down and dives vertically toward the blue floor until the blue court surface with its white lines fills the entire frame and settles exactly on @Image2.

Real physics, at most four players per court, keep the camera distance to people medium, never extreme close-ups of faces, natural motion blur, light haze, deep contrast, vivid blue court floor, dark anthracite walls. Sound: ball hits, squeaking shoes, cheering crowd, hall ambience, no music.
```
Abnahme: Der Flug durch den Gang darf höchstens 2 s dauern („da passiert nichts“, Eugen). Sonst im Schnitt beschleunigen (Abschnitt 5).

### Video 2 – Match (12 s)
Startbild 3.4, Endbild 3.5.
```
STRICT ONE-TAKE. Generate exactly 12 seconds, horizontal 16:9, photorealistic premium sports film, ONE single uninterrupted FPV drone shot from the first to the last frame. No cuts, no jump cuts, no dissolves, no fades, no time jumps, no text, no logos, no lettering, no numbers.

REFERENCE BINDING: @Image1 is the exact OPENING FRAME: the video starts on this exact image (top-down view of the vivid blue padel court surface filling the whole frame, one vertical and one horizontal white line crossing in the center). @Image2 is the exact FINAL FRAME: the video ends on this exact image (extreme close-up of a neon-yellow padel ball that fills the entire frame edge to edge, felt texture and one curved white seam). Preserve the hall, colors and lighting.

PEOPLE, VERY IMPORTANT: four players, mixed doubles, two women and two men, all clearly different in face, height, build, skin tone, hair and clothes: a tall dark-skinned woman with long braids in a white top and white skirt; a short East Asian woman with a black bob and a visor in a lilac top and black shorts; a stocky man around 50 with a grey beard and light skin in a black shirt; a slim young man with curly brown hair and tan skin in an orange shirt and navy shorts. Every person keeps exactly the same face, body, height, skin tone, hair and clothes from the first to the last second. No morphing, no melting, no merging bodies, no duplicated people, no people appearing or vanishing. Players never touch, cross or run through the net, the glass walls or each other; each team stays on its own side of the net. Spectators behind the glass are women and men of all skin tones and ages in colorful clothes. Natural anatomy, two arms, two legs, one racket per player.

CAMERA CHOREOGRAPHY, fast smooth cinematic FPV drone:
0-2s: a yellow padel ball bounces hard on the blue floor right in front of the lens and the drone rises from the court, revealing the mixed doubles rally around it, glass walls, floodlights with haze.
2-6s: the drone circles at medium distance around the players: the woman with braids plays a volley at the net, the man in orange lunges toward the glass wall and plays the ball off the wall.
6-9s: the man with the grey beard lobs high, the woman in lilac runs back on her own side of the court, the camera follows her at medium distance.
9-12s: the woman in lilac jumps and smashes the yellow ball straight toward the camera; the ball flies directly into the lens, grows until it fills the entire frame and the video ends exactly on @Image2.

Real physics, at most four players on the court, never extreme close-ups of faces, natural motion blur, light haze, deep contrast, vivid blue court floor, dark anthracite walls. Sound: ball hits, squeaking shoes, cheering crowd, hall ambience, no music.
```
Bekannter Fehler im Test: bei ca. 8 s lief die Spielerin durch das Netz. Darum steht der Satz zum Netz jetzt im Prompt. Falls es wieder passiert: Stelle herausschneiden (Abschnitt 5).

### Video 3 – Bar & Halle (12 s)
Startbild 3.7, Endbild 3.8.
```
STRICT ONE-TAKE. Generate exactly 12 seconds, horizontal 16:9, photorealistic premium sports film, ONE single uninterrupted camera move from the first to the last frame. No cuts, no jump cuts, no dissolves, no fades, no time jumps, no text, no logos, no lettering, no numbers.

REFERENCE BINDING: @Image1 is the exact OPENING FRAME: the video starts on this exact image (close-up of a neon-yellow padel ball resting in the center of the dark bar counter, a cocktail beside it, the bartender woman and mixed guests blurred in warm amber bokeh behind). @Image2 is the exact FINAL FRAME: the video ends on this exact image (perfectly straight top-down aerial view of the whole padel hall: eight blue courts in two rows of four, a horizontal aisle through the middle, the amber bar along the left edge, mixed doubles on six courts). Preserve the hall, colors, lighting and every person exactly.

PEOPLE, VERY IMPORTANT: every person keeps exactly the same face, body, height, skin tone, hair and clothes from the first to the last second. No morphing, no melting, no merging bodies, no duplicated people, no people appearing or vanishing. The crowd is clearly mixed and no two people look alike: about half women and half men, ages 20 to 60, fair, tan, brown and dark skin, different heights and builds, long hair, short hair, curly hair, blonde, red, brown, black, grey, bald, many different colorful clothes (denim jacket, hoodie, sport dress, striped shirt, bomber jacket), not everyone in black or white. Natural anatomy.

CAMERA CHOREOGRAPHY, smooth cinematic drone:
0-3s: the focus pulls from the yellow ball to the bar, the camera slowly moves backward and up from the counter; the bartender woman with short curly hair finishes pouring a cocktail and slides it to a red-haired woman in a green denim jacket, who laughs and toasts with a Black man in a mustard hoodie.
3-6s: the camera glides backward along the long bar past the row of different guests on bar stools, warm amber light, the blue courts glowing behind the glass.
6-9s: it rises through the light haze above the bar and the spectators at high tables, turning toward the courts where mixed doubles are playing.
9-12s: it climbs high above the hall and tilts straight down until the whole hall is seen exactly from above and settles exactly on @Image2.

Light haze, deep contrast, warm amber bar light, vivid blue court floor, dark anthracite floor and walls. Sound: clinking glasses, laughter, ball hits from the courts, hall ambience, no music.
```

### Finale in 2K
Erst nach Eugens OK zum Test **und** zum Preis. Wenn das Werkzeug ein Referenzvideo annimmt: den abgenommenen Test (auf höchstens 15 s gekürzt) als @Video1 mitgeben und diesen Block an den Prompt anhängen:
```
@Video1 is the exact MOTION AND TIMING REFERENCE: reproduce the same camera path, the same timing, the same people and the same actions as in @Video1, frame for frame, only in far higher resolution, sharper detail and cleaner motion. Keep @Image1 as the exact opening frame and @Image2 as the exact final frame.
```
Ohne Referenzvideo: denselben Prompt mit denselben Start- und Endbildern in 2K rendern und das Ergebnis wieder komplett prüfen.

---

## 5. Videos für die Seite aufbereiten

Ton weg, jedes Einzelbild ein Schlüsselbild (sonst ruckelt das Scrollen):
```
ffmpeg -i video.mp4 -an -c:v libx264 -preset slow -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart clipN.mp4
ffmpeg -i video.mp4 -an -vf scale=960:-2 -c:v libx264 -preset slow -crf 25 -g 1 -pix_fmt yuv420p -movflags +faststart clipN-m.mp4
```
Desktop lädt `clipN.mp4` (bei 2K auf 1920×1080 skalieren), Handy `clipN-m.mp4`.

Gang-Flug beschleunigen (Beispiel: Sekunde 0,6–4,6 doppelt so schnell):
```
ffmpeg -i in.mp4 -filter_complex "[0:v]trim=0:0.6,setpts=PTS-STARTPTS[a];[0:v]trim=0.6:4.6,setpts=(PTS-STARTPTS)/2,fps=24[b];[0:v]trim=4.6,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1[v]" -map "[v]" -an out.mp4
```
Fehlerstelle herausschneiden (Beispiel: 7,7–9,2 s; am besten an einer Stelle mit Bewegungsunschärfe schneiden):
```
ffmpeg -i in.mp4 -filter_complex "[0:v]trim=0:7.7,setpts=PTS-STARTPTS[a];[0:v]trim=start=9.2,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]" -map "[v]" -an out.mp4
```
Prüfen mit Bildbogen:
```
ffmpeg -i clip.mp4 -vf "fps=2,scale=480:-1,tile=6x4" -frames:v 1 bogen.jpg
```

---

## 6. Code-Aufbau

Stack: Next.js (App Router), React, TypeScript strict, Lenis (sanftes Scrollen). Kein Canvas nötig, die Videos sind normale `<video>`-Elemente.

**Dateien:**
- `components/Stage.tsx` – die gepinnte Bühne mit allen Videos, Brücken und Motion-Kapiteln. Eine einzige Funktion `update(scrollY)` berechnet alles aus der Scroll-Position. Keine React-States pro Bild, alles über `element.style`.
- `components/Play.tsx` – Abschnitt „Spielen“ (Hallenplan, Match erstellen, Spieler gesucht, Tabs).
- `components/Finale.tsx`, `components/Nav.tsx`, `app/globals.css` (Farben, Schrift), `lib/math.ts` (`clamp`, `smooth`, `lerp`).

**Bühne:** ein Wrapper mit Höhe `(T + 100) vh`, darin ein `position: sticky; top: 0; height: 100vh`. `T = 1110`. Kapitel in vh:
```
film1   0–260     Video 1
bridgeA 260–330   Court-Bild → Blau → Linien
rackets 330–530   Schlägerverleih, horizontale Fahrt
bridgeB 530–590   Schläger schlägt Ball, Kreis öffnet Video 2
film2   590–720   Video 2
bridgeD 720–740   Ball in der Linse → Gelb
match   740–890   Spielersuche
bridgeE 890–930   Ball fällt auf die Theke, Kreis öffnet Video 3
film3   930–1060  Video 3
bridgeC 1060–1110 Courts von oben → Hallenplan „Finde dein Match.“
```
`seg(v, kapitel)` gibt 0→1 innerhalb eines Kapitels zurück, `v` ist die Scroll-Position in vh.

**Video an den Scroll binden:**
```ts
const ready = (v) => v && v.readyState >= 2 && v.duration > 0;
const seek = (v, c) => {            // c = 0..1
  const t = c * (v.duration - 0.06);
  if (!v.seeking && Math.abs(v.currentTime - t) > 0.015) v.currentTime = t;
};
```
Jedes Video läuft genau über seinen Bereich, endet also exakt dann auf seinem Endbild, wenn die nächste Grafik übernimmt. Solange ein Video nicht geladen ist, zeigt die Seite das Startbild als Standbild.

**Die Nahtstellen (wichtigste Zahlen):**
- Brücke A: Video 1 zoomt leicht weiter (Skalierung 1 → 1,12), das Court-Bild 3.4 blendet darüber, dann flaches Blau, zwei SVG-Linien liegen exakt auf dem Linienkreuz des Bildes (Bildmitte).
- Brücke B: SVG-Schläger schlägt Ball, Video 2 wird mit `clip-path: circle(r at 55% 42%)` von 0 auf 150vmax geöffnet. Die zwei Hauptlinien der Grafik liegen beim Öffnen deckungsgleich auf dem ersten Bild von Video 2.
- Brücke D: Video 2 läuft bis zu seinem letzten Bild (gelber Ball füllt alles), dann blendet die gelbe Fläche `#d8ff3c` der Spielersuche darüber.
- Brücke E: Ein gelber Grafik-Ball (Durchmesser 26 % der Bildhöhe) fällt von oben auf die Position x = 51 %, y = 65,7 % des Videobildes (bei `object-fit: cover` umrechnen), springt kurz, dann öffnet sich Video 3 per `clip-path: circle()` um diesen Punkt.
- Brücke C: SVG mit `viewBox="0 0 1600 900"` und `preserveAspectRatio="xMidYMid slice"` (verhält sich wie `object-fit: cover`). Acht Rechtecke exakt auf den Courts des letzten Bildes von Video 3. Bei unserem Video: x = 332, 576, 850, 1110 und y = 64, 515, Breite 211, Höhe 348. **Bei einem neuen Video neu messen** (blaue Flächen per Farbmaske suchen). Erst weiße Rahmen zeichnen (`stroke-dashoffset`), dann blau füllen, Video abdunkeln, Plan verkleinern und nach unten schieben, Überschrift „Finde dein Match.“ einblenden. Keine Schwarzblende am Ende, der Plan bleibt stehen, bis „Spielen“ nachrückt.

**Texte auf den Videos (Beats):**
- Video 1: „Acht Courts. Ein Dach.“ · „Zwei gegen zwei.“ · „Jeder Ball zählt.“
- Video 2: „Mittendrin.“ (Vier Spieler, Glas ringsum, jeder Ballwechsel ein Duell.)
- Video 3: „Softdrinks. Cocktails. Revanche.“ · „Acht Courts. Live belegt.“

**Rückfälle:** `prefers-reduced-motion` und `?static` zeigen alle Inhalte untereinander ohne Scroll-Effekte.

---

## 7. Reihenfolge der Arbeit (Checkliste)

1. Look-Bilder (3.1) auf beiden Modellen, bestes Weitwinkel-Bild wählen.
2. Hallen-Master (3.2), Halle mit gemischten Leuten (3.3).
3. Court von oben (3.4), Ball füllt Bild (3.5), Bar + Bar gemischt (3.6), Ball auf der Theke (3.7), Halle von oben (3.8). Jedes Bild gegen die „Prüfen“-Punkte checken.
4. Drei Video-Tests (Abschnitt 4), Bildbogen prüfen, Fehler schneiden oder neu rendern.
5. Seite bauen (Abschnitt 6), Videos aufbereiten (Abschnitt 5), Rechtecke für Brücke C neu messen.
6. Screenshots Desktop + Handy, Scroll-Aufnahme der ganzen Seite.
7. An Claude zur Abnahme, danach an Eugen.
8. Erst nach Eugens OK und Preis-OK: 2K.

---

## 8. Was wir gelernt haben (nicht wiederholen)

- Ohne ausdrückliche Personenliste erzeugen die Modelle lauter gleiche Männer in Weiß. Darum jede Person einzeln beschreiben.
- Ohne den Satz „No morphing …“ verschmelzen Körper. Ohne „never pass through the net“ laufen Spieler durchs Netz.
- Kamerafahrt immer in Sekundenabschnitten vorgeben, Zoom und Abstand ausdrücklich nennen.
- Endbilder, die zu einer Grafik führen, müssen sehr einfach sein (Blau mit Linienkreuz, Ball formatfüllend). Dann passt der Übergang auch, wenn das Video das Endbild nicht ganz exakt trifft.
- Wenn das letzte Videobild leicht vom Endbild abweicht (z. B. Linienkreuz nicht mittig): im Code mit einem kleinen Zoom/Versatz ausgleichen statt neu rendern.
- Kostenlose Warteschlangen können am Tag 2–3 Stunden dauern. Früh starten.

---

## 9. Abnahme (Vergleich mit der Referenz)

Claude vergleicht Grokbots Ergebnis mit der Referenz-Aufnahme `FLUTLICHT27-seite-scroll-v4.mp4` nach diesen Punkten:
1. Alle drei Nahtstellen ohne sichtbaren Bruch (Court-Kreuz, Ball, Theke, Halle von oben).
2. Leute gemischt, kein Morphen, niemand läuft durch Gegenstände.
3. Kein Text im Video, Schrift und Farben wie in Abschnitt 2.
4. Scrollen ruckelfrei (All-Intra), Handy-Ansicht sauber.
5. Gesamtlänge der Bühne nicht länger als jetzt (1110 vh).
