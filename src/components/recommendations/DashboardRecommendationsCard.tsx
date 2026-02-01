import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrgRecommendations } from "@/hooks/useComplianceRecommendations";
import { useSubscription } from "@/hooks/useSubscription";
import { RecommendationCard } from "./RecommendationCard";

export function DashboardRecommendationsCard() {
  const { planId } = useSubscription();
  
  // Only Pro and Enterprise get org-wide recommendations
  const isOrgEnabled = planId === "pro" || planId === "enterprise";
  // Starter and Growth get system-level recommendations shown on dashboard
  const isBasicEnabled = planId !== "free";

  const {
    recommendations,
    isLoading,
    isGenerating,
    error,
    regenerate,
    dismiss,
  } = useOrgRecommendations();

  // Show top 3 recommendations on dashboard
  const displayedRecommendations = recommendations.slice(0, 3);

  if (!isBasicEnabled) {
    return (
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Smart Recommendations</CardTitle>
            </div>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-xs sm:text-sm">
            AI-powered compliance insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Upgrade to unlock AI-powered recommendations.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings/billing">View Plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isOrgEnabled) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Smart Recommendations</CardTitle>
            </div>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            View recommendations on individual AI systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Organization-wide insights available on Pro plan.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-systems">
                View AI Systems
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
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
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <CardTitle className="text-base sm:text-lg">Smart Recommendations</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            Analyzing your compliance posture...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
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
            <CardTitle className="text-base sm:text-lg">Smart Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-destructive mb-3">{error.message}</p>
          <Button variant="outline" size="sm" onClick={regenerate}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">Smart Recommendations</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            {displayedRecommendations.length > 0
              ? `Top priorities across your AI portfolio`
              : "No urgent actions needed"
            }
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={regenerate}
          disabled={isGenerating}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh recommendations</span>
        </Button>
      </CardHeader>
      <CardContent>
        {displayedRecommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <Sparkles className="h-8 w-8 text-success/50 mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Great work! Your compliance posture looks good.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedRecommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onDismiss={() => dismiss(rec.id)}
                showSystemLink
              />
            ))}
            
            {recommendations.length > 3 && (
              <div className="pt-2 text-center">
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link to="/ai-systems">
                    View {recommendations.length - 3} more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
