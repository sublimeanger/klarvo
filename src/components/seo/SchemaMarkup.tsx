import { useEffect } from "react";

// Organization schema - used on all pages
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://klarvo.io/#organization",
  name: "Klarvo",
  url: "https://klarvo.io",
  logo: {
    "@type": "ImageObject",
    url: "https://klarvo.io/favicon.png",
    width: 512,
    height: 512
  },
  description: "EU AI Act compliance software for SMEs. Build AI inventories, classify risk, and generate audit-ready evidence packs.",
  foundingDate: "2024",
  sameAs: [
    "https://linkedin.com/company/klarvo",
    "https://twitter.com/KlarvoHQ"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@klarvo.io",
    availableLanguage: ["English"]
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "EU"
  }
};

// WebPage schema - for individual pages
export interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function createWebPageSchema(props: WebPageSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${props.url}#webpage`,
    name: props.name,
    description: props.description,
    url: props.url,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://klarvo.io/#website",
      name: "Klarvo",
      url: "https://klarvo.io"
    },
    publisher: organizationSchema,
    datePublished: props.datePublished || "2025-01-01",
    dateModified: props.dateModified || new Date().toISOString().split('T')[0],
    inLanguage: "en"
  };
}

// Software Application schema for product pages
export interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function createSoftwareApplicationSchema(props: SoftwareApplicationSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: props.name,
    description: props.description,
    applicationCategory: props.applicationCategory || "BusinessApplication",
    operatingSystem: props.operatingSystem || "Web Browser",
    offers: props.offers ? {
      "@type": "Offer",
      price: props.offers.price,
      priceCurrency: props.offers.priceCurrency,
    } : {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Free tier available"
    },
    aggregateRating: props.aggregateRating ? {
      "@type": "AggregateRating",
      ratingValue: props.aggregateRating.ratingValue,
      reviewCount: props.aggregateRating.reviewCount,
    } : undefined,
    publisher: organizationSchema
  };
}

// Article schema for guides/blog
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

export function createArticleSchema(props: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.headline,
    description: props.description,
    author: {
      "@type": "Organization",
      name: props.author || "Klarvo"
    },
    publisher: organizationSchema,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    image: props.image || "https://klarvo.io/og-image.png",
    mainEntityOfPage: {
      "@type": "WebPage"
    }
  };
}

// HowTo schema for templates
export interface HowToSchemaProps {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
  }>;
  totalTime?: string;
}

export function createHowToSchema(props: HowToSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: props.name,
    description: props.description,
    totalTime: props.totalTime || "PT10M",
    step: props.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}

// FAQ schema
export interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function createFAQSchema(props: FAQSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props.questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer
      }
    }))
  };
}

// Breadcrumb schema
export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function createBreadcrumbSchema(props: BreadcrumbSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: props.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Product schema for comparison pages
export interface ProductSchemaProps {
  name: string;
  description: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function createProductSchema(props: ProductSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.name,
    description: props.description,
    brand: {
      "@type": "Brand",
      name: props.brand || "Klarvo"
    },
    offers: props.offers ? {
      "@type": "Offer",
      price: props.offers.price,
      priceCurrency: props.offers.priceCurrency,
      availability: "https://schema.org/InStock"
    } : undefined
  };
}

// Component to inject schema
interface SchemaMarkupProps {
  schema: object | object[];
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptIds: string[] = [];

    schemas.forEach((s, index) => {
      const id = `schema-markup-${index}-${Date.now()}`;
      scriptIds.push(id);
      
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      scriptIds.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [schema]);

  return null;
}
