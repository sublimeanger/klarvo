import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Download,
  RefreshCw,
  Shield
} from "lucide-react";

const annexIIICategories = [
  {
    id: "biometric",
    title: "Biometrics",
    description: "Biometric identification, categorisation, or emotion recognition systems",
    examples: "Face recognition, fingerprint ID, emotion detection at work"
  },
  {
    id: "critical_infrastructure",
    title: "Critical Infrastructure",
    description: "AI in critical infrastructure like energy, water, transport, digital infrastructure",
    examples: "Traffic management, power grid AI, water treatment systems"
  },
  {
    id: "education",
    title: "Education & Training",
    description: "AI for admissions, assessment, student monitoring, or proctoring",
    examples: "Automated grading, admission scoring, exam proctoring"
  },
  {
    id: "employment",
    title: "Employment & Workers",
    description: "AI for recruitment, HR decisions, work allocation, or worker monitoring",
    examples: "CV screening, interview tools, performance monitoring, scheduling"
  },
  {
    id: "essential_services",
    title: "Essential Services",
    description: "AI affecting access to credit, insurance, housing, or healthcare",
    examples: "Credit scoring, insurance pricing, benefits eligibility"
  },
  {
    id: "law_enforcement",
    title: "Law Enforcement",
    description: "AI for risk assessment, evidence analysis, or crime prediction",
    examples: "Criminal risk scoring, investigative tools, polygraph AI"
  },
  {
    id: "migration",
    title: "Migration & Border",
    description: "AI for visa assessment, border control, or asylum processing",
    examples: "Visa risk assessment, document verification, border checks"
  },
  {
    id: "justice",
    title: "Justice & Democracy",
    description: "AI in court proceedings or affecting democratic processes",
    examples: "Case triage, legal research AI, election systems"
  },
  {
    id: "safety_component",
    title: "Safety Component",
    description: "AI as a safety component in products covered by EU harmonisation legislation",
    examples: "Medical device AI, vehicle safety systems, machinery controls"
  },
];

const faqQuestions = [
  {
    question: "What is Annex III of the EU AI Act?",
    answer: "Annex III lists use cases that are classified as 'high-risk' under the EU AI Act. If your AI system falls into one of these categories, you have additional obligations under Articles 6-27."
  },
  {
    question: "What obligations do high-risk AI systems have?",
    answer: "High-risk AI systems require: risk management systems, data governance, technical documentation, record-keeping, transparency to users, human oversight, accuracy and robustness measures, and conformity assessment."
  },
  {
    question: "What if my AI system might be high-risk?",
    answer: "If there's any doubt, treat the system as potentially high-risk and begin preparing documentation. Use our Article 26 checklist to understand deployer obligations."
  },
  {
    question: "Are there exceptions to high-risk classification?",
    answer: "Some systems in Annex III areas may not be high-risk if they don't pose significant risks. For example, narrow/limited AI for document processing might be exempt. Review the specific conditions in Article 6."
  }
];

export default function HighRiskChecker() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const faqSchema = createFAQSchema({ questions: faqQuestions });
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Tools", url: "https://klarvo.io/tools" },
      { name: "High-Risk Checker", url: "https://klarvo.io/tools/high-risk-checker-annex-iii" }
    ]
  });

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const reset = () => {
    setSelectedCategories([]);
    setShowResult(false);
  };

  const isHighRisk = selectedCategories.length > 0;

  return (
    <MarketingLayout>
      <SEOHead
        title="High-Risk AI Checker (Annex III) - EU AI Act"
        description="Free tool to check if your AI system is high-risk under EU AI Act Annex III. Covers all 8 high-risk categories with instant results."
        keywords={["Annex III checker", "high-risk AI", "EU AI Act high-risk", "AI risk classification", "Annex III categories"]}
        canonical="https://klarvo.io/tools/high-risk-checker-annex-iii"
      />
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Tool</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              High-Risk AI Checker
            </h1>
            <p className="text-xl text-muted-foreground">
              Check if your AI system falls into a high-risk category under Annex III of the EU AI Act.
            </p>
          </div>
        </div>
      </section>

      {/* Checker Tool */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showResult ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Annex III Category Check</CardTitle>
                      <CardDescription>Select all categories that apply to your AI system</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {annexIIICategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        selectedCategories.includes(category.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={category.id} className="font-semibold cursor-pointer">
                            {category.title}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <span className="font-medium">Examples:</span> {category.examples}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setShowResult(true)} size="lg">
                      Get Result
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center space-y-6">
                  {/* Result Icon */}
                  <div className="flex justify-center">
                    {isHighRisk ? (
                      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                      </div>
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-success" />
                      </div>
                    )}
                  </div>

                  {/* Result */}
                  <div>
                    <Badge variant={isHighRisk ? "destructive" : "default"} className="mb-2 text-lg px-4 py-1">
                      {isHighRisk ? "Potential High-Risk AI" : "Not High-Risk (Annex III)"}
                    </Badge>
                    
                    {isHighRisk && (
                      <div className="mt-4 text-left max-w-md mx-auto">
                        <p className="text-muted-foreground mb-4">
                          Your AI system matches {selectedCategories.length} Annex III {selectedCategories.length === 1 ? "category" : "categories"}:
                        </p>
                        <ul className="space-y-2">
                          {selectedCategories.map(id => {
                            const cat = annexIIICategories.find(c => c.id === id);
                            return (
                              <li key={id} className="flex items-center gap-2 text-sm">
                                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                                {cat?.title}
                              </li>
                            );
                          })}
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                          As a deployer of high-risk AI, you have obligations under Article 26. Download our checklist to get started.
                        </p>
                      </div>
                    )}
                    
                    {!isHighRisk && (
                      <p className="text-muted-foreground mt-4">
                        Based on your selections, this AI system does not appear to fall into an Annex III high-risk category. 
                        However, it may still have transparency obligations under Article 50.
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button variant="outline" onClick={reset}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Result
                    </Button>
                    {isHighRisk ? (
                      <Button asChild>
                        <Link to="/templates/article-26-checklist">
                          Get Article 26 Checklist
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild>
                        <Link to="/tools/transparency-obligation-checker">
                          Check Transparency Requirements
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
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
        title="Need Full Classification & Compliance?"
        subtitle="Klarvo automatically classifies your AI systems and generates the right obligations checklist."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Tools", href: "/tools" }}
      />
    </MarketingLayout>
  );
}
