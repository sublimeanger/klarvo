import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Download,
  ArrowRight,
  Clock,
  CheckCircle2,
  BookOpen,
  FileCheck,
  Shield,
  Users,
  AlertTriangle,
  Scale,
  Eye,
  Zap,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    category: "Policies",
    items: [
      {
        icon: FileText,
        title: "AI Acceptable Use Policy",
        description: "Comprehensive internal policy defining acceptable use of AI systems within your organization. Covers authorized uses, prohibited activities, and employee responsibilities.",
        pages: "8 pages",
        format: "DOCX / PDF",
        popular: true
      },
      {
        icon: Users,
        title: "AI Governance Charter",
        description: "Establish your AI governance structure with defined roles, responsibilities, and decision-making processes for AI oversight.",
        pages: "5 pages",
        format: "DOCX / PDF"
      },
      {
        icon: AlertTriangle,
        title: "AI Incident Response Playbook",
        description: "Step-by-step procedures for identifying, containing, and responding to AI-related incidents. Includes escalation paths and communication templates.",
        pages: "12 pages",
        format: "DOCX / PDF"
      }
    ]
  },
  {
    category: "Assessments",
    items: [
      {
        icon: Shield,
        title: "FRIA Template",
        description: "Fundamental Rights Impact Assessment template aligned with Article 27 requirements. Includes all required sections with guidance notes and worked examples.",
        pages: "15 pages",
        format: "DOCX / PDF",
        popular: true
      },
      {
        icon: Scale,
        title: "AI System Risk Assessment",
        description: "Structured template for assessing AI system risks, including prohibited practices screening, high-risk indicators, and mitigation planning.",
        pages: "10 pages",
        format: "DOCX / PDF"
      },
      {
        icon: FileCheck,
        title: "Vendor Due Diligence Questionnaire",
        description: "Comprehensive questionnaire for evaluating AI vendors. Covers EU AI Act compliance, security practices, data handling, and support capabilities.",
        pages: "6 pages",
        format: "DOCX / PDF"
      }
    ]
  },
  {
    category: "Operational",
    items: [
      {
        icon: Eye,
        title: "Human Oversight Plan Template",
        description: "Document your human oversight arrangements for AI systems. Covers oversight model, competency requirements, intervention procedures, and authority allocation.",
        pages: "8 pages",
        format: "DOCX / PDF",
        popular: true
      },
      {
        icon: Users,
        title: "Worker Notification Template",
        description: "Template for notifying employees about workplace AI use, as required for high-risk AI systems under the EU AI Act.",
        pages: "3 pages",
        format: "DOCX / PDF"
      },
      {
        icon: Eye,
        title: "Transparency Notice Pack",
        description: "Collection of transparency notice templates for customer-facing AI: chatbot disclosures, synthetic content notices, emotion recognition disclosures.",
        pages: "5 pages",
        format: "DOCX / PDF"
      }
    ]
  },
  {
    category: "Checklists",
    items: [
      {
        icon: CheckCircle2,
        title: "EU AI Act Compliance Checklist",
        description: "Comprehensive checklist covering all deployer obligations under the EU AI Act. Perfect for self-assessment or audit preparation.",
        pages: "4 pages",
        format: "XLSX / PDF",
        popular: true
      },
      {
        icon: FileCheck,
        title: "AI System Intake Checklist",
        description: "Pre-deployment checklist for new AI systems. Ensures all classification, documentation, and control requirements are met before go-live.",
        pages: "3 pages",
        format: "XLSX / PDF"
      },
      {
        icon: Shield,
        title: "High-Risk AI Controls Checklist",
        description: "Detailed control checklist specifically for high-risk AI systems, covering all Article 26 deployer obligations.",
        pages: "5 pages",
        format: "XLSX / PDF"
      }
    ]
  }
];

const guides = [
  {
    title: "The Complete EU AI Act Compliance Guide",
    description: "Everything SMEs need to know about EU AI Act compliance, from timeline to requirements to implementation.",
    pages: "45 pages",
    readTime: "60 min read"
  },
  {
    title: "High-Risk AI Classification: Deep Dive",
    description: "Comprehensive analysis of Annex III categories with real-world examples and classification guidance.",
    pages: "25 pages",
    readTime: "35 min read"
  },
  {
    title: "Building an AI Governance Program",
    description: "Practical guide to establishing AI governance structures, roles, and processes for your organization.",
    pages: "20 pages",
    readTime: "30 min read"
  }
];

export default function Templates() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <HeroSection
        badge="Free Templates"
        title={
          <>
            <span className="text-foreground">EU AI Act</span>{" "}
            <span className="text-gradient-hero">Templates & Guides</span>
          </>
        }
        subtitle="Download professional, ready-to-use templates for EU AI Act compliance. Policies, assessments, checklists, and more—all free."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Template Categories */}
      {templates.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-16 ${categoryIndex % 2 === 0 ? "" : "bg-surface-1"}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="outline" className="text-sm">
                {category.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {category.items.length} templates
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {category.items.map((template, i) => (
                <Card
                  key={i}
                  className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50 flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                        <template.icon className="h-6 w-6 text-primary" />
                      </div>
                      {template.popular && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {template.pages}
                        </span>
                        <span>{template.format}</span>
                      </div>
                      <Button size="sm" className="btn-premium">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* In-Depth Guides */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              In-Depth Guides
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep-dive resources for mastering EU AI Act compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {guides.map((guide, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50"
              >
                <CardContent className="p-6">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                    <BookOpen className="h-12 w-12 text-primary/50" />
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary">{guide.pages}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </span>
                    <Button variant="ghost" size="sm">
                      Download PDF
                      <Download className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All-in-One Pack */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <Zap className="h-3 w-3 mr-1" />
                    Complete Pack
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Download Everything
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Get all templates, checklists, and guides in one convenient download. 
                    Updated regularly as the EU AI Act evolves.
                  </p>
                  <div className="space-y-2 mb-6">
                    {[
                      "12+ policy & assessment templates",
                      "6 checklists for different scenarios",
                      "3 comprehensive guides",
                      "Regular updates included"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="btn-premium">
                    <Download className="mr-2 h-5 w-5" />
                    Download Complete Pack (Free)
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="bg-background/80 rounded-xl p-6 border border-border/50">
                    <div className="space-y-3">
                      {["Policies/", "Assessments/", "Checklists/", "Guides/"].map((folder, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-mono">{folder}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      eu-ai-act-compliance-pack.zip (2.4 MB)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want Templates That Auto-Update?"
        subtitle="Inside Klarvo, templates are always current and automatically populate with your organization's data."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
