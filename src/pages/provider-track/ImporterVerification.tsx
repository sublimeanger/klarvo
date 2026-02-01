import { SEOHead } from "@/components/seo/SEOHead";
import { ImporterVerificationChecklist } from "@/components/provider/ImporterVerificationChecklist";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";

export default function ImporterVerification() {
  const { canAccessImporterDistributorTrack, isLoading: accessLoading } = useOperatorTrackAccess();
  
  // In production, these would come from context/route params
  const aiSystemId = undefined;
  const organizationId = undefined;

  // Show locked page if no access
  if (!accessLoading && !canAccessImporterDistributorTrack) {
    return (
      <AddonLockedPage
        addonId="importer_distributor"
        title="Importer Track Required"
        description="Access importer verification checklists and evidence packs."
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Importer Verification"
        description="Article 23 importer obligations checklist"
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
            <h1 className="text-2xl font-semibold tracking-tight">Importer Verification</h1>
            <p className="text-muted-foreground">
              Article 23 obligations for importers
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 23 Requirement</AlertTitle>
          <AlertDescription>
            Before placing a high-risk AI system on the market, importers shall ensure that 
            the appropriate conformity assessment procedure has been carried out by the provider 
            and that the provider has drawn up the technical documentation. Importers shall 
            indicate their name, registered trade name or registered trade mark, and address 
            on the high-risk AI system.
          </AlertDescription>
        </Alert>

        {/* Verification Checklist */}
        <ImporterVerificationChecklist aiSystemId={aiSystemId} organizationId={organizationId} />
      </div>
    </>
  );
}
