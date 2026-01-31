import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hubs, getHubForContent, getHubItems } from "@/lib/internalLinks";
import { cn } from "@/lib/utils";

interface HubNavigationProps {
  className?: string;
}

export function HubNavigation({ className }: HubNavigationProps) {
  const location = useLocation();
  const currentHref = location.pathname;
  const hub = getHubForContent(currentHref);

  if (!hub) return null;

  const hubItems = getHubItems(
    Object.keys(hubs).find(key => hubs[key].href === hub.href) || ""
  );
  
  const currentIndex = hubItems.findIndex(item => item.href === currentHref);
  const prevItem = currentIndex > 0 ? hubItems[currentIndex - 1] : null;
  const nextItem = currentIndex < hubItems.length - 1 ? hubItems[currentIndex + 1] : null;

  return (
    <nav className={cn("border-t border-border/50 pt-8 mt-12", className)}>
      {/* Back to hub link */}
      <div className="mb-6">
        <Link
          to={hub.href}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {hub.title}
        </Link>
      </div>

      {/* Prev/Next navigation */}
      <div className="flex justify-between gap-4">
        {prevItem ? (
          <Link
            to={prevItem.href}
            className="group flex-1 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <ArrowLeft className="h-3 w-3" />
              Previous
            </div>
            <div className="font-medium group-hover:text-primary transition-colors">
              {prevItem.shortTitle || prevItem.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextItem ? (
          <Link
            to={nextItem.href}
            className="group flex-1 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-1">
              Next
              <ArrowRight className="h-3 w-3" />
            </div>
            <div className="font-medium group-hover:text-primary transition-colors">
              {nextItem.shortTitle || nextItem.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Other items in hub */}
      {hubItems.length > 3 && (
        <div className="mt-8 pt-6 border-t border-border/30">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            More from {hub.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {hubItems
              .filter(item => item.href !== currentHref)
              .slice(0, 6)
              .map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full border transition-colors",
                    "border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {item.shortTitle || item.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
