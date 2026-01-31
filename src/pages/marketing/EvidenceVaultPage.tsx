import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  FolderOpen,
  Upload,
  Link2,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Users,
  Search,
  Download,
  Bell
} from "lucide-react";

const features = [
  {
    title: "Upload & Organize",
    description: "Drag-and-drop evidence files organized by AI system, control, or policy.",
    icon: Upload
  },
  {
    title: "Link to Controls",
    description: "Attach evidence directly to control implementations for traceability.",
    icon: Link2
  },
  {
    title: "Approval Workflows",
    description: "Route evidence for review and approval before marking as accepted.",
    icon: CheckCircle
  },
  {
    title: "Expiry Tracking",
    description: "Set validity periods and get alerts before evidence expires.",
    icon: Clock
  },
  {
    title: "Audit-Ready Exports",
    description: "Export linked evidence as part of your governance pack.",
    icon: Download
  },
  {
    title: "Search & Filter",
    description: "Find evidence by type, system, status, or date instantly.",
    icon: Search
  },
];

const evidenceTypes = [
  { type: "Vendor Documentation", examples: "DPAs, security whitepapers, model cards" },
  { type: "Internal Policies", examples: "AI acceptable use, oversight procedures" },
  { type: "Training Records", examples: "Completion logs, materials, attestations" },
  { type: "Risk Assessments", examples: "FRIA reports, DPIA links, internal reviews" },
  { type: "Monitoring Reports", examples: "Screenshots, drift reports, performance metrics" },
  { type: "Transparency Notices", examples: "Disclosure copy, UI screenshots" },
  { type: "Incident Records", examples: "Postmortems, ticket logs, containment notes" },
];

const workflowSteps = [
  { step: "Upload", description: "Drag files or paste links into the vault" },
  { step: "Classify", description: "Tag by type, AI system, and linked control" },
  { step: "Approve", description: "Route for review if approval is required" },
  { step: "Track", description: "Set expiry dates and get renewal alerts" },
  { step: "Export", description: "Include in evidence packs automatically" },
];

export default function EvidenceVaultPage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo Evidence Vault",
    description: "Centralized compliance evidence storage with approval workflows, expiry tracking, and audit-ready exports for EU AI Act compliance.",
    applicationCategory: "BusinessApplication",
    offers: { price: "99", priceCurrency: "EUR" }
  });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Product", url: "https://klarvo.io/features" },
      { name: "Evidence Vault", url: "https://klarvo.io/product/evidence-vault" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Compliance Evidence Vault | Klarvo"
        description="Centralized evidence storage for EU AI Act compliance. Upload, organize, approve evidence with expiry tracking and audit-ready exports."
        keywords={["compliance evidence vault", "evidence management", "AI compliance evidence", "audit evidence storage", "EU AI Act evidence"]}
        canonical="https://klarvo.io/product/evidence-vault"
        ogType="website"
      />
      <SchemaMarkup schema={[softwareSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Product</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Compliance Evidence Vault
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All your AI governance evidence in one place. Upload, organize, approve—and export audit-ready packs when you need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">
                  See All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">What You Can Store</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              The vault supports all evidence types needed for EU AI Act compliance:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {evidenceTypes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                >
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{item.type}</div>
                    <div className="text-sm text-muted-foreground">{item.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Evidence Workflow</h2>
            <div className="grid gap-4 md:grid-cols-5">
              {workflowSteps.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{item.step}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Use a Vault?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Audit-Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When auditors ask "show me evidence," it's all in one place with full traceability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Never Expire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get alerts before evidence expires. Automatic renewal tasks keep compliance current.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Controlled Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Role-based permissions and approval workflows ensure proper governance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FolderOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Evidence Packs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export vault contents as professional audit packs.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/ai-governance-evidence-packs">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Link2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Control Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Link evidence directly to control implementations.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/features">
                      See Controls <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Centralize Your Compliance Evidence"
        subtitle="Upload, organize, and export audit-ready documentation from one vault."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
