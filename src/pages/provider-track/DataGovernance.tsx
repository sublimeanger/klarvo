import { SEOHead } from "@/components/seo/SEOHead";
import { DatasetRegistry } from "@/components/provider/DatasetRegistry";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function DataGovernance() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Data Governance"
        description="Article 10 data governance for AI systems"
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
            <h1 className="text-2xl font-semibold tracking-tight">Data Governance</h1>
            <p className="text-muted-foreground">
              Article 10 data and data governance requirements
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 10 Requirement</AlertTitle>
          <AlertDescription>
            High-risk AI systems which make use of techniques involving the training of AI models 
            with data shall be developed on the basis of training, validation and testing data sets 
            that meet the quality criteria. Data governance and management practices shall be 
            appropriate for the intended purpose of the high-risk AI system.
          </AlertDescription>
        </Alert>

        {/* Dataset Registry */}
        <DatasetRegistry versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
