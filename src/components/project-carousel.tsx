"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import styles from "./project-carousel.module.css";

type ProjectCarouselProps = {
  screenshots: {
    src: string;
    alt: string;
  }[];
  title: string;
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
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasLightboxOpen = lightboxIndex !== null;

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
    <section className={styles.root}>
      <div className={styles.rail}>
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
                  className={styles.image}
                  priority={index === 0}
                />
              </div>
            </div>
          </button>
        ))}
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
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className={[styles.control, styles.closeControl].join(" ")}
              aria-label="Закрыть просмотр"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              onClick={() => moveLightbox(-1)}
              className={[styles.control, styles.sideControl, styles.leftControl].join(" ")}
              aria-label="Предыдущее изображение"
            >
              <PreviousIcon />
            </button>

            <div className={styles.lightboxFrame}>
              <div className={styles.counter}>
                {lightboxIndex + 1} / {screenshots.length}
              </div>
              <div className={styles.lightboxScreen}>
                <Image
                  src={screenshots[lightboxIndex].src}
                  alt={screenshots[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className={styles.image}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => moveLightbox(1)}
              className={[styles.control, styles.sideControl, styles.rightControl].join(" ")}
              aria-label="Следующее изображение"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
