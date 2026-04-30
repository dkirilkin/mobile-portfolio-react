import Image from "next/image";
import Link from "next/link";

import { ProjectList } from "@/components/project-list";
import { getHomeProjects } from "@/data/projects";

const homeProjects = getHomeProjects();

const frontendStack = ["FlutterFlow", "Webflow"];
const backendStack = ["Supabase", "Firebase", "Xano", "n8n"];

function InfoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v5" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
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
      className="h-4 w-4"
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
      className="h-4 w-4"
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

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M21.47 4.34a1.6 1.6 0 0 0-1.68-.21L3.46 10.6a1.2 1.2 0 0 0 .07 2.25l3.75 1.24 1.47 4.56a1.2 1.2 0 0 0 2.03.48l2.09-2.14 3.97 3.03a1.6 1.6 0 0 0 2.55-.92l2.47-13.15a1.6 1.6 0 0 0-.39-1.61ZM9.3 13.66l8.2-6.27-6.54 7.28a.75.75 0 0 0-.18.33l-.65 2.78-.83-2.58a.75.75 0 0 0-.48-.49l-2.15-.71 10.83-4.16-8.35 5.39a.75.75 0 0 0 .2 1.43Z" />
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
    <span className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-[#d8d1de] bg-white px-4 text-[1rem] font-medium text-[#251f2f] shadow-[0_1px_0_rgba(17,17,17,0.04)]">
      {icon}
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3f7] text-[#211b29]">
      <section>
        <div className="md:grid md:grid-cols-[minmax(0,1.35fr)_minmax(340px,640px)] md:items-center md:gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,640px)] lg:gap-8">
          <div className="relative h-[75vw] min-h-[280px] w-full overflow-hidden bg-[#d9d3ff] max-sm:max-h-[420px] md:h-[min(56vw,680px)] md:min-h-0">
            <Image
              src="/images/hero_portfolio.webp"
              alt="Превью мобильного интерфейса"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mx-auto max-w-[760px] px-4 pb-3 pt-6 sm:px-6 md:mx-0 md:w-full md:px-0 md:py-0">
            <h1 className="max-w-[18ch] text-[2.2rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#231d2a] sm:max-w-[20ch] md:max-w-[18ch] md:text-[2.45rem] lg:max-w-[22ch] lg:text-[2.7rem]">
              Разработка мобильных приложений в 3 раза быстрее
            </h1>

            <div className="mt-3 inline-flex items-center gap-2 text-[1.1rem] leading-7 text-[#3f3948]">
              <span>С помощью low code</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#51495e]">
                <InfoIcon className="h-[1.15rem] w-[1.15rem]" />
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <PlatformChip icon={<AppleIcon />} label="iOS" />
              <PlatformChip icon={<AndroidIcon />} label="Android" />
              <PlatformChip icon={<WebIcon />} label="Web" />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex h-10 items-center rounded-[14px] bg-[#e7dafd] px-4 text-[1.02rem] font-semibold text-[#584492]">
                Идеально для MVP
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#51495e]">
                <InfoIcon className="h-[1.15rem] w-[1.15rem]" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-9 sm:px-6">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-[2rem] font-medium tracking-[-0.04em] text-[#231d2a]">
            Портфолио
          </h2>

          <ProjectList projects={homeProjects} />

          <Link
            href="/projects"
            className="mt-6 inline-flex h-14 items-center justify-center rounded-2xl bg-[#625690] px-6 text-[1rem] font-medium leading-6 text-white transition duration-200 hover:bg-[#564a82]"
          >
            Все проекты
          </Link>
        </div>
      </section>

      <section className="border-t border-[#d8d0d7] px-4 pb-8 pt-9 sm:px-6">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-[2rem] font-medium tracking-[-0.04em] text-[#231d2a]">
            Обо мне
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/dk_photo.webp"
              alt="Фото Дмитрия Кирилкина"
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover shadow-[0_10px_24px_rgba(57,53,73,0.18)]"
            />

            <div className="min-w-0">
              <p className="text-[1.1rem] font-semibold leading-6 text-[#211b29]">
                Lowcode-разработчик / Аналитик
              </p>
              <p className="mt-1 text-[1.05rem] leading-6 text-[#2e2737]">
                Кирилкин Дмитрий
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="text-[1.7rem] font-medium tracking-[-0.035em] text-[#231d2a]">
              Stack
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <p className="text-[1.1rem] font-semibold text-[#211b29]">
                  Frontend
                </p>
                <div className="mt-2 space-y-1 text-[1.05rem] leading-7 text-[#2f2738]">
                  {frontendStack.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[1.1rem] font-semibold text-[#211b29]">
                  Backend
                </p>
                <div className="mt-2 space-y-1 text-[1.05rem] leading-7 text-[#2f2738]">
                  {backendStack.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[1.7rem] font-medium tracking-[-0.035em] text-[#231d2a]">
              Работал в найме
            </h3>
            <p className="mt-2 text-[1.08rem] leading-8 text-[#2f2738]">
              Норникель, Астерос, X5 Group и др. на различных ролях в
              IT-проектах (аналитик, project-менеджер).
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-[1.7rem] font-medium tracking-[-0.035em] text-[#231d2a]">
              Контакты
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[1.02rem] font-semibold text-[#211b29]">
                  Локация
                </p>
                <p className="mt-1 text-[1.08rem] leading-7 text-[#2f2738]">
                  Россия, Брянск - Москва
                </p>
              </div>

              <div>
                <p className="text-[1.02rem] font-semibold text-[#211b29]">
                  Telegram
                </p>
                <p className="mt-1 text-[1.08rem] leading-7 text-[#2f2738]">
                  @kirilikdn
                </p>
              </div>
            </div>

            <a
              href="https://t.me/kirilikdn"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-3 rounded-full bg-[#6f5ba6] px-5 text-[1.04rem] font-semibold text-white shadow-[0_10px_24px_rgba(72,53,114,0.22)] transition duration-200 hover:bg-[#624f97]"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/14">
                <TelegramIcon />
              </span>
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
