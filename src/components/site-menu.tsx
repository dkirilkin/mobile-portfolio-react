"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getSortedProjects } from "@/data/projects";

const menuProjects = getSortedProjects();

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      {open ? (
        <>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function SiteMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="fixed right-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d0d7] bg-white text-[#231d2a] shadow-[0_6px_18px_rgba(55,45,72,0.08)] sm:right-6 sm:top-6"
        aria-expanded={isOpen}
        aria-controls="site-mobile-menu"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <MenuIcon open={isOpen} />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#231d2a]/28" onClick={closeMenu} />
      ) : null}

      <aside
        id="site-mobile-menu"
        className={`fixed right-0 top-0 z-50 h-full w-[min(22rem,88vw)] overflow-y-auto border-l border-[#ddd5e1] bg-[#fcf8fc] px-5 py-6 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between">
          <p className="text-[1rem] font-semibold text-[#231d2a]">Меню</p>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d0d7] bg-white text-[#231d2a]"
            aria-label="Закрыть меню"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className="mt-6" aria-label="Основная навигация">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className={`block rounded-2xl px-4 py-3 text-[1rem] leading-6 ${
                pathname === "/"
                  ? "bg-[#ece3ff] font-semibold text-[#4f3a86]"
                  : "text-[#231d2a]"
              }`}
            >
              Главная
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className={`block rounded-2xl px-4 py-3 text-[1rem] leading-6 ${
                pathname === "/projects"
                  ? "bg-[#ece3ff] font-semibold text-[#4f3a86]"
                  : "text-[#231d2a]"
              }`}
            >
              Проекты
            </Link>
          </div>

          <div className="mt-4 pl-4">
            <div className="space-y-1 border-l border-[#ddd5e1] pl-4">
              {menuProjects.map((project) => {
                const projectHref = `/projects/${project.slug}`;
                const isActive = pathname === projectHref;

                return (
                  <Link
                    key={project.slug}
                    href={projectHref}
                    onClick={closeMenu}
                    className={`block rounded-xl px-3 py-2 text-[0.95rem] leading-5 ${
                      isActive
                        ? "bg-[#ece3ff] font-medium text-[#4f3a86]"
                        : "text-[#5c5368]"
                    }`}
                  >
                    {project.homeTitle}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
