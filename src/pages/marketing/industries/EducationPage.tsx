import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const educationUseCases = [
  {
    title: "AI in Admissions Decisions",
    risk: "High-Risk",
    description: "AI used to determine access to educational institutions falls under Annex III high-risk.",
    obligations: ["Article 26 deployer obligations", "Human oversight for final decisions", "Transparency to applicants", "Non-discrimination monitoring"]
  },
  {
    title: "Student Assessment & Grading",
    risk: "High-Risk",
    description: "AI systems that assess or score students for educational purposes.",
    obligations: ["Human review capability", "Explainability of scoring", "Appeals process", "Logging of decisions"]
  },
  {
    title: "Exam Proctoring",
    risk: "High-Risk",
    description: "AI-powered proctoring systems that monitor students during exams.",
    obligations: ["Transparency disclosure", "Biometric data considerations", "Student notification", "Human review of flags"]
  },
  {
    title: "Learning Management & Tutoring",
    risk: "Limited Risk",
    description: "AI tutors and adaptive learning systems that don't make consequential decisions.",
    obligations: ["Transparency if AI interaction", "Mark AI-generated content", "Student data protection"]
  },
];

const faqQuestions = [
  {
    question: "Is AI used in student grading high-risk?",
    answer: "Yes. AI systems used for assessing students and determining educational outcomes are explicitly high-risk under Annex III. This includes automated essay scoring, exam grading, and performance evaluation systems."
  },
  {
    question: "What about AI tutoring systems?",
    answer: "AI tutors that provide learning support without making consequential decisions are typically limited risk. However, transparency obligations apply if students interact with AI, and synthetic content must be marked."
  },
  {
    question: "Do universities need to comply with the EU AI Act?",
    answer: "Yes. Educational institutions deploying AI systems fall under deployer obligations. Public universities may also need to complete FRIAs for high-risk AI and register in the EU database."
  },
  {
    question: "What about emotion recognition in education?",
    answer: "Emotion recognition in educational settings is prohibited under Article 5 with very limited exceptions. Monitoring student emotions during learning is generally banned."
  }
];

export default function EducationPage() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for Education & EdTech",
    description: "Complete guide to EU AI Act compliance for educational institutions and EdTech. Admissions, grading, proctoring, and tutoring AI.",
    datePublished: "2025-01-22",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Industries", url: "https://klarvo.io/industries" },
      { name: "Education", url: "https://klarvo.io/industries/education-edtech-ai-act" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act for Education & EdTech - Compliance Guide"
        description="EU AI Act compliance for education. Admissions AI, student grading, exam proctoring are high-risk. Learn obligations for schools and EdTech companies."
        keywords={["education AI Act", "EdTech compliance", "student grading AI", "admissions AI", "proctoring AI regulation"]}
        canonical="https://klarvo.io/industries/education-edtech-ai-act"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="High-Risk • Annex III"
        title={
          <>
            <span className="text-foreground">EU AI Act for</span>
            <br />
            <span className="text-gradient-hero">Education & EdTech</span>
          </>
        }
        subtitle="AI in admissions, grading, and student assessment is high-risk under Annex III. Educational institutions and EdTech providers must prepare for deployer obligations."
        primaryCta={{ label: "Check Your AI Systems", href: "/tools/high-risk-checker-annex-iii" }}
        secondaryCta={{ label: "See Samples", href: "/samples" }}
        heroVariant="geometric"
        variant="centered"
      />

      {/* Warning */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Emotion Recognition Prohibited</h3>
                    <p className="text-muted-foreground">
                      Article 5 prohibits AI systems that infer emotions in educational settings. This ban applied from <strong>2 February 2025</strong>. Engagement monitoring through emotional analysis is generally not permitted.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Education AI Use Cases</h2>
            <div className="space-y-6">
              {educationUseCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{useCase.title}</CardTitle>
                          <Badge variant={useCase.risk === "High-Risk" ? "destructive" : "secondary"}>
                            {useCase.risk}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-14">
                    <p className="text-sm font-medium mb-2">Key Obligations:</p>
                    <ul className="space-y-1">
                      {useCase.obligations.map((obligation, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {obligation}
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
        title="Prepare Your Institution for Compliance"
        subtitle="Klarvo helps educational institutions and EdTech companies manage AI Act obligations."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Industries", href: "/industries" }}
      />
    </MarketingLayout>
  );
}
