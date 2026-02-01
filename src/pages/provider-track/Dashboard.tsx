import { SEOHead } from "@/components/seo/SEOHead";
import { useProviderReadiness } from "@/hooks/useProviderReadiness";
import { ProviderReadinessScore } from "@/components/provider/ProviderReadinessScore";
import { ProviderQuickActions } from "@/components/provider/ProviderQuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileWarning } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function ProviderDashboard() {
  const { canAccessProviderTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // For now, we'll use a placeholder versionId - in production this would come from context/route
  const versionId = undefined; // Will be set when a version is selected
  const { overallScore, categories, blockingIssues, isLoading } = useProviderReadiness(versionId);

  // Show locked page if no access
  if (!accessLoading && !canAccessProviderTrack) {
    return (
      <AddonLockedPage
        addonId="provider_track"
        title="Provider Track Required"
        description="Access the full provider compliance toolkit for high-risk AI systems."
      />
    );
  }

  // Key deadlines (these would come from the database in production)
  const deadlines = [
    { name: "Conformity Assessment Due", date: "2025-08-02", daysLeft: 182 },
    { name: "Technical Docs Review", date: "2025-03-15", daysLeft: 42 },
    { name: "QMS Audit", date: "2025-06-01", daysLeft: 120 },
  ];

  return (
    <>
      <SEOHead
        title="Provider Track Dashboard"
        description="EU AI Act provider compliance dashboard"
        noindex={true}
      />

      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Provider Track</h1>
          <p className="text-sm text-muted-foreground">
            Manage your provider obligations under the EU AI Act
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Left Column - Readiness Score */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {isLoading ? (
              <Card className="rounded-xl">
                <CardHeader className="p-3 sm:p-6">
                  <Skeleton className="h-5 sm:h-6 w-36 sm:w-48" />
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full mx-auto sm:mx-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <ProviderReadinessScore 
                overallScore={overallScore}
                categories={categories}
                blockingIssues={blockingIssues}
              />
            )}
          </div>

          {/* Right Column - Deadlines & Alerts */}
          <div className="space-y-4 sm:space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Key Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6 pt-0 sm:pt-0">
                {deadlines.map((deadline) => (
                  <div key={deadline.name} className="flex items-center justify-between border-b pb-2 sm:pb-3 last:border-0 last:pb-0 gap-2">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{deadline.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <Badge variant={deadline.daysLeft < 60 ? "destructive" : "secondary"} className="shrink-0 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {deadline.daysLeft}d
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <FileWarning className="h-4 w-4" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                {blockingIssues.length === 0 ? (
                  <p className="text-xs sm:text-sm text-muted-foreground">No active alerts</p>
                ) : (
                  <div className="space-y-2">
                    {blockingIssues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-destructive/10 p-2 text-xs sm:text-sm">
                        <FileWarning className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive mt-0.5 shrink-0" />
                        <span className="text-destructive">{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <ProviderQuickActions />
      </div>
    </>
  );
}
