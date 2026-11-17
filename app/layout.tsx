import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { asset, BASE } from "@/lib/asset";

export const metadata: Metadata = {
  title: "FLUTLICHT 27 – Padelhalle mit 8 Courts, Bar und Verleih (Demo)",
  description: "FLUTLICHT 27: acht Padel-Courts unter Flutlicht, Schlägerverleih, Bar, Match- und Spielersuche. Interaktive Scroll-Demo.",
  openGraph: { title: "FLUTLICHT 27", description: "Wo die Nacht zum Heimspiel wird.", images: [asset("/img/hall.jpg")] },
  ...(BASE ? { metadataBase: new URL("https://engelstraenen.github.io"), robots: { index: false, follow: false } } : {}),
};
export const viewport: Viewport = { themeColor: "#0b0d12", width: "device-width", initialScale: 1 };

// Archivo lokal (Achsen wdth 100–125, wght 400–900), Pfad über asset() → funktioniert auch im Unterordner
const FONT_FACES = ["normal", "italic"]
  .map((st) => `@font-face{font-family:"Archivo Variable";font-style:${st};font-display:swap;font-weight:400 900;font-stretch:100% 125%;src:url(${asset(`/fonts/archivo-${st}.woff2`)}) format("woff2-variations");}`)
  .join("");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <style dangerouslySetInnerHTML={{ __html: FONT_FACES }} />
        <link rel="preload" href={asset("/fonts/archivo-italic.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={asset("/fonts/archivo-normal.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
