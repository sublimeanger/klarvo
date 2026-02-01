import { SEOHead } from "@/components/seo/SEOHead";
import { CEMarkingChecklist } from "@/components/provider/CEMarkingChecklist";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function CEMarking() {
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
        description="Access the CE Marking verification checklist."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="CE Marking"
        description="Article 48 CE marking requirements for AI systems"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">CE Marking</h1>
            <p className="text-xs sm:text-base text-muted-foreground truncate">
              Article 48 CE marking evidence and verification
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 48 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            The CE marking shall be affixed to the high-risk AI system or, where that is not 
            possible or not warranted, to its packaging or to the accompanying documentation. 
            It shall be visible, legible and indelible.
          </AlertDescription>
        </Alert>

        {/* CE Marking Checklist */}
        <CEMarkingChecklist versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
