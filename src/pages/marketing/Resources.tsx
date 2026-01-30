import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Newspaper,
  GraduationCap,
  FileCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const featuredResources = [
  {
    type: "Guide",
    icon: BookOpen,
    title: "The Complete EU AI Act Compliance Checklist",
    description: "A comprehensive step-by-step guide covering everything SMEs need to know about EU AI Act compliance, from inventory to evidence packs.",
    readTime: "15 min read",
    badge: "Popular"
  },
  {
    type: "Whitepaper",
    icon: FileText,
    title: "High-Risk AI Classification: What You Need to Know",
    description: "Deep dive into Annex III categories, prohibited practices, and how to determine if your AI systems are high-risk under the EU AI Act.",
    readTime: "20 min read",
    badge: "Essential"
  },
  {
    type: "Template",
    icon: FileCheck,
    title: "FRIA Template & Implementation Guide",
    description: "Download our Fundamental Rights Impact Assessment template aligned with Article 27 requirements, complete with worked examples.",
    readTime: "Template",
    badge: "Download"
  }
];

const resourceCategories = [
  {
    icon: BookOpen,
    title: "EU AI Act Guides",
    description: "In-depth explainers on key requirements",
    count: 12,
    color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
  },
  {
    icon: FileText,
    title: "Templates & Checklists",
    description: "Ready-to-use compliance documents",
    count: 8,
    color: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
  },
  {
    icon: Video,
    title: "Webinars & Videos",
    description: "Expert-led training sessions",
    count: 6,
    color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    description: "Latest AI regulation developments",
    count: 15,
    color: "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
  }
];

const upcomingWebinars = [
  {
    title: "Preparing for February 2025: Prohibited AI Practices",
    date: "January 28, 2025",
    time: "2:00 PM CET",
    speakers: ["Dr. Anna Müller", "James Robertson"]
  },
  {
    title: "Building Your AI System Inventory from Scratch",
    date: "February 11, 2025",
    time: "3:00 PM CET",
    speakers: ["Sarah Chen"]
  }
];

const recentArticles = [
  {
    title: "Understanding the EU AI Act Timeline: Key Dates for 2025",
    category: "Regulation",
    date: "Jan 15, 2025"
  },
  {
    title: "5 Common Mistakes in AI System Classification",
    category: "Best Practices",
    date: "Jan 12, 2025"
  },
  {
    title: "Article 26 Deployer Obligations Explained",
    category: "Deep Dive",
    date: "Jan 8, 2025"
  },
  {
    title: "AI Literacy Requirements: What SMEs Need to Know",
    category: "Training",
    date: "Jan 5, 2025"
  }
];

export default function Resources() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              Resource Hub
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Learn EU AI Act{" "}
              <span className="text-gradient">Compliance</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Guides, templates, webinars, and expert insights to help you 
              navigate AI regulation with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {resourceCategories.map((category, i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {category.description}
                  </p>
                  <Badge variant="secondary">{category.count} resources</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Resources</h2>
              <p className="text-muted-foreground">Essential reading for EU AI Act compliance</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{resource.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {resource.readTime}
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      {resource.type === "Template" ? "Download" : "Read"}
                      {resource.type === "Template" ? <Download className="ml-1 h-4 w-4" /> : <ArrowRight className="ml-1 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars & Recent Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upcoming Webinars */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Video className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Upcoming Webinars</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingWebinars.map((webinar, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">{webinar.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {webinar.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {webinar.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Speakers: </span>
                          {webinar.speakers.join(", ")}
                        </div>
                        <Button size="sm">Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Recent Articles */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Recent Articles</h2>
              </div>
              
              <div className="space-y-4">
                {recentArticles.map((article, i) => (
                  <Card key={i} className="group cursor-pointer hover:shadow-md transition-all hover:border-primary/30">
                    <CardContent className="p-6 flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{article.date}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/30 border-primary-200 dark:border-primary-800">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated on AI Regulation
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get the latest EU AI Act updates, compliance tips, and exclusive resources 
                delivered to your inbox. No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-10 px-4 rounded-md border border-input bg-background text-sm"
                />
                <Button>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  );
}
