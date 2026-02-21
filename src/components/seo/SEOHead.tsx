import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "https://klarvo.io/og-image.jpg",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "Klarvo",
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title (max 60 chars for Google - include brand)
    const brandedTitle = title.includes("Klarvo") ? title : `${title} | Klarvo`;
    const truncatedTitle = brandedTitle.length > 60 ? `${brandedTitle.slice(0, 57)}...` : brandedTitle;
    document.title = truncatedTitle;

    // Helper to set/update meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Description (max 160 chars for Google - make it compelling)
    const truncatedDesc = description.length > 160 
      ? `${description.slice(0, 157)}...` 
      : description;
    setMeta("description", truncatedDesc);
    setMeta("title", truncatedTitle);

    // Keywords (still used by some search engines)
    const defaultKeywords = ["EU AI Act", "AI compliance", "AI governance"];
    const allKeywords = [...new Set([...keywords, ...defaultKeywords])];
    if (allKeywords.length > 0) {
      setMeta("keywords", allKeywords.slice(0, 10).join(", "));
    }

    // Robots - Enhanced directives
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
      setMeta("googlebot", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      setMeta("googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Open Graph - Essential for social sharing
    setMeta("og:title", truncatedTitle, true);
    setMeta("og:description", truncatedDesc, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "640", true);
    setMeta("og:image:alt", `${title} - Klarvo EU AI Act Compliance`, true);
    setMeta("og:site_name", "Klarvo", true);
    setMeta("og:locale", "en_GB", true);

    // Twitter Card - Essential for X/Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@KlarvoHQ");
    setMeta("twitter:creator", "@KlarvoHQ");
    setMeta("twitter:title", truncatedTitle);
    setMeta("twitter:description", truncatedDesc);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:image:alt", `${title} - Klarvo`);

    // Article-specific meta tags
    if (ogType === "article") {
      if (publishedTime) setMeta("article:published_time", publishedTime, true);
      if (modifiedTime) setMeta("article:modified_time", modifiedTime, true);
      if (author) setMeta("article:author", author, true);
      setMeta("article:section", "EU AI Act Compliance", true);
      setMeta("article:tag", keywords.slice(0, 5).join(","), true);
    }

    // Canonical URL - Critical for avoiding duplicate content
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      // Ensure canonical uses production domain
      const canonicalUrl = canonical.startsWith("http") 
        ? canonical 
        : `https://klarvo.io${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
      link.setAttribute("href", canonicalUrl);
    }

    // Update og:url to match canonical
    if (canonical) {
      const ogUrl = canonical.startsWith("http") 
        ? canonical 
        : `https://klarvo.io${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
      setMeta("og:url", ogUrl, true);
    }

    // Add language meta
    setMeta("language", "en");
    let htmlLang = document.querySelector('meta[http-equiv="content-language"]');
    if (!htmlLang) {
      htmlLang = document.createElement("meta");
      htmlLang.setAttribute("http-equiv", "content-language");
      document.head.appendChild(htmlLang);
    }
    htmlLang.setAttribute("content", "en");

    return () => {
      // Cleanup on unmount - restore defaults
      document.title = "Klarvo — EU AI Act Compliance Platform";
    };
  }, [title, description, keywords, canonical, ogImage, ogType, publishedTime, modifiedTime, author, noindex, structuredData]);

  return null;
}