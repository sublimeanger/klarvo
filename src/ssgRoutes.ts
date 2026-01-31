/**
 * SSG Routes Manifest
 * 
 * This file defines all routes that should be pre-rendered at build time
 * for SEO purposes. Only public marketing pages are included.
 * 
 * Protected routes (dashboard, settings, etc.) remain client-side rendered.
 */

export const ssgRoutes: string[] = [
  // Core Marketing Pages
  '/',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  
  // Resource & Info Pages
  '/resources',
  '/integrations',
  '/partners',
  '/careers',
  '/press',
  '/status',
  '/changelog',
  '/docs',
  '/faq',
  '/blog',
  '/api',
  '/eu-ai-act',
  
  // SEO Hub Pages
  '/templates',
  '/tools',
  '/guides',
  '/compare',
  '/industries',
  
  // Product Pages (BOFU)
  '/eu-ai-act-compliance-software',
  '/ai-inventory-software',
  '/fria-software',
  
  // Template Pages
  '/templates/ai-inventory-template',
  '/templates/fria-template',
  '/templates/article-26-checklist',
  '/templates/article-50-disclosure-templates',
  '/templates/ai-acceptable-use-policy',
  '/templates/vendor-due-diligence-questionnaire',
  '/templates/human-oversight-plan-template',
  '/templates/ai-incident-register-template',
  
  // Tool Pages
  '/tools/ai-system-definition-checker',
  '/tools/high-risk-checker-annex-iii',
  '/tools/transparency-obligation-checker',
  '/tools/prohibited-practices-screening',
  
  // Guide Pages
  '/guides/eu-ai-act-for-smes',
  '/guides/article-26-deployer-obligations',
  '/guides/article-50-transparency-obligations',
  '/guides/prohibited-ai-practices-article-5',
  '/guides/high-risk-ai-annex-iii',
  
  // Industry Pages
  '/industries/hr-recruitment-ai-act',
  '/industries/fintech-credit-ai-act',
  '/industries/education-edtech-ai-act',
  '/industries/saas-ai-act',
  
  // Use Case Pages
  '/use-cases/sme',
  '/use-cases/enterprise',
  '/use-cases/hr',
  '/use-cases/fintech',
  '/use-cases/healthcare',
  
  // Legal Pages
  '/terms',
  '/privacy',
  '/cookies',
  '/security',
  '/dpa',
  '/gdpr',
  '/aup',
];

// Total count for reference
export const SSG_ROUTE_COUNT = ssgRoutes.length;
