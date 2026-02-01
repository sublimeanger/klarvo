import { SEOHead } from "@/components/seo/SEOHead";
import { AnnexIVBuilder } from "@/components/provider/AnnexIVBuilder";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function TechnicalDocs() {
  // In production, these would come from context/route params
  const versionId = undefined;
  const organizationId = undefined;

  return (
    <>
      <SEOHead
        title="Technical Documentation (Annex IV)"
        description="Build Annex IV technical documentation for EU AI Act compliance"
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
            <h1 className="text-2xl font-semibold tracking-tight">Technical Documentation</h1>
            <p className="text-muted-foreground">
              Annex IV structured documentation required under Article 11
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Article 11 Requirement</AlertTitle>
          <AlertDescription>
            Technical documentation must be drawn up before the high-risk AI system is placed on the market
            or put into service and shall be kept up-to date. This documentation enables national competent
            authorities and notified bodies to assess the conformity of the AI system.
          </AlertDescription>
        </Alert>

        {/* Version Selection - Placeholder */}
        {!versionId && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Please select an AI system version to edit technical documentation.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/ai-systems">Select AI System</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Annex IV Builder */}
        {versionId ? (
          <AnnexIVBuilder versionId={versionId} organizationId={organizationId} />
        ) : (
          <AnnexIVBuilder /> // Show form in preview mode
        )}
      </div>
    </>
  );
}
