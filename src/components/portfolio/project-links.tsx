import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { Arrow } from "./arrow";
import styles from "@/styles/portfolio.module.css";

export function ProjectLinks({ projects }: { projects: Project[] }) {
  return <div className={styles.projectList}>{projects.map(project =>
    <Link href={`/projects/${project.slug}`} className={styles.projectRow} key={project.slug}>
      <Image src={project.homeIconPath} alt="" width={48} height={48} className={styles.projectIcon} style={{ backgroundColor: project.homeIconBg }} />
      <div><h3>{project.homeTitle}</h3><p>{project.homeDescription}</p><span>{project.slug === "e-commerce" ? "Демопроект · тестовая оплата" : project.homeTags.join(" · ")}</span></div>
      <span className={styles.projectAction}>Смотреть работу <Arrow /></span>
    </Link>
  )}</div>;
}
