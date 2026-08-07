import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteMenu } from "@/components/site-menu";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Дмитрий Кирилкин — MVP и цифровые продукты под ключ",
  description:
    "Запускаю мобильные и веб-продукты от идеи до публикации в App Store и Google Play. ИИ-ускоренная разработка: быстрее и дешевле студии.",
  openGraph: {
    title: "Дмитрий Кирилкин — MVP и цифровые продукты под ключ",
    description:
      "Мобильные и веб-приложения от идеи до публикации в сторах — за недели, а не месяцы.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          К содержанию
        </a>
        <div className="app-shell">
          <SiteMenu />
          <div className="app-shell__body" id="main-content">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
