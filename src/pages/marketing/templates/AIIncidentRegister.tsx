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
  AlertTriangle,
  FileText,
  Bell
} from "lucide-react";

const registerFields = [
  {
    category: "Incident Details",
    fields: ["Incident ID", "Date/time occurred", "Date/time detected", "AI system affected", "Severity level"]
  },
  {
    category: "Impact Assessment",
    fields: ["Affected parties", "Impact description", "Harm potential", "Scale of impact"]
  },
  {
    category: "Response",
    fields: ["Containment actions", "Internal notifications", "External notifications", "Provider notification"]
  },
  {
    category: "Resolution",
    fields: ["Root cause", "Corrective actions", "Prevention measures", "Lessons learned"]
  },
];

const faqQuestions = [
  {
    question: "What AI incidents should I log?",
    answer: "Log any AI system malfunction, unexpected output, bias detection, user complaints, near-misses, and any event that could indicate risk to health, safety, or fundamental rights."
  },
  {
    question: "What is a 'serious incident' under the EU AI Act?",
    answer: "A serious incident is one that results in or could result in: death or serious damage to health/safety, serious and irreversible disruption to critical infrastructure, or breach of fundamental rights obligations."
  },
  {
    question: "Who must I notify about AI incidents?",
    answer: "For serious incidents involving high-risk AI, you must notify the AI system provider and relevant market surveillance authorities. Internal stakeholders should also be notified per your incident procedures."
  },
  {
    question: "How long should I keep incident records?",
    answer: "Keep incident records for at least as long as you keep AI system logs (minimum 6 months for high-risk). Many organizations retain for longer given potential legal or audit needs."
  }
];

const howToSteps = [
  { name: "Download template", text: "Get the incident register template in spreadsheet or database format." },
  { name: "Define severity levels", text: "Establish clear criteria for incident severity (low, medium, high, critical)." },
  { name: "Train responders", text: "Ensure team knows how to log incidents and when to escalate." },
  { name: "Integrate with workflow", text: "Connect to your incident management and notification processes." },
  { name: "Review regularly", text: "Analyze incidents for patterns and improvement opportunities." },
];

export default function AIIncidentRegister() {
  const howToSchema = createHowToSchema({
    name: "How to Set Up an AI Incident Register",
    description: "Step-by-step guide to implementing an AI incident register for EU AI Act compliance.",
    steps: howToSteps,
    totalTime: "PT1H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "AI Incident Register", url: "https://klarvo.io/templates/ai-incident-register-template" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Incident Register Template - Free Download"
        description="Free AI incident register template for EU AI Act compliance. Track AI incidents, impacts, responses, and notifications in one place."
        keywords={["AI incident register", "AI incident log", "AI incident management", "AI incident template", "AI monitoring template"]}
        canonical="https://klarvo.io/templates/ai-incident-register-template"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="outline">Monitoring</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Incident Register Template
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Track and document AI incidents with structured fields for impact assessment, response actions, and notifications. Essential for high-risk deployers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="AI Incident Register"
                templateSlug="ai-incident-register"
                fileName="ai-incident-register-template.xlsx"
                buttonText="Download Template"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <a href="https://app.klarvo.io/auth/signup">
                  Use Klarvo Incidents
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Register Fields */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Tracked</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {registerFields.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.fields.map((field, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {field}
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

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Article 26 Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Learn about incident reporting obligations.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/guides/article-26-deployer-obligations">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Oversight Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Document your monitoring and intervention procedures.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/templates/human-oversight-plan-template">Get Template <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Article 26 Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Full deployer obligations checklist.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/templates/article-26-checklist">Get Checklist <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Automate Incident Management"
        subtitle="Klarvo's incident module tracks events, triggers notifications, and links evidence automatically."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
