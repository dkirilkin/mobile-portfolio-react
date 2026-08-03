"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TelegramIcon } from "@/components/telegram-icon";
import { TELEGRAM_URL } from "@/constants/contact";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          <strong className={styles.strong}>Product-разработчик</strong>.
          Запускаю MVP и цифровые продукты с ИИ-ускоренным пайплайном.
        </p>
        <p>Дмитрий Кирилкин</p>
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
    </footer>
  );
}
