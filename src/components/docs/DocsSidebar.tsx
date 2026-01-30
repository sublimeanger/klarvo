import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { docCategories } from "@/lib/docsContent";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function DocsSidebar() {
  const location = useLocation();
  const currentSlug = location.pathname.replace("/docs/", "").replace("/docs", "");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(
    docCategories.map(cat => cat.slug)
  );

  const toggleCategory = (slug: string) => {
    setOpenCategories(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const filteredCategories = docCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <aside className="w-64 border-r border-border/50 bg-surface-1/50 flex-col h-[calc(100vh-64px)] sticky top-16 hidden lg:flex">
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search docs..."
            className="pl-9 h-9 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1">
          {/* Documentation Home */}
          <Link
            to="/docs"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              !currentSlug || currentSlug === ""
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            Documentation Home
          </Link>

          <div className="h-2" />

          {/* Categories */}
          {filteredCategories.map((category) => (
            <Collapsible
              key={category.slug}
              open={openCategories.includes(category.slug)}
              onOpenChange={() => toggleCategory(category.slug)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4 text-primary" />
                  <span>{category.title}</span>
                </div>
                {openCategories.includes(category.slug) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 mt-1 space-y-0.5 border-l border-border/50 pl-3">
                  {category.articles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/docs/${article.slug}`}
                      className={cn(
                        "block px-3 py-1.5 rounded-md text-sm transition-colors",
                        currentSlug === article.slug
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground">
          <p className="mb-1">Can't find what you need?</p>
          <Link to="/contact" className="text-primary hover:underline">
            Contact Support →
          </Link>
        </div>
      </div>
    </aside>
  );
}
