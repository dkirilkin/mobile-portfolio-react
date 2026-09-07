import localFont from "next/font/local";
import Link from "next/link";
import { Arrow } from "@/components/portfolio/arrow";
import { TELEGRAM_URL, TELEGRAM_USERNAME } from "@/constants/contact";
import { portfolioAuthor } from "@/data/portfolio";
import styles from "@/styles/portfolio.module.css";

const golos = localFont({ src: "../../public/fonts/GolosText.ttf", weight: "400 900", variable: "--portfolio-sans", display: "swap" });
const prata = localFont({ src: "../../public/fonts/Prata.ttf", weight: "400", variable: "--portfolio-display", display: "swap" });


export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.root} ${golos.variable} ${prata.variable}`}>
    <a className={styles.skipLink} href="#content">К содержанию</a>
    <header className={styles.header}>
      <Link href="/" className={styles.identity}>Дмитрий<br />Кирилкин</Link>
      <nav aria-label="Основная навигация" className="flex items-center gap-5 sm:gap-8">
        <Link href="/#cases">Кейсы</Link><Link href="/projects">Работы</Link><Link href="/#about" className={styles.aboutNav}>Обо мне</Link>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className={styles.headerContact}>Обсудить проект <Arrow diagonal /></a>
      </nav>
    </header>
    {children}
    <footer id="contact" className={styles.footer}>
      <div><h2>Какое приложение<br />вы хотите создать?</h2><a className={styles.contactLink} href={TELEGRAM_URL} target="_blank" rel="noreferrer">Расскажите о задаче <Arrow diagonal /></a></div>
      <div className={styles.footerDetails}><span>{portfolioAuthor.name}<br />{portfolioAuthor.role}</span><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">{TELEGRAM_USERNAME}</a><Link href="/#cases">Кейсы</Link><Link href="/projects">Все работы</Link></div>
    </footer>
  </div>;
}
