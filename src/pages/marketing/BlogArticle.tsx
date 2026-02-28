import { useParams, Link, Navigate } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Share2, Linkedin, Twitter } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blogContent";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import ReactMarkdown from "react-markdown";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const allPosts = getAllBlogPosts();

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Blog", url: "https://klarvo.io/blog" },
      { name: post.title, url: `https://klarvo.io/blog/${post.slug}` }
    ]
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Klarvo",
      url: "https://klarvo.io"
    }
  };

  const shareUrl = `https://klarvo.io/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <MarketingLayout>
      <SEOHead
        title={`${post.title} - Klarvo Blog`}
        description={post.excerpt}
        keywords={[post.category, "EU AI Act", "AI compliance", post.author]}
        canonical={`https://klarvo.io/blog/${post.slug}`}
      />
      <SchemaMarkup schema={[breadcrumbSchema, articleSchema]} />

      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="outline" className="border-warning/30 text-warning bg-warning/5">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border/50">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-12">
                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({ href, children }) => (
                    <Link to={href || "#"} className="text-primary hover:underline">
                      {children}
                    </Link>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-6">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="border-border/50 my-8" />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Share */}
            <div className="flex items-center justify-between py-6 border-t border-b border-border/50 mb-12">
              <span className="text-sm font-medium flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share this article
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Newsletter CTA */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Get More Insights</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to receive the latest EU AI Act updates and compliance tips.
                </p>
                <div className="max-w-md mx-auto">
                  <NewsletterForm source="blog-article" variant="inline" />
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group block p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {related.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{related.readTime}</span>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </MarketingLayout>
  );
}
