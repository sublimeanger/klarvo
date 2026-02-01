import { SEOHead } from "@/components/seo/SEOHead";
import { DeclarationForm } from "@/components/provider/DeclarationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function Declaration() {
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
        description="Access the EU Declaration of Conformity generator."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="EU Declaration of Conformity"
        description="Annex V Declaration of Conformity generator"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">EU Declaration of Conformity</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Annex V structured declaration for high-risk AI systems
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Annex V Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            The EU declaration of conformity shall state that the provider demonstrates that the 
            requirements set out in Chapter III, Section 2 have been fulfilled. The declaration 
            shall be kept for 10 years after the AI system has been placed on the market.
          </AlertDescription>
        </Alert>

        {/* Declaration Form */}
        <DeclarationForm versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
