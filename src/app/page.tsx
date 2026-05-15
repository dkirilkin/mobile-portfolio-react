import Image from "next/image";
import Link from "next/link";

import { HeroProjectMarquee } from "@/components/hero-project-marquee";
import { ProjectList } from "@/components/project-list";
import { TelegramIcon } from "@/components/telegram-icon";
import { TELEGRAM_URL, TELEGRAM_USERNAME } from "@/constants/contact";
import { getHomeProjects, getSortedProjects } from "@/data/projects";

import styles from "./page.module.css";

const homeProjects = getHomeProjects();
const heroProjects = getSortedProjects();

const frontendStack = ["FlutterFlow", "Webflow"];
const backendStack = ["Supabase", "Firebase", "Xano", "n8n"];

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.platformIcon}
      fill="currentColor"
    >
      <path d="M15.05 4.39c.62-.76 1.04-1.8.93-2.84-.9.04-1.99.6-2.63 1.35-.58.66-1.09 1.73-.95 2.74 1.01.08 2.03-.51 2.65-1.25Z" />
      <path d="M19.09 14.94c-.41.94-.61 1.36-1.14 2.19-.74 1.15-1.79 2.58-3.1 2.59-1.17.01-1.47-.76-3.06-.75-1.59.01-1.93.76-3.1.75-1.31.01-2.3-1.29-3.05-2.44-2.1-3.21-2.32-6.98-1.02-8.98.92-1.41 2.36-2.24 3.72-2.24 1.39 0 2.27.76 3.42.76 1.12 0 1.81-.76 3.41-.76 1.21 0 2.49.66 3.41 1.8-2.98 1.64-2.5 5.91.51 7.08Z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.platformIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M8 8.5h8a3.5 3.5 0 0 1 3.5 3.5V16a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2v-4A3.5 3.5 0 0 1 8 8.5Z" />
      <path d="M9.5 5.5 8 7.8" />
      <path d="m14.5 5.5 1.5 2.3" />
      <path d="M8.5 18v2" />
      <path d="M15.5 18v2" />
      <circle cx="9.5" cy="12.5" r=".6" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.5" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.platformIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9h18" />
    </svg>
  );
}

function PlatformChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className={`md3-pill ${styles.platformChip}`}>
      {icon}
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <main className={`md3-page ${styles.page}`}>
      <section className={styles.heroBand}>
        <div className={`md3-container ${styles.heroContainer}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Разработка MVP и цифровых продуктов</h1>
              <p className={styles.heroDescription}>
                Запускаю мобильные, веб- и внутренние продукты без лишнего цикла
                согласований: от первого сценария и структуры до рабочего MVP, который
                можно показывать клиентам, команде и инвесторам.
              </p>

              <div className={styles.platformRow}>
                <PlatformChip icon={<AppleIcon />} label="iOS" />
                <PlatformChip icon={<AndroidIcon />} label="Android" />
                <PlatformChip icon={<WebIcon />} label="Web" />
              </div>

              <div className={styles.heroActions}>
                <Link
                  href="/projects"
                  className={`md3-button md3-button--filled ${styles.heroButtonPrimary}`}
                >
                  Смотреть проекты
                </Link>

                <Link
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`md3-button md3-button--outlined ${styles.heroButtonSecondary}`}
                >
                  <TelegramIcon className={styles.telegramIcon} />
                  Написать в Telegram
                </Link>
              </div>
            </div>

            <div className={styles.heroMarqueeWrap}>
              <HeroProjectMarquee projects={heroProjects} />
            </div>
          </div>
        </div>
      </section>

      <section className={`md3-container ${styles.projectsSection}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="md3-eyebrow">Работы</p>
            <h2 className="md3-section-title">Портфолио</h2>
          </div>
        </div>

        <ProjectList projects={homeProjects} />

        <Link href="/projects" className={`md3-button md3-button--filled ${styles.sectionCta}`}>
          Все проекты
        </Link>
      </section>

      <section className={`md3-container ${styles.aboutSection}`}>
        <div className={`md3-surface ${styles.profileCard}`}>
          <div className={styles.profileRow}>
            <Image
              src="/images/dk_photo.webp"
              alt="Фото Дмитрия Кирилкина"
              width={88}
              height={88}
              className={styles.profileImage}
            />

            <div className={styles.profileCopy}>
              <p className="md3-eyebrow">Обо мне</p>
              <h2 className={styles.profileTitle}>Lowcode-разработчик / Аналитик</h2>
              <p className={styles.profileName}>Кирилкин Дмитрий</p>
            </div>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <article className={`md3-surface ${styles.detailCard}`}>
            <p className="md3-eyebrow">Stack</p>
            <h3 className={styles.cardTitle}>Инструменты и backend</h3>

            <div className={styles.stackGrid}>
              <div>
                <p className={styles.stackTitle}>Frontend</p>
                <div className={styles.stackList}>
                  {frontendStack.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className={styles.stackTitle}>Backend</p>
                <div className={styles.stackList}>
                  {backendStack.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className={`md3-surface ${styles.detailCard}`}>
            <p className="md3-eyebrow">Опыт</p>
            <h3 className={styles.cardTitle}>Работал в найме</h3>
            <p className={styles.cardText}>
              Норникель, Астерос, X5 Group и др. на различных ролях в IT-проектах:
              аналитик, project-менеджер, product-участник запуска.
            </p>
          </article>

          <article className={`md3-surface ${styles.detailCard}`}>
            <p className="md3-eyebrow">Контакты</p>
            <h3 className={styles.cardTitle}>Связаться напрямую</h3>

            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <p className={styles.contactLabel}>Локация</p>
                <p className={styles.contactValue}>Россия, Брянск - Москва</p>
              </div>

              <div className={styles.contactRow}>
                <p className={styles.contactLabel}>Telegram</p>
                <p className={styles.contactValue}>{TELEGRAM_USERNAME}</p>
              </div>
            </div>

            <Link
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={`md3-button md3-button--filled ${styles.telegramButton}`}
            >
              <TelegramIcon className={styles.telegramIcon} />
              Написать в Telegram
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
