import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFrame } from "@/components/site-frame";

import "./globals.css";
import "./tailwind.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kirilkin.vercel.app"),
  title: { default: "Дмитрий Кирилкин — мобильные приложения", template: "%s — Дмитрий Кирилкин" },
  description: "Мобильные приложения Дмитрия Кирилкина: выездная зарядка электромобилей, доставка еды, интернет-магазин и рабочие инструменты.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <template id="portfolio-design-contract" dangerouslySetInnerHTML={{ __html: `<!--
THESIS: The portfolio shows different human tasks through real mobile interfaces, with separate cases and individual application pages.
OWN-WORLD: User-approved Close-up. Prata and Golos Text, lilac #ECE2ED and plum ink #421C3F. Screenshots have no decorative backplates or overlays.
STORY: Home, case systems, project catalog, individual applications with the original ProjectCarousel, then contact. Case descriptions and system relationships come from main.
FIRST VIEWPORT: Large serif statement and author, followed by charging, shopping and finance images. Contact in the header; project links in the spread.
FORM: User-selected direction C with later corrections overrides the initial recommendation; original seed 36c0398b. Scope: all canonical portfolio routes. Preview URLs redirect to canonical pages.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
