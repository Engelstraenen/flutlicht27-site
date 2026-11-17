import type { Racket } from "@/lib/data";

// Kopf-Form je Schläger-Typ (Viewbox 200 x 420, Kopf oben, Griff unten)
const HEAD: Record<Racket["shape"], string> = {
  rund: "M100 12 C162 12 188 62 188 122 C188 190 150 236 124 262 L76 262 C50 236 12 190 12 122 C12 62 38 12 100 12 Z",
  tropfen: "M100 10 C166 10 190 58 188 112 C186 180 150 232 124 262 L76 262 C50 232 14 180 12 112 C10 58 34 10 100 10 Z",
  diamant: "M100 8 C150 8 192 40 190 96 C188 168 152 228 124 262 L76 262 C48 228 12 168 10 96 C8 40 50 8 100 8 Z",
};

export function RacketArt({ racket, className }: { racket: Racket; className?: string }) {
  const pid = `holes-${racket.id}`;
  const cid = `clip-${racket.id}`;
  return (
    <svg className={className} viewBox="0 0 200 420" role="img" aria-label={`Leihschläger ${racket.name}`}>
      <defs>
        <pattern id={pid} width="20" height="20" patternUnits="userSpaceOnUse" x="10" y="14">
          <circle cx="10" cy="10" r="3.4" fill="rgba(11,13,18,.82)" />
        </pattern>
        <clipPath id={cid}>
          <path d={HEAD[racket.shape]} />
        </clipPath>
      </defs>
      {/* Griff */}
      <rect x="84" y="262" width="32" height="140" rx="9" fill="#12151c" />
      {[286, 306, 326, 346, 366].map((y) => (
        <line key={y} x1="84" y1={y} x2="116" y2={y - 10} stroke="rgba(244,247,255,.22)" strokeWidth="2" />
      ))}
      <rect x="80" y="396" width="40" height="14" rx="6" fill={racket.accent} />
      {/* Herz (Übergang Griff/Kopf) */}
      <path d="M76 262 L100 214 L124 262 Z" fill="rgba(11,13,18,.55)" />
      {/* Kopf */}
      <path d={HEAD[racket.shape]} fill={racket.color} />
      <g clipPath={`url(#${cid})`}>
        <rect x="36" y="44" width="128" height="150" fill={`url(#${pid})`} />
        <path d="M-10 150 L210 90 L210 122 L-10 182 Z" fill={racket.accent} opacity=".9" />
        <path d="M-10 196 L210 136 L210 146 L-10 206 Z" fill={racket.accent} opacity=".45" />
      </g>
      <path d={HEAD[racket.shape]} fill="none" stroke="rgba(11,13,18,.5)" strokeWidth="5" />
    </svg>
  );
}
