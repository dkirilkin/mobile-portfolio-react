import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({
  content,
  className,
}: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-6 text-xl font-semibold first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-5 text-lg font-semibold first:mt-0">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-3 text-base leading-8 text-[#4f455f] first:mt-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#4f455f] marker:text-[#7a5af8]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-8 text-[#4f455f] marker:font-semibold marker:text-[#7a5af8]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-[#281f36]">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-[#f2ebff] px-1.5 py-0.5 text-[0.95em] text-[#5e34d0]">
              {children}
            </code>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="font-medium text-[#5e34d0] underline decoration-[#c7b5ff] underline-offset-4"
            >
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
