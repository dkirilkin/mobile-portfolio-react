import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Дмитрий Кирилкин — MVP и цифровые продукты под ключ",
  description:
    "Запускаю мобильные и веб-продукты от идеи до публикации в App Store и Google Play. ИИ-ускоренная разработка: быстрее и дешевле студии.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="app-shell">
          <SiteMenu />
          <div className="app-shell__body">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
