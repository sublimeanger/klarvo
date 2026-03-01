import { test, expect } from '@playwright/test';

// ================================================================
// PUBLIC ROUTES
// ================================================================
const publicRoutes = [
  '/', '/features', '/pricing', '/about', '/contact', '/resources',
  '/integrations', '/partners', '/careers', '/press', '/status',
  '/changelog', '/docs', '/faq', '/blog', '/api', '/eu-ai-act', '/samples',

  // Hubs
  '/templates', '/tools', '/guides', '/compare', '/industries',

  // Templates (exact paths from App.tsx)
  '/templates/ai-inventory-template', '/templates/fria-template',
  '/templates/article-26-checklist', '/templates/article-50-disclosure-templates',
  '/templates/ai-acceptable-use-policy', '/templates/vendor-due-diligence-questionnaire',
  '/templates/human-oversight-plan-template', '/templates/ai-incident-register-template',

  // Tools (exact paths from App.tsx)
  '/tools/ai-system-definition-checker', '/tools/high-risk-checker-annex-iii',
  '/tools/transparency-obligation-checker', '/tools/prohibited-practices-screening',

  // Guides (exact paths from App.tsx)
  '/guides/eu-ai-act-for-smes', '/guides/article-26-deployer-obligations',
  '/guides/article-50-transparency-obligations', '/guides/prohibited-ai-practices-article-5',
  '/guides/high-risk-ai-annex-iii', '/guides/ai-inventory-eu-ai-act',
  '/guides/is-this-an-ai-system', '/guides/ai-literacy-article-4',
  '/guides/fria-article-27', '/guides/evidence-pack-procurement',

  // Compare
  '/compare/klarvo-vs-spreadsheets', '/compare/klarvo-vs-trust-platforms',

  // BOFU product pages
  '/ai-governance-evidence-packs', '/ai-literacy-training-tracker',
  '/evidence-vault-software', '/eu-ai-act-compliance-software',
  '/ai-inventory-software', '/fria-software',

  // Industries
  '/industries/hr-recruitment-ai-act', '/industries/fintech-credit-ai-act',
  '/industries/education-edtech-ai-act', '/industries/saas-ai-act',

  // Use cases
  '/use-cases/sme', '/use-cases/enterprise', '/use-cases/hr',
  '/use-cases/fintech', '/use-cases/healthcare',

  // Legal
  '/terms', '/privacy', '/cookies', '/security', '/dpa', '/gdpr', '/aup',

  // Auth
  '/auth/login', '/auth/signup', '/auth/forgot-password',
];

test.describe('Smoke — Public Routes', () => {
  for (const route of publicRoutes) {
    test(`${route}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      const resp = await page.goto(route);
      expect(resp?.status()).toBeLessThan(500);
      await page.waitForLoadState('networkidle');

      // Not a white screen
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(10);

      // Marketing + legal pages should have an h1
      if (!route.startsWith('/auth/')) {
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
      }

      // No uncaught JS errors (ignore ResizeObserver noise)
      expect(errors.filter(e => !e.includes('ResizeObserver'))).toHaveLength(0);
    });
  }
});

// ================================================================
// REDIRECTS (exact paths from App.tsx <Navigate> elements)
// ================================================================
test.describe('Smoke — Redirects', () => {
  const redirects = [
    { from: '/templates/vendor-due-diligence', to: '/templates/vendor-due-diligence-questionnaire' },
    { from: '/templates/human-oversight-plan', to: '/templates/human-oversight-plan-template' },
    { from: '/tools/high-risk-checker', to: '/tools/high-risk-checker-annex-iii' },
    { from: '/industries/saas-selling-into-eu', to: '/industries/saas-ai-act' },
  ];

  for (const { from, to } of redirects) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from);
      await page.waitForURL(`**${to}`, { timeout: 10_000 });
    });
  }
});

// ================================================================
// 404
// ================================================================
test.describe('Smoke — 404', () => {
  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-xyz');
    await expect(page.locator('text=/not found|404/i').first()).toBeVisible({ timeout: 10_000 });
  });
});
