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
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "https://klarvo.lovable.app/og-image.png",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "Klarvo",
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title (max 60 chars for Google)
    const truncatedTitle = title.length > 57 ? `${title.slice(0, 54)}...` : title;
    document.title = `${truncatedTitle} | Klarvo`;

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

    // Description (max 160 chars for Google)
    const truncatedDesc = description.length > 155 
      ? `${description.slice(0, 152)}...` 
      : description;
    setMeta("description", truncatedDesc);

    // Keywords
    if (keywords.length > 0) {
      setMeta("keywords", keywords.join(", "));
    }

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Open Graph
    setMeta("og:title", truncatedTitle, true);
    setMeta("og:description", truncatedDesc, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", "Klarvo", true);
    setMeta("og:locale", "en_GB", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", truncatedTitle);
    setMeta("twitter:description", truncatedDesc);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:site", "@KlarvoHQ");

    // Article-specific
    if (ogType === "article") {
      if (publishedTime) setMeta("article:published_time", publishedTime, true);
      if (modifiedTime) setMeta("article:modified_time", modifiedTime, true);
      if (author) setMeta("article:author", author, true);
    }

    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {
      // Cleanup on unmount
      document.title = "Klarvo — EU AI Act Compliance Hub";
    };
  }, [title, description, keywords, canonical, ogImage, ogType, publishedTime, modifiedTime, author, noindex]);

  return null;
}
