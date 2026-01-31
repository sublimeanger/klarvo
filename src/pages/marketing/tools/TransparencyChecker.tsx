import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight,
  MessageSquare,
  Image,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const transparencyScenarios = [
  {
    id: "interaction",
    icon: MessageSquare,
    title: "AI Interaction",
    question: "Does the AI system interact directly with natural persons?",
    examples: "Chatbots, virtual assistants, AI customer support, automated phone systems",
    disclosure: "Inform people they are interacting with an AI system"
  },
  {
    id: "synthetic",
    icon: Image,
    title: "Synthetic Content",
    question: "Does the AI generate or manipulate image, audio, or video content?",
    examples: "AI image generation, voice synthesis, video creation, audio manipulation",
    disclosure: "Mark outputs as AI-generated in a machine-readable format"
  },
  {
    id: "deepfake",
    icon: Video,
    title: "Deepfakes",
    question: "Does the AI generate/manipulate content resembling real persons, places, or events?",
    examples: "Face swaps, voice cloning, synthetic media resembling real people",
    disclosure: "Disclose that content has been artificially generated or manipulated"
  },
  {
    id: "publictext",
    icon: FileText,
    title: "Public Interest Text",
    question: "Does the AI generate text published to inform the public on matters of public interest?",
    examples: "AI-written articles, news summaries, public information content",
    disclosure: "Disclose AI-generation (unless human editorial oversight applies)"
  },
];

const faqQuestions = [
  {
    question: "What is Article 50 of the EU AI Act?",
    answer: "Article 50 sets transparency obligations requiring disclosures when people interact with AI, when AI generates synthetic content, for deepfakes, and for AI-generated text on public interest matters."
  },
  {
    question: "When can I skip transparency disclosures?",
    answer: "Exceptions apply when the AI nature is obvious to a reasonably well-informed person, for law enforcement uses, for creative/artistic works where disclosure would undermine the work, or when human editorial control exists."
  },
  {
    question: "How should I implement these disclosures?",
    answer: "Disclosures should be clear, timely (before or at first interaction), and appropriate to the context. For synthetic content, machine-readable marking is required."
  }
];

export default function TransparencyChecker() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDisclosures = transparencyScenarios.filter(s => checkedItems[s.id]);

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Tools", url: "https://klarvo.io/tools" },
      { name: "Transparency Checker", url: "https://klarvo.io/tools/transparency-obligation-checker" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Article 50 Transparency Obligation Checker - Free Tool"
        description="Check which EU AI Act Article 50 transparency obligations apply to your AI system. Interactive tool for AI interaction, synthetic content, deepfake, and public text disclosures."
        keywords={["Article 50 checker", "AI transparency tool", "EU AI Act transparency", "synthetic content disclosure", "AI disclosure checker"]}
        canonical="https://klarvo.io/tools/transparency-obligation-checker"
      />
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Tool</Badge>
              <Badge variant="outline">Article 50</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transparency Obligation Checker
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Check which Article 50 transparency disclosures apply to your AI system. Select all scenarios that match your use case.
            </p>
          </div>
        </div>
      </section>

      {/* Checker */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {transparencyScenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all ${checkedItems[scenario.id] ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => toggleItem(scenario.id)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Checkbox 
                        checked={checkedItems[scenario.id] || false}
                        onCheckedChange={() => toggleItem(scenario.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <scenario.icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{scenario.question}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-12">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Examples:</span> {scenario.examples}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Transparency Obligations</h2>
            
            {activeDisclosures.length === 0 ? (
              <Card className="bg-muted/30">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Select scenarios above to see your disclosure requirements.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeDisclosures.map((disclosure) => (
                  <Card key={disclosure.id} className="border-primary/50">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <p className="font-medium">{disclosure.title}</p>
                          <p className="text-sm text-muted-foreground">{disclosure.disclosure}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild>
                    <Link to="/templates/article-50-disclosure-templates">
                      Get Disclosure Templates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/auth/signup">
                      Track in Klarvo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
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
        title="Manage All Transparency Obligations"
        subtitle="Klarvo tracks which AI systems need disclosures and stores your evidence."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Tools", href: "/tools" }}
      />
    </MarketingLayout>
  );
}
