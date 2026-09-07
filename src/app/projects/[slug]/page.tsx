import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getVisibleProjectBySlug, getVisibleSortedProjects } from "@/data/projects";
import { getVisibleCaseBySlug } from "@/data/cases";
import { ProjectCarousel } from "@/components/project-carousel";
import { DemoAccessCard } from "@/components/demo-access-card";
import { Arrow } from "@/components/portfolio/arrow";
import styles from "@/styles/portfolio.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getVisibleSortedProjects().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getVisibleProjectBySlug((await params).slug);
  return { title: project?.title ?? "Работа не найдена", description: project?.homeDescription, alternates: project ? { canonical: `/projects/${project.slug}` } : undefined };
}
export default async function ProjectPage({ params }: Props) {
  const project = getVisibleProjectBySlug((await params).slug);
  if (!project) notFound();
  const caseItem = project.caseSlug && project.isVisibleInCase ? getVisibleCaseBySlug(project.caseSlug) : undefined;
  return <main id="content" className={styles.catalogPage}>
    <Link href="/projects" className={styles.backLink}>Все работы</Link>
    <div className={styles.catalogHeading}><h1>{project.title}</h1><p>{project.category}{project.slug === "e-commerce" && <><br />Демопроект · оплата в тестовом режиме</>}</p></div>
    {caseItem && <Link href={`/cases/${caseItem.slug}`} className={styles.textLink}>Кейс: {caseItem.title} <Arrow /></Link>}
    <div className={styles.projectCarousel}><ProjectCarousel screenshots={project.screenshots} title={project.title} presentation="plain" /></div>
    <div className={styles.projectDetails}>
      <div><div className={styles.prose}><ReactMarkdown>{project.descriptionMarkdown}</ReactMarkdown></div><section className={styles.projectStack}><h2>Стек</h2><p>{project.stack}</p></section></div>
      <aside className={styles.projectDemo}><h2>Демо-доступ</h2><DemoAccessCard html={project.demoAccessHTML} /></aside>
    </div>
    <Link href="/projects" className={styles.textLink}>Вернуться ко всем работам <Arrow /></Link>
  </main>;
}
