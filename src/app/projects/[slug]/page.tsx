import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DemoAccessCard } from "@/components/demo-access-card";
import { MarkdownContent } from "@/components/markdown-content";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCarousel } from "@/components/project-carousel";
import { getCaseBySlug } from "@/data/cases";
import { getProjectBySlug, getSortedProjects } from "@/data/projects";

import styles from "./page.module.css";

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.backIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

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
    title: `${project.title} | Дмитрий Кирилкин`,
    description: project.category,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseItem = project.caseSlug ? getCaseBySlug(project.caseSlug) : null;

  return (
    <main className={`md3-page ${styles.page}`}>
      <div className={`md3-container ${styles.container}`}>
        <Reveal>
          <Link href="/projects" className={styles.backLink}>
            <BackIcon />
            Все проекты
          </Link>
        </Reveal>

        <div className={styles.hero}>
          <Reveal y={40}>
            <ProjectCarousel
              screenshots={project.screenshots}
              title={project.title}
            />
          </Reveal>

          <div className={styles.titleBlock}>
            <Reveal as="h1" className={styles.title} delay={0.08}>
              {project.title}
            </Reveal>
          </div>
        </div>

        <section className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              {caseItem && (
                <section className={styles.metaBlock}>
                  <p className={styles.metaLabel}>Часть кейса</p>
                  <Link
                    href={`/cases/${caseItem.slug}`}
                    className={styles.caseLink}
                  >
                    {caseItem.title}
                  </Link>
                </section>
              )}

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
