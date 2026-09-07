import type { Metadata } from "next";
import Link from "next/link";
import { ProjectLinks } from "@/components/portfolio/project-links";
import { getVisibleSortedProjects } from "@/data/projects";
import styles from "@/styles/portfolio.module.css";

export const metadata: Metadata = { title: "Все работы", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <main id="content" className={styles.catalogPage}>
    <Link href="/" className={styles.backLink}>На главную</Link>
    <div className={styles.catalogHeading}><h1>Все работы</h1><p>Мобильные приложения для клиентов, сотрудников и внутреннего учёта. Откройте проект, чтобы изучить интерфейсы, описание и стек.</p></div>
    <ProjectLinks projects={getVisibleSortedProjects()} />
  </main>;
}
