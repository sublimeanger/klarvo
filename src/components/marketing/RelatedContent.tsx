import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Wrench, BookOpen, Building2, BarChart3 } from "lucide-react";
import { getRelatedContent, ContentItem, hubs } from "@/lib/internalLinks";
import { cn } from "@/lib/utils";

interface RelatedContentProps {
  currentHref: string;
  title?: string;
  limit?: number;
  variant?: "cards" | "compact" | "inline";
  className?: string;
}

const hubIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guides: BookOpen,
  templates: FileText,
  tools: Wrench,
  compare: BarChart3,
  industries: Building2,
  product: Building2,
};

export function RelatedContent({
  currentHref,
  title = "Related Resources",
  limit = 4,
  variant = "cards",
  className,
}: RelatedContentProps) {
  const relatedItems = getRelatedContent(currentHref, limit);

  if (relatedItems.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {relatedItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/40 transition-colors"
          >
            {item.shortTitle || item.title}
            <ArrowRight className="h-3 w-3" />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <aside className={cn("space-y-3", className)}>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </h3>
        <div className="space-y-2">
          {relatedItems.map((item) => {
            const Icon = hubIcons[item.hub] || FileText;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {item.shortTitle || item.title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {hubs[item.hub]?.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>
    );
  }

  // Default: cards variant
  return (
    <section className={cn("py-16 bg-muted/30", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedItems.map((item) => {
              const Icon = hubIcons[item.hub] || FileText;
              return (
                <Link key={item.href} to={item.href} className="group">
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {hubs[item.hub]?.title.replace(" Hub", "").replace("EU AI Act ", "")}
                        </Badge>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                        {item.shortTitle || item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="line-clamp-2 text-xs">
                        {item.description}
                      </CardDescription>
                      <span className="inline-flex items-center text-xs font-medium text-primary mt-3">
                        Learn more
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
