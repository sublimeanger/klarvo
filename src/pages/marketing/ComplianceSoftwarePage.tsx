import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  Shield, 
  Download, 
  Clock,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  Scale
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "AI System Inventory",
    description: "Track every AI system with a 20-step guided wizard. Capture all EU AI Act required fields in under 10 minutes.",
  },
  {
    icon: Shield,
    title: "Automated Classification",
    description: "Our classification engine determines risk level, detects prohibited practices, and flags transparency obligations automatically.",
  },
  {
    icon: Target,
    title: "Gap Analysis & Controls",
    description: "See exactly what's missing. Get auto-generated checklists based on your classification with linked evidence requirements.",
  },
  {
    icon: Download,
    title: "Audit-Ready Exports",
    description: "Generate professional PDF reports and ZIP evidence packs that satisfy auditors, boards, and customer procurement.",
  },
  {
    icon: Users,
    title: "Evidence Vault",
    description: "Store policies, screenshots, and vendor docs. Attach evidence to controls with approval workflows and expiration tracking.",
  },
  {
    icon: Clock,
    title: "Continuous Compliance",
    description: "Get reminded before deadlines. Track training completion. Log incidents. Keep evidence fresh with automatic renewal alerts.",
  },
];

const benefits = [
  "Complete AI inventory in hours, not weeks",
  "Know your risk level with clear rationale",
  "Auto-generate Article 26 deployer checklists",
  "FRIA workflow for high-risk systems",
  "Export evidence packs for procurement",
  "Track training completion for AI literacy",
];

const faqQuestions = [
  {
    question: "What is EU AI Act compliance software?",
    answer: "EU AI Act compliance software helps organizations inventory their AI systems, classify risk levels, track required controls, and generate documentation to prove compliance with the European Union's AI Act regulation."
  },
  {
    question: "Who needs EU AI Act compliance software?",
    answer: "Any organization using AI systems in the EU or serving EU customers needs to comply with the EU AI Act. Klarvo is designed for deployers (organizations that use AI in their operations) with full Article 26 workflow support. Provider track coming soon."
  },
  {
    question: "When did the EU AI Act come into force?",
    answer: "The EU AI Act entered into force on 1 August 2024. Prohibited practices and AI literacy obligations started applying from 2 February 2025, with broader obligations applying from August 2025 and 2026."
  },
  {
    question: "How is Klarvo different from spreadsheets?",
    answer: "Unlike spreadsheets, Klarvo provides automated classification logic, version-controlled evidence storage, approval workflows, audit trails, and professional export packs. It also updates automatically when regulations change."
  },
  {
    question: "Can I try Klarvo for free?",
    answer: "Yes! Klarvo offers a free tier that lets you inventory 1 AI system with basic classification and watermarked exports. No credit card required. Upgrade anytime for more systems and full exports."
  },
  {
    question: "How long does it take to get compliant with Klarvo?",
    answer: "Most SMEs can complete their first AI system classification in under 10 minutes. A full inventory with evidence typically takes days, not the weeks required with manual approaches."
  },
  {
    question: "What obligations does Klarvo cover?",
    answer: "Klarvo covers the full deployer compliance lifecycle: Article 5 prohibited practices screening, Annex III high-risk classification, Article 26 deployer duties (human oversight, logging, monitoring, incident reporting), Article 50 transparency obligations, Article 27 FRIA workflow, and Article 4 AI literacy tracking."
  },
  {
    question: "Does Klarvo support provider obligations too?",
    answer: "Yes. Klarvo includes a Provider Track with Annex IV technical documentation builder, conformity assessment workflows, CE marking checklists, EU Declaration of Conformity forms, EU database registration support, and post-market monitoring plans."
  }
];

export default function ComplianceSoftwarePage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo - EU AI Act Compliance Software",
    description: "AI system-of-record for EU AI Act compliance. Build AI inventories, classify risk, and generate audit-ready evidence packs.",
    applicationCategory: "BusinessApplication",
    offers: { price: "0", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "EU AI Act Compliance Software", url: "https://klarvo.io/eu-ai-act-compliance-software" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Compliance Software"
        description="EU AI Act compliance software for SMEs. Build your AI inventory, classify risk, and generate audit-ready evidence packs. Start free today."
        keywords={["EU AI Act compliance software", "AI governance software", "AI compliance tool", "EU AI Act software", "AI regulation software", "AI inventory software"]}
        canonical="https://klarvo.io/eu-ai-act-compliance-software"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="EU AI Act Compliance Software"
        title={
          <>
            <span className="text-foreground">The AI System-of-Record for</span>
            <br />
            <span className="text-gradient-hero">EU AI Act Compliance</span>
          </>
        }
        subtitle="Turn EU AI Act requirements into assigned controls, linked evidence, and audit-ready export packs. Built for SMEs who need compliance without the complexity."
        variant="centered"
      />

      {/* Social Proof */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>10 minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <span>Updated for Feb 2025 deadlines</span>
            </div>
          </div>
        </div>
      </section>

      {/* How Klarvo Works — detailed prose */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">How It Works</Badge>
              <h2 className="text-3xl font-bold mb-4">From Zero to Audit-Ready in Four Steps</h2>
              <p className="text-lg text-muted-foreground">
                Klarvo replaces scattered spreadsheets, shared drives, and guesswork with a single, guided workflow that produces the documentation regulators, auditors, and enterprise customers expect.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inventory Every AI System</h3>
                  <p className="text-muted-foreground">
                    Our guided 20-step wizard walks you through every field the EU AI Act expects: system purpose, affected persons, data types, human oversight arrangements, vendor details, and deployment context. The Commission's guidelines on what constitutes an "AI system" are built into the wizard as a structured questionnaire—you don't need to interpret the regulation yourself. Each AI system gets a completeness score so you can see exactly what's missing before an audit.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Classify Risk Automatically</h3>
                  <p className="text-muted-foreground">
                    As you complete the wizard, Klarvo's classification engine runs three screenings in sequence. First, it checks whether the system falls under one of the <Link to="/guides/prohibited-ai-practices-article-5" className="text-primary hover:underline">Article 5 prohibited practices</Link>—harmful manipulation, social scoring, untargeted facial recognition scraping, workplace emotion inference, and others. Second, it screens against the <Link to="/guides/high-risk-ai-annex-iii" className="text-primary hover:underline">Annex III high-risk categories</Link>: biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, and democratic processes. Third, it identifies <Link to="/guides/article-50-transparency-obligations" className="text-primary hover:underline">Article 50 transparency obligations</Link> such as AI interaction disclosure, synthetic content marking, and deepfake labelling. The result is a classification memo with a clear rationale, confidence level, and reviewer sign-off—all stored with full version history.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Map Obligations and Close Gaps</h3>
                  <p className="text-muted-foreground">
                    Based on your classification, Klarvo auto-generates the applicable obligations checklist. For high-risk deployers, this means the full <Link to="/guides/article-26-deployer-obligations" className="text-primary hover:underline">Article 26 duty set</Link>: use according to provider instructions, assign competent human oversight with authority to intervene, ensure input data relevance (if under your control), monitor operation continuously, report serious incidents, retain logs for at least six months, and notify workers where the system is used in the workplace. Each obligation maps to specific controls from our built-in control library, and each control specifies exactly what evidence is required—so compliance is never abstract.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Export Professional Evidence Packs</h3>
                  <p className="text-muted-foreground">
                    One click produces a complete <Link to="/ai-governance-evidence-packs" className="text-primary hover:underline">evidence pack</Link>—executive summary, inventory record, classification memo, obligations checklist, human oversight plan, training records, vendor documentation, and a numbered evidence index. Choose PDF for quick sharing or ZIP for detailed auditor review. The output looks like a deliverable from a top compliance consultancy, not a screenshot dump from a shared folder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for EU AI Act Compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From inventory to evidence packs, Klarvo covers the full compliance lifecycle.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deployer vs Provider */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Deployer vs Provider: Which Are You?</h2>
              <p className="text-lg text-muted-foreground">
                The EU AI Act assigns different obligations depending on your role in the AI value chain. Most SMEs are deployers—they use AI systems built by others in their operations or products. Providers are the organisations that develop or place AI systems on the market.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-primary">
                <CardHeader>
                  <Badge className="w-fit mb-2">Most SMEs</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Deployer (Article 26)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>You <strong>use</strong> AI systems in your operations—hiring tools, customer support chatbots, credit scoring, marketing AI, content generation.</p>
                  <p>Your obligations include: use according to instructions, assign competent human oversight, monitor operation, keep logs ≥6 months, report serious incidents, and inform workers about workplace AI use.</p>
                  <p>For high-risk systems, you may also need a <Link to="/fria-software" className="text-primary hover:underline">Fundamental Rights Impact Assessment (FRIA)</Link>.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/article-26-deployer-obligations">Full deployer guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">AI Builders</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Provider (Article 16)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>You <strong>develop or place</strong> AI systems on the EU market. This includes SaaS companies whose product contains AI features used by EU customers.</p>
                  <p>Provider obligations are heavier: risk management system, data governance, technical documentation (Annex IV), conformity assessment, CE marking, EU Declaration of Conformity, EU database registration, and post-market monitoring.</p>
                  <p>Klarvo's <strong>Provider Track</strong> covers all of these with dedicated workflows.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/features">See Provider Track features <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key EU AI Act Deadlines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key EU AI Act Deadlines</h2>
              <p className="text-lg text-muted-foreground">The regulation is phased in over several years. Some obligations already apply.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-destructive/30">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">2 February 2025 — <span className="text-destructive">Already applies</span></div>
                  <p className="text-sm text-muted-foreground">Prohibited AI practices (Article 5) and AI literacy obligations (Article 4) are now enforceable. Organisations must have measures in place to ensure sufficient AI literacy of staff operating AI systems.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <Clock className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">2 August 2025</div>
                  <p className="text-sm text-muted-foreground">Governance rules and obligations for general-purpose AI (GPAI) models take effect. National AI governance structures must be established.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">2 August 2026</div>
                  <p className="text-sm text-muted-foreground">Most obligations apply, including deployer duties (Article 26), transparency (Article 50), high-risk requirements, FRIA (Article 27), and registration requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">2 August 2027</div>
                  <p className="text-sm text-muted-foreground">Extended transition for certain high-risk AI embedded in regulated products covered by Annex I EU legislation (e.g., medical devices, machinery, vehicles).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Why Klarvo</Badge>
              <h2 className="text-3xl font-bold mb-4">Purpose-Built for EU AI Act</h2>
              <p className="text-lg text-muted-foreground">
                Unlike generic GRC tools, Klarvo understands AI-specific regulations.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who Uses Klarvo?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">SMEs</Badge>
                <CardTitle className="text-lg">Small & Medium Businesses</CardTitle>
                <CardDescription>Get compliant without hiring consultants. Klarvo guides you through every step with plain-language explanations and pre-built templates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/use-cases/sme">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">HR Teams</Badge>
                <CardTitle className="text-lg">HR & Recruitment</CardTitle>
                <CardDescription>AI in hiring is classified as high-risk under Annex III. Klarvo generates your Article 26 deployer obligations checklist and worker notification templates automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/industries/hr-recruitment-ai-act">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">SaaS</Badge>
                <CardTitle className="text-lg">B2B SaaS Companies</CardTitle>
                <CardDescription>Enterprise customers and public sector buyers now require AI governance evidence in procurement. Klarvo generates the pack that answers their questionnaire in one export.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/industries/saas-ai-act">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Explore More Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/ai-inventory-software" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">AI System Inventory</h3>
                    <p className="text-sm text-muted-foreground">Track every AI system with guided intake and completeness scoring.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ai-governance-evidence-packs" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Evidence Packs</h3>
                    <p className="text-sm text-muted-foreground">One-click PDF & ZIP exports for auditors and procurement.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/fria-software-article-27" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">FRIA Workflow</h3>
                    <p className="text-sm text-muted-foreground">Complete Fundamental Rights Impact Assessments with guided steps.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Learn more: <Link to="/guides/eu-ai-act-sme-guide" className="text-primary hover:underline">EU AI Act for SMEs</Link> · <Link to="/guides/deployer-obligations-article-26" className="text-primary hover:underline">Article 26 Guide</Link> · <Link to="/templates/ai-inventory-template" className="text-primary hover:underline">Free Inventory Template</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get EU AI Act Compliant Today"
        subtitle="Start free. No credit card required. Get your first AI system classified in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
