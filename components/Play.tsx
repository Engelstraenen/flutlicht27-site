"use client";
import { useEffect, useMemo, useState } from "react";
import { AMERICANO_NAMES, COURTS, LEVELS, OPEN_MATCHES, RACKETS, RANKING, type Court, type OpenMatch } from "@/lib/data";
import { RacketArt } from "./RacketArt";

const STATE_LABEL: Record<Court["state"], string> = { frei: "Frei", spiel: "Spiel läuft", sucht: "Sucht Spieler" };

function HallPlan() {
  const [courts, setCourts] = useState<Court[]>(COURTS);
  const [sel, setSel] = useState(2);
  const [note, setNote] = useState("");

  // Simulierter Live-Betrieb: Spielminuten laufen hoch
  useEffect(() => {
    const t = window.setInterval(() => {
      setCourts((cs) => cs.map((c) => (c.state === "spiel" ? { ...c, minutes: c.minutes >= 89 ? 1 : c.minutes + 1 } : c)));
    }, 2600);
    return () => window.clearInterval(t);
  }, []);

  const court = courts.find((c) => c.id === sel)!;
  const act = () => {
    if (court.state === "frei") {
      setCourts((cs) => cs.map((c) => (c.id === sel ? { ...c, state: "sucht", players: ["Du"], level: 3 } : c)));
      setNote(`Court ${sel} ist für dich reserviert. Mitspieler können jetzt beitreten.`);
    } else if (court.state === "sucht") {
      const players = [...court.players, "Du"];
      setCourts((cs) => cs.map((c) => (c.id === sel ? { ...c, players, state: players.length >= 4 ? "spiel" : "sucht", minutes: 0 } : c)));
      setNote(players.length >= 4 ? `Court ${sel} ist voll. Viel Spaß beim Match.` : `Du bist auf Court ${sel} dabei.`);
    } else {
      setNote(`Court ${sel} wird in ${90 - court.minutes} Minuten frei. Wir merken dich vor.`);
    }
  };

  return (
    <div className="plan">
      <div className="plan-map" role="group" aria-label="Hallenplan mit acht Courts">
        {courts.map((c) => (
          <button key={c.id} type="button" className={`pc ${c.state}${c.id === sel ? " sel" : ""}`} aria-pressed={c.id === sel} onClick={() => { setSel(c.id); setNote(""); }}>
            <span className="pc-no">{c.id}</span>
            <span className="pc-net" aria-hidden="true" />
            {c.state === "spiel" && <i className="pc-ball" aria-hidden="true" style={{ animationDelay: `${c.id * -0.37}s` }} />}
            <span className="pc-state">{c.state === "spiel" ? `${c.minutes} min` : STATE_LABEL[c.state]}</span>
          </button>
        ))}
      </div>
      <aside className="plan-info" aria-live="polite">
        <p className="kicker">Court {court.id}</p>
        <h3>{STATE_LABEL[court.state]}</h3>
        {court.players.length > 0 ? (
          <p className="who">
            {court.players.join(" · ")}
            {court.state === "sucht" && <em> · {4 - court.players.length} Platz{4 - court.players.length > 1 ? "e" : ""} frei</em>}
          </p>
        ) : (
          <p className="who">Niemand auf dem Platz. 90 Minuten gehören dir.</p>
        )}
        {court.level > 0 && <p className="lvl">Level {court.level} · {LEVELS[court.level - 1]}</p>}
        <button type="button" className="btn" onClick={act}>
          {court.state === "frei" ? "Court buchen" : court.state === "sucht" ? "Mitspielen" : "Danach vormerken"}
        </button>
        {note && <p className="note">{note}</p>}
        <ul className="legend">
          <li className="frei">Frei</li>
          <li className="spiel">Spiel läuft</li>
          <li className="sucht">Sucht Spieler</li>
        </ul>
      </aside>
    </div>
  );
}

function MatchBoard() {
  const [matches, setMatches] = useState<OpenMatch[]>(OPEN_MATCHES);
  const [level, setLevel] = useState(3);
  const [time, setTime] = useState("Heute 19:30");
  const [joined, setJoined] = useState<string[]>([]);
  const [only, setOnly] = useState(false);
  const times = ["Heute 19:30", "Heute 21:00", "Morgen 07:00", "Morgen 18:30"];

  const shown = only ? matches.filter((m) => Math.abs(m.level - level) <= 1) : matches;
  const create = () => {
    const id = `n${matches.length + 1}`;
    setMatches((ms) => [{ id, host: "Du", time, level, court: 4, spots: 3 }, ...ms]);
    setJoined((j) => [...j, id]);
  };
  const join = (id: string) => {
    if (joined.includes(id)) return;
    setJoined((j) => [...j, id]);
    setMatches((ms) => ms.map((m) => (m.id === id ? { ...m, spots: Math.max(0, m.spots - 1) } : m)));
  };

  return (
    <div className="board">
      <form className="create" onSubmit={(e) => { e.preventDefault(); create(); }}>
        <h3>Match erstellen</h3>
        <label htmlFor="lvl">
          Dein Level <b>{level}</b> <span>{LEVELS[level - 1]}</span>
        </label>
        <input id="lvl" type="range" min={1} max={7} step={1} value={level} onChange={(e) => setLevel(Number(e.target.value))} />
        <fieldset>
          <legend>Wann</legend>
          <div className="chips">
            {times.map((t) => (
              <button key={t} type="button" className={t === time ? "chip on" : "chip"} aria-pressed={t === time} onClick={() => setTime(t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>
        <button className="btn" type="submit">Match eröffnen</button>
      </form>
      <div className="open">
        <div className="open-head">
          <h3>Spieler gesucht</h3>
          <label className="toggle">
            <input type="checkbox" checked={only} onChange={(e) => setOnly(e.target.checked)} /> nur mein Level (±1)
          </label>
        </div>
        <ul aria-live="polite">
          {shown.map((m) => {
            const mine = joined.includes(m.id);
            return (
              <li key={m.id} className={mine ? "mine" : ""}>
                <span className="lv">L{m.level}</span>
                <span className="info">
                  <b>{m.host}</b> sucht {m.spots === 0 ? "niemanden mehr" : `${m.spots} Spieler`}
                  <small>{m.time} · Court {m.court}</small>
                </span>
                <button type="button" className="btn ghost" disabled={mine || m.spots === 0} onClick={() => join(m.id)}>
                  {mine ? "Dabei" : m.spots === 0 ? "Voll" : "Beitreten"}
                </button>
              </li>
            );
          })}
          {shown.length === 0 && <li className="empty">Kein offenes Match auf deinem Level. Eröffne selbst eins.</li>}
        </ul>
      </div>
    </div>
  );
}

// Americano: jede Runde neue Partner, Punkte zählen einzeln. Rotation nach dem Kreisverfahren.
function americano(names: string[]) {
  const n = names.length;
  const rounds: [string, string, string, string][][] = [];
  const arr = [...names];
  for (let r = 0; r < n - 1; r++) {
    const pairs: [string, string][] = [];
    for (let i = 0; i < n / 2; i++) pairs.push([arr[i], arr[n - 1 - i]]);
    const games: [string, string, string, string][] = [];
    for (let i = 0; i + 1 < pairs.length; i += 2) games.push([pairs[i][0], pairs[i][1], pairs[i + 1][0], pairs[i + 1][1]]);
    rounds.push(games);
    arr.splice(1, 0, arr.pop()!);
  }
  return rounds;
}

function Americano() {
  const [count, setCount] = useState(8);
  const [round, setRound] = useState(0);
  const rounds = useMemo(() => americano(AMERICANO_NAMES.slice(0, count)), [count]);
  const r = Math.min(round, rounds.length - 1);
  return (
    <div className="americano">
      <h3>Americano-Generator</h3>
      <p className="sub">Jede Runde ein neuer Partner. Am Ende gewinnt, wer einzeln die meisten Punkte holt.</p>
      <div className="chips">
        {[4, 8].map((c) => (
          <button key={c} type="button" className={c === count ? "chip on" : "chip"} aria-pressed={c === count} onClick={() => { setCount(c); setRound(0); }}>
            {c} Spieler
          </button>
        ))}
      </div>
      <div className="rounds" aria-live="polite">
        <div className="round-nav">
          <button type="button" className="btn ghost" onClick={() => setRound(Math.max(0, r - 1))} disabled={r === 0} aria-label="Vorherige Runde">←</button>
          <b>Runde {r + 1} / {rounds.length}</b>
          <button type="button" className="btn ghost" onClick={() => setRound(Math.min(rounds.length - 1, r + 1))} disabled={r === rounds.length - 1} aria-label="Nächste Runde">→</button>
        </div>
        {rounds[r].map((g, i) => (
          <p key={i} className="game">
            <small>Court {i + 1}</small>
            <span>{g[0]} & {g[1]}</span>
            <i>gegen</i>
            <span>{g[2]} & {g[3]}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function Ranking() {
  const max = RANKING[0].points;
  return (
    <div className="ranking">
      <h3>Rangliste der Halle</h3>
      <ol>
        {RANKING.map((t, i) => (
          <li key={t.name}>
            <span className="pos">{i + 1}</span>
            <span className="team">{t.name}</span>
            <span className="bar"><i style={{ width: `${(t.points / max) * 100}%` }} /></span>
            <span className="pts">{t.points}</span>
            <span className={`trend ${t.trend > 0 ? "up" : t.trend < 0 ? "down" : ""}`} aria-label={t.trend > 0 ? `${t.trend} Plätze hoch` : t.trend < 0 ? `${-t.trend} Plätze runter` : "unverändert"}>
              {t.trend > 0 ? `▲${t.trend}` : t.trend < 0 ? `▼${-t.trend}` : "–"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const QUESTIONS = [
  { q: "Wie oft stehst du auf dem Court?", a: ["Zum ersten Mal", "Ab und zu", "Jede Woche"] },
  { q: "Was willst du am Ball spüren?", a: ["Kontrolle", "Beides", "Druck"] },
  { q: "Wo spielst du am liebsten?", a: ["Hinten an der Wand", "Überall", "Vorn am Netz"] },
];

function Finder() {
  const [ans, setAns] = useState<number[]>([]);
  const step = ans.length;
  const done = step === QUESTIONS.length;
  const score = ans.reduce((s, a) => s + a, 0); // 0..6
  const pick = RACKETS[Math.min(RACKETS.length - 1, Math.round((score / 6) * (RACKETS.length - 1)))];
  return (
    <div className="finder">
      <div className="finder-q" aria-live="polite">
        <p className="kicker">Schläger-Finder</p>
        {!done ? (
          <>
            <h3>{QUESTIONS[step].q}</h3>
            <div className="chips big">
              {QUESTIONS[step].a.map((a, i) => (
                <button key={a} type="button" className="chip" onClick={() => setAns([...ans, i])}>
                  {a}
                </button>
              ))}
            </div>
            <p className="steps">Frage {step + 1} von {QUESTIONS.length}</p>
          </>
        ) : (
          <>
            <h3>Dein Leihschläger: {pick.name}</h3>
            <p className="sub">{pick.shape} · {pick.level}. {pick.feel}</p>
            <p className="price">{pick.price} <small>pro Session</small></p>
            <button type="button" className="btn ghost" onClick={() => setAns([])}>Noch einmal</button>
          </>
        )}
      </div>
      <div className={`finder-art${done ? " on" : ""}`} aria-hidden={!done}>
        <RacketArt racket={done ? pick : RACKETS[2]} />
      </div>
    </div>
  );
}

const TABS = [
  { id: "finder", label: "Schläger-Finder" },
  { id: "rangliste", label: "Rangliste" },
  { id: "americano", label: "Americano" },
] as const;

function Extras() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("finder");
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#finder") setTab("finder");
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <div className="extras" id="finder">
      <div className="tabs" role="tablist" aria-label="Extras">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} className={tab === t.id ? "tab on" : "tab"} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="panel">
        {tab === "finder" && <Finder />}
        {tab === "rangliste" && <Ranking />}
        {tab === "americano" && <Americano />}
      </div>
    </div>
  );
}

export default function Play() {
  return (
    <section className="play" id="spielen" aria-labelledby="play-h">
      <header className="play-head">
        <p className="kicker">Spielen</p>
        <h2 id="play-h">Finde dein Match.</h2>
        <p>Sieh live, wo gespielt wird. Steig ein, wo ein Platz frei ist. Oder eröffne dein eigenes Spiel.</p>
        <p className="demo">Demo mit Beispieldaten</p>
      </header>
      <HallPlan />
      <MatchBoard />
      <Extras />
    </section>
  );
}
