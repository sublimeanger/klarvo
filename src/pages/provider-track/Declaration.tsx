import { SEOHead } from "@/components/seo/SEOHead";
import { DeclarationForm } from "@/components/provider/DeclarationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function Declaration() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="EU Declaration of Conformity"
        description="Annex V Declaration of Conformity generator"
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
            <h1 className="text-2xl font-semibold tracking-tight">EU Declaration of Conformity</h1>
            <p className="text-muted-foreground">
              Annex V structured declaration for high-risk AI systems
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Annex V Requirement</AlertTitle>
          <AlertDescription>
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
