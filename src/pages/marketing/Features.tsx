import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { CTASection } from "@/components/marketing/CTASection";
import { Badge } from "@/components/ui/badge";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cpu,
  Shield,
  FileCheck,
  Download,
  GraduationCap,
  AlertTriangle,
  Building2,
  ClipboardCheck,
  Activity,
  Users,
  FileText,
  Lock,
  CheckCircle2,
  Zap,
  Eye,
  RefreshCw,
} from "lucide-react";

const coreFeatures = [
  {
    icon: Cpu,
    title: "AI System Inventory",
    description: "Track and manage all AI systems with our guided 20-step wizard. Capture ownership, vendors, and compliance status.",
  },
  {
    icon: Shield,
    title: "Classification Engine",
    description: "Automated risk classification per EU AI Act. Screens for prohibited practices, high-risk categories, and transparency obligations.",
  },
  {
    icon: FileCheck,
    title: "Evidence Vault",
    description: "Organize compliance documentation with approval workflows, expiration tracking, and version history.",
  },
  {
    icon: Download,
    title: "Export Packs",
    description: "Generate professional PDF reports and ZIP bundles. Classification memos, evidence packs, and FRIA reports.",
  },
  {
    icon: ClipboardCheck,
    title: "Control Library",
    description: "Pre-built controls mapped to EU AI Act obligations. Track implementation status and link evidence.",
  },
  {
    icon: GraduationCap,
    title: "Training Tracking",
    description: "Manage AI literacy requirements. Track staff training, certifications, and compliance with Article 4.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Management",
    description: "Log and track AI-related incidents. Maintain audit trails for serious incident reporting.",
  },
  {
    icon: Building2,
    title: "Vendor Management",
    description: "Track AI vendors and their attestations. Due diligence checklists and contract management.",
  },
  {
    icon: Activity,
    title: "Audit Logging",
    description: "Complete audit trail of all actions. Who changed what, when, and why—always documented.",
  },
];

const deepDiveFeatures = [
  {
    icon: Cpu,
    badge: "Core Feature",
    title: "AI System Inventory",
    description: "The heart of your compliance program. Our guided wizard makes it easy to document every AI system with all the details regulators require.",
    bulletPoints: [
      "Quick Capture (2-4 mins) or Full Assessment (10-20 mins)",
      "Vendor, model provider, and contract tracking",
      "Ownership and oversight assignment",
      "Automatic task generation for gaps",
      "Completeness scoring with clear next steps",
    ],
  },
  {
    icon: Shield,
    badge: "Automated",
    title: "Risk Classification Engine",
    description: "Stop guessing about risk levels. Our classification engine walks through each regulatory checkpoint and produces a clear, documented result.",
    bulletPoints: [
      "AI system definition test (is it even AI?)",
      "Prohibited practices screening with escalation",
      "High-risk category detection (Annex III)",
      "Transparency obligations assessment",
      "Classification memo with rationale and reviewer sign-off",
    ],
  },
  {
    icon: Lock,
    badge: "Secure",
    title: "Fundamental Rights Impact Assessment",
    description: "For high-risk systems that require it, our FRIA wizard guides you through Article 27 requirements step by step.",
    bulletPoints: [
      "Process and affected persons documentation",
      "Risk identification by fundamental rights category",
      "Mitigation measures and oversight design",
      "Governance and complaint mechanism capture",
      "Audit-ready FRIA report generation",
    ],
  },
  {
    icon: Users,
    badge: "Team-Ready",
    title: "Governance & Collaboration",
    description: "Built for teams. Assign owners, route approvals, request evidence, and keep everyone on the same page.",
    bulletPoints: [
      "Role-based permissions (Admin, Compliance, System Owner, Viewer)",
      "Evidence approval workflows",
      "Task assignment and tracking",
      "Activity feed per AI system",
      "Complete audit logging",
    ],
  },
];

const complianceFeatures = [
  {
    icon: FileText,
    title: "Policy Templates",
    description: "Pre-built, editable templates for AI acceptable use, oversight plans, incident response, and more.",
  },
  {
    icon: ClipboardCheck,
    title: "Gap Checklists",
    description: "Auto-generated checklists showing what's implemented, what's missing, and what evidence is needed.",
  },
  {
    icon: Activity,
    title: "Reassessment Triggers",
    description: "Automatic alerts when material changes require reclassification or updated documentation.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Add Your AI Systems",
    description: "Use our guided wizard to document each AI system in under 10 minutes.",
    icon: Cpu,
  },
  {
    step: "02",
    title: "Classify & Screen",
    description: "Automated screening for prohibited practices, high-risk categories, and transparency obligations.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Close Gaps",
    description: "Follow the gap checklist to implement controls and upload evidence.",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: "Export & Share",
    description: "Generate audit-ready evidence packs for auditors, boards, or customers.",
    icon: Download,
  },
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Features", url: "https://klarvo.io/features" }
  ]
});

export default function Features() {
  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Compliance Features - Full Platform Overview"
        description="Complete EU AI Act compliance platform. AI inventory, risk classification, evidence vault, control library, training tracking, incident management, and audit-ready exports."
        keywords={["AI compliance features", "EU AI Act platform", "AI inventory software", "compliance automation", "AI risk management"]}
        canonical="https://klarvo.io/features"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />
      <HeroSection
        badge="Platform Features"
        title={
          <>
            <span className="text-foreground">Everything You Need for</span>
            <br />
            <span className="text-gradient-hero">EU AI Act Compliance</span>
          </>
        }
        subtitle="A complete platform that takes you from AI inventory to audit-ready documentation. No spreadsheets, no consultants, no guesswork."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Workflow Steps */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Simple Workflow
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              From Zero to Compliant in 4 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our guided process makes EU AI Act compliance straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full flex items-end justify-start pb-6 pl-6">
                    <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                  </div>
                  
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <FeatureGrid
        title="Core Capabilities"
        subtitle="Built from the ground up for EU AI Act compliance"
        features={coreFeatures}
        columns={3}
      />

      {/* Deep Dive Showcase */}
      <FeatureShowcase items={deepDiveFeatures} />

      {/* Compliance Helpers */}
      <FeatureGrid
        title="Built-In Compliance Intelligence"
        subtitle="Features that keep you on track automatically"
        features={complianceFeatures}
        columns={3}
        className="bg-surface-1"
      />

      {/* CTA */}
      <CTASection
        title="See It In Action"
        subtitle="Start for free and classify your first AI system in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
