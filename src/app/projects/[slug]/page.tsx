import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoAccessCard } from "@/components/demo-access-card";
import { MarkdownContent } from "@/components/markdown-content";
import { ProjectCarousel } from "@/components/project-carousel";
import { getProjectBySlug, getSortedProjects } from "@/data/projects";

import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getSortedProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не найден",
    };
  }

  return {
    title: `${project.title} | Mobile Portfolio`,
    description: project.category,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={`md3-page ${styles.page}`}>
      <div className={`md3-container ${styles.container}`}>
        <div className={styles.hero}>
          <ProjectCarousel
            screenshots={project.screenshots}
            title={project.title}
          />

          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{project.title}</h1>
          </div>
        </div>

        <section className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              <section className={styles.metaBlock}>
                <p className={styles.metaLabel}>Категория</p>
                <p className={styles.categoryValue}>{project.category}</p>
              </section>

              <section className={styles.descriptionBlock}>
                <MarkdownContent
                  content={project.descriptionMarkdown}
                  className={styles.markdown}
                  variant="project-detail"
                />
              </section>

              <section className={styles.metaBlock}>
                <p className={styles.metaLabel}>Стек</p>
                <p className={styles.stackText}>{project.stack}</p>
              </section>
            </div>

            <aside className={`md3-surface ${styles.sideCard}`}>
              <p className={styles.sideTitle}>Демо-доступ</p>
              <div className={styles.demoCard}>
                <DemoAccessCard html={project.demoAccessHTML} />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
