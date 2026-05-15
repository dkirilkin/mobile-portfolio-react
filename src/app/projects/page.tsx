import { ProjectList } from "@/components/project-list";
import { getSortedProjects } from "@/data/projects";

import styles from "./page.module.css";

const allProjects = getSortedProjects();

export default function ProjectsPage() {
  return (
    <main className={`md3-page ${styles.page}`}>
      <section className={`md3-container ${styles.container}`}>
        <div className={styles.header}>
          <p className="md3-eyebrow">Каталог кейсов</p>
          <h1 className={styles.title}>Все проекты</h1>
          <p className={styles.description}>
            Подборка low-code и mobile кейсов: клиентские приложения,
            внутренние инструменты и сервисные решения.
          </p>
        </div>

        <ProjectList projects={allProjects} />
      </section>
    </main>
  );
}
