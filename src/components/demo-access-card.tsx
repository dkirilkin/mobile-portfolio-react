"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./demo-access-card.module.css";

type DemoAccessCardProps = {
  html: string;
};

type CopyNotice = {
  id: number;
};

export function DemoAccessCard({ html }: DemoAccessCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [copyNotice, setCopyNotice] = useState<CopyNotice | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const copyTarget = target.closest<HTMLElement>("[data-copy]");

      if (!copyTarget) {
        return;
      }

      event.preventDefault();

      const value = copyTarget.dataset.copy;

      if (!value) {
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
        setCopyNotice((currentNotice) => ({
          id: (currentNotice?.id ?? 0) + 1,
        }));
      } catch {
        setCopyNotice(null);
      }
    };

    root.addEventListener("click", handleClick);

    const setPressedState = (event: Event, pressed: boolean) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLElement>(".demo-copy-button");

      if (!button) {
        return;
      }

      if (pressed) {
        button.dataset.pressed = "true";
      } else {
        delete button.dataset.pressed;
      }
    };

    const handlePointerDown = (event: Event) => setPressedState(event, true);
    const handlePointerUp = (event: Event) => setPressedState(event, false);
    const clearPressedState = () => {
      root
        .querySelectorAll<HTMLElement>(".demo-copy-button[data-pressed='true']")
        .forEach((button) => {
          delete button.dataset.pressed;
        });
    };

    root.addEventListener("pointerdown", handlePointerDown);
    root.addEventListener("pointerup", handlePointerUp);
    root.addEventListener("pointercancel", clearPressedState);
    root.addEventListener("pointerleave", clearPressedState);

    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("pointerdown", handlePointerDown);
      root.removeEventListener("pointerup", handlePointerUp);
      root.removeEventListener("pointercancel", clearPressedState);
      root.removeEventListener("pointerleave", clearPressedState);
    };
  }, []);

  useEffect(() => {
    if (!copyNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyNotice(null);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copyNotice]);

  return (
    <div className={styles.root}>
      <div
        ref={rootRef}
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div
        aria-live="polite"
        className={[styles.toast, copyNotice ? styles.toastVisible : ""]
          .join(" ")
          .trim()}
      >
        {copyNotice ? "Скопировано" : ""}
      </div>
    </div>
  );
}
