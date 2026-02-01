import { SEOHead } from "@/components/seo/SEOHead";
import { RiskRegister } from "@/components/provider/RiskRegister";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function RiskManagement() {
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
        description="Access the Article 9 Risk Management System."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Risk Management System"
        description="Article 9 risk management for EU AI Act compliance"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">Risk Management</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 9 risk management system for high-risk AI systems
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 9 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            A risk management system shall be established, implemented, documented and maintained 
            in relation to high-risk AI systems. It shall consist of a continuous iterative process 
            run throughout the entire lifecycle of a high-risk AI system, requiring regular 
            systematic updating.
          </AlertDescription>
        </Alert>

        {/* Risk Register */}
        <RiskRegister versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
