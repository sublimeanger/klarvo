import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  FileText,
  Shield,
  CreditCard,
  Users,
  Settings,
  Zap,
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEOHead, SchemaMarkup, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";

const faqCategories = [
  {
    id: "general",
    icon: HelpCircle,
    title: "General Questions",
    faqs: [
      {
        question: "What is Klarvo?",
        answer: "Klarvo is a comprehensive EU AI Act compliance platform designed for SMEs. We help organizations inventory their AI systems, classify risk levels, implement required controls, collect evidence, and generate audit-ready documentation—all without needing expensive consultants or legal experts."
      },
      {
        question: "Who is Klarvo designed for?",
        answer: "Klarvo is built for small and medium-sized enterprises (SMEs) that use AI in their operations or products. This includes companies deploying AI tools from vendors, building AI features, or using AI-powered SaaS products. Our platform is especially valuable for compliance leads, product managers, CTOs, and DPOs responsible for AI governance."
      },
      {
        question: "Do I need to be a legal expert to use Klarvo?",
        answer: "Absolutely not. Klarvo is designed with plain language guidance throughout. Our classification engine walks you through each regulatory requirement with clear explanations, and our templates are written in accessible terms. We translate complex legal obligations into actionable steps anyone can follow."
      },
      {
        question: "How long does it take to get started?",
        answer: "You can add your first AI system in under 10 minutes using our Quick Capture mode. A full assessment takes 15-20 minutes per system. Most organizations complete their initial AI inventory within a few hours, and can have a basic compliance posture documented within their first week."
      },
      {
        question: "What languages does Klarvo support?",
        answer: "Klarvo's interface and all generated documentation is currently available in English. We're planning to add support for German, French, Spanish, Italian, and Dutch in 2025 to serve the broader EU market."
      }
    ]
  },
  {
    id: "eu-ai-act",
    icon: FileText,
    title: "EU AI Act",
    faqs: [
      {
        question: "What is the EU AI Act?",
        answer: "The EU AI Act is the world's first comprehensive legal framework for artificial intelligence. It establishes requirements for AI systems based on their risk level, from prohibited practices to high-risk obligations. The Act entered into force on August 1, 2024, with requirements phasing in through 2027."
      },
      {
        question: "When do EU AI Act requirements apply?",
        answer: "Requirements are phased in over time: Prohibited AI practices and AI literacy obligations apply from February 2, 2025. GPAI (general purpose AI) rules apply from August 2, 2025. Most other obligations apply from August 2, 2026. Extended transitions for some high-risk AI in regulated products run until August 2, 2027."
      },
      {
        question: "What are 'high-risk' AI systems?",
        answer: "High-risk AI systems are those used in sensitive areas defined in Annex III of the Act, including: biometrics, critical infrastructure, education, employment/worker management, access to essential services (credit, insurance), law enforcement, migration/border control, and justice/democratic processes. These systems face the strictest requirements."
      },
      {
        question: "Does the EU AI Act apply to companies outside the EU?",
        answer: "Yes. The Act applies to AI providers placing systems on the EU market, deployers using AI within the EU, and providers/deployers outside the EU if their AI system's output is used in the EU. This means many non-EU companies must comply."
      },
      {
        question: "What is a 'deployer' under the EU AI Act?",
        answer: "A deployer is any organization using an AI system in their operations or services—as opposed to a 'provider' who develops or places AI on the market. Most SMEs are deployers. Deployer obligations include using AI according to instructions, maintaining human oversight, monitoring operation, and reporting incidents."
      },
      {
        question: "What is a Fundamental Rights Impact Assessment (FRIA)?",
        answer: "A FRIA is required for certain deployers of high-risk AI (particularly public bodies and some private entities). It documents the AI's impact on fundamental rights, identifies risks, and describes mitigation measures. Klarvo includes a complete FRIA wizard aligned with Article 27 requirements."
      }
    ]
  },
  {
    id: "features",
    icon: Zap,
    title: "Features & Functionality",
    faqs: [
      {
        question: "What does the Classification Engine do?",
        answer: "The Classification Engine guides you through determining: (1) whether your system qualifies as 'AI' under the Act, (2) prohibited practices screening, (3) high-risk category detection, and (4) transparency obligations. It produces a Classification Memo with documented rationale and reviewer sign-off."
      },
      {
        question: "What are 'Evidence Packs'?",
        answer: "Evidence Packs are audit-ready documentation bundles that Klarvo generates. They include classification memos, control implementation status, linked evidence files, FRIA reports, and more—formatted professionally for auditors, board members, or customer due diligence requests."
      },
      {
        question: "Can I track multiple AI systems?",
        answer: "Yes. Klarvo is designed to manage your complete AI inventory. Each AI system has its own profile, classification, controls, evidence, and export capabilities. Our dashboard gives you an overview of compliance status across all systems."
      },
      {
        question: "Does Klarvo integrate with other tools?",
        answer: "We're building integrations with popular tools like Jira, Slack, Microsoft Teams, and Google Workspace — these are currently on our roadmap. In the meantime, our platform covers the full compliance workflow natively, and you can export data in standard formats for use in other systems."
      },
      {
        question: "How does the Control Library work?",
        answer: "Our Control Library contains pre-built controls mapped to EU AI Act obligations (governance, classification, transparency, deployer duties, logging, data, vendor, security, training, and monitoring). Each control shows requirements, evidence needed, and links to relevant AI systems."
      },
      {
        question: "Can I generate custom reports?",
        answer: "Yes. Beyond standard Classification Memos and FRIA Reports, you can generate organization-wide compliance summaries, training completion reports, and full Evidence Pack ZIP bundles. All exports are formatted professionally for external sharing."
      }
    ]
  },
  {
    id: "security",
    icon: Lock,
    title: "Security & Privacy",
    faqs: [
      {
        question: "How is my data protected?",
        answer: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use enterprise-grade cloud infrastructure with EU-based data centers. Access is controlled via role-based permissions, and all actions are logged in our audit trail."
      },
      {
        question: "Where is my data stored?",
        answer: "Klarvo stores all customer data in EU-based data centers to support GDPR and data residency requirements. We do not store or process data outside the European Union."
      },
      {
        question: "Is Klarvo GDPR compliant?",
        answer: "Yes. Klarvo is fully GDPR compliant. We offer a Data Processing Agreement (DPA) to all customers, maintain records of processing activities, and support data subject access requests. See our Privacy Policy and DPA for details."
      },
      {
        question: "Do you have security certifications?",
        answer: "We implement security best practices aligned with ISO 27001 and conduct regular penetration testing. Our infrastructure is GDPR compliant with EU data residency."
      },
      {
        question: "Who can access my data?",
        answer: "Only authorized users in your organization can access your data, based on role-based permissions you configure. Klarvo staff access is limited to essential support functions and requires approval. All access is logged."
      }
    ]
  },
  {
    id: "pricing",
    icon: CreditCard,
    title: "Pricing & Billing",
    faqs: [
      {
        question: "How much does Klarvo cost?",
        answer: "Klarvo offers tiered pricing based on the number of AI systems and features needed. We have a Free tier (1 system), Starter (€149/mo for 10 systems), Growth (€349/mo for 25 systems), and Pro (€749/mo for 100 systems). Enterprise pricing is custom. See our Pricing page for details."
      },
      {
        question: "Is there a free trial?",
        answer: "Yes. Our Free tier lets you add 1 AI system and explore core features indefinitely — no credit card required. You can upgrade to a paid plan anytime to add more systems and unlock advanced features like full exports, approvals, and team collaboration."
      },
      {
        question: "What happens if I exceed my AI system limit?",
        answer: "You can add additional AI systems beyond your plan limit for an overage fee (Starter: €12/system/mo, Growth: €9/system/mo, Pro: €6/system/mo). We'll notify you before any charges apply."
      },
      {
        question: "Do you offer annual billing?",
        answer: "Yes. Annual billing is available at a discount (approximately 15% savings). Contact sales or upgrade from your billing settings to switch to annual billing."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes. You can cancel your subscription at any time. Your access continues until the end of your current billing period. You can export all your data before cancellation."
      }
    ]
  },
  {
    id: "team",
    icon: Users,
    title: "Team & Collaboration",
    faqs: [
      {
        question: "How many team members can I add?",
        answer: "User limits vary by plan: Free (1 user), Starter (5 users), Growth (unlimited), Pro (unlimited), Enterprise (unlimited with SSO). All plans include core collaboration features."
      },
      {
        question: "What user roles are available?",
        answer: "Klarvo offers four roles: Admin (full access), Compliance Owner (everything except billing), System Owner (only their assigned systems), and Viewer (read-only). Enterprise plans include custom role configuration."
      },
      {
        question: "Can I assign different owners to different AI systems?",
        answer: "Yes. Each AI system can have a Primary Owner, Backup Owner, and Oversight Owner assigned. Tasks and evidence requests are routed to the appropriate owners automatically."
      },
      {
        question: "Is there an audit trail?",
        answer: "Yes. Klarvo logs all significant actions—classification changes, evidence uploads, approvals, exports, and more. The Audit Log shows who did what, when, with full details for compliance auditing."
      }
    ]
  },
  {
    id: "getting-started",
    icon: Settings,
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Visit klarvo.io and click 'Start Free'. Sign up with your email or Google account. You'll be guided through a brief onboarding to set up your organization and can immediately start adding AI systems."
      },
      {
        question: "What information do I need to add an AI system?",
        answer: "At minimum, you need the system name, department, and a brief description. Our wizard guides you through additional details like vendor info, affected groups, and oversight setup. You can start with Quick Capture and add details later."
      },
      {
        question: "Can I import existing AI system inventories?",
        answer: "Yes. Klarvo supports CSV import for bulk AI system creation. Map your spreadsheet columns to our fields and import in minutes. Contact support for help with large migrations."
      },
      {
        question: "Do you offer onboarding support?",
        answer: "Yes. All paid plans include email support with 24-hour response times. Growth and Pro plans include a dedicated onboarding call. Enterprise plans include full implementation support."
      }
    ]
  }
];

// Extract all FAQ questions for schema
const allFaqQuestions = faqCategories.flatMap(cat => 
  cat.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))
);

const faqSchema = createFAQSchema({ questions: allFaqQuestions.slice(0, 15) });

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "FAQ", url: "https://klarvo.io/faq" }
  ]
});

export default function FAQ() {
  return (
    <MarketingLayout>
      <SEOHead
        title="FAQ - EU AI Act Compliance Questions Answered"
        description="Answers to common questions about EU AI Act compliance, Klarvo platform features, pricing, and getting started with AI governance."
        keywords={["EU AI Act FAQ", "AI compliance questions", "Klarvo FAQ", "AI Act answers", "compliance help"]}
        canonical="https://klarvo.io/faq"
      />
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="FAQ"
        title={
          <>
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-gradient-hero">Questions</span>
          </>
        }
        subtitle="Find answers to common questions about Klarvo, the EU AI Act, and how to achieve compliance efficiently."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Category Navigation */}
      <section className="py-12 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-medium"
              >
                <category.icon className="h-4 w-4 text-primary" />
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.id}-${i}`}
                      className="border border-border/50 rounded-lg px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all bg-card"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Can't find what you're looking for? Our team is here to help. 
                Reach out and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-premium" asChild>
                  <Link to="/contact">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs">Browse Documentation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Join hundreds of organizations using Klarvo for EU AI Act compliance."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
