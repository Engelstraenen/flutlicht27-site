"use client";

const jump = (e: React.MouseEvent<HTMLAnchorElement>, to: string | number) => {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
  if (!lenis) return;
  e.preventDefault();
  lenis.scrollTo(to, { duration: 1.6 });
};

// Sprungziele in der Bühne in vh, passend zu S in components/Stage.tsx (Bühne 1110vh)
const vh = (v: number) => (typeof window === "undefined" ? 0 : (v / 100) * window.innerHeight);

export default function Nav() {
  return (
    <nav className="nav" aria-label="Hauptmenü">
      <a className="brand" href="#top" onClick={(e) => jump(e, 0)}>
        FLUTLICHT <b>27</b>
      </a>
      <ul>
        <li><a href="#top" onClick={(e) => jump(e, vh(40))}>Halle</a></li>
        <li><a href="#verleih" onClick={(e) => jump(e, vh(400))}>Verleih</a></li>
        <li><a href="#match" onClick={(e) => jump(e, vh(805))}>Mitspielen</a></li>
        <li><a href="#bar" onClick={(e) => jump(e, vh(975))}>Bar</a></li>
        <li><a href="#spielen" onClick={(e) => jump(e, "#spielen")}>Spielen</a></li>
      </ul>
      <a className="btn small" href="#buchen" onClick={(e) => jump(e, "#buchen")}>Court buchen</a>
    </nav>
  );
}
