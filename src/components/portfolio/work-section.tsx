import Link from "next/link";
import type { PortfolioWork } from "@/types/portfolio";
import { Arrow } from "./arrow";
import { ImageViewer } from "./image-viewer";
import styles from "@/styles/portfolio.module.css";

export function WorkSection({ work, index }: { work: PortfolioWork; index: number }) {
  return <article id={work.id} className={`${styles.workSection} ${styles[`work${index % 3}`]}`}>
    <div className={styles.workCopy}>
      <h3>{work.href ? <Link href={work.href}>{work.title}</Link> : work.title}</h3>
      <p className={styles.workContext}>{work.context}{work.status && <span>{work.status}</span>}</p>
      <p className={styles.workDescription}>{work.description}</p>
      <ul className={styles.features}>{work.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      {work.href && <Link href={work.href} className={styles.textLink}>Смотреть кейс <Arrow /></Link>}
    </div>
    <div className={`${styles.workImages} ${work.images.length === 3 ? styles.threeImages : ""}`}>
      {work.images.map(image => <ImageViewer image={image} key={image.src} sizes="(max-width: 760px) 42vw, 23vw" />)}
    </div>
  </article>;
}
