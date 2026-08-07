import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseSystemMap } from "@/components/case-system-map";
import { MarkdownContent } from "@/components/markdown-content";
import { ProjectList } from "@/components/project-list";
import { TelegramIcon } from "@/components/telegram-icon";
import { TELEGRAM_URL } from "@/constants/contact";
import { getCaseBySlug, getCaseProjects, getSortedCases } from "@/data/cases";

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

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getSortedCases().map((caseItem) => ({
    slug: caseItem.slug,
  }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    return {
      title: "Кейс не найден",
    };
  }

  return {
    title: `${caseItem.title} | Mobile Portfolio`,
    description: caseItem.summary,
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    notFound();
  }

  const caseProjects = getCaseProjects(caseItem);

  return (
    <main className={`md3-page ${styles.page}`}>
      <div className={`md3-container ${styles.container}`}>
        <Link href="/#cases" className={styles.backLink}>
          <BackIcon />
          Все кейсы
        </Link>

        <header className={styles.header}>
          <p className={styles.category}>{caseItem.category}</p>
          <h1 className={styles.title}>{caseItem.title}</h1>
          <p className={styles.summary}>{caseItem.summary}</p>
        </header>

        <section className={`md3-surface ${styles.systemSection}`}>
          <h2 className={styles.sectionTitle}>Как устроена система</h2>
          <CaseSystemMap
            nodes={caseItem.systemNodes}
            edges={caseItem.systemEdges}
          />
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Задача</h2>
            <MarkdownContent
              content={caseItem.challengeMarkdown}
              className={styles.markdown}
              variant="project-detail"
            />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Результат</h2>
            <MarkdownContent
              content={caseItem.resultMarkdown}
              className={styles.markdown}
              variant="project-detail"
            />
          </section>
        </div>

        {caseProjects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Проекты кейса</h2>
            <ProjectList projects={caseProjects} />
          </section>
        )}

        <section className={`md3-surface ${styles.ctaCard}`}>
          <h2 className={styles.sectionTitle}>Нужна похожая система?</h2>
          <p className={styles.ctaText}>
            Спроектирую и запущу продукт с несколькими ролями, приложениями и
            общим backend.
          </p>
          <Link
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={`md3-button md3-button--filled ${styles.ctaButton}`}
          >
            <TelegramIcon className={styles.ctaIcon} />
            Обсудить проект
          </Link>
        </section>
      </div>
    </main>
  );
}
