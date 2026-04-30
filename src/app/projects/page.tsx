import { ProjectList } from "@/components/project-list";
import { getSortedProjects } from "@/data/projects";

const allProjects = getSortedProjects();

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3f7] px-4 pb-10 pt-6 text-[#211b29] sm:px-6">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-[2.2rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#231d2a]">
          Все проекты
        </h1>
        <p className="mt-3 max-w-[38rem] text-[1rem] leading-6 text-[#5f576a]">
          Подборка low-code и mobile кейсов: клиентские приложения, внутренние
          инструменты и сервисные решения.
        </p>

        <ProjectList projects={allProjects} />
      </section>
    </main>
  );
}
