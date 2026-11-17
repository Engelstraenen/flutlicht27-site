"use client";
import { useState } from "react";

export default function Finale() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="finale" id="buchen" aria-labelledby="fin-h">
        <div className="cone" aria-hidden="true" />
        <p className="kicker">Dein Court wartet</p>
        <h2 id="fin-h">
          <span>FLUTLICHT</span> <span className="num">27</span>
        </h2>
        <p className="lead">90 Minuten. Vier Leute. Ein Court unter Flutlicht.</p>
        <button type="button" className="btn big" onClick={() => setSent(true)} aria-describedby="fin-note">
          Court buchen
        </button>
        <p id="fin-note" className="note" aria-live="polite">
          {sent ? "Das ist eine Demo. Hier startet später die echte Buchung." : "Täglich 7 bis 24 Uhr · Schläger und Bälle vor Ort"}
        </p>
      </section>
      <footer className="foot">
        <p>FLUTLICHT 27 ist eine fiktive Padelhalle. Demo-Seite, alle Angaben sind Platzhalter.</p>
        <p>
          <a href="#">Impressum</a> · <a href="#">Datenschutz</a>
        </p>
      </footer>
    </>
  );
}
