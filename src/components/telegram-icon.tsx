type TelegramIconProps = {
  className?: string;
};

export function TelegramIcon({ className }: TelegramIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M21.47 4.34a1.6 1.6 0 0 0-1.68-.21L3.46 10.6a1.2 1.2 0 0 0 .07 2.25l3.75 1.24 1.47 4.56a1.2 1.2 0 0 0 2.03.48l2.09-2.14 3.97 3.03a1.6 1.6 0 0 0 2.55-.92l2.47-13.15a1.6 1.6 0 0 0-.39-1.61ZM9.3 13.66l8.2-6.27-6.54 7.28a.75.75 0 0 0-.18.33l-.65 2.78-.83-2.58a.75.75 0 0 0-.48-.49l-2.15-.71 10.83-4.16-8.35 5.39a.75.75 0 0 0 .2 1.43Z" />
    </svg>
  );
}
