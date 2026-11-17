"""Clip Bild für Bild hochskalieren (fortsetzbar, aufteilbar auf mehrere Rechner).
python3 run.py <video> <ausgabeordner> <teile_liste> <teile>   z. B. 0,1 3
Bearbeitet Bild i, wenn i % <teile> in <teile_liste>. Fertige Bilder werden übersprungen.
Danach zusammensetzen:  ffmpeg -framerate 24 -i <ordner>/%04d.jpg ...
"""
import os, subprocess, sys, time
import numpy as np
from PIL import Image
from up import session, upscale_full

video, outdir, parts = sys.argv[1], sys.argv[2], int(sys.argv[4])
part_set = {int(x) for x in sys.argv[3].split(',')}
WIN, WOUT = 960, 2560
src = os.path.join(outdir, "src")
os.makedirs(src, exist_ok=True)
if not os.path.exists(os.path.join(src, ".done")):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", video, "-vf", f"scale={WIN}:-2:flags=lanczos", "-q:v", "1", os.path.join(src, "%04d.jpg")], check=True)
    open(os.path.join(src, ".done"), "w").close()
frames = sorted(f for f in os.listdir(src) if f.endswith(".jpg"))
sess = session()
mine = [f for i, f in enumerate(frames) if i % parts in part_set]
for f in mine:
    dst = os.path.join(outdir, f)
    if os.path.exists(dst):
        continue
    t = time.time()
    up = upscale_full(sess, np.asarray(Image.open(os.path.join(src, f)).convert("RGB")))
    img = Image.fromarray(up).resize((WOUT, round(up.shape[0] * WOUT / up.shape[1])), Image.LANCZOS)
    img.save(dst + ".tmp.jpg", quality=95)
    os.replace(dst + ".tmp.jpg", dst)
    print(f, f"{time.time() - t:.1f}s", flush=True)
