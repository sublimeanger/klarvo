/**
 * SSG Routes Manifest
 *
 * This file defines all routes that should be pre-rendered at build time
 * for SEO purposes. Only public marketing pages are included.
 *
 * Protected routes (dashboard, settings, etc.) remain client-side rendered.
 * Auth routes are NOT included — they redirect to app.klarvo.io via _redirects.
 */

export const ssgRoutes: string[] = [
  // ── Core Marketing Pages ──────────────────────────────────────────────
  '/',
  '/features',
  '/pricing',
  '/about',
  '/contact',

  // ── Resource & Info Pages ─────────────────────────────────────────────
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

  // ── SEO Hub Pages ─────────────────────────────────────────────────────
  '/templates',
  '/tools',
  '/guides',
  '/compare',
  '/industries',

  // ── Product Pages (BOFU) ──────────────────────────────────────────────
  '/eu-ai-act-compliance-software',
  '/ai-inventory-software',
  '/fria-software',

  // ── Additional BOFU Product Pages ─────────────────────────────────────
  '/ai-governance-evidence-packs',
  '/ai-literacy-training-tracker',
  '/evidence-vault-software',
  '/samples',
  '/system-spec',
  '/platform-doc',

  // ── PPC Landing Pages ─────────────────────────────────────────────────
  '/lp/demo',
  '/lp/start',

  // ── Ads ────────────────────────────────────────────────────────────────
  '/ads/creatives',

  // ── Template Pages ────────────────────────────────────────────────────
  '/templates/ai-inventory-template',
  '/templates/fria-template',
  '/templates/article-26-checklist',
  '/templates/article-50-disclosure-templates',
  '/templates/ai-acceptable-use-policy',
  '/templates/vendor-due-diligence-questionnaire',
  '/templates/human-oversight-plan-template',
  '/templates/ai-incident-register-template',

  // ── Tool Pages ────────────────────────────────────────────────────────
  '/tools/ai-system-definition-checker',
  '/tools/high-risk-checker-annex-iii',
  '/tools/transparency-obligation-checker',
  '/tools/prohibited-practices-screening',

  // ── Guide Pages ───────────────────────────────────────────────────────
  '/guides/eu-ai-act-for-smes',
  '/guides/article-26-deployer-obligations',
  '/guides/article-50-transparency-obligations',
  '/guides/prohibited-ai-practices-article-5',
  '/guides/high-risk-ai-annex-iii',
  '/guides/ai-inventory-eu-ai-act',
  '/guides/is-this-an-ai-system',
  '/guides/ai-literacy-article-4',
  '/guides/fria-article-27',
  '/guides/evidence-pack-procurement',

  // ── Comparison Pages ──────────────────────────────────────────────────
  '/compare/klarvo-vs-spreadsheets',
  '/compare/klarvo-vs-trust-platforms',

  // ── Industry Pages ────────────────────────────────────────────────────
  '/industries/hr-recruitment-ai-act',
  '/industries/fintech-credit-ai-act',
  '/industries/education-edtech-ai-act',
  '/industries/saas-ai-act',

  // ── Use Case Pages ────────────────────────────────────────────────────
  '/use-cases/sme',
  '/use-cases/enterprise',
  '/use-cases/hr',
  '/use-cases/fintech',
  '/use-cases/healthcare',

  // ── Legal Pages ───────────────────────────────────────────────────────
  '/terms',
  '/privacy',
  '/cookies',
  '/security',
  '/dpa',
  '/gdpr',
  '/aup',

  // ── Blog Articles ─────────────────────────────────────────────────────
  '/blog/february-2025-deadline',
  '/blog/annex-iii-categories-explained',
  '/blog/ai-literacy-article-4',
  '/blog/deployer-obligations-checklist',
  '/blog/fria-step-by-step',
  '/blog/ai-inventory-mistakes',
  '/blog/vendor-due-diligence-ai',
  '/blog/transparency-obligations-guide',
  '/blog/building-oversight-culture',

  // ── Docs Articles: Getting Started ────────────────────────────────────
  '/docs/quick-start',
  '/docs/dashboard-overview',
  '/docs/first-ai-system',
  '/docs/invite-team',

  // ── Docs Articles: AI System Inventory ────────────────────────────────
  '/docs/ai-system-wizard',
  '/docs/capture-modes',
  '/docs/ownership-oversight',
  '/docs/vendor-tracking',
  '/docs/bulk-import',

  // ── Docs Articles: Classification ─────────────────────────────────────
  '/docs/classification-engine',
  '/docs/definition-test',
  '/docs/prohibited-screening',
  '/docs/high-risk-categories',
  '/docs/transparency-obligations',
  '/docs/classification-memos',

  // ── Docs Articles: FRIA ───────────────────────────────────────────────
  '/docs/fria-requirements',
  '/docs/fria-wizard',
  '/docs/fria-risks',
  '/docs/fria-mitigation',
  '/docs/fria-reports',

  // ── Docs Articles: Evidence ───────────────────────────────────────────
  '/docs/evidence-vault',
  '/docs/uploading-evidence',
  '/docs/approval-workflows',
  '/docs/evidence-expiration',
  '/docs/linking-evidence',

  // ── Docs Articles: Exports ────────────────────────────────────────────
  '/docs/export-overview',
  '/docs/classification-exports',
  '/docs/fria-exports',
  '/docs/evidence-pack',
  '/docs/org-reports',

  // ── Docs Articles: Team ───────────────────────────────────────────────
  '/docs/roles-permissions',
  '/docs/task-owners',
  '/docs/activity-feed',
  '/docs/evidence-requests',

  // ── Docs Articles: Incidents ──────────────────────────────────────────
  '/docs/incident-management',
  '/docs/creating-incidents',
  '/docs/monitoring-events',
  '/docs/reassessment-triggers',

  // ── Docs Articles: Training ───────────────────────────────────────────
  '/docs/ai-literacy',
  '/docs/training-programs',
  '/docs/training-completion',
  '/docs/training-reports',

  // ── Docs Articles: Vendors ────────────────────────────────────────────
  '/docs/vendor-profiles',
  '/docs/due-diligence',
  '/docs/vendor-attestations',
  '/docs/contract-management',

  // ── Docs Articles: Settings ───────────────────────────────────────────
  '/docs/org-settings',
  '/docs/notifications',
  '/docs/billing',
  '/docs/data-privacy',
];

// Total count for reference
export const SSG_ROUTE_COUNT = ssgRoutes.length;
