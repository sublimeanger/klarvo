import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  Loader2,
  Scale,
  Shield,
  ClipboardList,
  GraduationCap,
  AlertCircle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGapAnalysis, GapItem } from "@/hooks/useGapAnalysis";
import { cn } from "@/lib/utils";

interface GapChecklistProps {
  aiSystemId: string;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    badge: "bg-destructive text-destructive-foreground",
  },
  high: {
    icon: AlertTriangle,
    color: "text-risk-high",
    bg: "bg-risk-high/10",
    border: "border-risk-high/30",
    badge: "bg-risk-high text-white",
  },
  medium: {
    icon: Info,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    badge: "bg-warning text-warning-foreground",
  },
  low: {
    icon: Info,
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border",
    badge: "bg-muted text-muted-foreground",
  },
};

const categoryConfig = {
  classification: { icon: Scale, label: "Classification" },
  control: { icon: Shield, label: "Controls" },
  evidence: { icon: FileWarning, label: "Evidence" },
  task: { icon: ClipboardList, label: "Tasks" },
  training: { icon: GraduationCap, label: "Training" },
  fria: { icon: AlertTriangle, label: "FRIA" },
};

function GapItemCard({ item }: { item: GapItem }) {
  const severity = severityConfig[item.severity];
  const category = categoryConfig[item.category];
  const SeverityIcon = severity.icon;
  const CategoryIcon = category.icon;

  return (
    <div
      className={cn(
        "p-3 sm:p-4 rounded-lg border",
        severity.bg,
        severity.border
      )}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className={cn("mt-0.5 shrink-0", severity.color)}>
          <SeverityIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className="text-[10px] sm:text-xs gap-1">
              <CategoryIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              {category.label}
            </Badge>
            <Badge className={cn("text-[10px] sm:text-xs capitalize", severity.badge)}>
              {item.severity}
            </Badge>
          </div>
          <h4 className="font-medium text-xs sm:text-sm">{item.title}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>
        {item.actionPath && (
          <Button size="sm" variant="outline" asChild className="shrink-0 hidden sm:flex">
            <Link to={item.actionPath}>
              {item.actionLabel}
              <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>
      {item.actionPath && (
        <Button size="sm" variant="outline" asChild className="w-full mt-2 sm:hidden">
          <Link to={item.actionPath}>
            {item.actionLabel}
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export function GapChecklist({ aiSystemId }: GapChecklistProps) {
  const { items, summary, completionScore, isLoading } = useGapAnalysis(aiSystemId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const criticalAndHigh = items.filter(i => i.severity === "critical" || i.severity === "high");
  const mediumAndLow = items.filter(i => i.severity === "medium" || i.severity === "low");

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
              Compliance Gap Checklist
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Outstanding requirements and recommended actions
            </CardDescription>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold">{completionScore}%</div>
            <div className="text-xs text-muted-foreground">Audit Ready</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <Progress value={completionScore} className="h-1.5 sm:h-2" />
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Compliance Progress</span>
            <span>{summary.total} gap{summary.total !== 1 ? "s" : ""} identified</span>
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2">
          {summary.critical > 0 && (
            <Badge className={severityConfig.critical.badge}>
              {summary.critical} Critical
            </Badge>
          )}
          {summary.high > 0 && (
            <Badge className={severityConfig.high.badge}>
              {summary.high} High
            </Badge>
          )}
          {summary.medium > 0 && (
            <Badge className={severityConfig.medium.badge}>
              {summary.medium} Medium
            </Badge>
          )}
          {summary.low > 0 && (
            <Badge variant="outline">
              {summary.low} Low
            </Badge>
          )}
        </div>

        <Separator />

        {/* Gap items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-success mb-4" />
            <h3 className="font-semibold text-lg">All Clear!</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              No compliance gaps detected. This AI system is audit-ready.
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-4">
              {/* Critical and High priority items */}
              {criticalAndHigh.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Requires Immediate Attention
                  </h4>
                  {criticalAndHigh.map((item) => (
                    <GapItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}

              {/* Medium and Low priority items */}
              {mediumAndLow.length > 0 && (
                <div className="space-y-3">
                  {criticalAndHigh.length > 0 && <Separator className="my-4" />}
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Recommended Improvements
                  </h4>
                  {mediumAndLow.map((item) => (
                    <GapItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
