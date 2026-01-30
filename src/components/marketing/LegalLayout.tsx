import { useState, useEffect, useRef } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronUp, List, Clock, Printer } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

// Extract headings from content for ToC
function useTableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".legal-content");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: { id: string; text: string; level: number }[] = [];

    elements.forEach((el, i) => {
      const id = `heading-${i}`;
      el.id = id;
      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);

    // Intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { headings, activeId };
}

// Progress bar component
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-border/50 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Table of contents component
function TableOfContents({
  headings,
  activeId,
  onSelect,
}: {
  headings: { id: string; text: string; level: number }[];
  activeId: string;
  onSelect?: () => void;
}) {
  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onSelect?.();
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground mb-3">On this page</p>
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={cn(
            "block w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors",
            heading.level === 3 && "pl-6",
            activeId === heading.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
}

// Back to top button
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        "fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full shadow-lg transition-all duration-300",
        "bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const { headings, activeId } = useTableOfContents();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <MarketingLayout>
      <ScrollProgress />
      
      <div className="py-12 lg:py-16 bg-surface-1 print:bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Header */}
              <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Badge variant="outline" className="gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Last updated: {lastUpdated}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrint}
                    className="hidden sm:inline-flex text-muted-foreground hover:text-foreground print:hidden"
                  >
                    <Printer className="h-4 w-4 mr-1.5" />
                    Print
                  </Button>
                </div>
              </div>
              
              {/* Mobile ToC trigger */}
              <div className="lg:hidden mb-6 print:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <List className="h-4 w-4 mr-2" />
                      Table of Contents
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
                    <ScrollArea className="h-full py-4">
                      <TableOfContents
                        headings={headings}
                        activeId={activeId}
                        onSelect={() => setMobileOpen(false)}
                      />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Article Content */}
              <div className="legal-content prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                {children}
              </div>
            </div>
            
            {/* Desktop Sidebar ToC */}
            <aside className="hidden lg:block w-64 shrink-0 print:hidden">
              <div className="sticky top-24">
                <div className="glass-card rounded-xl p-5">
                  <TableOfContents headings={headings} activeId={activeId} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <BackToTop />
    </MarketingLayout>
  );
}
