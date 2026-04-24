"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectCarouselProps = {
  screenshots: {
    src: string;
    alt: string;
  }[];
  title: string;
};

export function ProjectCarousel({
  screenshots,
  title,
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasLightboxOpen = lightboxIndex !== null;

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
        setLightboxIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === 0 ? screenshots.length - 1 : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === screenshots.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasLightboxOpen, screenshots.length]);

  function openLightbox(index: number) {
    setActiveIndex(index);
    setLightboxIndex(index);
  }

  function showPrevious() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? screenshots.length - 1 : current - 1;
    });
  }

  function showNext() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === screenshots.length - 1 ? 0 : current + 1;
    });
  }

  return (
    <section className="space-y-4">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            onClick={() => openLightbox(index)}
            className={[
              "group relative block h-[300px] w-[135px] min-w-[135px] snap-center rounded-[2rem] bg-transparent transition-transform",
              activeIndex === index ? "scale-100" : "scale-[0.985]",
            ].join(" ")}
            aria-label={`Открыть скриншот ${index + 1} проекта ${title}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[8px] border-[4px] border-[#9fa3aa] bg-white shadow-[0_18px_45px_rgba(56,40,68,0.12)]">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                sizes="135px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {screenshots.map((screenshot, index) => (
          <button
            key={`${screenshot.src}-dot`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={[
              "h-2.5 rounded-full transition-all",
              activeIndex === index
                ? "w-8 bg-[#7a5af8]"
                : "w-2.5 bg-[#d9d1eb]",
            ].join(" ")}
            aria-label={`Переключиться на скриншот ${index + 1}`}
          />
        ))}
      </div>

      {hasLightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,14,30,0.82)] px-3 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр изображений проекта ${title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex w-full max-w-5xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#281f36] shadow-[0_12px_30px_rgba(0,0,0,0.28)] ring-1 ring-black/8 transition hover:bg-[#f6f3fb]"
              aria-label="Закрыть просмотр"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.25"
              >
                <path d="M6 6L18 18" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white ring-1 ring-white/14 backdrop-blur-md transition hover:bg-white/24 sm:left-4"
              aria-label="Предыдущее изображение"
            >
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
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#140f1d] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[9/16] max-h-[82vh] min-h-[420px] w-full">
                <Image
                  src={screenshots[lightboxIndex].src}
                  alt={screenshots[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white ring-1 ring-white/14 backdrop-blur-md transition hover:bg-white/24 sm:right-4"
              aria-label="Следующее изображение"
            >
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
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
