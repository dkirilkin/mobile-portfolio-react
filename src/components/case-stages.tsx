import Link from "next/link";

import type { CaseStage, CaseStageStatus } from "@/types/project";

import styles from "./case-stages.module.css";

const statusLabels: Record<CaseStageStatus, string> = {
  done: "Готово",
  "in-progress": "В разработке",
  planned: "Планируется",
};

type CaseStagesProps = {
  stages: CaseStage[];
};

export function CaseStages({ stages }: CaseStagesProps) {
  return (
    <ol className={styles.list}>
      {stages.map((stage, index) => (
        <li key={stage.title} className={styles.item}>
          <span className={styles.step} aria-hidden="true">
            {index + 1}
          </span>

          <div className={styles.body}>
            <div className={styles.titleRow}>
              {stage.projectSlug ? (
                <Link
                  href={`/projects/${stage.projectSlug}`}
                  className={`${styles.title} ${styles.titleLinked}`}
                >
                  {stage.title}
                </Link>
              ) : (
                <p className={styles.title}>{stage.title}</p>
              )}

              <span
                className={`${styles.status} ${styles[`status-${stage.status}`]}`}
              >
                {statusLabels[stage.status]}
              </span>
            </div>

            <p className={styles.description}>{stage.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
