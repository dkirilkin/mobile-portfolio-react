"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getSortedProjects } from "@/data/projects";

import styles from "./site-menu.module.css";

const menuProjects = getSortedProjects();

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.menuIcon}
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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const rootLinkClass = (selected: boolean) =>
    [styles.navLink, selected ? styles.navLinkSelected : ""].join(" ").trim();

  const projectLinkClass = (selected: boolean) =>
    [styles.projectLink, selected ? styles.projectLinkSelected : ""]
      .join(" ")
      .trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        className={styles.menuButton}
        aria-expanded={isOpen}
        aria-controls="site-mobile-menu"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <MenuIcon open={isOpen} />
      </button>

      <button
        type="button"
        className={[styles.scrim, isOpen ? styles.scrimVisible : ""].join(" ")}
        onClick={closeMenu}
        aria-label="Закрыть меню"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        id="site-mobile-menu"
        className={[styles.drawer, isOpen ? styles.drawerOpen : ""].join(" ")}
        aria-hidden={!isOpen}
      >
        <div className={styles.drawerHeader}>
          <div>
            <p className="md3-eyebrow">Навигация</p>
            <p className={styles.drawerTitle}>Портфолио</p>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className={styles.closeButton}
            aria-label="Закрыть меню"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Основная навигация">
          <div className={styles.primaryLinks}>
            <Link
              href="/"
              onClick={closeMenu}
              className={rootLinkClass(pathname === "/")}
            >
              Главная
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className={rootLinkClass(
                pathname === "/projects" || pathname.startsWith("/projects/"),
              )}
            >
              Проекты
            </Link>
          </div>

          <div className={styles.projectGroup}>
            <div className={styles.projectList}>
              {menuProjects.map((project) => {
                const projectHref = `/projects/${project.slug}`;
                const isActive = pathname === projectHref;

                return (
                  <Link
                    key={project.slug}
                    href={projectHref}
                    onClick={closeMenu}
                    className={projectLinkClass(isActive)}
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
