"""Kostenloser KI-Upscaler (Real-ESRGAN General x4v3, ONNX, CPU) für einzelne Bilder.
Kachelweise 128er Kacheln mit Überlappung, weiches Zusammenblenden.
python3 up.py in.png out.png [eingang_breite] [ausgang_breite]"""
import sys, time
import numpy as np
import onnxruntime as ort
from PIL import Image

T, OV, S = 128, 12, 4

def session():
    o = ort.SessionOptions()
    o.intra_op_num_threads = 0
    return ort.InferenceSession(__file__.replace("up.py", "x4v3dyn.onnx"), o, providers=["CPUExecutionProvider"])


def make_dynamic():
    """Eingang von fest 128×128 auf beliebige Größe umstellen (ganzes Bild in einem Lauf)."""
    import onnx
    m = onnx.load(__file__.replace("up.py", "x4v3.onnx"))
    for t in list(m.graph.input) + list(m.graph.output):
        d = t.type.tensor_type.shape.dim
        d[2].dim_param, d[3].dim_param = "h", "w"
    del m.graph.value_info[:]
    onnx.save(m, __file__.replace("up.py", "x4v3dyn.onnx"))


def upscale_full(sess, img: np.ndarray) -> np.ndarray:
    x = (img.astype(np.float32) / 255.0).transpose(2, 0, 1)[None]
    y = sess.run(None, {"image": x})[0][0]
    return (np.clip(y.transpose(1, 2, 0), 0, 1) * 255).round().astype(np.uint8)

def upscale(sess, img: np.ndarray, batch: int = 8) -> np.ndarray:
    h, w, _ = img.shape
    step = T - 2 * OV
    ys = list(range(0, max(h - T, 0) + 1, step))
    xs = list(range(0, max(w - T, 0) + 1, step))
    if ys[-1] + T < h: ys.append(h - T)
    if xs[-1] + T < w: xs.append(w - T)
    out = np.zeros((h * S, w * S, 3), np.float32)
    wsum = np.zeros((h * S, w * S, 1), np.float32)
    # Gewichtsmaske: Rand weich ausblenden
    r = np.ones(T * S, np.float32)
    ramp = np.linspace(0.05, 1, OV * S)
    r[: OV * S] = ramp
    r[-OV * S:] = ramp[::-1]
    mask = (r[:, None] * r[None, :])[..., None]
    jobs = [(y, x) for y in ys for x in xs]
    inp = img.astype(np.float32) / 255.0
    for i in range(0, len(jobs), batch):
        chunk = jobs[i : i + batch]
        tiles = np.stack([inp[y : y + T, x : x + T].transpose(2, 0, 1) for y, x in chunk])
        res = np.concatenate([sess.run(None, {"image": tiles[k : k + 1]})[0] for k in range(len(chunk))])
        for (y, x), t in zip(chunk, res):
            t = np.clip(t.transpose(1, 2, 0), 0, 1)
            out[y * S : (y + T) * S, x * S : (x + T) * S] += t * mask
            wsum[y * S : (y + T) * S, x * S : (x + T) * S] += mask
    return (out / np.maximum(wsum, 1e-6) * 255).round().astype(np.uint8)

if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    win = int(sys.argv[3]) if len(sys.argv) > 3 else 960
    wout = int(sys.argv[4]) if len(sys.argv) > 4 else 2560
    im = Image.open(src).convert("RGB")
    im = im.resize((win, round(im.height * win / im.width)), Image.LANCZOS)
    t = time.time()
    up = upscale_full(session(), np.asarray(im))
    res = Image.fromarray(up).resize((wout, round(up.shape[0] * wout / up.shape[1])), Image.LANCZOS)
    res.save(dst)
    print(f"{src} -> {dst} {res.size} in {time.time() - t:.1f}s")
