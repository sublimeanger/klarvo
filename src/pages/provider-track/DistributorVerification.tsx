import { SEOHead } from "@/components/seo/SEOHead";
import { DistributorVerificationChecklist } from "@/components/provider/DistributorVerificationChecklist";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function DistributorVerification() {
  const { canAccessImporterDistributorTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, these would come from context/route params
  const aiSystemId = undefined;
  const organizationId = undefined;

  // Show locked page if no access
  if (!accessLoading && !canAccessImporterDistributorTrack) {
    return (
      <AddonLockedPage
        addonId="importer_distributor"
        title="Distributor Track Required"
        description="Access distributor verification checklists and evidence packs."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Distributor Verification"
        description="Article 24 distributor obligations checklist"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">Distributor Verification</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 24 obligations for distributors
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 24 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            Before making a high-risk AI system available on the market, distributors shall 
            verify that the high-risk AI system bears the required CE marking, that it is 
            accompanied by the required documentation and instructions for use, and that the 
            provider and the importer have complied with their respective obligations.
          </AlertDescription>
        </Alert>

        {/* Verification Checklist */}
        <DistributorVerificationChecklist aiSystemId={aiSystemId} organizationId={organizationId} />
      </div>
    </>
  );
}
