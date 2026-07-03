import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Renders trusted repo markdown. GFM (tables, strikethrough, autolinks) +
// highlight.js classes for code blocks; styled by the .prose / .hljs rules in
// globals.css. Content is our own files, so no sanitizer needed.
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
