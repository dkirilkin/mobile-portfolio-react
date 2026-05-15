import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

import styles from "./project-list.module.css";

type ProjectListProps = {
  projects: Project[];
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.arrowIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug} className={styles.row}>
          <Link
            href={`/projects/${project.slug}`}
            className={styles.item}
            aria-label={`${project.homeTitle}. ${project.homeCategory}. ${project.homeDescription}`}
            title={project.homeDescription}
          >
            <div className={styles.itemMain}>
              <div
                className={styles.iconWrap}
                style={{ backgroundColor: project.homeIconBg }}
              >
                <Image
                  src={project.homeIconPath}
                  alt=""
                  aria-hidden="true"
                  width={28}
                  height={28}
                  className={styles.icon}
                />
              </div>

              <div className={styles.copy}>
                <p className={styles.title}>{project.homeTitle}</p>
                <p className={styles.description}>{project.homeDescription}</p>
              </div>
            </div>

            <span className={styles.arrowWrap}>
              <ArrowIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
