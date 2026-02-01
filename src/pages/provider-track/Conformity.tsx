import { SEOHead } from "@/components/seo/SEOHead";
import { ConformityBoard } from "@/components/provider/ConformityBoard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function Conformity() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Conformity Assessment"
        description="Article 43 conformity assessment workflow"
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
            <h1 className="text-2xl font-semibold tracking-tight">Conformity Assessment</h1>
            <p className="text-muted-foreground">
              Article 43 conformity assessment workflow
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 43 Requirement</AlertTitle>
          <AlertDescription>
            For high-risk AI systems, the provider shall, prior to placing on the market or putting 
            into service, follow the conformity assessment procedure based on internal control 
            referred to in Annex VI, or involving a notified body referred to in Annex VII.
          </AlertDescription>
        </Alert>

        {/* Conformity Board */}
        <ConformityBoard versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
