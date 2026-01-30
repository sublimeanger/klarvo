import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search,
  ArrowRight,
  ChevronRight,
  Cpu,
  Shield,
  FileCheck,
  Download,
  Users,
  Settings,
  Zap,
  AlertTriangle,
  GraduationCap,
  Building2,
  Lock,
  HelpCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
  Play,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const docCategories = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "New to Klarvo? Start here to set up your account and add your first AI system.",
    articles: [
      { title: "Quick Start Guide", time: "5 min", slug: "quick-start" },
      { title: "Understanding the Dashboard", time: "3 min", slug: "dashboard-overview" },
      { title: "Adding Your First AI System", time: "8 min", slug: "first-ai-system" },
      { title: "Inviting Team Members", time: "3 min", slug: "invite-team" },
    ]
  },
  {
    icon: Cpu,
    title: "AI System Inventory",
    description: "Learn how to document, categorize, and manage your AI systems effectively.",
    articles: [
      { title: "Using the AI System Wizard", time: "10 min", slug: "ai-system-wizard" },
      { title: "Quick Capture vs Full Assessment", time: "4 min", slug: "capture-modes" },
      { title: "Assigning Ownership & Oversight", time: "5 min", slug: "ownership-oversight" },
      { title: "Vendor & Model Provider Tracking", time: "6 min", slug: "vendor-tracking" },
      { title: "Bulk Import via CSV", time: "5 min", slug: "bulk-import" },
    ]
  },
  {
    icon: Shield,
    title: "Classification & Risk Assessment",
    description: "Understand how to classify AI systems and assess risk levels under the EU AI Act.",
    articles: [
      { title: "The Classification Engine Explained", time: "8 min", slug: "classification-engine" },
      { title: "AI System Definition Test", time: "6 min", slug: "definition-test" },
      { title: "Prohibited Practices Screening", time: "7 min", slug: "prohibited-screening" },
      { title: "High-Risk Categories (Annex III)", time: "10 min", slug: "high-risk-categories" },
      { title: "Transparency Obligations", time: "6 min", slug: "transparency-obligations" },
      { title: "Classification Memos & Sign-off", time: "4 min", slug: "classification-memos" },
    ]
  },
  {
    icon: Lock,
    title: "FRIA (Fundamental Rights Impact Assessment)",
    description: "Complete guide to conducting and documenting FRIAs for high-risk AI systems.",
    articles: [
      { title: "When is FRIA Required?", time: "5 min", slug: "fria-requirements" },
      { title: "FRIA Wizard Walkthrough", time: "12 min", slug: "fria-wizard" },
      { title: "Identifying Fundamental Rights Risks", time: "8 min", slug: "fria-risks" },
      { title: "Mitigation Measures & Oversight", time: "7 min", slug: "fria-mitigation" },
      { title: "Generating FRIA Reports", time: "4 min", slug: "fria-reports" },
    ]
  },
  {
    icon: FileCheck,
    title: "Evidence & Documentation",
    description: "Organize, approve, and manage compliance evidence and documentation.",
    articles: [
      { title: "Evidence Vault Overview", time: "5 min", slug: "evidence-vault" },
      { title: "Uploading & Organizing Evidence", time: "6 min", slug: "uploading-evidence" },
      { title: "Approval Workflows", time: "5 min", slug: "approval-workflows" },
      { title: "Evidence Expiration & Renewal", time: "4 min", slug: "evidence-expiration" },
      { title: "Linking Evidence to Controls", time: "5 min", slug: "linking-evidence" },
    ]
  },
  {
    icon: Download,
    title: "Exports & Reports",
    description: "Generate audit-ready PDF reports and evidence pack ZIP bundles.",
    articles: [
      { title: "Export Pack Overview", time: "4 min", slug: "export-overview" },
      { title: "Classification Memo Exports", time: "3 min", slug: "classification-exports" },
      { title: "FRIA Report Exports", time: "3 min", slug: "fria-exports" },
      { title: "Full Evidence Pack (ZIP)", time: "5 min", slug: "evidence-pack" },
      { title: "Organization-Wide Reports", time: "4 min", slug: "org-reports" },
    ]
  },
  {
    icon: Users,
    title: "Team & Collaboration",
    description: "Manage team members, roles, and permissions across your organization.",
    articles: [
      { title: "User Roles & Permissions", time: "5 min", slug: "roles-permissions" },
      { title: "Assigning Task Owners", time: "4 min", slug: "task-owners" },
      { title: "Activity Feed & Audit Trail", time: "4 min", slug: "activity-feed" },
      { title: "Evidence Request Workflows", time: "5 min", slug: "evidence-requests" },
    ]
  },
  {
    icon: AlertTriangle,
    title: "Incidents & Monitoring",
    description: "Log incidents, track monitoring events, and manage change processes.",
    articles: [
      { title: "Incident Management Overview", time: "5 min", slug: "incident-management" },
      { title: "Creating Incident Records", time: "4 min", slug: "creating-incidents" },
      { title: "Monitoring Events", time: "4 min", slug: "monitoring-events" },
      { title: "Reassessment Triggers", time: "5 min", slug: "reassessment-triggers" },
    ]
  },
  {
    icon: GraduationCap,
    title: "Training & AI Literacy",
    description: "Track AI literacy training requirements and team certifications.",
    articles: [
      { title: "AI Literacy Requirements (Article 4)", time: "6 min", slug: "ai-literacy" },
      { title: "Creating Training Programs", time: "5 min", slug: "training-programs" },
      { title: "Tracking Completion", time: "4 min", slug: "training-completion" },
      { title: "Training Reports", time: "3 min", slug: "training-reports" },
    ]
  },
  {
    icon: Building2,
    title: "Vendor Management",
    description: "Track AI vendors, contracts, and due diligence requirements.",
    articles: [
      { title: "Vendor Profiles", time: "4 min", slug: "vendor-profiles" },
      { title: "Due Diligence Checklists", time: "5 min", slug: "due-diligence" },
      { title: "Vendor Attestations", time: "5 min", slug: "vendor-attestations" },
      { title: "Contract Management", time: "4 min", slug: "contract-management" },
    ]
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Manage your account, organization settings, and billing.",
    articles: [
      { title: "Organization Settings", time: "4 min", slug: "org-settings" },
      { title: "Notification Preferences", time: "3 min", slug: "notifications" },
      { title: "Billing & Subscriptions", time: "4 min", slug: "billing" },
      { title: "Data Export & Privacy", time: "5 min", slug: "data-privacy" },
    ]
  },
];

const popularArticles = [
  { title: "Quick Start Guide", category: "Getting Started", slug: "quick-start" },
  { title: "Using the AI System Wizard", category: "AI System Inventory", slug: "ai-system-wizard" },
  { title: "The Classification Engine Explained", category: "Classification", slug: "classification-engine" },
  { title: "High-Risk Categories (Annex III)", category: "Classification", slug: "high-risk-categories" },
  { title: "When is FRIA Required?", category: "FRIA", slug: "fria-requirements" },
  { title: "Full Evidence Pack (ZIP)", category: "Exports", slug: "evidence-pack" },
];

const videoTutorials = [
  { title: "Platform Overview", duration: "5:32", thumbnail: "Getting a bird's eye view of Klarvo" },
  { title: "Adding Your First AI System", duration: "8:15", thumbnail: "Step-by-step wizard walkthrough" },
  { title: "Classification & Risk Assessment", duration: "12:45", thumbnail: "Understanding the classification engine" },
  { title: "Generating Evidence Packs", duration: "6:20", thumbnail: "Creating audit-ready exports" },
];

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = docCategories.filter(category => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.articles.some(a => a.title.toLowerCase().includes(query))
    );
  });

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-1" />
          <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[100px] animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-float-reverse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <BookOpen className="h-3 w-3 mr-1" />
              Documentation
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-foreground">How Can We</span>{" "}
              <span className="text-gradient-hero">Help You?</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to know about using Klarvo for EU AI Act compliance. 
              Search our documentation or browse by category.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="h-14 pl-12 pr-4 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Popular Articles</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {popularArticles.map((article, i) => (
              <Link
                key={i}
                to={`/docs/${article.slug}`}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <span className="text-sm font-medium">{article.title}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-2">
                <Play className="h-3 w-3 mr-1" />
                Video Tutorials
              </Badge>
              <h2 className="text-2xl font-bold">Learn by Watching</h2>
            </div>
            <Button variant="outline" size="sm">
              View All Videos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video, i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                  <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.thumbnail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive documentation organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{category.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.articles.slice(0, 4).map((article, j) => (
                      <Link
                        key={j}
                        to={`/docs/${article.slug}`}
                        className="group/link flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <span className="text-sm group-hover/link:text-primary transition-colors">
                          {article.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.time}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  {category.articles.length > 4 && (
                    <Button variant="ghost" size="sm" className="w-full mt-4">
                      View all {category.articles.length} articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Need More Help?
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Can't Find What You're Looking For?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our support team is here to help. Reach out via email or book a call 
                    with one of our compliance experts.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="btn-premium" asChild>
                      <Link to="/contact">
                        Contact Support
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/demo">Book a Demo</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Clock, label: "24h Response Time" },
                      { icon: Users, label: "Expert Support" },
                      { icon: CheckCircle2, label: "Personalized Help" },
                      { icon: ExternalLink, label: "Live Demos" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  );
}
