import Link from "next/link";
import styles from "@/styles/portfolio.module.css";

export default function NotFound() {
  return <main id="content" className={styles.catalogPage}>
    <div className={styles.catalogHeading}><h1>Страница не найдена</h1><p>Возможно, адрес изменился. Все доступные проекты собраны в разделе работ.</p></div>
    <Link href="/projects" className={styles.textLink}>Перейти ко всем работам</Link>
  </main>;
}
