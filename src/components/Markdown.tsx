import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  text: string;
}

export default function Markdown({ text }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="text-neutral-n5 [&:not(:last-of-type)]:mb-2">
            {children}
          </p>
        ),
        pre: ({ children }) => (
          <div className="w-full overflow-x-auto rounded bg-neutral-n12 p-2">
            <pre className="text-neutral-n5">{children}</pre>
          </div>
        ),
        code: ({ children }) => (
          <code className="break-words bg-neutral-n12 text-neutral-n3">
            {children}
          </code>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-inside list-decimal text-neutral-n5">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-neutral-n5">{children}</li>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
