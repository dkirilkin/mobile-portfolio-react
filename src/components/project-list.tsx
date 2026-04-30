import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="mt-6 divide-y divide-[#d2cbd3]">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group flex items-start gap-4 px-1 py-4 transition-colors duration-200 hover:bg-white/30"
          aria-label={`${project.homeTitle}. ${project.homeCategory}. ${project.homeDescription}`}
          title={project.homeDescription}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-200 group-hover:scale-[1.03]"
            style={{ backgroundColor: project.homeIconBg }}
          >
            <Image
              src={project.homeIconPath}
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </div>

          <div className="min-w-0 flex-1 pr-2">
            <p className="text-[1rem] leading-6 tracking-[0.03125rem] text-[#231d2a]">
              {project.homeTitle}
            </p>
            <p className="mt-0.5 text-[0.875rem] leading-5 tracking-[0.015625rem] text-[#6d6674]">
              {project.homeDescription}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
