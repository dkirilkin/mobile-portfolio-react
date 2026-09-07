import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getCaseProjects, getCaseSystemNodes, getVisibleCaseBySlug, getVisibleSortedCases } from "@/data/cases";
import { CaseSystemMap } from "@/components/case-system-map";
import { ProjectLinks } from "@/components/portfolio/project-links";
import styles from "@/styles/portfolio.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getVisibleSortedCases().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getVisibleCaseBySlug((await params).slug);
  return { title: item?.title ?? "Кейс не найден", description: item?.summary, alternates: item ? { canonical: "/cases/" + item.slug } : undefined };
}
export default async function CasePage({ params }: Props) {
  const item = getVisibleCaseBySlug((await params).slug);
  if (!item) notFound();
  return <main id="content" className={styles.catalogPage}>
    <Link href="/#cases" className={styles.backLink}>Все кейсы</Link>
    <div className={styles.catalogHeading}><h1>{item.title}</h1><p>{item.summary}</p></div>
    {item.contribution && <div className={styles.caseContribution}><h2>Мой вклад</h2><p>{item.contribution}</p></div>}
    <section className={styles.caseApplications}><h2>Как устроена система</h2><CaseSystemMap nodes={getCaseSystemNodes(item)} edges={item.systemEdges} /></section>
    <div className={styles.caseDescriptionGrid}>
      <section><h2>Задача</h2><div className={styles.prose}><ReactMarkdown>{item.challengeMarkdown}</ReactMarkdown></div></section>
      <section><h2>Результат</h2><div className={styles.prose}><ReactMarkdown>{item.resultMarkdown}</ReactMarkdown></div></section>
    </div>
    <section className={styles.caseApplications}><h2>Приложения кейса</h2><ProjectLinks projects={getCaseProjects(item)} /></section>
    <Link href="/#cases" className={styles.textLink}>Вернуться к кейсам</Link>
  </main>;
}
