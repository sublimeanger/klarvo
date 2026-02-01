import { SEOHead } from "@/components/seo/SEOHead";
import { CEMarkingChecklist } from "@/components/provider/CEMarkingChecklist";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function CEMarking() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="CE Marking"
        description="Article 48 CE marking requirements for AI systems"
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
            <h1 className="text-2xl font-semibold tracking-tight">CE Marking</h1>
            <p className="text-muted-foreground">
              Article 48 CE marking evidence and verification
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 48 Requirement</AlertTitle>
          <AlertDescription>
            The CE marking shall be affixed to the high-risk AI system or, where that is not 
            possible or not warranted, to its packaging or to the accompanying documentation. 
            It shall be visible, legible and indelible.
          </AlertDescription>
        </Alert>

        {/* CE Marking Checklist */}
        <CEMarkingChecklist versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
