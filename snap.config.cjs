/**
 * react-snap configuration
 * Pre-renders all marketing pages for SEO
 */
const { ssgRoutes } = require('./src/ssgRoutes.ts');

module.exports = {
  // Source directory after build
  source: 'dist',
  
  // All routes to pre-render (from ssgRoutes manifest)
  include: [
    '/',
    '/features',
    '/pricing',
    '/about',
    '/contact',
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
    '/templates',
    '/tools',
    '/guides',
    '/compare',
    '/industries',
    '/eu-ai-act-compliance-software',
    '/ai-inventory-software',
    '/fria-software',
    '/templates/ai-inventory-template',
    '/templates/fria-template',
    '/templates/article-26-checklist',
    '/templates/article-50-disclosure-templates',
    '/templates/ai-acceptable-use-policy',
    '/templates/vendor-due-diligence-questionnaire',
    '/templates/human-oversight-plan-template',
    '/templates/ai-incident-register-template',
    '/tools/ai-system-definition-checker',
    '/tools/high-risk-checker-annex-iii',
    '/tools/transparency-obligation-checker',
    '/tools/prohibited-practices-screening',
    '/guides/eu-ai-act-for-smes',
    '/guides/article-26-deployer-obligations',
    '/guides/article-50-transparency-obligations',
    '/guides/prohibited-ai-practices-article-5',
    '/guides/high-risk-ai-annex-iii',
    '/industries/hr-recruitment-ai-act',
    '/industries/fintech-credit-ai-act',
    '/industries/education-edtech-ai-act',
    '/industries/saas-ai-act',
    '/use-cases/sme',
    '/use-cases/enterprise',
    '/use-cases/hr',
    '/use-cases/fintech',
    '/use-cases/healthcare',
    '/terms',
    '/privacy',
    '/cookies',
    '/security',
    '/dpa',
    '/gdpr',
    '/aup',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
  ],
  
  // Skip dynamic/protected routes - these stay as SPA
  skipThirdPartyRequests: true,
  
  // Puppeteer options for rendering
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  
  // Wait for network to be idle before capturing
  waitFor: 500,
  
  // Inline critical CSS for faster FCP
  inlineCss: true,
  
  // Don't crawl - only render specified routes
  crawl: false,
  
  // Remove script tags for static HTML (hydration will add them back)
  removeScriptTags: false,
  
  // Fix relative paths
  fixWebpackChunksIssue: true,
};
