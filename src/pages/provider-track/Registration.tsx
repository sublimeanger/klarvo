import { SEOHead } from "@/components/seo/SEOHead";
import { RegistrationWizard } from "@/components/provider/RegistrationWizard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function Registration() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="EU Database Registration"
        description="Article 49 EU database registration for AI systems"
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
            <h1 className="text-2xl font-semibold tracking-tight">EU Database Registration</h1>
            <p className="text-muted-foreground">
              Article 49 registration in the EU database
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 49 Requirement</AlertTitle>
          <AlertDescription>
            Before placing on the market or putting into service a high-risk AI system, the provider 
            or, where applicable, the authorised representative shall register that system in the 
            EU database referred to in Article 71.
          </AlertDescription>
        </Alert>

        {/* Registration Wizard */}
        <RegistrationWizard versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
