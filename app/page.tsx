import Finale from "@/components/Finale";
import Nav from "@/components/Nav";
import Play from "@/components/Play";
import Stage from "@/components/Stage";

export default function Page() {
  return (
    <>
      <a className="skip" href="#spielen">Zum Inhalt springen</a>
      <Nav />
      <main id="top">
        <Stage />
        <Play />
        <Finale />
      </main>
    </>
  );
}
