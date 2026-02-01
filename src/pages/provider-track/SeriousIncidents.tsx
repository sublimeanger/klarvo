import { SEOHead } from "@/components/seo/SEOHead";
import { SeriousIncidentForm } from "@/components/provider/SeriousIncidentForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function SeriousIncidents() {
  // In production, these would come from context/route params
  const aiSystemId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Serious Incident Reporting"
        description="Article 73 serious incident reporting"
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
            <h1 className="text-2xl font-semibold tracking-tight">Serious Incident Reporting</h1>
            <p className="text-muted-foreground">
              Article 73 incident register and reporting
            </p>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Article 73 Requirement - Time-Critical</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Providers must report serious incidents to market surveillance authorities:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li><strong>2 days</strong> - Death or serious damage to health</li>
              <li><strong>10 days</strong> - Serious incident posing risk</li>
              <li><strong>15 days</strong> - Malfunctioning posing risk</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Incident Form */}
        <SeriousIncidentForm aiSystemId={aiSystemId} organizationId={organizationId} />
      </div>
    </>
  );
}
