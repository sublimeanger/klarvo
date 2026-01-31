import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Newspaper,
  ArrowRight,
  Clock,
  User,
  Tag,
  Search,
  Calendar,
  TrendingUp,
  AlertTriangle,
  FileText,
  Shield,
  Zap,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const featuredPost = {
  slug: "february-2025-deadline",
  title: "February 2025 Deadline: What You Need to Know About Prohibited AI Practices",
  excerpt: "The first major EU AI Act deadline is approaching. Here's a comprehensive breakdown of prohibited AI practices and how to ensure your organization is compliant before February 2, 2025.",
  category: "Regulation",
  author: "Dr. Anna Müller",
  authorRole: "Head of Compliance",
  date: "January 20, 2025",
  readTime: "12 min read",
  featured: true
};

const blogPosts = [
  {
    slug: "annex-iii-categories-explained",
    title: "Annex III High-Risk Categories: A Practical Guide for SMEs",
    excerpt: "Deep dive into each Annex III category with real-world examples. Understand if your AI systems qualify as high-risk and what obligations apply.",
    category: "Deep Dive",
    author: "James Robertson",
    date: "January 18, 2025",
    readTime: "15 min read"
  },
  {
    slug: "ai-literacy-article-4",
    title: "Article 4 AI Literacy: Building Your Training Program",
    excerpt: "The EU AI Act requires 'sufficient AI literacy' for staff operating AI systems. Here's how to build a training program that meets the requirement.",
    category: "Training",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read"
  },
  {
    slug: "deployer-obligations-checklist",
    title: "The Complete Deployer Obligations Checklist (Article 26)",
    excerpt: "Most SMEs are deployers, not providers. Here's your complete checklist for deployer obligations under the EU AI Act.",
    category: "Best Practices",
    author: "Dr. Anna Müller",
    date: "January 12, 2025",
    readTime: "10 min read"
  },
  {
    slug: "fria-step-by-step",
    title: "Step-by-Step: Conducting Your First FRIA",
    excerpt: "A practical walkthrough of the Fundamental Rights Impact Assessment process, with templates and examples.",
    category: "How-To",
    author: "James Robertson",
    date: "January 10, 2025",
    readTime: "14 min read"
  },
  {
    slug: "ai-inventory-mistakes",
    title: "5 Common Mistakes When Building Your AI System Inventory",
    excerpt: "Avoid these pitfalls when documenting your AI systems. Learn from organizations that got it wrong—and how to get it right.",
    category: "Best Practices",
    author: "Sarah Chen",
    date: "January 8, 2025",
    readTime: "7 min read"
  },
  {
    slug: "vendor-due-diligence-ai",
    title: "Vendor Due Diligence for AI Systems: What to Ask",
    excerpt: "Your AI vendors need to support your compliance. Here's a comprehensive due diligence questionnaire for AI vendors.",
    category: "Vendor Management",
    author: "Dr. Anna Müller",
    date: "January 5, 2025",
    readTime: "9 min read"
  },
  {
    slug: "transparency-obligations-guide",
    title: "Transparency Obligations: When and How to Disclose AI Use",
    excerpt: "From chatbots to deepfakes to emotion recognition—understand your transparency obligations under Article 50.",
    category: "Regulation",
    author: "James Robertson",
    date: "January 3, 2025",
    readTime: "11 min read"
  },
  {
    slug: "building-oversight-culture",
    title: "Building a Human Oversight Culture for AI",
    excerpt: "Human oversight isn't just about having someone review outputs. It's about building processes that actually work.",
    category: "Best Practices",
    author: "Sarah Chen",
    date: "December 28, 2024",
    readTime: "8 min read"
  }
];

const categories = [
  { name: "All", count: 9 },
  { name: "Regulation", count: 3 },
  { name: "Best Practices", count: 3 },
  { name: "How-To", count: 2 },
  { name: "Deep Dive", count: 2 },
  { name: "Training", count: 1 },
  { name: "Vendor Management", count: 1 },
];

const trendingTopics = [
  "February 2025 Deadline",
  "Prohibited Practices",
  "High-Risk Classification",
  "FRIA Requirements",
  "AI Literacy",
  "Deployer Obligations"
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Blog", url: "https://klarvo.io/blog" }
  ]
});

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Regulation": return FileText;
      case "Best Practices": return Shield;
      case "How-To": return BookOpen;
      case "Deep Dive": return Search;
      case "Training": return Zap;
      case "Vendor Management": return TrendingUp;
      default: return Newspaper;
    }
  };

  return (
    <MarketingLayout>
      <SEOHead
        title="Blog - EU AI Act Insights & Compliance Guides"
        description="Expert insights on EU AI Act compliance. Practical guides, regulatory updates, and best practices for AI governance in SMEs."
        keywords={["EU AI Act blog", "AI compliance articles", "AI regulation news", "AI governance insights"]}
        canonical="https://klarvo.io/blog"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="Blog"
        title={
          <>
            <span className="text-foreground">EU AI Act</span>{" "}
            <span className="text-gradient-hero">Insights</span>
          </>
        }
        subtitle="Expert analysis, practical guides, and the latest updates on EU AI Act compliance. Stay informed and stay ahead."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Featured Post */}
      <section className="py-12 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image placeholder */}
                <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
                  <div className="relative text-center p-8">
                    <AlertTriangle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <span className="text-lg font-semibold text-primary">Featured Article</span>
                  </div>
                </div>
                
                {/* Content */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {featuredPost.category}
                    </Badge>
                    <Badge variant="outline" className="border-warning/30 text-warning bg-warning/5">
                      Featured
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button className="btn-premium">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-10 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.name
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest EU AI Act insights delivered to your inbox.
                  </p>
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="mb-3 bg-background"
                  />
                  <Button className="w-full btn-premium" size="sm">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredPosts.map((post, i) => {
                    const CategoryIcon = getCategoryIcon(post.category);
                    return (
                      <Card key={i} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50 flex flex-col">
                        {/* Thumbnail */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                          <CategoryIcon className="h-10 w-10 text-primary/50" />
                        </div>
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="pt-0 flex-1 flex flex-col">
                          <CardDescription className="line-clamp-2 mb-4 flex-1">
                            {post.excerpt}
                          </CardDescription>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
