"use client";

import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

import styles from "./hero-project-marquee.module.css";

type HeroProjectMarqueeProps = {
  projects: Project[];
};

type HeroProjectCardProps = {
  inert?: boolean;
  priority?: boolean;
  project: Project;
};

function HeroProjectCard({
  inert = false,
  priority = false,
  project,
}: HeroProjectCardProps) {
  const preview = project.screenshots[0];
  const title = project.homeTitle || project.title;

  if (!preview) {
    return null;
  }

  const frameContent = (
    <div className={styles.frame}>
      <div className={styles.screen}>
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes="(min-width: 1080px) 204px, 152px"
          className={styles.image}
          priority={priority}
        />
      </div>
    </div>
  );

  if (inert) {
    return (
      <div className={styles.slide} aria-hidden="true">
        {frameContent}
      </div>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={styles.slide}
      aria-label={title}
    >
      {frameContent}
    </Link>
  );
}

export function HeroProjectMarquee({
  projects,
}: HeroProjectMarqueeProps) {
  const projectsWithScreens = projects.filter((project) => project.screenshots.length > 0);

  return (
    <div className={styles.root}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.group}>
            {projectsWithScreens.map((project, index) => (
              <HeroProjectCard
                key={project.slug}
                project={project}
                priority={index < 2}
              />
            ))}
          </div>

          <div className={styles.group} aria-hidden="true">
            {projectsWithScreens.map((project) => (
              <HeroProjectCard key={`${project.slug}-duplicate`} project={project} inert />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
