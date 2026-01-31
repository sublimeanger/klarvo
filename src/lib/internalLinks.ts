/**
 * Hub & Spoke Internal Linking System
 * 
 * Centralized content relationships for SEO internal linking.
 * Each content piece knows its hub (parent), related spokes (siblings),
 * and cross-hub connections (related content in other hubs).
 */

export interface ContentItem {
  href: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: string;
  hub: 'guides' | 'templates' | 'tools' | 'compare' | 'industries' | 'product';
}

// Hub definitions
export const hubs: Record<string, { title: string; href: string; description: string }> = {
  guides: {
    title: "EU AI Act Guides",
    href: "/guides",
    description: "Practical, plain-English guides to EU AI Act compliance."
  },
  templates: {
    title: "Compliance Templates",
    href: "/templates",
    description: "Free, ready-to-use templates for AI governance and compliance."
  },
  tools: {
    title: "Free Compliance Tools",
    href: "/tools",
    description: "Interactive checkers and screening tools for EU AI Act requirements."
  },
  compare: {
    title: "Compare Solutions",
    href: "/compare",
    description: "See how Klarvo compares to alternative approaches."
  },
  industries: {
    title: "Industry Solutions",
    href: "/industries",
    description: "Tailored EU AI Act compliance for your sector."
  },
  product: {
    title: "Product Features",
    href: "/features",
    description: "Discover Klarvo's AI governance platform capabilities."
  }
};

// All content items (spokes) organized by hub
export const contentItems: ContentItem[] = [
  // GUIDES HUB
  { href: "/guides/eu-ai-act-for-smes", title: "EU AI Act for SMEs", shortTitle: "SME Guide", description: "The practical roadmap for small and medium businesses.", category: "Getting Started", hub: "guides" },
  { href: "/guides/ai-inventory-eu-ai-act", title: "AI Inventory Under the EU AI Act", shortTitle: "Inventory Guide", description: "How to build and maintain an AI system inventory.", category: "Core Concepts", hub: "guides" },
  { href: "/guides/is-this-an-ai-system", title: "Is This an AI System?", shortTitle: "AI Definition", description: "Determining if your software qualifies as an AI system.", category: "Scoping", hub: "guides" },
  { href: "/guides/prohibited-ai-practices-article-5", title: "Prohibited AI Practices (Article 5)", shortTitle: "Prohibited Practices", description: "What practices are banned and how to screen for them.", category: "Risk", hub: "guides" },
  { href: "/guides/high-risk-ai-annex-iii", title: "High-Risk AI (Annex III)", shortTitle: "High-Risk Guide", description: "Understanding the 8 high-risk categories.", category: "Classification", hub: "guides" },
  { href: "/guides/article-26-deployer-obligations", title: "Article 26 Deployer Obligations", shortTitle: "Deployer Duties", description: "Operational playbook for high-risk AI deployers.", category: "High-Risk", hub: "guides" },
  { href: "/guides/article-50-transparency-obligations", title: "Article 50 Transparency Obligations", shortTitle: "Transparency Guide", description: "What to disclose, where, and how.", category: "Transparency", hub: "guides" },
  { href: "/guides/ai-literacy-article-4", title: "AI Literacy (Article 4)", shortTitle: "AI Literacy", description: "Building a practical AI training programme.", category: "Training", hub: "guides" },
  { href: "/guides/fria-article-27", title: "FRIA Under Article 27", shortTitle: "FRIA Guide", description: "When and how to conduct a Fundamental Rights Impact Assessment.", category: "High-Risk", hub: "guides" },
  { href: "/guides/evidence-pack-procurement", title: "Evidence Packs for Procurement", shortTitle: "Evidence Packs", description: "Preparing AI governance documentation for due diligence.", category: "Procurement", hub: "guides" },

  // TEMPLATES HUB
  { href: "/templates/ai-inventory-template", title: "AI Inventory Template", shortTitle: "Inventory Template", description: "Document all AI systems with EU AI Act required fields.", category: "Core", hub: "templates" },
  { href: "/templates/fria-template", title: "FRIA Template", shortTitle: "FRIA Template", description: "Fundamental Rights Impact Assessment template.", category: "High-Risk", hub: "templates" },
  { href: "/templates/article-26-checklist", title: "Article 26 Deployer Checklist", shortTitle: "Deployer Checklist", description: "Comprehensive checklist for high-risk AI deployers.", category: "High-Risk", hub: "templates" },
  { href: "/templates/article-50-disclosure-templates", title: "Article 50 Disclosure Templates", shortTitle: "Disclosure Templates", description: "Ready-to-use disclosure copy for AI transparency.", category: "Transparency", hub: "templates" },
  { href: "/templates/ai-acceptable-use-policy", title: "AI Acceptable Use Policy", shortTitle: "AUP Template", description: "Internal policy template for governing AI use.", category: "Governance", hub: "templates" },
  { href: "/templates/human-oversight-plan-template", title: "Human Oversight Plan Template", shortTitle: "Oversight Plan", description: "Document human oversight arrangements.", category: "High-Risk", hub: "templates" },
  { href: "/templates/vendor-due-diligence-questionnaire", title: "Vendor Due Diligence Questionnaire", shortTitle: "Vendor DDQ", description: "Questions to ask AI vendors about compliance.", category: "Procurement", hub: "templates" },
  { href: "/templates/ai-incident-register-template", title: "AI Incident Register Template", shortTitle: "Incident Register", description: "Log and track AI-related incidents.", category: "Operations", hub: "templates" },

  // TOOLS HUB
  { href: "/tools/ai-system-definition-checker", title: "AI System Definition Checker", shortTitle: "Definition Checker", description: "Check if your software is an AI system under the Act.", category: "Scoping", hub: "tools" },
  { href: "/tools/high-risk-checker-annex-iii", title: "High-Risk Checker (Annex III)", shortTitle: "Risk Checker", description: "Determine if your AI system is high-risk.", category: "Classification", hub: "tools" },
  { href: "/tools/transparency-obligation-checker", title: "Transparency Obligation Checker", shortTitle: "Transparency Checker", description: "Check Article 50 disclosure requirements.", category: "Transparency", hub: "tools" },
  { href: "/tools/prohibited-practices-screening", title: "Prohibited Practices Screening", shortTitle: "Prohibited Screening", description: "Screen for Article 5 prohibited practices.", category: "Risk", hub: "tools" },

  // COMPARE HUB
  { href: "/compare/klarvo-vs-spreadsheets", title: "Klarvo vs Spreadsheets", shortTitle: "vs Spreadsheets", description: "Why purpose-built software beats manual tracking.", category: "Comparison", hub: "compare" },
  { href: "/compare/klarvo-vs-trust-platforms", title: "Klarvo vs Trust Platforms", shortTitle: "vs Trust Platforms", description: "AI-specific compliance vs generic GRC tools.", category: "Comparison", hub: "compare" },

  // INDUSTRIES HUB
  { href: "/industries/hr-recruitment-ai-act", title: "HR & Recruitment AI Compliance", shortTitle: "HR/Recruitment", description: "EU AI Act compliance for HR and recruiting AI tools.", category: "Industry", hub: "industries" },
  { href: "/industries/fintech-credit-ai-act", title: "Fintech & Credit Scoring AI", shortTitle: "Fintech", description: "AI compliance for lending and credit scoring.", category: "Industry", hub: "industries" },
  { href: "/industries/education-edtech-ai-act", title: "Education & EdTech AI", shortTitle: "Education", description: "AI compliance for educational institutions and EdTech.", category: "Industry", hub: "industries" },
  { href: "/industries/saas-ai-act", title: "SaaS & AI-Powered Products", shortTitle: "SaaS", description: "EU AI Act obligations for software vendors.", category: "Industry", hub: "industries" },

  // PRODUCT PAGES
  { href: "/eu-ai-act-compliance-software", title: "EU AI Act Compliance Software", shortTitle: "Compliance Software", description: "Complete platform for EU AI Act compliance.", category: "Product", hub: "product" },
  { href: "/ai-inventory-software", title: "AI Inventory Software", shortTitle: "Inventory Software", description: "Automated AI system inventory management.", category: "Product", hub: "product" },
  { href: "/fria-software", title: "FRIA Software", shortTitle: "FRIA Software", description: "Fundamental Rights Impact Assessment tool.", category: "Product", hub: "product" },
  { href: "/ai-governance-evidence-packs", title: "AI Governance Evidence Packs", shortTitle: "Evidence Packs", description: "Generate audit-ready evidence bundles.", category: "Product", hub: "product" },
  { href: "/ai-literacy-training-tracker", title: "AI Literacy Training Tracker", shortTitle: "Training Tracker", description: "Track AI literacy training across your organization.", category: "Product", hub: "product" },
  { href: "/product/evidence-vault", title: "Evidence Vault", shortTitle: "Evidence Vault", description: "Secure storage for compliance evidence.", category: "Product", hub: "product" },
];

// Semantic relationships between content
export const contentRelationships: Record<string, string[]> = {
  // Guides → Related templates, tools, and products
  "/guides/eu-ai-act-for-smes": ["/templates/ai-inventory-template", "/tools/prohibited-practices-screening", "/tools/high-risk-checker-annex-iii", "/eu-ai-act-compliance-software"],
  "/guides/ai-inventory-eu-ai-act": ["/templates/ai-inventory-template", "/ai-inventory-software", "/guides/is-this-an-ai-system"],
  "/guides/is-this-an-ai-system": ["/tools/ai-system-definition-checker", "/guides/ai-inventory-eu-ai-act", "/templates/ai-inventory-template"],
  "/guides/prohibited-ai-practices-article-5": ["/tools/prohibited-practices-screening", "/guides/eu-ai-act-for-smes", "/guides/high-risk-ai-annex-iii"],
  "/guides/high-risk-ai-annex-iii": ["/tools/high-risk-checker-annex-iii", "/guides/article-26-deployer-obligations", "/templates/article-26-checklist"],
  "/guides/article-26-deployer-obligations": ["/templates/article-26-checklist", "/templates/human-oversight-plan-template", "/guides/fria-article-27"],
  "/guides/article-50-transparency-obligations": ["/templates/article-50-disclosure-templates", "/tools/transparency-obligation-checker", "/guides/ai-literacy-article-4"],
  "/guides/ai-literacy-article-4": ["/ai-literacy-training-tracker", "/guides/eu-ai-act-for-smes", "/templates/ai-acceptable-use-policy"],
  "/guides/fria-article-27": ["/templates/fria-template", "/fria-software", "/guides/article-26-deployer-obligations"],
  "/guides/evidence-pack-procurement": ["/ai-governance-evidence-packs", "/product/evidence-vault", "/templates/vendor-due-diligence-questionnaire"],

  // Templates → Related guides and tools
  "/templates/ai-inventory-template": ["/guides/ai-inventory-eu-ai-act", "/ai-inventory-software", "/tools/ai-system-definition-checker"],
  "/templates/fria-template": ["/guides/fria-article-27", "/fria-software", "/guides/article-26-deployer-obligations"],
  "/templates/article-26-checklist": ["/guides/article-26-deployer-obligations", "/templates/human-oversight-plan-template", "/tools/high-risk-checker-annex-iii"],
  "/templates/article-50-disclosure-templates": ["/guides/article-50-transparency-obligations", "/tools/transparency-obligation-checker"],
  "/templates/ai-acceptable-use-policy": ["/guides/ai-literacy-article-4", "/guides/eu-ai-act-for-smes", "/templates/ai-inventory-template"],
  "/templates/human-oversight-plan-template": ["/guides/article-26-deployer-obligations", "/templates/article-26-checklist", "/templates/fria-template"],
  "/templates/vendor-due-diligence-questionnaire": ["/guides/evidence-pack-procurement", "/templates/ai-inventory-template"],
  "/templates/ai-incident-register-template": ["/guides/article-26-deployer-obligations", "/templates/human-oversight-plan-template"],

  // Tools → Related guides and templates
  "/tools/ai-system-definition-checker": ["/guides/is-this-an-ai-system", "/templates/ai-inventory-template", "/guides/ai-inventory-eu-ai-act"],
  "/tools/high-risk-checker-annex-iii": ["/guides/high-risk-ai-annex-iii", "/templates/article-26-checklist", "/guides/article-26-deployer-obligations"],
  "/tools/transparency-obligation-checker": ["/guides/article-50-transparency-obligations", "/templates/article-50-disclosure-templates"],
  "/tools/prohibited-practices-screening": ["/guides/prohibited-ai-practices-article-5", "/guides/eu-ai-act-for-smes", "/tools/high-risk-checker-annex-iii"],

  // Industries → Related guides and templates
  "/industries/hr-recruitment-ai-act": ["/guides/high-risk-ai-annex-iii", "/templates/article-26-checklist", "/tools/high-risk-checker-annex-iii"],
  "/industries/fintech-credit-ai-act": ["/guides/high-risk-ai-annex-iii", "/templates/fria-template", "/guides/fria-article-27"],
  "/industries/education-edtech-ai-act": ["/guides/high-risk-ai-annex-iii", "/guides/article-50-transparency-obligations", "/templates/article-26-checklist"],
  "/industries/saas-ai-act": ["/guides/evidence-pack-procurement", "/ai-governance-evidence-packs", "/templates/vendor-due-diligence-questionnaire"],

  // Product pages → Related guides and templates
  "/eu-ai-act-compliance-software": ["/guides/eu-ai-act-for-smes", "/templates/ai-inventory-template", "/compare/klarvo-vs-spreadsheets"],
  "/ai-inventory-software": ["/guides/ai-inventory-eu-ai-act", "/templates/ai-inventory-template", "/tools/ai-system-definition-checker"],
  "/fria-software": ["/guides/fria-article-27", "/templates/fria-template", "/guides/article-26-deployer-obligations"],
  "/ai-governance-evidence-packs": ["/guides/evidence-pack-procurement", "/product/evidence-vault", "/templates/vendor-due-diligence-questionnaire"],
  "/ai-literacy-training-tracker": ["/guides/ai-literacy-article-4", "/templates/ai-acceptable-use-policy"],
  "/product/evidence-vault": ["/guides/evidence-pack-procurement", "/ai-governance-evidence-packs"],
};

// Get related content for a given page
export function getRelatedContent(currentHref: string, limit: number = 4): ContentItem[] {
  const relatedHrefs = contentRelationships[currentHref] || [];
  const related: ContentItem[] = [];

  for (const href of relatedHrefs.slice(0, limit)) {
    const item = contentItems.find(c => c.href === href);
    if (item) related.push(item);
  }

  // If we don't have enough specific relationships, add items from same hub
  if (related.length < limit) {
    const currentItem = contentItems.find(c => c.href === currentHref);
    if (currentItem) {
      const sameHub = contentItems.filter(
        c => c.hub === currentItem.hub && c.href !== currentHref && !related.find(r => r.href === c.href)
      );
      related.push(...sameHub.slice(0, limit - related.length));
    }
  }

  return related.slice(0, limit);
}

// Get hub info for a given page
export function getHubForContent(href: string): { title: string; href: string } | null {
  const item = contentItems.find(c => c.href === href);
  if (!item) return null;
  return hubs[item.hub] || null;
}

// Get breadcrumb trail for a page
export function getBreadcrumbTrail(href: string): Array<{ name: string; href: string }> {
  const trail: Array<{ name: string; href: string }> = [{ name: "Home", href: "/" }];
  
  const item = contentItems.find(c => c.href === href);
  if (!item) return trail;

  const hub = hubs[item.hub];
  if (hub) {
    trail.push({ name: hub.title, href: hub.href });
  }

  trail.push({ name: item.shortTitle || item.title, href: item.href });
  
  return trail;
}

// Get all items in a hub
export function getHubItems(hubKey: string): ContentItem[] {
  return contentItems.filter(c => c.hub === hubKey);
}

// Get popular/featured items across all hubs
export function getFeaturedItems(limit: number = 6): ContentItem[] {
  // Curated list of high-value items
  const featuredHrefs = [
    "/guides/eu-ai-act-for-smes",
    "/templates/ai-inventory-template",
    "/tools/high-risk-checker-annex-iii",
    "/guides/article-26-deployer-obligations",
    "/templates/fria-template",
    "/tools/prohibited-practices-screening",
  ];

  return featuredHrefs.slice(0, limit).map(href => 
    contentItems.find(c => c.href === href)!
  ).filter(Boolean);
}
