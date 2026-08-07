import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`md3-page ${styles.page}`}>
      <div className={`md3-container ${styles.container}`}>
        <Reveal as="p" className={styles.code} aria-hidden="true">
          404
        </Reveal>
        <Reveal as="h1" className={styles.title} delay={0.08}>
          Такой страницы нет
        </Reveal>
        <Reveal as="p" className={styles.text} delay={0.16}>
          Возможно, ссылка устарела или в адресе опечатка.
          Лучше начать с главной или посмотреть проекты.
        </Reveal>
        <Reveal className={styles.actions} delay={0.24}>
          <Link href="/" className="md3-button md3-button--filled">
            На главную
          </Link>
          <Link href="/projects" className="md3-button md3-button--outlined">
            Все проекты
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
