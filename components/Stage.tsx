"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { asset } from "@/lib/asset";
import { RACKETS } from "@/lib/data";
import { clamp, lerp, smooth, win } from "@/lib/math";
import { RacketArt } from "./RacketArt";

// Scroll-Länge der Bühne in vh. Alle Kapitelgrenzen stehen hier, nirgends sonst.
// Ablauf, jede Brücke ist ein Match-Cut (letztes Bild des einen = erstes Bild des nächsten):
// Film 1 Halle → Court von oben → Motion Verleih → Ball → Film 2 Match → Ball in der Linse → Motion Spielersuche
// → Ball landet auf der Theke → Film 3 Bar + Aufstieg → Halle von oben → Hallenplan (Abschnitt „Spielen“).
const T = 1110;
const S = {
  film1: [0, 260],
  bridgeA: [260, 330],
  rackets: [330, 530],
  bridgeB: [530, 590],
  film2: [590, 720],
  bridgeD: [720, 740],
  match: [740, 890],
  bridgeE: [890, 930],
  film3: [930, 1060],
  bridgeC: [1060, 1110],
} as const;

// Platzhalter für die Scroll-Videos: Standbilder mit Kamerafahrt. Sobald die Clips fertig sind,
// ersetzt eine Frame-Sequenz (Canvas-Scrub wie bei EISWERK) jeweils alle Shots eines Films.
const FILM1 = [
  { src: "/img/hall.jpg", origin: "50% 46%", alt: "Blick von oben durch die Padelhalle FLUTLICHT 27 mit acht blauen Courts unter Flutlicht" },
  { src: "/img/fpv.jpg", origin: "50% 50%", alt: "Gemischtes Doppel: eine Spielerin schlägt einen Smash, dahinter die Bar" },
  { src: "/img/action.jpg", origin: "50% 55%", alt: "Volley am Netz im gemischten Doppel, blauer Court unter Flutlicht" },
];
const FILM2 = [
  { src: "/img/match.jpg", origin: "50% 55%", alt: "Gemischtes Doppel auf dem Court, Zuschauer hinter der Scheibe" },
  { src: "/img/smash.jpg", origin: "50% 50%", alt: "Der gelbe Ball fliegt direkt auf die Kamera zu" },
];

// Scroll-Videos (All-Intra, damit jedes Bild direkt anspringbar ist). Leerer Pfad = Standbild-Fassung.
// Clip 1 läuft über Film 1 bis in Brücke A (endet auf dem Court von oben), Clip 2 von Brücke B bis zur Bar.
// Je Clip zwei Größen: Desktop 1920×1080, Handy 960×540 (Dateiname mit -m).
const CLIP1 = "/video/clip1.mp4";
const CLIP2 = "/video/clip2.mp4";
const mobileSrc = (p: string) => p.replace(".mp4", "-m.mp4");
// Bilder mit 2560er Original haben eine 1280er Fassung fürs Handy
const HAS_1280 = ["/img/hall.jpg", "/img/court-top.jpg", "/img/counter.jpg", "/img/hall-top.jpg", "/img/bar.jpg"];
const srcSet = (p: string) =>
  HAS_1280.includes(p) ? `${asset(p.replace(".jpg", "-1280.jpg"))} 1280w, ${asset(p)} 2560w` : undefined;
const CLIP1_END = S.bridgeA[0] + 0.46 * (S.bridgeA[1] - S.bridgeA[0]); // vh
const CLIP2_START = S.bridgeB[0] + 0.46 * (S.bridgeB[1] - S.bridgeB[0]); // vh, ab hier öffnet der Ball das Video
// Clip 2 endet auf dem gelben Ball, der die Linse füllt (Draft Runde 3). CLIP2_END = genutzter Anteil der Laufzeit,
// CLIP2_WIPE = Grafik-Ball statt Video-Ball (nur für Clips ohne Ball am Ende).
const CLIP2_END = 1;
const CLIP2_WIPE = false;
const D_COVER = S.bridgeD[0] + 0.55 * (S.bridgeD[1] - S.bridgeD[0]); // vh, ab hier ist das Bild ganz gelb
// Clip 3: Ball auf der Theke → Bar → Aufstieg → Halle exakt von oben. Leer = Standbilder als Platzhalter.
const CLIP3 = "/video/clip3.mp4";
const C_PLAN = S.bridgeC[0] + 0.02 * (S.bridgeC[1] - S.bridgeC[0]); // vh, hier steht Film 3 auf dem letzten Bild
// Position des Balls im ersten Bild von Film 3 (Anteil der Bildbreite/-höhe, Bild 16:9) und Durchmesser (Anteil der Höhe)
const LAND = { x: 0.51, y: 0.657, d: 0.26 };
// Die acht Courts im letzten Bild von Clip 3 (viewBox 1600×900, gemessen per Farbmaske an der 2K-Fassung)
const PLAN = [318, 568, 853, 1128].flatMap((x) => [52, 512].map((y) => ({ x, y, w: 216, h: 360 })));

// Spielersuche: drei Plätze belegt, einer frei. Score springt mit dem Ballweg.
const SQUAD = [
  { name: "Ayla", lvl: "3,5", tone: "#ff6b57" },
  { name: "Malik", lvl: "4,0", tone: "#1848d8" },
  { name: "Jana", lvl: "3,0", tone: "#0b0d12" },
];
const SCORE = ["0", "15", "30", "40", "Spiel"];

const BEATS1 = [
  { at: 0.2, span: 0.18, side: "left", kicker: "Die Halle", title: "Acht Courts. Ein Dach.", text: "Blauer Boden, dunkle Wände, Flutlicht bis in die letzte Ecke." },
  { at: 0.5, span: 0.2, side: "right", kicker: "Das Spiel", title: "Zwei gegen zwei.", text: "Padel ist Doppel. Schnell, laut, nah an der Scheibe." },
  { at: 0.8, span: 0.2, side: "left", kicker: "Der Moment", title: "Jeder Ball zählt.", text: "Wand, Netz, Smash. Hier wird jeder Punkt gefeiert." },
];
const BEATS2 = [
  { at: 0.42, span: 0.36, side: "left", kicker: "Das Match", title: "Mittendrin.", text: "Vier Spieler, Glas ringsum, jeder Ballwechsel ein Duell." },
];
const BEATS3 = [
  { at: 0.26, span: 0.34, side: "left", kicker: "Die Bar", title: "Softdrinks. Cocktails. Revanche.", text: "Nach dem Match an die Theke, mit Blick auf die Courts." },
  { at: 0.7, span: 0.3, side: "right", kicker: "Die Halle", title: "Acht Courts. Live belegt.", text: "Von oben siehst du, wo gespielt wird und wo noch Platz ist." },
];
const FILM3 = [
  { src: "/img/counter.jpg", alt: "Gelber Padelball auf der Theke, dahinter die Bar mit Gästen" },
  { src: "/img/hall-top.jpg", alt: "Die Halle von oben: acht blaue Courts in zwei Reihen" },
];

const CHAPTERS = [
  { label: "Halle", from: 0 },
  { label: "Action", from: 100 },
  { label: "Verleih", from: 300 },
  { label: "Match", from: 560 },
  { label: "Mitspielen", from: 725 },
  { label: "Bar", from: 905 },
  { label: "Plan", from: 1040 },
];

export default function Stage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const $ = <E extends Element = HTMLElement>(s: string) => wrap.querySelector(s) as unknown as E;
    const $$ = <E extends Element = HTMLElement>(s: string) => Array.from(wrap.querySelectorAll(s)) as unknown as E[];
    // Statische Fassung: per ?static oder wenn das Gerät reduzierte Bewegung wünscht (alle Inhalte untereinander, keine Scroll-Effekte)
    const isStatic =
      new URLSearchParams(window.location.search).has("static") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isStatic) {
      document.documentElement.classList.add("static");
      return;
    }

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const shots1 = $$<HTMLElement>("[data-film='1'] .shot");
    const shots2 = $$<HTMLElement>("[data-film='2'] .shot");
    const beats1 = $$<HTMLElement>("[data-beats='1'] .beat");
    const beats2 = $$<HTMLElement>("[data-beats='2'] .beat");
    const beats3 = $$<HTMLElement>("[data-beats='3'] .beat");
    const wipe = $("[data-wipe]");
    const mt = $("[data-match]");
    const mtTitle = $$<HTMLElement>("[data-mt-title] span");
    const mtGhost = $("[data-mt-ghost]");
    const mtLines = $$<SVGElement>("[data-mt-court] .cl");
    const mtPath = $<SVGPathElement>("[data-mt-path]");
    const mtBall = $<SVGCircleElement>("[data-mt-ball]");
    const mtHits = $$<SVGCircleElement>("[data-mt-court] .hit");
    const mtScore = $$<HTMLElement>("[data-mt-score] b");
    const mtSlots = $$<HTMLElement>("[data-mt-slots] > *");
    const mtCta = $("[data-mt-cta]");
    const mtInner = Array.from(mt.querySelectorAll<HTMLElement>(":scope > :not(.mt-ghost)"));
    const pathLen = mtPath.getTotalLength();
    // Stellen auf dem Ballweg (Anteil), an denen der Ball aufkommt oder an die Scheibe geht
    const HIT_AT = [0.2, 0.42, 0.62, 0.86];
    const hero = $("[data-hero]");
    const cue = $("[data-cue]");
    const film1 = $("[data-film='1']");
    const film2 = $("[data-film='2']");
    const courtTop = $("[data-court-top]");
    const flat = $("[data-flat]");
    const lines = $$<SVGElement>("[data-lines] .ln");
    const rk = $("[data-rackets]");
    const rkTitle = $$<HTMLElement>("[data-rk-title] span");
    const track = $("[data-track]");
    const cards = $$<HTMLElement>("[data-track] .card");
    const ghost = $("[data-ghost]");
    const swing = $("[data-swing]");
    const ball = $("[data-ball]");
    const film3 = $("[data-film='3']");
    const shots3 = $$<HTMLElement>("[data-film='3'] .shot");
    const land = $("[data-land]");
    const plan = $("[data-plan]");
    const planDim = $("[data-plan-dim]");
    const planCourts = $$<SVGRectElement>("[data-plan] .pc-r");
    const planNets = $$<SVGLineElement>("[data-plan] .pc-n");
    const planHead = $("[data-plan-head]");
    const vid1 = $<HTMLVideoElement>("[data-clip='1']");
    const vid2 = $<HTMLVideoElement>("[data-clip='2']");
    const vid3 = $<HTMLVideoElement>("[data-clip='3']");
    // Handy (schmal): 720p-Fassung, Tablet und Rechner: 1080p.
    const small = Math.min(window.innerWidth, window.innerHeight) < 600;
    // Vorschau-Hosting ohne Teilabruf (Range): Clip komplett laden und als Blob einsetzen, sonst kann der Browser nicht springen.
    const blobUrls: string[] = [];
    const load = (v: HTMLVideoElement | null, p: string) => {
      if (!v) return;
      const url = asset(small ? mobileSrc(p) : p);
      if (process.env.NEXT_PUBLIC_BLOB_VIDEO !== "1") { v.src = url; return; }
      fetch(url)
        .then((r) => r.blob())
        .then((b) => { const u = URL.createObjectURL(new Blob([b], { type: "video/mp4" })); blobUrls.push(u); v.src = u; })
        .catch(() => { v.src = url; });
    };
    // Videos erst laden, wenn sie gebraucht werden: Startbild und Text kommen zuerst (LCP), dann Clip 1, die anderen beim Näherkommen.
    const queue: { v: HTMLVideoElement | null; p: string; at: number; done: boolean }[] = [
      { v: vid1, p: CLIP1, at: 4, done: false },
      { v: vid2, p: CLIP2, at: S.film1[1] * 0.55, done: false },
      { v: vid3, p: CLIP3, at: S.rackets[1], done: false },
    ];
    const pull = (vNow: number) =>
      queue.forEach((q) => {
        if (!q.done && q.p && vNow >= q.at) {
          q.done = true;
          load(q.v, q.p);
          q.v?.addEventListener("loadeddata", () => (force = 3), { once: true });
        }
      });
    let force = 3;
    const t1 = window.setTimeout(() => pull(4), 2500);
    const ready = (v: HTMLVideoElement | null) => !!v && v.readyState >= 2 && v.duration > 0;
    const seek = (v: HTMLVideoElement, c: number) => {
      const t = c * (v.duration - 0.06);
      if (!v.seeking && Math.abs(v.currentTime - t) > 0.015) v.currentTime = t;
      v.style.opacity = "1";
    };
    const railFill = $("[data-rail-fill]");
    const railItems = $$<HTMLElement>("[data-rail] li");

    let trackW = 0;
    let vw = window.innerWidth;
    let cardX: number[] = [];
    const measure = () => {
      vw = window.innerWidth;
      trackW = Math.max(0, track.scrollWidth - vw);
      cardX = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);

    const seg = (v: number, k: keyof typeof S) => clamp((v - S[k][0]) / (S[k][1] - S[k][0]));

    const film = (els: HTMLElement[], p: number, extra: number) => {
      const P = p * els.length;
      els.forEach((el, i) => {
        const t = clamp((P - (i - 0.2)) / 1.2);
        const op = i === 0 ? 1 : smooth((P - (i - 0.2)) / 0.2);
        const last = i === els.length - 1 ? extra : 0;
        el.style.opacity = String(op);
        el.style.transform = `scale(${1.04 + 0.4 * Math.pow(t, 1.15) + last})`;
      });
    };
    const beats = (els: HTMLElement[], cfg: { at: number; span: number }[], p: number) => {
      els.forEach((el, i) => {
        const o = win(p, cfg[i].at, cfg[i].span);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 28}px, 0)`;
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
      });
    };

    let last = -1;
    const update = (g: number) => {
      if (Math.abs(g - last) < 0.00002) return;
      last = g;
      const v = g * T;
      const f1 = seg(v, "film1");
      const bA = seg(v, "bridgeA");
      const rp = seg(v, "rackets");
      const bB = seg(v, "bridgeB");
      const f2 = seg(v, "film2");
      const bC = seg(v, "bridgeC");
      const bD = seg(v, "bridgeD");
      const mp = seg(v, "match");
      const bE = seg(v, "bridgeE");
      const f3 = seg(v, "film3");

      // Film 1 und Hero
      film1.style.visibility = bA >= 1 ? "hidden" : "visible";
      const v1 = ready(vid1);
      const v2 = ready(vid2);
      if (v1) {
        seek(vid1, clamp(v / CLIP1_END));
        // Das letzte Bild von Clip 1 (Draft Runde 2) zeigt das Linienkreuz mittig; der Zoom setzt den Sturzflug sanft fort.
        const k = smooth(bA / 0.46);
        vid1.style.transformOrigin = "50% 50%";
        vid1.style.transform = `scale(${1 + 0.12 * k})`;
      }
      else film(shots1, f1, smooth(bA) * 1.7);
      beats(beats1, BEATS1, f1);
      const h = 1 - smooth(f1 / 0.14);
      hero.style.opacity = String(h);
      hero.style.transform = `translate3d(0, ${(1 - h) * -60}px, 0) scale(${1 + (1 - h) * 0.08})`;
      hero.style.visibility = h > 0.01 ? "visible" : "hidden";
      cue.style.opacity = String(1 - smooth(f1 / 0.04));

      // Brücke A: Flug taucht auf den Court ab, Blau füllt das Bild, Linien zeichnen sich
      const ct = v1 ? smooth((bA - 0.3) / 0.16) : smooth(bA / 0.45);
      courtTop.style.opacity = String(ct * (1 - smooth((bA - 0.75) / 0.25)));
      courtTop.style.transform = `scale(${v1 ? 1 : lerp(1.7, 1, smooth(bA / 0.65))})`;
      const fl = smooth((bA - 0.42) / 0.33) * (1 - smooth((bB - 0.5) / 0.4));
      flat.style.opacity = String(fl);
      flat.style.visibility = fl > 0.005 ? "visible" : "hidden";
      const draw = smooth((bA - 0.5) / 0.5);
      const gridFade = lerp(1, 0.22, smooth(rp / 0.12));
      // Vor Brücke B kommen die zwei Hauptlinien voll zurück: das Kreuz der Grafik liegt genau auf dem Kreuz
      // im ersten Bild von Clip 2, so entsteht beim Öffnen keine neue Linie aus dem Nichts.
      const back = smooth((bB - 0.1) / 0.3);
      lines.forEach((l, i) => {
        l.style.strokeDashoffset = String(1 - clamp(draw * 1.25 - i * 0.08));
        l.style.opacity = String(i < 2 ? lerp(gridFade, 1, back) : gridFade * (1 - back));
      });

      // Schlägerverleih: horizontale Fahrt
      const rkOn = smooth((bA - 0.7) / 0.3) * (1 - smooth((bB - 0.35) / 0.35));
      rk.style.opacity = String(rkOn);
      rk.style.visibility = rkOn > 0.005 ? "visible" : "hidden";
      rkTitle.forEach((s, i) => {
        const o = smooth((bA - 0.72 - i * 0.012) / 0.2);
        s.style.opacity = String(o);
        s.style.transform = `translate3d(0, ${(1 - o) * 110}%, 0)`;
      });
      const run = clamp((rp - 0.06) / 0.88);
      const x = -run * trackW;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      ghost.style.transform = `translate3d(${lerp(-8, 34, rp)}vw, 0, 0)`;
      cards.forEach((c, i) => {
        const d = clamp((cardX[i] + x - vw / 2) / vw, -1, 1);
        const art = c.firstElementChild as HTMLElement;
        art.style.transform = `rotate(${d * -26}deg) scale(${1 - Math.abs(d) * 0.16}) translate3d(0, ${Math.abs(d) * 26}px, 0)`;
        c.style.opacity = String(1 - Math.abs(d) * 0.45);
      });

      // Brücke B: Grafik-Schläger schlägt den Ball, der Ball öffnet das Video
      const sw = smooth((bB - 0.02) / 0.22) * (1 - smooth((bB - 0.5) / 0.2));
      swing.style.opacity = String(sw);
      swing.style.transform = `translate3d(0,0,0) rotate(${lerp(-62, 38, smooth((bB - 0.16) / 0.2))}deg)`;
      const fly = smooth((bB - 0.28) / 0.22);
      ball.style.opacity = String(smooth((bB - 0.24) / 0.05) * (1 - smooth((bB - 0.52) / 0.14)));
      ball.style.transform = `translate3d(${lerp(-17, 0, fly)}vw, ${lerp(20, 0, fly)}vh, 0) translate(-50%, -50%) scale(${lerp(0.5, 1.5, fly)})`;
      const open = smooth((bB - 0.46) / 0.54);
      film2.style.clipPath = open >= 1 ? "none" : `circle(${open * 150}vmax at 55% 42%)`;
      film2.style.visibility = open > 0 && v < D_COVER + 2 ? "visible" : "hidden";

      // Film 2 bis zum Ball in der Linse
      if (v2) seek(vid2, clamp((v - CLIP2_START) / (D_COVER - CLIP2_START)) * CLIP2_END);
      else film(shots2, f2 * 0.5, 0);
      beats(beats2, BEATS2, f2);

      // Brücke D: ein Ball fliegt aus dem Match direkt auf die Kamera zu und füllt das Bild
      const wb = smooth(bD / 0.6);
      const wOut = smooth((bD - 0.62) / 0.3);
      wipe.style.opacity = String(CLIP2_WIPE ? smooth(bD / 0.08) * (1 - wOut) : 0);
      wipe.style.visibility = CLIP2_WIPE && bD > 0 && wOut < 1 ? "visible" : "hidden";
      wipe.style.transform = `translate(-50%, -50%) translate3d(${lerp(14, 0, wb)}vw, ${lerp(-6, 0, wb)}vh, 0) scale(${lerp(0.04, 1, Math.pow(wb, 2.2))}) rotate(${wb * 160}deg)`;

      // Spielersuche (Motion), danach schrumpft sie zu einem Punkt im Barlicht und gibt Film 3 frei
      const mtOn = smooth((bD - (CLIP2_WIPE ? 0.5 : 0.35)) / (CLIP2_WIPE ? 0.12 : 0.4));
      const mtOff = smooth((bE - 0.05) / 0.25);
      mt.style.opacity = String(mtOn);
      mt.style.visibility = mtOn > 0.005 && bE < 1 ? "visible" : "hidden";
      mtInner.forEach((el) => {
        el.style.opacity = String(1 - mtOff);
        el.style.translate = `0 ${-mtOff * 8}vh`;
      });
      mtTitle.forEach((sp, i) => {
        const o = smooth((mp - 0.02 - i * 0.03) / 0.14);
        sp.style.opacity = String(o);
        sp.style.transform = `translate3d(0, ${(1 - o) * 110}%, 0)`;
      });
      mtGhost.style.transform = `translate3d(${lerp(6, -38, mp)}vw, 0, 0)`;
      const cDraw = smooth((mp - 0.02) / 0.24);
      mtLines.forEach((l, i) => (l.style.strokeDashoffset = String(1 - clamp(cDraw * 1.4 - i * 0.07))));
      const roll = smooth((mp - 0.18) / 0.5);
      mtPath.style.strokeDashoffset = String(1 - roll);
      const pt = mtPath.getPointAtLength(roll * pathLen);
      mtBall.setAttribute("cx", String(pt.x));
      mtBall.setAttribute("cy", String(pt.y));
      mtBall.style.opacity = String(smooth((mp - 0.17) / 0.03) * (1 - smooth((mp - 0.72) / 0.06)));
      let pts = 0;
      mtHits.forEach((h, i) => {
        const k = (roll - HIT_AT[i]) / 0.08;
        if (roll >= HIT_AT[i]) pts = i + 1;
        const on = k >= 0 && k <= 1;
        h.style.opacity = on ? String(1 - k) : "0";
        h.setAttribute("r", String(10 + (on ? k : 0) * 46));
      });
      mtScore.forEach((b, i) => {
        const d = i - pts;
        b.style.transform = `translate3d(0, ${d * 100}%, 0)`;
        b.style.opacity = d === 0 ? "1" : "0";
      });
      mtSlots.forEach((el, i) => {
        const o = smooth((mp - 0.5 - i * 0.07) / 0.12);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(${(1 - o) * 60}px, ${(1 - o) * 24}px, 0) rotate(${(1 - o) * (i % 2 ? 6 : -6)}deg)`;
      });
      const cta = smooth((mp - 0.84) / 0.1);
      mtCta.style.opacity = String(cta);
      mtCta.style.transform = `translate3d(0, ${(1 - cta) * 20}px, 0)`;
      // Brücke E: der Ball der Spielersuche fällt auf die Theke, um ihn herum öffnet sich Film 3
      const vh = window.innerHeight;
      const vwNow = window.innerWidth;
      // Bild 16:9 mit object-fit: cover → Ballposition auf dem Bildschirm
      const sc = Math.max(vwNow / 1600, vh / 900);
      const lx = vwNow / 2 + (LAND.x - 0.5) * 1600 * sc;
      const ly = vh / 2 + (LAND.y - 0.5) * 900 * sc;
      const ld = LAND.d * 900 * sc;
      const drop = smooth((bE - 0.1) / 0.35);
      const bounce = Math.sin(clamp((bE - 0.45) / 0.15) * Math.PI) * 0.06 * vh;
      land.style.width = land.style.height = `${ld}px`;
      land.style.transform = `translate3d(${lx - ld / 2}px, ${lerp(-ld * 1.4, ly - ld / 2, drop) - bounce}px, 0) rotate(${drop * 300}deg)`;
      land.style.opacity = String(smooth((bE - 0.08) / 0.05) * (1 - smooth((bE - 0.82) / 0.12)));
      const reveal = smooth((bE - 0.55) / 0.4);
      film3.style.visibility = bE > 0.5 && bC < 1 ? "visible" : "hidden";
      film3.style.clipPath = reveal >= 1 ? "none" : `circle(${ld / 2 + reveal * Math.hypot(vwNow, vh)}px at ${lx}px ${ly}px)`;

      // Film 3: Bar, Aufstieg, Halle von oben (Video oder Platzhalter-Standbilder)
      const v3 = ready(vid3);
      if (v3) seek(vid3, clamp((v - S.film3[0]) / (C_PLAN - S.film3[0])));
      else {
        const k3 = clamp((v - S.film3[0]) / (C_PLAN - S.film3[0]));
        const a = smooth((k3 - 0.4) / 0.2);
        shots3[0].style.opacity = String(1 - a);
        shots3[0].style.transform = `scale(${1 + 0.35 * smooth(k3 / 0.6)})`;
        shots3[1].style.opacity = String(a);
        shots3[1].style.transform = `scale(${lerp(1.7, 1, smooth((k3 - 0.4) / 0.6))})`;
      }
      beats(beats3, BEATS3, f3);

      // Brücke C: die Courts im Bild werden zum Hallenplan
      const pDraw = smooth(bC / 0.35);
      planCourts.forEach((r, i) => {
        r.style.strokeDashoffset = String(1 - clamp(pDraw * 1.6 - i * 0.08));
        r.style.fillOpacity = String(smooth((bC - 0.3 - i * 0.02) / 0.25));
      });
      planNets.forEach((n) => (n.style.opacity = String(smooth((bC - 0.4) / 0.2))));
      plan.style.visibility = bC > 0 ? "visible" : "hidden";
      // Der Plan bleibt stehen, bis die Bühne nach oben wegscrollt und der Abschnitt „Spielen“ nachrückt (keine Schwarzblende).
      plan.style.opacity = "1";
      const pm = smooth((bC - 0.42) / 0.3);
      // Hochformat: so weit verkleinern, dass alle 8 Courts sichtbar sind (die Grafik ist auf 1600×900 „slice“ angelegt)
      const sSlice = Math.max(window.innerWidth / 1600, window.innerHeight / 900);
      const endScale = Math.min(0.64, (0.94 * window.innerWidth) / sSlice / 1060);
      plan.style.transform = `translate3d(0, ${pm * 13}vh, 0) scale(${1 - pm * (1 - endScale)})`;
      planDim.style.opacity = String(smooth((bC - 0.25) / 0.35));
      const ph = smooth((bC - 0.5) / 0.2) * (1 - smooth((bC - 0.9) / 0.1));
      planHead.style.opacity = String(ph);
      planHead.style.transform = `translate3d(0, ${(1 - ph) * 30}px, 0)`;

      // HUD
      railFill.style.transform = `scaleX(${g})`;
      let cur = 0;
      CHAPTERS.forEach((c, i) => {
        if (v >= c.from) cur = i;
      });
      railItems.forEach((li, i) => li.classList.toggle("on", i === cur));
    };

    let raf = 0;
    let lastG = -1;
    const onResize = () => (force = 3);
    window.addEventListener("resize", onResize);
    const tick = (time: number) => {
      lenis.raf(time);
      const r = wrap.getBoundingClientRect();
      const g = clamp(-r.top / (r.height - window.innerHeight));
      // Nur rechnen, wenn sich etwas bewegt hat (spart Rechenzeit im Leerlauf)
      if (g !== lastG || force > 0) {
        pull(g * T);
        update(g);
        lastG = g;
        force = Math.max(0, force - 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    wrap.classList.add("ready");

    return () => {
      window.clearTimeout(t1);
      window.removeEventListener("resize", onResize);
      blobUrls.forEach((u) => URL.revokeObjectURL(u));
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className="stage-wrap" style={{ height: `${T + 100}vh` }}>
      <div className="stage">
        {/* Film 1 */}
        <div className="layer film" data-film="1">
          {FILM1.map((s, i) => (
            <img key={s.src} className="shot" src={asset(s.src)} srcSet={srcSet(s.src)} sizes="100vw" alt={s.alt} style={{ transformOrigin: s.origin }} decoding="async" fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} />
          ))}
          {CLIP1 && <video className="clip" data-clip="1" muted playsInline preload="auto" aria-hidden="true" />}
          <div className="vignette" />
        </div>

        <header className="hero" data-hero>
          <p className="kicker">Padelhalle · 8 Courts · Bar · Verleih</p>
          <h1>
            <span>FLUTLICHT</span>
            <span className="num">27</span>
          </h1>
          <p className="claim">Wo die Nacht zum Heimspiel wird.</p>
        </header>
        <div className="cue" data-cue aria-hidden="true">
          <span>Scrollen</span>
          <i />
        </div>

        <div className="beats" data-beats="1">
          {BEATS1.map((b) => (
            <article key={b.title} className={`beat ${b.side}`}>
              <p className="kicker">{b.kicker}</p>
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </article>
          ))}
        </div>

        {/* Brücke A */}
        <img className="layer court-top" data-court-top src={asset("/img/court-top.jpg")} srcSet={srcSet("/img/court-top.jpg")} sizes="100vw" alt="" aria-hidden="true" decoding="async" loading="lazy" />
        <div className="layer flat" data-flat>
          <svg className="lines" data-lines viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <line className="ln" pathLength={1} x1="800" y1="-20" x2="800" y2="920" />
            <line className="ln" pathLength={1} x1="-20" y1="450" x2="1620" y2="450" />
            <line className="ln" pathLength={1} x1="-20" y1="120" x2="1620" y2="120" />
            <line className="ln" pathLength={1} x1="-20" y1="780" x2="1620" y2="780" />
            <line className="ln" pathLength={1} x1="240" y1="-20" x2="240" y2="920" />
            <line className="ln" pathLength={1} x1="1360" y1="-20" x2="1360" y2="920" />
          </svg>
        </div>

        {/* Schlägerverleih */}
        <section className="layer rackets" data-rackets aria-label="Schlägerverleih">
          <div className="rk-ghost" data-ghost aria-hidden="true">LEIHEN LEIHEN LEIHEN</div>
          <div className="rk-head">
            <p className="kicker dark">Schlägerverleih</p>
            <h2 data-rk-title>
              {"Nimm dir einen.".split(" ").map((w, i) => (
                <b key={i}>
                  <span>{w}</span>
                </b>
              ))}
            </h2>
          </div>
          <div className="track" data-track>
            <div className="intro-card">
              <p>Sechs Modelle, drei Formen. Rund für Kontrolle, Tropfen für die Mitte, Diamant für Druck.</p>
              <p className="small">Ausleihe pro Session an der Theke. Bälle gibt es dazu.</p>
            </div>
            {RACKETS.map((r, i) => (
              <article className="card" key={r.id}>
                <div className="art">
                  <RacketArt racket={r} />
                </div>
                <div className="meta">
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{r.name}</h3>
                  <p className="shape">
                    {r.shape} · {r.level}
                  </p>
                  <p className="feel">{r.feel}</p>
                  <p className="price">
                    {r.price} <small>pro Session</small>
                  </p>
                </div>
              </article>
            ))}
            <div className="outro-card">
              <p>Unsicher?</p>
              <a href="#finder">Zum Schläger-Finder</a>
            </div>
          </div>
        </section>

        {/* Brücke B */}
        <div className="layer swing-wrap" aria-hidden="true">
          <div className="swing" data-swing>
            <RacketArt racket={RACKETS[2]} />
          </div>
          <i className="ball" data-ball />
        </div>

        {/* Film 2 */}
        <div className="layer film" data-film="2">
          {FILM2.map((s) => (
            <img key={s.src} className="shot" src={asset(s.src)} srcSet={srcSet(s.src)} sizes="100vw" alt={s.alt} style={{ transformOrigin: s.origin }} decoding="async" loading="lazy" />
          ))}
          {CLIP2 && <video className="clip" data-clip="2" muted playsInline preload="auto" aria-hidden="true" />}
          <div className="vignette" />
          <div className="beats" data-beats="2">
            {BEATS2.map((b) => (
              <article key={b.title} className={`beat ${b.side}`}>
                <p className="kicker">{b.kicker}</p>
                <h2>{b.title}</h2>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Brücke D: Ball auf die Kamera */}
        <div className="layer wipe-wrap" aria-hidden="true">
          <i className="wipe" data-wipe />
        </div>

        {/* Spielersuche */}
        <section className="layer match" data-match aria-label="Match und Spielersuche">
          <div className="mt-ghost" data-mt-ghost aria-hidden="true">MATCH · MATCH · MATCH</div>
          <div className="mt-head">
            <p className="kicker">Match &amp; Spielersuche</p>
            <h2 data-mt-title>
              {"Einer fehlt noch.".split(" ").map((w, i) => (
                <b key={i}>
                  <span>{w}</span>
                </b>
              ))}
            </h2>
          </div>
          <div className="mt-score" data-mt-score aria-hidden="true">
            {SCORE.map((n) => (
              <b key={n}>{n}</b>
            ))}
          </div>
          <svg className="mt-court" data-mt-court viewBox="0 0 400 640" aria-hidden="true">
            <rect className="cl" pathLength={1} x="10" y="10" width="380" height="620" />
            <line className="cl" pathLength={1} x1="10" y1="320" x2="390" y2="320" />
            <line className="cl" pathLength={1} x1="10" y1="140" x2="390" y2="140" />
            <line className="cl" pathLength={1} x1="10" y1="500" x2="390" y2="500" />
            <line className="cl" pathLength={1} x1="200" y1="140" x2="200" y2="500" />
            <path className="trail" data-mt-path pathLength={1} d="M 120 600 Q 150 480 260 420 Q 330 380 388 300 Q 300 210 150 170 Q 60 140 14 60 Q 120 160 230 230 Q 300 270 330 460" />
            <circle className="hit" cx="260" cy="420" r="10" />
            <circle className="hit" cx="388" cy="300" r="10" />
            <circle className="hit" cx="14" cy="60" r="10" />
            <circle className="hit" cx="330" cy="460" r="10" />
            <circle className="mt-ball" data-mt-ball r="11" cx="120" cy="600" />
          </svg>
          <div className="mt-side">
            <ul className="mt-slots" data-mt-slots>
              {SQUAD.map((p) => (
                <li key={p.name}>
                  <i style={{ background: p.tone }}>{p.name[0]}</i>
                  <span>{p.name}</span>
                  <small>Level {p.lvl}</small>
                </li>
              ))}
              <li className="free">
                <i>+</i>
                <span>Dein Platz</span>
                <small>Heute 20:30 · Court 5</small>
              </li>
            </ul>
            <a className="btn mt-cta" data-mt-cta href="#spielen">
              Match finden →
            </a>
          </div>
        </section>

        {/* Brücke C */}
        {/* Brücke E: Ball landet auf der Theke */}
        <i className="land" data-land aria-hidden="true" />

        {/* Film 3 */}
        <div className="layer film" data-film="3">
          {FILM3.map((s) => (
            <img key={s.src} className="shot" src={asset(s.src)} srcSet={srcSet(s.src)} sizes="100vw" alt={s.alt} decoding="async" loading="lazy" />
          ))}
          {CLIP3 && <video className="clip" data-clip="3" muted playsInline preload="auto" aria-hidden="true" />}
          <div className="vignette" />
          <div className="beats" data-beats="3">
            {BEATS3.map((b) => (
              <article key={b.title} className={`beat ${b.side}`}>
                <p className="kicker">{b.kicker}</p>
                <h2>{b.title}</h2>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Brücke C: Courts werden zum Hallenplan */}
        <div className="layer plan-wrap" aria-hidden="true">
          <div className="plan-dim" data-plan-dim />
          <svg className="plan-svg" data-plan viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            {PLAN.map((c, i) => (
              <g key={i}>
                <rect className="pc-r" pathLength={1} x={c.x} y={c.y} width={c.w} height={c.h} />
                <line className="pc-n" x1={c.x} x2={c.x + c.w} y1={c.y + c.h / 2} y2={c.y + c.h / 2} />
              </g>
            ))}
          </svg>
          <div className="plan-head" data-plan-head>
            <p className="kicker">Spielen</p>
            <p className="plan-title">Finde dein Match.</p>
          </div>
        </div>

        <nav className="rail" data-rail aria-hidden="true">
          <div className="bar">
            <i data-rail-fill />
          </div>
          <ol>
            {CHAPTERS.map((c) => (
              <li key={c.label}>{c.label}</li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
