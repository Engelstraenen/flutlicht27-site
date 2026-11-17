export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (t: number) => {
  t = clamp(t);
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Trapez: 0 -> 1 -> 0 um die Mitte c mit Breite span
export const win = (p: number, c: number, span: number) => {
  const h = span / 2;
  const ramp = span * 0.3;
  if (p < c - h || p > c + h) return 0;
  return Math.min(smooth((p - (c - h)) / ramp), smooth((c + h - p) / ramp));
};
