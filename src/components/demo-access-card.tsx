"use client";

import { useEffect, useRef, useState } from "react";

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
    <div className="relative">
      <div
        ref={rootRef}
        className="demo-access max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div
        aria-live="polite"
        className={[
          "pointer-events-none absolute right-0 top-0 rounded-full border border-[#d8c9ff] bg-white px-4 py-2 text-sm font-semibold text-[#5d34d6] shadow-[0_14px_34px_rgba(93,52,214,0.18)] transition duration-200",
          copyNotice
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0",
        ].join(" ")}
      >
        {copyNotice ? "Скопировано" : ""}
      </div>

      <style jsx>{`
        .demo-access :global(.demo-section + .demo-section) {
          margin-top: 20px;
        }

        .demo-access :global(.demo-heading) {
          margin: 0 0 8px;
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          letter-spacing: 0.15px;
          color: #281f36;
        }

        .demo-access :global(.demo-copy-row) {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 0;
          padding: 0;
          min-height: 48px;
          color: #4f455f;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .demo-access :global(.demo-copy-row:not(:has(.demo-copy-button))) {
          min-height: 32px;
          cursor: default;
        }

        .demo-access :global(.demo-copy-row + .demo-copy-row) {
          margin-top: 0;
        }

        .demo-access :global(.demo-copy-row:hover) {
          color: #281f36;
        }

        .demo-access :global(.demo-copy-label) {
          font-size: 14px;
          line-height: 20px;
          font-weight: 300;
          letter-spacing: 0.15px;
          color: #7c6b96;
          margin-right: 4px;
          padding-top: 14px;
          padding-bottom: 14px;
        }

        .demo-access :global(.demo-copy-value) {
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
          color: #4f455f;
          letter-spacing: 0.25px;
          word-break: break-word;
          padding-top: 14px;
          padding-bottom: 14px;
        }

        .demo-access
          :global(.demo-copy-row:not(:has(.demo-copy-button)) .demo-copy-label),
        .demo-access
          :global(.demo-copy-row:not(:has(.demo-copy-button)) .demo-copy-value) {
          padding-top: 6px;
          padding-bottom: 6px;
        }

        .demo-access :global(.demo-copy-button) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          min-width: 48px;
          border: 0;
          border-radius: 999px;
          padding: 0;
          background: transparent;
          color: #7c6b96;
          align-self: start;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.15s ease, color 0.15s ease,
            transform 0.15s ease;
        }

        .demo-access :global(.demo-copy-button:hover) {
          background: rgba(124, 107, 150, 0.08);
          color: #5f4e79;
        }

        .demo-access :global(.demo-copy-button:active),
        .demo-access :global(.demo-copy-button[data-pressed="true"]) {
          background: rgba(124, 107, 150, 0.16);
          color: #4e4064;
          transform: scale(0.96);
        }

        .demo-access :global(.demo-copy-button:focus-visible) {
          outline: 2px solid rgba(93, 52, 214, 0.22);
          outline-offset: 2px;
        }

        .demo-access :global(.demo-copy-button svg) {
          width: 24px;
          height: 24px;
        }

        .demo-access :global(.demo-copy-button svg *) {
          stroke-width: 2.4;
        }

        .demo-access :global(.demo-meta) {
          margin: 0;
          color: #615672;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.25px;
        }

        .demo-access :global(.demo-actions) {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 12px;
          margin-top: 16px;
        }

        .demo-access :global(.demo-action-stack) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .demo-access :global(.demo-button) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 12px 16px;
          border-radius: 999px;
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          letter-spacing: 0.15px;
          text-decoration: none;
          transition: transform 0.2s ease, background-color 0.2s ease,
            border-color 0.2s ease, color 0.2s ease;
        }

        .demo-access :global(.demo-button:hover) {
          transform: translateY(-1px);
        }

        .demo-access :global(.demo-button-filled) {
          background: #5d34d6;
          color: white;
          box-shadow: 0 10px 24px rgba(93, 52, 214, 0.2);
        }

        .demo-access :global(.demo-button-filled:hover) {
          background: #4f2cb7;
        }

        .demo-access :global(.demo-button-tonal) {
          background: #efe8ff;
          color: #4d2ab0;
        }

        .demo-access :global(.demo-button-tonal:hover) {
          background: #e5d8ff;
        }

        .demo-access :global(.demo-button-outlined) {
          border: 1px solid #d4c6f6;
          color: #4d2ab0;
          background: transparent;
        }

        .demo-access :global(.demo-button-outlined:hover) {
          background: #faf7ff;
        }

        .demo-access :global(.demo-button-text) {
          padding-left: 12px;
          padding-right: 12px;
          color: #5d34d6;
          background: transparent;
        }

        .demo-access :global(.demo-button-text:hover) {
          color: #4423a7;
        }
      `}</style>

    </div>
  );
}
