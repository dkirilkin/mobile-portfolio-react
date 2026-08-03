import Link from "next/link";

import { CaseStages } from "@/components/case-stages";
import type { Case } from "@/types/project";

import styles from "./case-card.module.css";

type CaseCardProps = {
  caseItem: Case;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.ctaIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <article className={`md3-surface ${styles.card}`}>
      <div className={styles.header}>
        <p className="md3-eyebrow">{caseItem.category}</p>
        <h3 className={styles.title}>
          <Link href={`/cases/${caseItem.slug}`} className={styles.titleLink}>
            {caseItem.title}
          </Link>
        </h3>
        <p className={styles.summary}>{caseItem.summary}</p>
      </div>

      <CaseStages stages={caseItem.stages} />

      <Link
        href={`/cases/${caseItem.slug}`}
        className={`md3-button md3-button--tonal ${styles.cta}`}
      >
        Смотреть кейс
        <ArrowIcon />
      </Link>
    </article>
  );
}
