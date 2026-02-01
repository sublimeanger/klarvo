import { SEOHead } from "@/components/seo/SEOHead";
import { ConformityBoard } from "@/components/provider/ConformityBoard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function Conformity() {
  const { canAccessProviderTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  // Show locked page if no access
  if (!accessLoading && !canAccessProviderTrack) {
    return (
      <AddonLockedPage
        addonId="provider_track"
        title="Provider Track Required"
        description="Access the Article 43 Conformity Assessment workflow."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Conformity Assessment"
        description="Article 43 conformity assessment workflow"
        noindex={true}
      />

      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10 shrink-0">
            <Link to="/provider-track">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">Conformity Assessment</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 43 conformity assessment workflow
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 43 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            For high-risk AI systems, the provider shall, prior to placing on the market or putting 
            into service, follow the conformity assessment procedure based on internal control 
            referred to in Annex VI, or involving a notified body referred to in Annex VII.
          </AlertDescription>
        </Alert>

        {/* Conformity Board */}
        <ConformityBoard versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
