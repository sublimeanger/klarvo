import { SEOHead } from "@/components/seo/SEOHead";
import { SeriousIncidentForm } from "@/components/provider/SeriousIncidentForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function SeriousIncidents() {
  const { canAccessProviderTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, these would come from context/route params
  const aiSystemId = undefined;
  const organizationId = undefined;

  // Show locked page if no access
  if (!accessLoading && !canAccessProviderTrack) {
    return (
      <AddonLockedPage
        addonId="provider_track"
        title="Provider Track Required"
        description="Access the Article 73 Serious Incident Reporting tools."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Serious Incident Reporting"
        description="Article 73 serious incident reporting"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Serious Incident Reporting</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Article 73 incident register and reporting
            </p>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert variant="destructive" className="rounded-xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 73 Requirement - Time-Critical</AlertTitle>
          <AlertDescription>
            <p className="mb-2 text-xs sm:text-sm">
              Providers must report serious incidents to market surveillance authorities:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
              <li><strong>2 days</strong> - Death or serious damage to health</li>
              <li><strong>10 days</strong> - Serious incident posing risk</li>
              <li><strong>15 days</strong> - Malfunctioning posing risk</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Incident Form */}
        <SeriousIncidentForm aiSystemId={aiSystemId} organizationId={organizationId} />
      </div>
    </>
  );
}
