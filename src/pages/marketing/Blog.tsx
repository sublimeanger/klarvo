import { useState } from "react";
import { getAllBlogPosts, getFeaturedPost } from "@/lib/blogContent";
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
  TrendingUp,
  AlertTriangle,
  FileText,
  Shield,
  Zap,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const featuredPostData = getFeaturedPost();
const featuredPost = featuredPostData || {
  slug: "february-2025-deadline",
  title: "February 2025 Deadline: What You Need to Know About Prohibited AI Practices",
  excerpt: "The first major EU AI Act deadline is approaching.",
  category: "Regulation",
  author: "Klarvo Staff",
  readTime: "12 min read",
  featured: true,
  featuredImage: undefined as string | undefined,
};

const blogPosts = getAllBlogPosts().filter(p => !p.featured);

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
        title="EU AI Act Blog | Compliance Insights & Regulatory Updates"
        description="Stay ahead of EU AI Act deadlines. Expert insights on prohibited practices, high-risk AI, deployer obligations, and practical compliance strategies for SMEs."
        keywords={["EU AI Act blog", "AI compliance articles", "AI regulation news", "AI governance insights", "February 2025 deadline"]}
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
                  {featuredPost.featuredImage ? (
                    <img src={featuredPost.featuredImage} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
                      <div className="relative text-center p-8">
                        <AlertTriangle className="h-16 w-16 text-primary mx-auto mb-4" />
                        <span className="text-lg font-semibold text-primary">Featured Article</span>
                      </div>
                    </>
                  )}
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
                    <Button className="btn-premium" asChild>
                      <Link to={`/blog/${featuredPost.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
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
                      <Link key={i} to={`/blog/${post.slug}`} className="block">
                        <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50 flex flex-col h-full">
                          <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                            {post.featuredImage ? (
                              <img src={post.featuredImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                              <CategoryIcon className="h-10 w-10 text-primary/50" />
                            )}
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0 flex-1 flex flex-col">
                            <CardDescription className="line-clamp-2 mb-4 flex-1">{post.excerpt}</CardDescription>
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
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
