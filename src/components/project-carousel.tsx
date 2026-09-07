"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./project-carousel.module.css";

type ProjectCarouselProps = {
  screenshots: {
    src: string;
    alt: string;
  }[];
  title: string;
  presentation?: "framed" | "plain";
};

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.icon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.2"
    >
      <path d="M6 6L18 18" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.icon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.icon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M9 18L15 12L9 6" />
    </svg>
  );
}

export function ProjectCarousel({
  screenshots,
  title,
  presentation = "framed",
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [railScrollState, setRailScrollState] = useState({
    canScrollNext: false,
    canScrollPrevious: false,
  });
  const railRef = useRef<HTMLDivElement>(null);

  const hasLightboxOpen = lightboxIndex !== null;

  const updateRailScrollState = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;

    setRailScrollState({
      canScrollPrevious: rail.scrollLeft > 1,
      canScrollNext: rail.scrollLeft < maxScrollLeft - 1,
    });
  }, []);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const firstSlide = rail.querySelector<HTMLElement>(`.${styles.slide}`);
    const slideWidth = firstSlide?.getBoundingClientRect().width ?? rail.clientWidth * 0.8;

    rail.scrollBy({
      left: direction * (slideWidth + 8),
      behavior: "smooth",
    });
  };

  const handleRailWheel = useCallback((event: WheelEvent) => {
    const rail = railRef.current;

    if (!rail || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    const nextScrollLeft = rail.scrollLeft + event.deltaY;
    const canMove =
      (event.deltaY < 0 && rail.scrollLeft > 0) ||
      (event.deltaY > 0 && rail.scrollLeft < maxScrollLeft);

    if (!canMove) {
      return;
    }

    event.preventDefault();
    rail.scrollLeft = Math.max(0, Math.min(maxScrollLeft, nextScrollLeft));
    updateRailScrollState();
  }, [updateRailScrollState]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxIndex(index);
  };

  const moveLightbox = useCallback(
    (step: number) => {
      setLightboxIndex((current) => {
        if (current === null) {
          return current;
        }

        const nextIndex =
          (current + step + screenshots.length) % screenshots.length;
        setActiveIndex(nextIndex);
        return nextIndex;
      });
    },
    [screenshots.length],
  );

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    updateRailScrollState();

    rail.addEventListener("scroll", updateRailScrollState, { passive: true });
    rail.addEventListener("wheel", handleRailWheel, { passive: false });
    window.addEventListener("resize", updateRailScrollState);

    return () => {
      rail.removeEventListener("scroll", updateRailScrollState);
      rail.removeEventListener("wheel", handleRailWheel);
      window.removeEventListener("resize", updateRailScrollState);
    };
  }, [handleRailWheel, screenshots.length, updateRailScrollState]);

  useEffect(() => {
    if (!hasLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowLeft") {
        moveLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        moveLightbox(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasLightboxOpen, moveLightbox, screenshots.length]);

  return (
    <section className={`${styles.root} ${presentation === "plain" ? styles.plain : ""}`}>
      <div className={styles.railToolbar} aria-label={`Навигация по скриншотам проекта ${title}`}>
        <button
          type="button"
          onClick={() => scrollRail(-1)}
          className={styles.railControl}
          disabled={!railScrollState.canScrollPrevious}
          aria-label="Прокрутить карусель назад"
        >
          <PreviousIcon />
        </button>
        <button
          type="button"
          onClick={() => scrollRail(1)}
          className={styles.railControl}
          disabled={!railScrollState.canScrollNext}
          aria-label="Прокрутить карусель вперёд"
        >
          <NextIcon />
        </button>
      </div>

      <div className={styles.railShell}>
        <div
          ref={railRef}
          className={styles.rail}
        >
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              type="button"
              onClick={() => openLightbox(index)}
              className={[styles.slide, activeIndex === index ? styles.slideActive : ""]
                .join(" ")
                .trim()}
              aria-label={`Открыть скриншот ${index + 1} проекта ${title}`}
            >
              <div className={styles.frame}>
                <div className={styles.screen}>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    sizes="(min-width: 1024px) 204px, 152px"
                    className={styles.thumbnailImage}
                    priority={index === 0}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {hasLightboxOpen ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр изображений проекта ${title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <div className={styles.counter}>
              {lightboxIndex + 1} / {screenshots.length}
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className={[styles.control, styles.closeControl].join(" ")}
              aria-label="Закрыть просмотр"
            >
              <CloseIcon />
            </button>

            <div className={styles.lightboxStage}>
              <button
                type="button"
                onClick={() => moveLightbox(-1)}
                className={[styles.control, styles.sideControl, styles.leftControl].join(" ")}
                aria-label="Предыдущее изображение"
              >
                <PreviousIcon />
                <span className={styles.controlText}>Назад</span>
              </button>

              <div className={styles.lightboxFrame}>
                <div className={styles.lightboxScreen}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshots[lightboxIndex].src}
                    alt={screenshots[lightboxIndex].alt}
                    className={styles.lightboxImage}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => moveLightbox(1)}
                className={[styles.control, styles.sideControl, styles.rightControl].join(" ")}
                aria-label="Следующее изображение"
              >
                <span className={styles.controlText}>Вперёд</span>
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
