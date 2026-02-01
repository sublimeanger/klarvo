import { SEOHead } from "@/components/seo/SEOHead";
import { QMSLibrary } from "@/components/provider/QMSLibrary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function QMS() {
  // In production, this would come from auth context
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Quality Management System"
        description="Article 17 QMS documentation for EU AI Act compliance"
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
            <h1 className="text-2xl font-semibold tracking-tight">Quality Management System</h1>
            <p className="text-muted-foreground">
              Article 17 QMS requirements for high-risk AI system providers
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 17 Requirement</AlertTitle>
          <AlertDescription>
            Providers of high-risk AI systems shall put a quality management system in place that 
            ensures compliance with this Regulation. That system shall be documented in a systematic 
            and orderly manner in the form of written policies, procedures and instructions.
          </AlertDescription>
        </Alert>

        {/* QMS Library */}
        <QMSLibrary organizationId={organizationId} />
      </div>
    </>
  );
}
