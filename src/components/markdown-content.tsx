import ReactMarkdown from "react-markdown";

import styles from "./markdown-content.module.css";

type MarkdownContentProps = {
  content: string;
  className?: string;
  variant?: "default" | "project-detail";
};

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function MarkdownContent({
  content,
  className,
  variant = "default",
}: MarkdownContentProps) {
  const isProjectDetail = variant === "project-detail";

  return (
    <div className={joinClassNames(styles.root, className)}>
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2
              className={joinClassNames(
                styles.h2,
                isProjectDetail && styles.h2ProjectDetail,
              )}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={joinClassNames(styles.h3, isProjectDetail && styles.h3ProjectDetail)}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className={joinClassNames(styles.p, isProjectDetail && styles.pProjectDetail)}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className={joinClassNames(styles.ul, isProjectDetail && styles.ulProjectDetail)}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={joinClassNames(styles.ol, isProjectDetail && styles.olProjectDetail)}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={joinClassNames(styles.li, isProjectDetail && styles.liProjectDetail)}>
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className={styles.strong}>{children}</strong>
          ),
          code: ({ children }) => <code className={styles.code}>{children}</code>,
          a: ({ children, href }) => (
            <a href={href} className={styles.link}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
