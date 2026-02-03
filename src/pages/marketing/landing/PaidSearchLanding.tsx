import { useEffect, useRef } from "react";
import { SEOHead } from "@/components/seo";
import {
  MinimalHeader,
  MinimalFooter,
  LandingHero,
  LeadCaptureForm,
  ArtifactShowcase,
  ComparisonTable,
  LandingFAQ,
  TrustBlock,
  StickyCTA,
} from "@/components/marketing/landing";

interface PaidSearchLandingProps {
  variant: "demo" | "start";
}

const PaidSearchLanding = ({ variant }: PaidSearchLandingProps) => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // SEO metadata
  const seoTitle = variant === "demo"
    ? "EU AI Act Compliance Demo | Klarvo"
    : "Start Your AI Inventory | EU AI Act Compliance | Klarvo";

  const seoDescription = variant === "demo"
    ? "Get a personalized walkthrough of Klarvo's EU AI Act compliance platform. Inventory, classify, and export audit-ready evidence packs for SMEs."
    : "Create your first AI system inventory in minutes. Risk classification, obligation mapping, and audit-ready exports for EU AI Act compliance.";

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        noindex={true} // Landing pages shouldn't compete with main site SEO
      />

      <div className="min-h-screen bg-background">
        <MinimalHeader />

        {/* Hero Section */}
        <LandingHero variant={variant} onCtaClick={scrollToForm} />

        {/* Form Section - Inline with hero on larger screens */}
        <section className="pb-16 md:pb-24 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto" ref={formRef}>
              <LeadCaptureForm variant={variant} id="lead-form" />
            </div>
          </div>
        </section>

        {/* Artifact Showcase */}
        <ArtifactShowcase />

        {/* Trust Block */}
        <TrustBlock />

        {/* Comparison */}
        <ComparisonTable />

        {/* FAQ */}
        <LandingFAQ />

        {/* Bottom CTA */}
        <StickyCTA variant={variant} onCtaClick={scrollToForm} />

        <MinimalFooter />
      </div>
    </>
  );
};

export default PaidSearchLanding;
