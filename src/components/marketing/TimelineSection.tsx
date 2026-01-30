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
    <section className={cn("section-padding bg-surface-1", className)}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="display-md mb-4">{title}</h2>
          <p className="body-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {items.map((item, index) => (
              <div
                key={item.date}
                className={cn(
                  "relative mb-8 last:mb-0 animate-fade-up",
                  "md:grid md:grid-cols-2 md:gap-8"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Left side (date on desktop) */}
                <div
                  className={cn(
                    "hidden md:block text-right pr-12",
                    index % 2 === 1 && "md:order-2 md:text-left md:pl-12 md:pr-0"
                  )}
                >
                  <span className="text-sm font-semibold text-primary">
                    {item.date}
                  </span>
                </div>

                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute left-0 md:left-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-background z-10",
                    "md:-translate-x-1/2",
                    getStatusColor(item.status)
                  )}
                >
                  {getStatusIcon(item.status)}
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "ml-20 md:ml-0",
                    index % 2 === 1 && "md:order-1 md:text-right"
                  )}
                >
                  <div
                    className={cn(
                      "p-6 rounded-xl border bg-card shadow-soft",
                      item.status === "current" && "border-warning shadow-md"
                    )}
                  >
                    {/* Mobile date */}
                    <span className="md:hidden text-sm font-semibold text-primary">
                      {item.date}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 md:mt-0 mb-2">
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
