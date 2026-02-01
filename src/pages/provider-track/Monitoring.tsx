import { SEOHead } from "@/components/seo/SEOHead";
import { MonitoringPlanBuilder } from "@/components/provider/MonitoringPlanBuilder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function Monitoring() {
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
        description="Access the Article 72 Post-Market Monitoring tools."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Post-Market Monitoring"
        description="Article 72 post-market monitoring plan"
        noindex={true}
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/provider-track">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Post-Market Monitoring</h1>
            <p className="text-muted-foreground">
              Article 72 monitoring plan and system
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 72 Requirement</AlertTitle>
          <AlertDescription>
            Providers shall establish and document a post-market monitoring system in a manner 
            that is proportionate to the nature of the AI technologies and the risks of the 
            high-risk AI system. The system shall actively and systematically collect, document 
            and analyse relevant data.
          </AlertDescription>
        </Alert>

        {/* Monitoring Plan Builder */}
        <MonitoringPlanBuilder versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
