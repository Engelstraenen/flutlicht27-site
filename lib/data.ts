// Beispieldaten für die Demo. Preise, Namen und Zeiten sind Platzhalter.

export type RacketShape = "rund" | "tropfen" | "diamant";
export type Racket = {
  id: string;
  name: string;
  shape: RacketShape;
  level: string;
  feel: string;
  price: string;
  color: string;
  accent: string;
};

export const RACKETS: Racket[] = [
  { id: "r1", name: "Kontrolle 01", shape: "rund", level: "Einsteiger", feel: "Verzeiht fast alles. Großer Sweetspot.", price: "4 €", color: "#F4F7FF", accent: "#D8FF3C" },
  { id: "r2", name: "Kontrolle 02", shape: "rund", level: "Einsteiger bis Mittel", feel: "Weich im Treffpunkt, ruhig am Netz.", price: "4 €", color: "#0B0D12", accent: "#F4F7FF" },
  { id: "r3", name: "Allround 03", shape: "tropfen", level: "Mittel", feel: "Die Mitte aus Druck und Gefühl.", price: "5 €", color: "#D8FF3C", accent: "#0B0D12" },
  { id: "r4", name: "Allround 04", shape: "tropfen", level: "Mittel bis Fortgeschritten", feel: "Mehr Länge im Schlag, bleibt gutmütig.", price: "5 €", color: "#F2A23A", accent: "#0B0D12" },
  { id: "r5", name: "Power 05", shape: "diamant", level: "Fortgeschritten", feel: "Kopflastig. Für den Smash gebaut.", price: "6 €", color: "#FF4D3D", accent: "#F4F7FF" },
  { id: "r6", name: "Power 06 Carbon", shape: "diamant", level: "Turnier", feel: "Hart, direkt, kompromisslos.", price: "7 €", color: "#1A1D24", accent: "#D8FF3C" },
];

export type CourtState = "frei" | "spiel" | "sucht";
export type Court = { id: number; state: CourtState; minutes: number; players: string[]; level: number };

export const COURTS: Court[] = [
  { id: 1, state: "spiel", minutes: 34, players: ["Mara", "Jonas", "Elif", "Ben"], level: 4 },
  { id: 2, state: "sucht", minutes: 0, players: ["Tariq", "Lena", "Paul"], level: 3 },
  { id: 3, state: "spiel", minutes: 12, players: ["Sofia", "Karim", "Nele", "Tom"], level: 5 },
  { id: 4, state: "frei", minutes: 0, players: [], level: 0 },
  { id: 5, state: "spiel", minutes: 51, players: ["Ida", "Milan", "Aylin", "Felix"], level: 2 },
  { id: 6, state: "frei", minutes: 0, players: [], level: 0 },
  { id: 7, state: "sucht", minutes: 0, players: ["Noah", "Zoe"], level: 5 },
  { id: 8, state: "spiel", minutes: 5, players: ["Lukas", "Hanna", "Emre", "Pia"], level: 3 },
];

export type OpenMatch = { id: string; host: string; time: string; level: number; court: number; spots: number };

export const OPEN_MATCHES: OpenMatch[] = [
  { id: "m1", host: "Tariq", time: "Heute 19:30", level: 3, court: 2, spots: 1 },
  { id: "m2", host: "Noah", time: "Heute 20:00", level: 5, court: 7, spots: 2 },
  { id: "m3", host: "Greta", time: "Morgen 07:00", level: 2, court: 4, spots: 3 },
  { id: "m4", host: "Deniz", time: "Morgen 18:30", level: 4, court: 6, spots: 1 },
];

export const RANKING = [
  { name: "Sofia & Karim", points: 1840, trend: 2 },
  { name: "Mara & Jonas", points: 1765, trend: 0 },
  { name: "Noah & Zoe", points: 1690, trend: 1 },
  { name: "Elif & Ben", points: 1602, trend: -1 },
  { name: "Lena & Paul", points: 1540, trend: 3 },
  { name: "Ida & Milan", points: 1475, trend: -2 },
];

export const AMERICANO_NAMES = ["Mara", "Jonas", "Elif", "Ben", "Sofia", "Karim", "Noah", "Zoe"];

export const LEVELS = ["Erster Schlag", "Einsteiger", "Sicher im Spiel", "Mittel", "Fortgeschritten", "Stark", "Turnier"];
