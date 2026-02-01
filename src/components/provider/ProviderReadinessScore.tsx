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
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Provider Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="h-24 w-24 -rotate-90 transform">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="42"
                  cx="48"
                  cy="48"
                />
                <circle
                  className={cn("stroke-current transition-all duration-500", getScoreColor(overallScore))}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="42"
                  cx="48"
                  cy="48"
                  strokeDasharray={`${overallScore * 2.64} 264`}
                />
              </svg>
              <span className={cn("absolute inset-0 flex items-center justify-center text-2xl font-bold", getScoreColor(overallScore))}>
                {overallScore}%
              </span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your provider compliance readiness across all EU AI Act requirements
              </p>
              {blockingIssues.length > 0 && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-2 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Compliance Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(category.status)}
                  <span className="text-sm font-medium">{category.name}</span>
                  {category.article && (
                    <span className="text-xs text-muted-foreground">({category.article})</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(category.status)}
                  <span className="text-sm text-muted-foreground w-10 text-right">
                    {category.score}%
                  </span>
                </div>
              </div>
              <Progress value={category.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
