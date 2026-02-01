import { SEOHead } from "@/components/seo/SEOHead";
import { DistributorVerificationChecklist } from "@/components/provider/DistributorVerificationChecklist";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function DistributorVerification() {
  // In production, these would come from context/route params
  const aiSystemId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Distributor Verification"
        description="Article 24 distributor obligations checklist"
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
            <h1 className="text-2xl font-semibold tracking-tight">Distributor Verification</h1>
            <p className="text-muted-foreground">
              Article 24 obligations for distributors
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 24 Requirement</AlertTitle>
          <AlertDescription>
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
