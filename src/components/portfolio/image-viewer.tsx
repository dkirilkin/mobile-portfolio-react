"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import type { PortfolioImage } from "@/types/portfolio";
import styles from "@/styles/portfolio.module.css";

type Props = { image: PortfolioImage; priority?: boolean; compact?: boolean; sizes?: string };

export function ImageViewer({ image, priority = false, compact = false, sizes = "(max-width: 760px) 75vw, 30vw" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  const captionId = useId();
  function openImage(event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setOpened(true);
    dialog.current?.showModal();
  }
  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [opened]);
  return (
    <figure className={`${styles.screen} ${compact ? styles.compactScreen : ""}`}>
      <button type="button" className={styles.screenButton} onClick={openImage} aria-label={`Открыть изображение: ${image.caption}`} aria-haspopup="dialog">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} preload={priority} sizes={sizes} className={styles.screenImage} />
      </button>
      <figcaption>
        {!compact && <span className={styles.screenCaptionText}>{image.caption}<small>{image.kind === "promo" ? "Промослайд приложения" : "Экран приложения"}</small></span>}
        <button type="button" className={styles.zoomButton} onClick={openImage} aria-label={`Увеличить: ${image.caption}`} aria-haspopup="dialog" title="Увеличить изображение">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5M7.5 10.5h6M10.5 7.5v6" /></svg>
        </button>
      </figcaption>
      <dialog ref={dialog} className={styles.viewer} aria-labelledby={captionId} onClose={() => { setOpened(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current.close(); } }}>
        <div className={styles.viewerHeader}><p id={captionId}>{image.caption}</p><button type="button" autoFocus onClick={() => dialog.current?.close()}>Закрыть <span aria-hidden="true">×</span></button></div>
        {opened && !failed && <Image src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized onError={() => setFailed(true)} className={styles.originalImage} />}
        {failed && <p className={styles.imageError}>Изображение не загрузилось. Попробуйте открыть исходный файл по ссылке ниже.</p>}
        <a className={styles.originalLink} href={image.src} target="_blank" rel="noreferrer">Открыть исходный файл</a>
      </dialog>
    </figure>
  );
}
