import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { HubNavigation } from "@/components/marketing/HubNavigation";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  CreditCard,
  Scale,
  Globe,
  Vote,
  Shield,
  Clock,
  CheckCircle,
  FileText,
  Eye,
  Database,
  Bell
} from "lucide-react";

const annexIIICategories = [
  {
    icon: Users,
    title: "1. Biometrics",
    description: "Remote biometric identification and biometric categorisation of natural persons",
    examples: ["Facial recognition for identification", "Biometric categorisation systems", "Emotion recognition in certain contexts"],
    smeRelevance: "Relevant if you use facial recognition for access control, customer verification, or identity matching. Most simple badge/PIN access systems are not affected."
  },
  {
    icon: Building,
    title: "2. Critical Infrastructure",
    description: "AI as safety components in management/operation of critical infrastructure",
    examples: ["Energy grid management", "Water supply systems", "Transport infrastructure", "Digital infrastructure"],
    smeRelevance: "Relevant if you operate or maintain critical infrastructure using AI for safety-related decisions. Standard IT infrastructure monitoring is typically not covered."
  },
  {
    icon: GraduationCap,
    title: "3. Education & Training",
    description: "AI used in education and vocational training contexts",
    examples: ["Student assessment and scoring", "Admissions decisions", "Exam proctoring", "Learning progress evaluation"],
    smeRelevance: "Relevant if you're an EdTech company or educational institution using AI for grading, admissions, or proctoring. Standard LMS systems without AI scoring are not affected."
  },
  {
    icon: Briefcase,
    title: "4. Employment & Workers",
    description: "AI in employment, worker management, and self-employment access",
    examples: ["CV screening and recruitment", "Interview analysis", "Performance evaluation", "Task allocation", "Workforce monitoring"],
    smeRelevance: "This is the most common high-risk category for SMEs. If you use any AI tool for hiring, screening CVs, evaluating performance, or allocating work—it's likely high-risk. This includes third-party ATS tools with AI screening."
  },
  {
    icon: CreditCard,
    title: "5. Essential Services",
    description: "AI affecting access to essential private and public services",
    examples: ["Credit scoring", "Insurance pricing", "Emergency services dispatch", "Healthcare access", "Social benefits eligibility"],
    smeRelevance: "Relevant for fintech, insurtech, and healthtech companies. If your AI influences credit decisions, insurance pricing, or access to healthcare—it's high-risk."
  },
  {
    icon: Scale,
    title: "6. Law Enforcement",
    description: "AI used by law enforcement authorities",
    examples: ["Evidence assessment", "Risk of offending/reoffending", "Lie detection (polygraph)", "Criminal profiling"],
    smeRelevance: "Primarily relevant for vendors selling AI to law enforcement. If you provide AI tools to police, courts, or security agencies—review this category carefully."
  },
  {
    icon: Globe,
    title: "7. Migration & Border",
    description: "AI in migration, asylum, and border control",
    examples: ["Visa application assessment", "Border patrol systems", "Asylum claim processing", "Security risk assessment"],
    smeRelevance: "Relevant for companies providing AI systems to border agencies, immigration services, or visa processing. Most SMEs are not affected."
  },
  {
    icon: Vote,
    title: "8. Justice & Democracy",
    description: "AI in justice administration and democratic processes",
    examples: ["Case outcome research", "Judicial decision support", "Election-related systems", "Democratic process influence detection"],
    smeRelevance: "Relevant for legaltech companies providing AI to courts or for election-related technology. Most SMEs are not affected."
  },
];

const deployerObligations = [
  { icon: FileText, title: "Use According to Instructions", article: "26(1)", description: "Obtain and follow the provider's instructions for use. Create internal SOPs and train operators on correct usage." },
  { icon: Users, title: "Human Oversight", article: "26(2)", description: "Assign oversight to persons with necessary competence, training, and authority. They must be able to intervene and stop the system." },
  { icon: Database, title: "Input Data Management", article: "26(4)", description: "Where you control input data, ensure it is relevant and sufficiently representative. Monitor for bias." },
  { icon: Eye, title: "Monitor Operation", article: "26(5)", description: "Monitor the system based on provider instructions. Establish KPIs and thresholds. Document monitoring activities." },
  { icon: AlertTriangle, title: "Risk Escalation & Suspension", article: "26(5)", description: "Inform the provider/distributor of risks. Suspend use if you suspect risk to health, safety, or fundamental rights." },
  { icon: Bell, title: "Serious Incident Reporting", article: "26(5)", description: "Report serious incidents to provider and relevant market surveillance authorities." },
  { icon: Database, title: "Log Retention ≥6 Months", article: "26(6)", description: "Keep automatically generated logs under your control for at least 6 months." },
  { icon: Users, title: "Workplace Notification", article: "26(7)", description: "If you're an employer, inform workers and their representatives before deploying high-risk AI." },
];

const faqQuestions = [
  {
    question: "What makes an AI system 'high-risk'?",
    answer: "An AI system is high-risk if it falls into one of the 8 Annex III categories (biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice/democracy) or is a safety component of a product covered by EU harmonisation legislation (e.g., medical devices, vehicles, machinery)."
  },
  {
    question: "When do high-risk obligations apply?",
    answer: "Most high-risk AI obligations apply from 2 August 2026. However, for AI systems that are safety components of products already covered by EU law (Annex I), there's an extended transition until 2 August 2027."
  },
  {
    question: "What are the main deployer obligations for high-risk AI?",
    answer: "Deployers must: use systems according to instructions, assign competent human oversight, ensure input data relevance, monitor operation, report risks and incidents, keep logs for 6+ months, and inform workers (where applicable). See Article 26 for full details."
  },
  {
    question: "Do I need a FRIA for high-risk AI?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required for public bodies and certain private entities providing public services when deploying high-risk AI, plus deployers of credit scoring and health/life insurance risk assessment AI. Use our FRIA trigger check to assess your requirements."
  },
  {
    question: "How do I know if my AI is high-risk?",
    answer: "Use our High-Risk Checker tool to assess your AI systems against all 8 Annex III categories. The tool asks targeted questions about your use case and generates a documented result with rationale."
  },
  {
    question: "What if I use an AI hiring tool from a vendor?",
    answer: "Employment AI is high-risk under Annex III category 4. As a deployer, you have Article 26 obligations even though the vendor built the system. You must ensure human oversight, monitor performance, keep logs, and inform workers. Ask your vendor for instructions for use and ensure they provide logging capabilities."
  },
  {
    question: "What penalties apply for high-risk non-compliance?",
    answer: "Violations of high-risk AI obligations can result in fines up to €15 million or 3% of annual worldwide turnover, whichever is higher. This is the middle tier—lower than prohibited practices (€35M/7%) but still substantial."
  }
];

export default function HighRiskGuide() {
  const articleSchema = createArticleSchema({
    headline: "High-Risk AI Systems (Annex III): Complete Guide",
    description: "Comprehensive guide to EU AI Act high-risk AI classification. Learn about Annex III categories, deployer obligations, and how to determine if your AI is high-risk.",
    datePublished: "2025-01-12",
    dateModified: "2026-02-28",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "High-Risk AI", url: "https://klarvo.io/guides/high-risk-ai-annex-iii" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="High-Risk AI Systems (Annex III) - EU AI Act Guide"
        description="Complete guide to EU AI Act high-risk AI classification. Learn about the 8 Annex III categories including employment, credit, education, and how to comply with deployer obligations."
        keywords={["high-risk AI", "Annex III", "EU AI Act high-risk", "AI risk classification", "deployer obligations", "AI compliance"]}
        canonical="https://klarvo.io/guides/high-risk-ai-annex-iii"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">Guide</Badge>
              <Badge variant="outline">Annex III</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                20 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              High-Risk AI Systems (Annex III)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The EU AI Act defines 8 categories of high-risk AI in Annex III. If your AI systems fall into these categories, you have specific obligations as a deployer under Article 26. Here's what you need to know—with practical guidance for SMEs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/high-risk-checker-annex-iii">
                  Check Your AI Systems
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/article-26-checklist">
                  Get Deployer Checklist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Understanding High-Risk Classification</h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                High-risk AI systems are those that pose significant risks to health, safety, or fundamental rights. The EU AI Act identifies them through two mechanisms:
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Annex III Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Eight specific use-case areas defined in the Act: biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, and justice/democracy. If your AI system is used in one of these areas and meets certain conditions, it's high-risk.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Safety Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    AI systems that are safety components of products already covered by EU harmonisation legislation (medical devices, machinery, vehicles, toys, lifts, etc.). These have an extended transition period until August 2027.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 border border-primary/30 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">
                <strong>The most common category for SMEs is employment (category 4).</strong> If you use any AI tool for hiring, CV screening, performance evaluation, task allocation, or workforce monitoring—even if it's a third-party SaaS tool—it's likely classified as high-risk. This is the category to check first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories with SME relevance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">The 8 Annex III Categories</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Each category includes practical SME relevance notes to help you quickly assess whether your AI systems are affected.
            </p>
            <div className="space-y-6">
              {annexIIICategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-16">
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Examples:</p>
                        <ul className="space-y-1">
                          {category.examples.map((ex, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Shield className="h-3 w-3 text-primary shrink-0" />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium mb-1">SME relevance:</p>
                        <p className="text-xs text-muted-foreground">{category.smeRelevance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Practical Examples for SMEs</h2>
            <div className="space-y-4">
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🏢 You use an AI hiring platform (e.g., HireVue, Pymetrics, or similar)</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  <strong>Classification:</strong> High-risk under Annex III, category 4 (Employment). CV screening, interview analysis, and candidate ranking all fall squarely into this category.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>What you must do:</strong> Follow vendor instructions, assign a human reviewer who can override AI decisions, monitor for bias, keep logs for 6+ months, and inform candidates that AI is used in the process. Use our <Link to="/templates/article-26-checklist" className="text-primary hover:underline">Article 26 checklist</Link> to track all obligations.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">💳 You use AI for credit decisioning or insurance pricing</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  <strong>Classification:</strong> High-risk under Annex III, category 5 (Essential Services). Additionally, this triggers FRIA requirements under Article 27.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>What you must do:</strong> All Article 26 deployer obligations plus a <Link to="/guides/fria-article-27" className="text-primary hover:underline">Fundamental Rights Impact Assessment</Link> before first use. Monitor for discriminatory outcomes and maintain detailed logs.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">🤖 You use ChatGPT or similar LLM for customer support</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  <strong>Classification:</strong> Likely <em>not</em> high-risk under Annex III (unless it makes decisions about essential services). However, it triggers <Link to="/guides/article-50-transparency-obligations" className="text-primary hover:underline">Article 50 transparency obligations</Link>—you must disclose that customers are interacting with AI.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>What you must do:</strong> Display clear AI interaction disclosure, mark any synthetic content, and ensure human escalation paths exist.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">📊 You use AI analytics for internal business reporting</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  <strong>Classification:</strong> Likely minimal risk. Internal analytics that don't make decisions about people's access to services, employment, or rights are typically not high-risk.
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>What you must do:</strong> Still include in your AI inventory and run through the <Link to="/guides/prohibited-ai-practices-article-5" className="text-primary hover:underline">prohibited practices screening</Link>. Ensure <Link to="/guides/ai-literacy-article-4" className="text-primary hover:underline">AI literacy training</Link> covers how staff use these tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Deployer Obligations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Your 8 Deployer Obligations (Article 26)</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              If you deploy high-risk AI, these are your legal obligations. Each maps to specific controls in Klarvo's control library.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {deployerObligations.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{item.title}</span>
                          <Badge variant="outline" className="text-xs">Art. {item.article}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/guides/article-26-deployer-obligations">
                  Full Article 26 Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What To Do Next */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What To Do Next</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">1. Check Your Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Run each AI system through our Annex III checker to determine if it's high-risk.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/tools/high-risk-checker-annex-iii">Run Checker <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">2. Get the Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Download the Article 26 deployer obligations checklist for each high-risk system.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/article-26-checklist">Get Checklist <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Scale className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">3. Check FRIA Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Determine if your deployment triggers FRIA requirements under Article 27.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/fria-article-27">FRIA Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      <RelatedContent currentHref="/guides/high-risk-ai-annex-iii" title="Related Resources" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
        </div>
      </section>

      <CTASection
        title="Manage High-Risk AI Compliance"
        subtitle="Klarvo auto-generates deployer checklists, tracks evidence, and produces audit-ready packs for every high-risk system."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
