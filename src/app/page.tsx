import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { openingWorks, portfolioAuthor, portfolioWorks } from "@/data/portfolio";
import { Arrow } from "@/components/portfolio/arrow";
import { WorkSection } from "@/components/portfolio/work-section";
import { ProjectLinks } from "@/components/portfolio/project-links";
import { getVisibleSortedProjects } from "@/data/projects";
import styles from "@/styles/portfolio.module.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <main id="content">
    <section className={styles.hero}>
      <div className={styles.heroHeading}><h1>За каждым экраном —<br /><span>чья-то задача.</span></h1><div className={styles.author}><Image src={portfolioAuthor.portrait} width={72} height={72} alt={portfolioAuthor.name} /><p>{portfolioAuthor.name}<span>{portfolioAuthor.role}</span></p></div></div>
      <div className={styles.openingGallery} aria-label="Разные задачи из портфолио">
        {openingWorks.map((work, index) => <Link key={work.id} href={work.href!} className={styles.openingWork}>
          <div className={styles.openingTitle}><h2>{work.shortTitle}</h2><Arrow diagonal /></div>
          <Image src={work.images[0].src} width={work.images[0].width} height={work.images[0].height} alt={work.images[0].alt} sizes="(max-width: 760px) 30vw, 25vw" preload={index === 0} />
          <p>{work.context}{work.status && <span>{work.status}</span>}</p>
        </Link>)}
      </div>
      <div className={styles.heroNote}><p>Пользовательские приложения и рабочие инструменты.<br />Разные сценарии — от покупки до выполнения заказа.</p><div className={styles.linkGroup}><a href="#cases" className={styles.textLink}>Смотреть кейсы <Arrow /></a><Link href="/projects" className={styles.textLink}>Все работы <Arrow /></Link></div></div>
    </section>
    <section id="cases" className={styles.works}>
      <div className={styles.sectionHeading}><h2>Кейсы</h2><p>Системы из нескольких приложений: общая задача, роли пользователей и связь между ними.</p></div>
      {portfolioWorks.filter(work => work.id === "charging" || work.id === "delivery").map((work, index) => <WorkSection work={work} index={index} key={work.id} />)}
    </section>
    <section id="work" className={styles.catalogSection}>
      <div className={styles.sectionHeading}><h2>Работы</h2><p>Отдельные проекты. У каждого — своя страница с описанием, интерфейсами и демо-доступом.</p></div>
      <ProjectLinks projects={getVisibleSortedProjects().filter(project => !project.caseSlug)} />
      <Link href="/projects" className={styles.textLink}>Все работы <Arrow /></Link>
    </section>
    <section id="about" className={styles.about}>
      <Image src={portfolioAuthor.portrait} alt={portfolioAuthor.name} width={462} height={462} sizes="(max-width: 760px) 160px, 290px" />
      <div><h2>Дмитрий Кирилкин</h2><p className={styles.aboutRole}>{portfolioAuthor.role}</p><p>В моём портфолио — приложения для клиентов, сотрудников и внутреннего учёта. Один из подробных примеров — разработка клиентского приложения и приложения техника для мобильной зарядки на Flutter + Supabase.</p><p>Есть опыт работы в IT-проектах в найме, в том числе в Норникеле, Астеросе и X5 Group: аналитика, управление проектами и участие в запуске продуктов.</p><Link href="/projects" className={styles.textLink}>Смотреть мои работы <Arrow /></Link></div>
    </section>
  </main>;
}
