import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsTableOfContentsProps {
  content: string;
}

export function DocsTableOfContents({ content }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      matches.push({ id, text, level });
    }

    setHeadings(matches);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24">
        <p className="text-sm font-semibold mb-3">On this page</p>
        <nav className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "block text-sm py-1 transition-colors border-l-2",
                level === 3 ? "pl-4" : "pl-3",
                activeId === id
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-border"
              )}
            >
              {text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
