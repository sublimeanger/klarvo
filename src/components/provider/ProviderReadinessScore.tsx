import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReadinessCategory } from "@/hooks/useProviderReadiness";

interface ProviderReadinessScoreProps {
  overallScore: number;
  categories: ReadinessCategory[];
  blockingIssues: string[];
}

export function ProviderReadinessScore({ 
  overallScore, 
  categories, 
  blockingIssues 
}: ProviderReadinessScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-destructive";
  };

  const getStatusIcon = (status: ReadinessCategory['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'in_progress':
        return <Circle className="h-4 w-4 text-amber-600 dark:text-amber-400 fill-amber-100 dark:fill-amber-900" />;
      case 'blocking':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ReadinessCategory['status']) => {
    switch (status) {
      case 'complete':
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-100">Complete</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-100">In Progress</Badge>;
      case 'blocking':
        return <Badge variant="destructive">Blocking</Badge>;
      default:
        return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overall Score Card */}
      <Card className="rounded-xl">
        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Provider Readiness Score</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <svg className="h-20 w-20 sm:h-24 sm:w-24 -rotate-90 transform">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="36"
                  cx="40"
                  cy="40"
                />
                <circle
                  className={cn("stroke-current transition-all duration-500", getScoreColor(overallScore))}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="36"
                  cx="40"
                  cy="40"
                  strokeDasharray={`${overallScore * 2.26} 226`}
                />
              </svg>
              <span className={cn("absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-bold", getScoreColor(overallScore))}>
                {overallScore}%
              </span>
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your provider compliance readiness across all EU AI Act requirements
              </p>
              {blockingIssues.length > 0 && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-2 text-xs sm:text-sm text-destructive text-left">
                  <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Blocking Issues:</p>
                    <ul className="list-disc list-inside">
                      {blockingIssues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="rounded-xl">
        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Compliance Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  {getStatusIcon(category.status)}
                  <span className="text-xs sm:text-sm font-medium truncate">{category.name}</span>
                  {category.article && (
                    <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">({category.article})</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="hidden sm:block">{getStatusBadge(category.status)}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground w-8 sm:w-10 text-right">
                    {category.score}%
                  </span>
                </div>
              </div>
              <Progress value={category.score} className="h-1.5 sm:h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
