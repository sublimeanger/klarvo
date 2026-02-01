import { SEOHead } from "@/components/seo/SEOHead";
import { AnnexIVBuilder } from "@/components/provider/AnnexIVBuilder";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function TechnicalDocs() {
  const { canAccessProviderTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  if (!accessLoading && !canAccessProviderTrack) {
    return (
      <AddonLockedPage
        addonId="provider_track"
        title="Provider Track Required"
        description="Access Annex IV technical documentation builder."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Technical Documentation (Annex IV)"
        description="Build Annex IV technical documentation for EU AI Act compliance"
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
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Technical Documentation</h1>
            <p className="text-xs sm:text-base text-muted-foreground">
              Annex IV structured documentation required under Article 11
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="rounded-xl">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Article 11 Requirement</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            Technical documentation must be drawn up before the high-risk AI system is placed on the market
            or put into service and shall be kept up-to date. This documentation enables national competent
            authorities and notified bodies to assess the conformity of the AI system.
          </AlertDescription>
        </Alert>

        {/* Version Selection - Placeholder */}
        {!versionId && (
          <Card className="rounded-xl">
            <CardContent className="py-6 sm:py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Please select an AI system version to edit technical documentation.
              </p>
              <Button className="mt-4 h-11" asChild>
                <Link to="/ai-systems">Select AI System</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Annex IV Builder */}
        {versionId ? (
          <AnnexIVBuilder versionId={versionId} organizationId={organizationId} />
        ) : (
          <AnnexIVBuilder /> // Show form in preview mode
        )}
      </div>
    </>
  );
}
