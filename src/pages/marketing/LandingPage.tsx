import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LogoCloud } from "@/components/marketing/LogoCloud";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { TimelineSection } from "@/components/marketing/TimelineSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TestimonialSection } from "@/components/marketing/TestimonialSection";
import { CTASection } from "@/components/marketing/CTASection";
import {
  Cpu,
  Shield,
  FileCheck,
  Download,
  GraduationCap,
  AlertTriangle,
  Zap,
  Lock,
  BarChart3,
} from "lucide-react";

const problemSolutionFeatures = [
  {
    icon: Zap,
    title: "From Weeks to Hours",
    description: "Replace spreadsheet chaos with automated classification. Get your AI inventory done in hours, not weeks.",
  },
  {
    icon: Lock,
    title: "Audit-Ready Evidence",
    description: "Stop scrambling before audits. Every policy, screenshot, and approval is organized and exportable.",
  },
  {
    icon: BarChart3,
    title: "Clear Risk Picture",
    description: "Know exactly where you stand. See all your AI systems, their risk levels, and what needs attention.",
  },
];

const showcaseItems = [
  {
    icon: Cpu,
    badge: "Inventory",
    title: "AI System Inventory",
    description: "Track every AI system in one place. Our guided wizard captures all the details regulators require—in under 10 minutes per system.",
    bulletPoints: [
      "20-step guided intake wizard",
      "Vendor and model tracking",
      "Ownership and oversight assignment",
      "Automatic gap detection",
    ],
  },
  {
    icon: Shield,
    badge: "Classification",
    title: "Risk Classification Engine",
    description: "Automated EU AI Act classification with clear rationale. Know if your AI is prohibited, high-risk, or minimal risk—and why.",
    bulletPoints: [
      "Prohibited practices screening",
      "High-risk category detection (Annex III)",
      "Transparency obligations check",
      "Confidence scoring and reviewer sign-off",
    ],
  },
  {
    icon: FileCheck,
    badge: "Evidence",
    title: "Evidence Vault",
    description: "Organize all compliance documentation in one secure place. Attach evidence to controls, track approvals, and never lose a document.",
    bulletPoints: [
      "Approval workflows",
      "Expiration tracking",
      "Version history",
      "Linked to controls and systems",
    ],
  },
  {
    icon: Download,
    badge: "Exports",
    title: "Audit-Ready Export Packs",
    description: "Generate professional PDF reports and ZIP bundles that look like they came from a top consultancy. Ready for auditors, boards, or customers.",
    bulletPoints: [
      "Classification memos",
      "System evidence packs",
      "FRIA reports",
      "Organization governance summaries",
    ],
  },
];

const howItWorksSteps = [
  {
    icon: Cpu,
    title: "1. Add Your AI Systems",
    description: "Use our guided wizard to document each AI system. It takes less than 10 minutes per system.",
  },
  {
    icon: Shield,
    title: "2. Classify Risk Levels",
    description: "Our classification engine automatically screens for prohibited practices and assigns risk levels.",
  },
  {
    icon: FileCheck,
    title: "3. Close Gaps & Export",
    description: "Follow the gap checklist, upload evidence, and generate audit-ready documentation.",
  },
];

export default function LandingPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <HeroSection
        badge="EU AI Act Compliance Made Simple"
        title={
          <>
            <span className="text-foreground">EU AI Act Compliance</span>
            <br />
            <span className="text-gradient-hero">Simple. Evidence-Based. Audit-Ready.</span>
          </>
        }
        subtitle="Know every AI system you use, its risk level, what you need to do next, and generate audit-ready evidence packs in one click. Built for SMEs who need compliance without the complexity."
        variant="centered"
      />

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Problem → Solution */}
      <FeatureGrid
        title="Stop Compliance Chaos"
        subtitle="EU AI Act compliance shouldn't require a law degree or a team of consultants. Klarvo gives you the tools to get compliant fast."
        features={problemSolutionFeatures}
        columns={3}
      />

      {/* Feature Showcase */}
      <FeatureShowcase items={showcaseItems} />

      {/* Timeline */}
      <TimelineSection />

      {/* How It Works */}
      <FeatureGrid
        title="How It Works"
        subtitle="Get from zero to compliant in three simple steps"
        features={howItWorksSteps}
        columns={3}
        className="bg-surface-1"
      />

      {/* Stats */}
      <StatsSection
        title="Trusted by Compliance Teams"
        subtitle="See why teams choose Klarvo for EU AI Act compliance"
      />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Final CTA */}
      <CTASection
        title="Ready to Get EU AI Act Compliant?"
        subtitle="Start for free. No credit card required. Get your first AI system classified in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See How It Works", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
