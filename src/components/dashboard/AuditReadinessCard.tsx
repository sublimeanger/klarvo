import { ShieldCheck, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditReadiness } from "@/hooks/useAuditReadiness";
import { cn } from "@/lib/utils";

export function AuditReadinessCard() {
  const { overallScore, breakdown, status, isLoading } = useAuditReadiness();

  if (isLoading) {
    return (
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const getStatusVariant = () => {
    switch (status) {
      case "excellent":
        return "success";
      case "good":
        return "warning";
      case "needs_attention":
        return "draft";
      case "at_risk":
        return "destructive";
      default:
        return "draft";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "excellent":
        return "Audit Ready";
      case "good":
        return "Good Progress";
      case "needs_attention":
        return "Needs Attention";
      case "at_risk":
        return "At Risk";
      default:
        return "Unknown";
    }
  };

  const getScoreColor = () => {
    if (overallScore >= 85) return "text-success";
    if (overallScore >= 65) return "text-warning";
    if (overallScore >= 40) return "text-orange-500";
    return "text-destructive";
  };

  const breakdownItems = [
    { key: "classification", label: "Classification", detail: breakdown.classification.label, ...breakdown.classification },
    { key: "controls", label: "Controls", detail: breakdown.controls.label, ...breakdown.controls },
    { key: "evidence", label: "Evidence", detail: breakdown.evidence.label, ...breakdown.evidence },
    { key: "tasks", label: "Tasks", detail: breakdown.tasks.label, ...breakdown.tasks },
    { key: "training", label: "Training", detail: breakdown.training.label, ...breakdown.training },
  ];

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Audit Readiness Score
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Overall compliance posture
            </CardDescription>
          </div>
          <StatusBadge variant={getStatusVariant()} dot>
            {getStatusLabel()}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr]">
          {/* Score Circle */}
          <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-0">
            <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center rounded-full border-4 border-muted bg-muted/30">
              <div className="text-center">
                <span className={cn("text-2xl sm:text-3xl md:text-4xl font-bold", getScoreColor())}>
                  {overallScore}
                </span>
                <span className="text-sm sm:text-base md:text-lg text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground md:mt-2">Overall Score</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 sm:space-y-3">
            {breakdownItems.map((item) => (
              <div key={item.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(item.score / item.max) * 100} 
                    className="h-1.5 sm:h-2 flex-1" 
                  />
                  <span className="hidden sm:block w-20 text-right text-xs text-muted-foreground">
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
