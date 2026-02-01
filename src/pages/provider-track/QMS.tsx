import { SEOHead } from "@/components/seo/SEOHead";
import { QMSLibrary } from "@/components/provider/QMSLibrary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function QMS() {
  const { canAccessProviderTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, this would come from auth context
  const organizationId = undefined;

  // Show locked page if no access
  if (!accessLoading && !canAccessProviderTrack) {
    return (
      <AddonLockedPage
        addonId="provider_track"
        title="Provider Track Required"
        description="Access the Article 17 Quality Management System library."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Quality Management System"
        description="Article 17 QMS documentation for EU AI Act compliance"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Quality Management System</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 17 QMS requirements for high-risk AI system providers
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 17 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            Providers of high-risk AI systems shall put a quality management system in place that 
            ensures compliance with this Regulation. That system shall be documented in a systematic 
            and orderly manner in the form of written policies, procedures and instructions.
          </AlertDescription>
        </Alert>

        {/* QMS Library */}
        <QMSLibrary organizationId={organizationId} />
      </div>
    </>
  );
}
