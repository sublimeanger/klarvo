import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ArrowRight,
  Users,
  Eye,
  AlertTriangle,
  BookOpen
} from "lucide-react";

const planSections = [
  {
    icon: Users,
    title: "Oversight Roles",
    items: [
      "Oversight owner designation",
      "Backup oversight owner",
      "RACI matrix for AI decisions",
      "Escalation contacts"
    ]
  },
  {
    icon: BookOpen,
    title: "Competence Requirements",
    items: [
      "Required knowledge/skills",
      "Training requirements",
      "Certification needs",
      "Ongoing development"
    ]
  },
  {
    icon: Eye,
    title: "Oversight Procedures",
    items: [
      "Review frequency",
      "Monitoring checkpoints",
      "Output verification process",
      "Override procedures"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Intervention Authority",
    items: [
      "Stop/pause authority",
      "Override capability",
      "Suspension triggers",
      "Recovery procedures"
    ]
  },
];

const faqQuestions = [
  {
    question: "What is human oversight under the EU AI Act?",
    answer: "Human oversight means assigning competent persons with the authority to monitor AI system operation, verify outputs, and intervene (including stopping the system) when necessary. It's a key deployer obligation under Article 26."
  },
  {
    question: "Who should be the human oversight owner?",
    answer: "The oversight owner should have: understanding of the AI system, knowledge of potential risks, authority to intervene, and training on the system's operation. They're often product owners, managers, or designated operators."
  },
  {
    question: "What competence is required for oversight?",
    answer: "Oversight persons must have necessary competence, training, and authority. This includes understanding the system's capabilities and limitations, knowing when to intervene, and having practical ability to stop or override the system."
  },
  {
    question: "How often should oversight reviews occur?",
    answer: "Review frequency depends on the system and context. High-frequency/high-impact systems may need daily reviews, while others might be weekly or monthly. Follow provider instructions and adjust based on your risk assessment."
  }
];

const howToSteps = [
  { name: "Identify oversight needs", text: "Review your high-risk AI systems and their oversight requirements from provider instructions." },
  { name: "Designate oversight owners", text: "Assign primary and backup oversight owners with appropriate competence." },
  { name: "Define competence requirements", text: "Document what training and knowledge oversight persons need." },
  { name: "Create procedures", text: "Write clear procedures for monitoring, verification, and intervention." },
  { name: "Document authority", text: "Ensure oversight persons have documented authority to stop/override systems." },
];

export default function HumanOversightPlan() {
  const howToSchema = createHowToSchema({
    name: "How to Create a Human Oversight Plan",
    description: "Step-by-step guide to creating a human oversight plan for high-risk AI systems.",
    steps: howToSteps,
    totalTime: "PT1H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "Human Oversight Plan", url: "https://klarvo.io/templates/human-oversight-plan-template" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Human Oversight Plan Template - EU AI Act"
        description="Free human oversight plan template for high-risk AI systems. Covers oversight roles, competence requirements, procedures, and intervention authority."
        keywords={["human oversight plan", "AI oversight template", "Article 26 oversight", "human in the loop", "AI human oversight"]}
        canonical="https://klarvo.io/templates/human-oversight-plan-template"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="destructive">High-Risk Required</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Human Oversight Plan Template
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Document your human oversight arrangements for high-risk AI systems. Covers roles, competence, procedures, and intervention authority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="Human Oversight Plan"
                templateSlug="human-oversight-plan"
                fileName="human-oversight-plan-template.pdf"
                buttonText="Download Template"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/guides/article-26-deployer-obligations">
                  Read Article 26 Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Template Sections</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {planSections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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

      <CTASection
        title="Track Oversight in Klarvo"
        subtitle="Assign oversight owners, track training, and evidence your oversight arrangements—all in one place."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
