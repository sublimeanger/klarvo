import { SEOHead } from "@/components/seo/SEOHead";
import { DatasetRegistry } from "@/components/provider/DatasetRegistry";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function DataGovernance() {
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
        description="Access the Article 10 Data Governance tools."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Data Governance"
        description="Article 10 data governance for AI systems"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">Data Governance</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 10 data and data governance requirements
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 10 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            High-risk AI systems which make use of techniques involving the training of AI models 
            with data shall be developed on the basis of training, validation and testing data sets 
            that meet the quality criteria. Data governance and management practices shall be 
            appropriate for the intended purpose of the high-risk AI system.
          </AlertDescription>
        </Alert>

        {/* Dataset Registry */}
        <DatasetRegistry versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
