import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink
} from "lucide-react";
import { getArticleBySlug, getCategoryForArticle, docCategories, docArticles } from "@/lib/docsContent";
import { toast } from "sonner";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { useEffect } from "react";

// Simple markdown renderer
function renderMarkdown(content: string): string {
  return content
    // Headers (order matters: longest prefix first)
    .replace(/^##### (.+)$/gm, '<h5 class="text-sm font-semibold mt-5 mb-2 scroll-mt-24">$1</h5>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-base font-semibold mt-6 mb-2 scroll-mt-24">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 id="$1" class="text-lg font-semibold mt-8 mb-3 scroll-mt-24">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-xl font-bold mt-10 mb-4 scroll-mt-24">$1</h2>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted/50 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const isAllowed = url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#');
      const safeUrl = isAllowed ? url : '#';
      return `<a href="${safeUrl}" class="text-primary hover:underline">${text}</a>`;
    })
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-primary/5 rounded-r-lg text-sm">$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-border/50" />')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return '';
      }
      const cellHtml = cells.map(c => `<td class="border border-border/50 px-3 py-2">${c.trim()}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    })
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc list-inside">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal list-inside">$1</li>')
    // Paragraphs
    .replace(/^(?!<[hlbpuot]|$)(.+)$/gm, '<p class="my-4 leading-relaxed">$1</p>')
    // Clean up header IDs
    .replace(/id="([^"]+)"/g, (_, id) => `id="${id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}"`)
    // Wrap tables
    .replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<div class="overflow-x-auto my-4"><table class="w-full border-collapse">$&</table></div>');
}

export default function DocsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const category = slug ? getCategoryForArticle(slug) : undefined;

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // If no article found, show the docs home
  if (!article) {
    navigate("/docs");
    return null;
  }

  // Get previous and next articles
  const allArticles = docCategories.flatMap(cat => 
    cat.articles.map(a => ({ ...a, category: cat.title }))
  );
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Get related articles
  const relatedArticles = article.relatedArticles
    ?.map(s => docArticles[s])
    .filter(Boolean)
    .slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col">
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
                <ChevronRight className="h-4 w-4" />
                {category && (
                  <>
                    <span className="hover:text-foreground transition-colors cursor-pointer">
                      {category.title}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
                <span className="text-foreground font-medium">{article.title}</span>
              </nav>

              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} read
                  </span>
                  {article.lastUpdated && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      Updated {article.lastUpdated}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  {article.title}
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  {article.description}
                </p>
              </header>

              {/* Article Content */}
              <article 
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderMarkdown(article.content)) }}
              />

              {/* Article Footer */}
              <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50">
                {/* Feedback */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.success("Thanks for your feedback!")}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Yes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toast.success("Thanks for your feedback!")}>
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        No
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy link
                    </Button>
                  </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {relatedArticles.map((related) => (
                        <Card key={related.slug} className="group hover:border-primary/30 transition-colors">
                          <CardContent className="p-4">
                            <Link 
                              to={`/docs/${related.slug}`}
                              className="block"
                            >
                              <Badge variant="outline" className="mb-2 text-xs">
                                {related.category}
                              </Badge>
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {related.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {related.description}
                              </p>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prev/Next Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  {prevArticle ? (
                    <Link
                      to={`/docs/${prevArticle.slug}`}
                      className="group flex-1 p-3 sm:p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </div>
                      <div className="font-medium group-hover:text-primary transition-colors text-sm sm:text-base">
                        {prevArticle.title}
                      </div>
                    </Link>
                  ) : (
                    <div className="hidden sm:block flex-1" />
                  )}
                  
                  {nextArticle ? (
                    <Link
                      to={`/docs/${nextArticle.slug}`}
                      className="group flex-1 p-3 sm:p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors sm:text-right"
                    >
                      <div className="flex items-center sm:justify-end gap-2 text-sm text-muted-foreground mb-1">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <div className="font-medium group-hover:text-primary transition-colors text-sm sm:text-base">
                        {nextArticle.title}
                      </div>
                    </Link>
                  ) : (
                    <div className="hidden sm:block flex-1" />
                  )}
                </div>

                {/* Contact Support */}
                <Card className="mt-8 bg-primary/5 border-primary/20">
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Still need help?</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Our support team is ready to assist you.
                        </p>
                      </div>
                    </div>
                    <Button asChild size="sm" className="w-full sm:w-auto">
                      <Link to="/contact">
                        Contact Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </footer>
            </div>
          </main>

          {/* Table of Contents */}
          <div className="hidden xl:block w-64 shrink-0 pr-8">
            <div className="sticky top-24 pt-12">
              <DocsTableOfContents content={article.content} />
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}
