import Link from "next/link";

import { TelegramIcon } from "@/components/telegram-icon";
import { TELEGRAM_URL, TELEGRAM_USERNAME } from "@/constants/contact";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <p className={styles.name}>Дмитрий Кирилкин</p>
          <p className={styles.tagline}>
            Product-разработчик. Запускаю MVP и цифровые продукты
            с ИИ-ускоренным пайплайном.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          <Link href="/" className={styles.navLink}>
            Главная
          </Link>
          <Link href="/projects" className={styles.navLink}>
            Проекты
          </Link>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            {TELEGRAM_USERNAME}
          </a>
        </nav>

        <Link
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className={`md3-button md3-button--filled ${styles.cta}`}
        >
          <TelegramIcon className={styles.icon} />
          Написать в Telegram
        </Link>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Дмитрий Кирилкин</p>
      </div>
    </footer>
  );
}
