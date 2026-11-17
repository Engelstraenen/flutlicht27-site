# Video-Drafts (2026-11-17, sjinn Unlimited, 0 Credits)

Beide Clips sind Tests in niedriger Auflösung. Regel Eugen: erst auf Unlimited testen, wenn gut, dann bezahlt in höchster Auflösung.
Unlimited erlaubt nur einen MiniMax-H3-Auftrag gleichzeitig; ein zweiter Lauf am selben Tag dauert laut Eugen 45 bis 50 Minuten.

## Clip 1 – Hallenflug (MiniMax H3 Unlimited, 768P, 15 s, 16:9)
- @Image1 = Hallen-Master 4K (Startbild), @Image2 = Court von oben (Endbild)
- Ergebnis: https://edit.comfyonline.app/result/1eadc117-522e-40b1-b394-496df4c01ff2.mp4 (1344×768, 24 fps)
- Start und Ende treffen die Referenzbilder. Auf der Seite: `public/video/clip1.mp4` (All-Intra).

```
STRICT ONE-TAKE. Generate exactly 15 seconds, horizontal 16:9, photorealistic premium sports film, ONE single uninterrupted FPV drone shot from the first to the last frame. No cuts, no jump cuts, no dissolves, no fades, no time jumps, no text, no logos, no lettering.

REFERENCE BINDING: @Image1 is the exact OPENING FRAME: the video starts on this exact image (the same indoor padel hall, eight blue courts in two rows of four, central aisle, floodlights with haze, warm bar at the far end, racket wall on the left, spectators at high tables in the foreground). Preserve the hall, the colors and the lighting exactly. @Image2 is the exact FINAL FRAME: the video ends on this exact image (top-down view of the blue court surface filling the whole frame, one vertical and one horizontal white line crossing in the center).

CAMERA CHOREOGRAPHY, fast smooth cinematic FPV drone:
0-3s: the drone lifts off from the opening position above the spectators and accelerates forward over their heads into the central aisle between the glass courts.
3-7s: it banks left and sweeps low over a court where a doubles match two against two is in full rally: one player jumps and hits a powerful smash, the yellow ball flies past the lens, the opponents lunge for it, glass walls and floodlights streak by.
7-11s: the drone rolls right across the net of the neighbouring court, another doubles rally, players sprinting and sliding, spectators cheering behind the glass, floodlight flares.
11-15s: the drone climbs above the center of a court, tilts straight down and dives vertically toward the blue floor until the blue court surface with its white lines fills the entire frame and settles exactly on @Image2.

Real people playing padel with real physics, four players per active court, natural motion blur, light haze, deep contrast, vivid blue court floor, dark anthracite walls. Sound: ball hits, squeaking shoes, cheering crowd, hall ambience, no music.
```

## Clip 2 – Match bis Bar (Wan 3.0 Unlimited, 480P, 15 s, 16:9)
- @Image1 = Court von oben (Startbild), @Image2 = Bar (Endbild)
- Ergebnis: https://edit.comfyonline.app/result/7362f433-e713-44f6-82d1-e48ddd523810.mp4 (854×480, 30 fps)
- Auf der Seite: `public/video/clip2.mp4` (All-Intra).

```
STRICT ONE-TAKE. Generate exactly 15 seconds, horizontal 16:9, photorealistic premium sports film, ONE single uninterrupted FPV drone shot from the first to the last frame. No cuts, no jump cuts, no dissolves, no fades, no time jumps, no text, no logos, no lettering.

REFERENCE BINDING: @Image1 is the exact OPENING FRAME: the video starts on this exact image (top-down view of the vivid blue padel court surface filling the whole frame, one vertical and one horizontal white line crossing in the center). @Image2 is the exact FINAL FRAME: the video ends on this exact image (the bar of the padel hall: bartender in a black shirt pouring a cocktail on the left, warm amber backlit bottle shelves, guests on bar stools with drinks watching a doubles match on the blue court behind the glass, floodlights with haze). Preserve hall, colors and lighting exactly.

CAMERA CHOREOGRAPHY, fast smooth cinematic FPV drone:
0-3s: a yellow padel ball bounces hard on the blue floor right in front of the lens and the drone shoots straight up from the court, revealing a doubles match two against two in full rally around it, glass walls, floodlights.
3-8s: the drone orbits low around the players: a volley at the net, a lunge to the glass wall, a jumping smash, the ball flashing past the lens, spectators cheering behind the glass.
8-12s: it flies over the glass wall, across the cheering spectators at high tables with drinks in their hands, the hall with more blue courts in the background.
12-15s: it glides down along the long dark bar counter past the row of guests on bar stools and settles exactly on @Image2, the bartender pouring a cocktail, warm amber light.

Real people with real physics, four players on the court, natural motion blur, light haze, deep contrast, vivid blue court floor, dark anthracite walls, warm amber bar light. Sound: ball hits, squeaking shoes, cheering crowd, clinking glasses, hall ambience, no music.
```

## Encoding für die Seite
`ffmpeg -i draft.mp4 -an -c:v libx264 -preset slow -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart clipN.mp4`

## Finale in 2K (2026-11-17, 03:47 bestellt, 04:08 fertig)
MiniMax H3 2K über die Schnittstelle (`create_video_task`, Modell `minimax-h3`), je 15 s, 150 Credits pro Sekunde = 2.250 Credits pro Clip, zusammen 4.500. Eugen hat die Summe vorher bestätigt.
Der jeweilige Test diente als Bewegungsvorlage (`video_urls`, auf 14,9 s gekürzt, weil Referenzvideos höchstens 15 s lang sein dürfen; hochgeladen per `upload_asset`). Prompts wie oben, ergänzt um: „@Video1 is the exact MOTION AND TIMING REFERENCE … only in far higher resolution“.

- Clip 1 2K (2560×1440, 15,08 s): https://edit.comfyonline.app/result/4c679550-0fc3-48d7-9a81-706d04be7024.mp4
- Clip 2 2K (2560×1440, 15,08 s): https://edit.comfyonline.app/result/4d52d5a0-f52f-4232-84f3-639f8e1d3f18.mp4

### Schnitt Clip 1 (Eugen, 04:09)
Der Flug durch den Gang war mit 4 s zu lang („da passiert nichts“). Sekunde 0,6 bis 4,6 läuft jetzt doppelt so schnell, der Clip ist 13,08 s lang:
`ffmpeg -i clip1-2k.mp4 -filter_complex "[0:v]trim=0:0.6,setpts=PTS-STARTPTS[a];[0:v]trim=0.6:4.6,setpts=(PTS-STARTPTS)/2,fps=24[b];[0:v]trim=4.6,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1[v]" -map "[v]" -an …`

### Fassungen für die Seite
Desktop 1920×1080 (`clip1.mp4`, `clip2.mp4`), Handy 960×540 (`clip1-m.mp4`, `clip2-m.mp4`), alle All-Intra, CRF 25.
Clip 1 endet nicht exakt auf dem Court-Bild: das Linienkreuz liegt im letzten Bild bei 43 % Höhe statt mittig. `Stage.tsx` zoomt das Video deshalb in Brücke A auf das Kreuz und schiebt es in die Mitte, bevor das Court-Bild übernimmt.

## Runde 2 (Eugen 04:18: „Menschen morphen, alle Männer gleich“)
Neue Start/End-Bilder per Bild-Bearbeitung (nur Leute getauscht, Halle gleich), GPT Image 2 4K Unlimited gewählt:
- Halle v2: https://edit.comfyonline.app/result/39f72039-98fe-42f0-b635-7474fd3db1f7.jpg (Nano: …/644f441e-adf1-4607-aae6-0590f7a6b803.png)
- Bar v2: https://edit.comfyonline.app/result/95d93666-5a33-423a-8c39-172763ef894b.jpg (Nano: …/6900bb13-4989-4e02-93ee-3c269b06ad11.png)
Prompts wie oben plus Block „PEOPLE, VERY IMPORTANT: … No morphing, no melting, no merging bodies …“, konkrete Personen je Court, höchstens vier Spieler pro Court, keine Gesichts-Nahaufnahmen.
Clip 2 zusätzlich: „7-8s: the woman in lilac smashes the yellow ball straight toward the camera, the ball flies directly into the lens“ → passt auf den Gelb-Übergang in die Spielersuche (`CLIP2_SPLIT` in `Stage.tsx` danach auf die echte Sekunde setzen).

## Runde 3 (Eugen 04:56): drei Clips, jeder endet genau im nächsten Motion-Kapitel
Keyframes (sjinn Unlimited 4K, gewählt jeweils GPT Image 2; Vergleich in `docs/look/v3/`):
- Ball füllt das Bild (Ende Clip 2): https://edit.comfyonline.app/result/0f7458ee-b2ce-4635-ac6b-178d2f591645.png
- Ball auf der Theke (Start Clip 3, Ball bei 51 % / 66 %, Ø 26 % der Höhe): https://edit.comfyonline.app/result/23795400-cfe4-4eda-8268-de76e7316379.png
- Halle exakt von oben, 4×2 Courts (Ende Clip 3, Courts gemessen in `Stage.tsx` → `PLAN`): https://edit.comfyonline.app/result/046d2595-c9f8-4195-bc28-e47c251611ac.png
Hinweis: die Bilder „Halle v2“ und „Bar v2“ aus Runde 2 stammen von Nano Banana 2 (jpg 5504 px), nicht von GPT Image 2.

Clip 1: Halle v2 → Court von oben (läuft, MiniMax H3 Unlimited, Prompt Runde 2).
Clip 2 (MiniMax H3 Unlimited, sobald frei, 10–12 s): Court von oben → gemischtes Doppel → Spielerin in Lila schmettert direkt in die Linse → Endbild Ball füllt das Bild. Auf der Seite dann `CLIP2_END = 1`, `CLIP2_WIPE = false`.
Clip 3 (Wan 3.0 Unlimited, sobald frei, 12 s): Ball auf der Theke → Barkeeperin reicht Cocktail an rothaarige Frau im grünen Jeanshemd, Toast mit Mann im senffarbenen Hoodie → Rückwärtsfahrt an der Bar entlang → Aufstieg → Halle exakt von oben. Prompt mit Block „PEOPLE, VERY IMPORTANT … half women and half men, ages 20 to 60 … different heights and builds …“. Auf der Seite dann `CLIP3 = "/video/clip3.mp4"`.

## Runde 4 (Eugen 21:05): alle drei Clips neu, NUR Prompt + 4K-Start-/Endbild, KEIN Referenzvideo
MiniMax H3 2K über `create_video_task`, 150 Credits/s (Clip 1 10 s = 1.500, Clip 2/3 je 12 s = 1.800, zusammen 5.100, von Eugen bestätigt).
- Clip 1 (f5bb0f9c, neu ruhig, 10 s): Halle v2 → Court von oben. https://edit.comfyonline.app/result/901d8594-9f6a-4699-8558-44d168d7df8b.mp4
- Clip 2 (46301fd8, 12 s): Court von oben → Smash → Ball füllt das Bild. https://edit.comfyonline.app/result/d1d8de04-df60-4fed-b82e-ab0ad4ab7908.mp4
- Clip 3 (f1e597c9, 12 s): Ball auf der Theke → Halle von oben. https://edit.comfyonline.app/result/603e59cb-ca34-45ee-8ade-03dcde1b03b1.mp4
Prompts wie Runde 3, ohne den @Video1-Block, dafür mit Block „SHARPNESS, VERY IMPORTANT …“; Clip 1 neu mit „CAMERA, SLOW AND CALM“ (gleitende Kamerafahrt statt FPV). Kein Upscaler nötig. Hallenplan `PLAN` neu vermessen: x 318/568/853/1128, y 52/512, 216×360.
