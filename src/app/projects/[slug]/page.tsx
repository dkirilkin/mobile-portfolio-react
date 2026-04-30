import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoAccessCard } from "@/components/demo-access-card";
import { MarkdownContent } from "@/components/markdown-content";
import { ProjectCarousel } from "@/components/project-carousel";
import { getProjectBySlug, getSortedProjects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function CodeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-1 h-5 w-5 shrink-0 text-[#6f47dc]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M8 9L4 12L8 15" />
      <path d="M16 9L20 12L16 15" />
      <path d="M14 5L10 19" />
    </svg>
  );
}

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
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcf8ff_0%,#f7f4fb_100%)] px-4 py-6 text-[#281f36] sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
        <div className="space-y-4">
          <ProjectCarousel
            screenshots={project.screenshots}
            title={project.title}
          />

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
          </div>
        </div>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-black/6 bg-white/90 p-5 shadow-[0_20px_50px_rgba(79,48,122,0.08)]">
            <p className="text-sm font-semibold text-[#7c6b96]">Категория</p>
            <p className="mt-2 text-lg font-medium leading-8">
              {project.category}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-black/6 bg-white/80 p-5 shadow-[0_20px_50px_rgba(79,48,122,0.08)]">
                <MarkdownContent
                  content={project.descriptionMarkdown}
                  className="mt-3"
                />
              </div>

              <div className="rounded-[2rem] border border-black/6 bg-white/80 p-5 shadow-[0_20px_50px_rgba(79,48,122,0.08)]">
                <div className="flex items-start gap-3">
                  <CodeIcon />
                  <div>
                    <p className="text-sm font-semibold text-[#7c6b96]">Стек</p>
                    <p className="mt-1 whitespace-pre-line text-base leading-8 text-[#4f455f]">
                      {project.stack}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#dbcff1] bg-white p-5 shadow-[0_24px_60px_rgba(106,75,153,0.10)] lg:sticky lg:top-10">
              <p className="text-lg font-semibold">Демо и доступ</p>
              <div className="mt-3">
                <DemoAccessCard html={project.demoAccessHTML} />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
