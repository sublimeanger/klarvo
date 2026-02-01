import { cn } from "@/lib/utils";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

interface TimelineSectionProps {
  title?: string;
  subtitle?: string;
  items?: TimelineItem[];
  className?: string;
}

const defaultTimelineItems: TimelineItem[] = [
  {
    date: "1 Aug 2024",
    title: "EU AI Act Enters Into Force",
    description: "The regulation officially becomes law across the European Union.",
    status: "completed",
  },
  {
    date: "2 Feb 2025",
    title: "Prohibited Practices + AI Literacy",
    description: "Prohibited AI practices banned. AI literacy obligations begin for all providers and deployers.",
    status: "current",
  },
  {
    date: "2 Aug 2025",
    title: "Governance + GPAI Rules",
    description: "Governance structures must be in place. General-purpose AI model obligations apply.",
    status: "upcoming",
  },
  {
    date: "2 Aug 2026",
    title: "Most Obligations Apply",
    description: "High-risk AI system requirements and most other obligations become enforceable.",
    status: "upcoming",
  },
  {
    date: "2 Aug 2027",
    title: "Extended Transition Ends",
    description: "Final deadline for high-risk AI in regulated products (Annex I).",
    status: "upcoming",
  },
];

export function TimelineSection({
  title = "EU AI Act Timeline",
  subtitle = "Key compliance deadlines you need to know",
  items = defaultTimelineItems,
  className,
}: TimelineSectionProps) {
  const getStatusIcon = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "current":
        return <AlertCircle className="h-6 w-6 text-warning" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "border-success bg-success/10";
      case "current":
        return "border-warning bg-warning/10";
      default:
        return "border-border bg-muted";
    }
  };

  return (
    <section className={cn("py-12 sm:py-16 md:py-20 lg:py-24 bg-surface-1", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile optimized */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">{title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">{subtitle}</p>
        </div>

        {/* Timeline - Horizontal scroll on mobile, vertical on desktop */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {items.map((item, index) => (
                <div
                  key={item.date}
                  className={cn(
                    "flex-shrink-0 w-[280px] snap-start animate-fade-up"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "p-5 rounded-xl border bg-card",
                      item.status === "current" && "border-warning shadow-md ring-1 ring-warning/20"
                    )}
                  >
                    {/* Status indicator */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                          getStatusColor(item.status)
                        )}
                      >
                        {getStatusIcon(item.status)}
                      </div>
                      <span className="text-sm font-semibold text-primary">{item.date}</span>
                    </div>
                    
                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    {item.status === "current" && (
                      <span className="inline-block mt-3 px-2.5 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                        Act Now
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll hint */}
            <p className="text-center text-xs text-muted-foreground mt-2">Swipe to see more →</p>
          </div>
          
          {/* Desktop: Vertical timeline */}
          <div className="hidden md:block relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />

            {items.map((item, index) => (
              <div
                key={item.date}
                className={cn(
                  "relative mb-8 last:mb-0 animate-fade-up",
                  "grid grid-cols-2 gap-8"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Left side (date on desktop) */}
                <div
                  className={cn(
                    "text-right pr-12",
                    index % 2 === 1 && "order-2 text-left pl-12 pr-0"
                  )}
                >
                  <span className="text-sm font-semibold text-primary">
                    {item.date}
                  </span>
                </div>

                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute left-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-background z-10",
                    "-translate-x-1/2",
                    getStatusColor(item.status)
                  )}
                >
                  {getStatusIcon(item.status)}
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    index % 2 === 1 && "order-1 text-right"
                  )}
                >
                  <div
                    className={cn(
                      "p-6 rounded-xl border bg-card shadow-soft",
                      item.status === "current" && "border-warning shadow-md"
                    )}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.status === "current" && (
                      <span className="inline-block mt-3 px-2.5 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                        Act Now
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
