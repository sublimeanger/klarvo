import { RefreshCw, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSystemRecommendations } from "@/hooks/useComplianceRecommendations";
import { useSubscription } from "@/hooks/useSubscription";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationsPanelProps {
  aiSystemId: string;
}

export function RecommendationsPanel({ aiSystemId }: RecommendationsPanelProps) {
  const { planId, entitlements } = useSubscription();
  
  // Check if recommendations are enabled for this plan
  const isEnabled = planId !== "free";
  const maxRecommendations = planId === "starter" ? 3 : 10;

  const {
    recommendations,
    isLoading,
    isGenerating,
    isCached,
    error,
    regenerate,
    dismiss,
    createTaskFromRecommendation,
  } = useSystemRecommendations(aiSystemId);

  // Limit recommendations based on plan
  const displayedRecommendations = recommendations.slice(0, maxRecommendations);

  if (!isEnabled) {
    return (
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Smart Recommendations</CardTitle>
            </div>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardDescription>
            AI-powered compliance recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Upgrade to Starter or higher to unlock AI-powered compliance recommendations.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/settings/billing">View Plans</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Smart Recommendations</CardTitle>
          </div>
          <CardDescription>
            Analyzing your compliance posture...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">Smart Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive mb-3">{error.message}</p>
          <Button variant="outline" size="sm" onClick={regenerate}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Smart Recommendations</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={regenerate}
            disabled={isGenerating}
            className="h-8"
          >
            <RefreshCw className={`mr-1 h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Analyzing..." : "Refresh"}
          </Button>
        </div>
        <CardDescription>
          {displayedRecommendations.length > 0
            ? `${displayedRecommendations.length} prioritized action${displayedRecommendations.length !== 1 ? "s" : ""} to improve compliance`
            : "No recommendations at this time"
          }
          {isCached && displayedRecommendations.length > 0 && (
            <span className="text-muted-foreground/60"> • Cached</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayedRecommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              Great work! No urgent recommendations right now.
            </p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={regenerate}>
              Check Again
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedRecommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onDismiss={() => dismiss(rec.id)}
                onCreateTask={() => createTaskFromRecommendation(rec)}
              />
            ))}
            
            {recommendations.length > maxRecommendations && planId === "starter" && (
              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground mb-2">
                  {recommendations.length - maxRecommendations} more recommendations available
                </p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                  <a href="/settings/billing">Upgrade for full insights</a>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
