import { SEOHead } from "@/components/seo/SEOHead";
import { RiskRegister } from "@/components/provider/RiskRegister";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function RiskManagement() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Risk Management System"
        description="Article 9 risk management for EU AI Act compliance"
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
            <h1 className="text-2xl font-semibold tracking-tight">Risk Management</h1>
            <p className="text-muted-foreground">
              Article 9 risk management system for high-risk AI systems
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 9 Requirement</AlertTitle>
          <AlertDescription>
            A risk management system shall be established, implemented, documented and maintained 
            in relation to high-risk AI systems. It shall consist of a continuous iterative process 
            run throughout the entire lifecycle of a high-risk AI system, requiring regular 
            systematic updating.
          </AlertDescription>
        </Alert>

        {/* Risk Register */}
        <RiskRegister versionId={versionId} organizationId={organizationId} />
      </div>
    </>
  );
}
