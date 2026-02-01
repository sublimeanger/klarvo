import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { docCategories } from "@/lib/docsContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DocsMobileNav() {
  const location = useLocation();
  const currentSlug = location.pathname.replace("/docs/", "").replace("/docs", "");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-background border-b border-border/50 px-4 py-3">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Menu className="h-4 w-4" />
            <span>Browse Documentation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Documentation</SheetTitle>
          </SheetHeader>
          
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search docs..."
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="h-[calc(100vh-180px)]">
            <nav className="p-4 space-y-1">
              {/* Documentation Home */}
              <Link
                to="/docs"
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors min-h-[44px]">
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
                          onClick={handleLinkClick}
                          className={cn(
                            "block px-3 py-3 rounded-xl text-sm transition-colors min-h-[44px]",
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
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">Can't find what you need?</p>
              <Link to="/contact" onClick={handleLinkClick} className="text-primary hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
