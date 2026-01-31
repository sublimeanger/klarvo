import { useState } from "react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search,
  ArrowRight,
  ChevronRight,
  Clock,
  Play,
  Sparkles,
  HelpCircle,
  ExternalLink,
  FileText,
  Video,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { docCategories, popularArticles, videoTutorials } from "@/lib/docsContent";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Documentation", url: "https://klarvo.io/docs" }
  ]
});

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
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Documentation - EU AI Act Compliance Platform"
        description="Learn how to use Klarvo for EU AI Act compliance. Guides, tutorials, and reference documentation for AI inventory, classification, and evidence management."
        keywords={["Klarvo docs", "EU AI Act documentation", "AI compliance guide", "platform tutorials"]}
        canonical="https://klarvo.io/docs"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />
      <SkipToContent />
      <MarketingHeader />
      
      <div className="flex-1 pt-16 md:pt-20">
        <div className="flex">
          {/* Sidebar - hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <DocsSidebar />
          </div>

          {/* Main Content */}
          <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
            {/* Hero Section */}
            <section className="relative py-16 overflow-hidden border-b border-border/50">
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-1" />
                <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] animate-float-slow" />
              </div>

              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center">
                  <Badge variant="outline" className="mb-6">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Documentation
                  </Badge>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
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

            {/* Quick Links */}
            <section className="py-8 bg-surface-1/50 border-b border-border/50">
              <div className="max-w-4xl mx-auto px-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">Popular Articles</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {popularArticles.map((article, i) => (
                    <Link
                      key={i}
                      to={`/docs/${article.slug}`}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm"
                    >
                      <span className="font-medium">{article.title}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto px-6 py-12">
              {/* Getting Started Cards */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Get Started</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="group hover:shadow-lg transition-all hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Quick Start Guide</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get up and running with Klarvo in under 10 minutes.
                      </p>
                      <Link 
                        to="/docs/quick-start" 
                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Read guide <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Video Tutorials</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Watch step-by-step video walkthroughs of key features.
                      </p>
                      <button 
                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Watch videos <ArrowRight className="h-3 w-3" />
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Can't find what you need? Our team is here to help.
                      </p>
                      <Link 
                        to="/contact" 
                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Get help <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Video Tutorials */}
              <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
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
                
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {videoTutorials.map((video, i) => (
                    <Card key={i} className="group cursor-pointer hover:shadow-lg transition-all hover:border-primary/30 overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                        <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="h-5 w-5 text-primary ml-0.5" />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-background/80 text-foreground text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm mb-0.5 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{video.thumbnail}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Documentation Categories */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filteredCategories.map((category, i) => (
                    <Card key={i} className="group hover:shadow-lg transition-all hover:border-primary/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <category.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base mb-1">{category.title}</CardTitle>
                            <CardDescription className="text-sm">
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1">
                          {category.articles.slice(0, 4).map((article, j) => (
                            <Link
                              key={j}
                              to={`/docs/${article.slug}`}
                              className="group/link flex items-center justify-between py-1.5 px-2 -mx-2 rounded-md hover:bg-primary/5 transition-colors"
                            >
                              <span className="text-sm group-hover/link:text-primary transition-colors">
                                {article.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {article.time}
                                </span>
                                <ChevronRight className="h-3 w-3 text-muted-foreground group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all" />
                              </div>
                            </Link>
                          ))}
                        </div>
                        {category.articles.length > 4 && (
                          <Button variant="ghost" size="sm" className="w-full mt-3 h-8">
                            View all {category.articles.length} articles
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Need Help CTA */}
              <section className="mt-16">
                <Card className="glass-premium border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <HelpCircle className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            Can't Find What You're Looking For?
                          </h3>
                          <p className="text-muted-foreground">
                            Our support team is here to help. Reach out via email or book a call.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" asChild>
                          <Link to="/faq">View FAQ</Link>
                        </Button>
                        <Button className="btn-premium" asChild>
                          <Link to="/contact">
                            Contact Support
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}
