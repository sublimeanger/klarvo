import { test, expect } from '@playwright/test';
import { waitForApp, nav, expectDialogTitle, closeDialog } from './helpers';

// ================================================================
// SETTINGS — GENERAL
// ================================================================
test.describe('Settings — General', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/settings');
  });

  test('shows org, team, and notification sections', async ({ page }) => {
    await expect(page.locator('text=/organization|company/i').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=/team|member/i').first()).toBeVisible();
    await expect(page.locator('text=/notification/i').first()).toBeVisible();
  });

  test('invite dialog — fields and validation', async ({ page }) => {
    await page.getByRole('button', { name: /invite/i }).first().click();
    await expectDialogTitle(page, /invite team member/i);

    const dialog = page.getByRole('dialog');

    // Email field
    const email = dialog.locator('#email');
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute('placeholder', 'colleague@company.com');

    // Submit disabled
    await expect(dialog.getByRole('button', { name: /send invitation/i })).toBeDisabled();

    // Fill email → enabled
    await email.fill('test-invite@example.com');
    await expect(dialog.getByRole('button', { name: /send invitation/i })).toBeEnabled();

    // Role select
    await dialog.locator('#role, [role="combobox"]').click();
    await expect(page.getByRole('option', { name: /admin/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /compliance owner/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /viewer/i })).toBeVisible();
    await page.keyboard.press('Escape');
    await closeDialog(page);
  });

  test('notification toggles are interactive', async ({ page }) => {
    const toggles = page.locator('[role="switch"]');
    const count = await toggles.count();
    if (count > 0) {
      const toggle = toggles.first();
      const initial = await toggle.getAttribute('aria-checked');
      await toggle.click();
      await page.waitForTimeout(500);
      const changed = await toggle.getAttribute('aria-checked');
      expect(changed).not.toBe(initial);
      await toggle.click(); // restore
    }
  });
});

// ================================================================
// SETTINGS — BILLING
// ================================================================
test.describe('Settings — Billing', () => {
  test('shows plan info and add-ons', async ({ page }) => {
    await nav(page, '/settings/billing');
    await expect(page.locator('text=/billing|plan|subscription/i').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=/starter|growth|enterprise|trial/i').first()).toBeVisible();
    await expect(page.locator('text=/provider track|add-on|operator/i').first()).toBeVisible({ timeout: 15_000 });
  });
});

// ================================================================
// SIDEBAR NAVIGATION — ALL 14 ITEMS
// ================================================================
test.describe('Sidebar — Navigation', () => {
  test('all 14 nav items navigate correctly', async ({ page }) => {
    await nav(page, '/dashboard');

    const sidebar = page.locator('aside');
    const items = [
      { name: 'Dashboard', url: '/dashboard' },
      { name: 'AI Systems', url: '/ai-systems' },
      { name: 'Discovery', url: '/discovery' },
      { name: 'Vendors', url: '/vendors' },
      { name: 'Assessments', url: '/assessments' },
      { name: 'Controls', url: '/controls' },
      { name: 'Evidence', url: '/evidence' },
      { name: 'Policies', url: '/policies' },
      { name: 'Disclosures', url: '/disclosures' },
      { name: 'Training', url: '/training' },
      { name: 'Tasks', url: '/tasks' },
      { name: 'Incidents', url: '/incidents' },
      { name: 'Exports', url: '/exports' },
      { name: 'Audit Log', url: '/audit-log' },
    ];

    for (const { name, url } of items) {
      const link = sidebar.getByRole('link', { name });
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(`**${url}`, { timeout: 10_000 });
      await waitForApp(page);
    }
  });
});

// ================================================================
// SIDEBAR — COLLAPSE/EXPAND
// ================================================================
test.describe('Sidebar — Collapse', () => {
  test('collapse and expand toggle works', async ({ page }) => {
    await nav(page, '/dashboard');

    const sidebar = page.locator('aside');
    const fullWidth = await sidebar.evaluate(el => el.offsetWidth);
    expect(fullWidth).toBeGreaterThan(200);

    // Collapse
    await sidebar.locator('button').filter({ has: page.locator('svg') }).first().click();
    await page.waitForTimeout(400);
    const collapsed = await sidebar.evaluate(el => el.offsetWidth);
    expect(collapsed).toBeLessThan(100);

    // Expand
    await sidebar.locator('button').filter({ has: page.locator('svg') }).first().click();
    await page.waitForTimeout(400);
    const expanded = await sidebar.evaluate(el => el.offsetWidth);
    expect(expanded).toBeGreaterThan(200);
  });
});

// ================================================================
// USER MENU + SIGN OUT
// ================================================================
test.describe('User Menu', () => {
  test('dropdown has Profile, Settings, Log out', async ({ page }) => {
    await nav(page, '/dashboard');
    await page.locator('aside').locator('button').last().click();
    await expect(page.getByRole('menuitem', { name: /profile/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /settings/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /log out/i })).toBeVisible();
  });

  test('Settings menu item navigates', async ({ page }) => {
    await nav(page, '/dashboard');
    await page.locator('aside').locator('button').last().click();
    await page.getByRole('menuitem', { name: /settings/i }).click();
    await page.waitForURL('**/settings');
  });

  test('sign out clears session', async ({ page }) => {
    await nav(page, '/dashboard');
    await page.locator('aside').locator('button').last().click();
    await page.getByRole('menuitem', { name: /log out/i }).click();
    await page.waitForURL('**/auth/login', { timeout: 15_000 });
  });
});

// ================================================================
// MARKET ACCESS + PROVIDER TRACK
// ================================================================
test.describe('Provider Track', () => {
  test('Market Access section visible in sidebar', async ({ page }) => {
    await nav(page, '/dashboard');
    await expect(page.locator('aside').locator('text=/market access/i')).toBeVisible();
    await expect(page.locator('aside').locator('text=/provider track/i')).toBeVisible();
  });

  const providerRoutes = [
    '/provider-track', '/provider-track/technical-docs',
    '/provider-track/risk-management', '/provider-track/qms',
    '/provider-track/conformity', '/provider-track/declaration',
    '/provider-track/ce-marking', '/provider-track/registration',
    '/provider-track/monitoring', '/provider-track/serious-incidents',
    '/provider-track/data-governance',
    '/provider-track/importer-verification',
    '/provider-track/distributor-verification',
  ];

  for (const route of providerRoutes) {
    test(`${route} loads without crash`, async ({ page }) => {
      await page.goto(route);
      await waitForApp(page);
      expect(await page.locator('body').innerText()).not.toContain('Unhandled Runtime Error');
    });
  }
});

// ================================================================
// REMAINING MODULES
// ================================================================
test.describe('Other Modules', () => {
  const modules = [
    { path: '/assessments', heading: /assessment/i },
    { path: '/controls', heading: /control/i },
    { path: '/disclosures', heading: /disclosure/i },
    { path: '/discovery', heading: /discover/i },
    { path: '/exports', heading: /export/i },
    { path: '/audit-log', heading: /audit/i },
  ];

  for (const { path, heading } of modules) {
    test(`${path} loads with heading`, async ({ page }) => {
      await nav(page, path);
      await expect(page.locator('h1, h2').filter({ hasText: heading }).first()).toBeVisible();
    });
  }

  test('Discovery shows connection options', async ({ page }) => {
    await nav(page, '/discovery');
    await expect(page.locator('text=/connect|workspace|google|microsoft/i').first()).toBeVisible({ timeout: 10_000 });
  });

  test('Exports shows export types', async ({ page }) => {
    await nav(page, '/exports');
    await expect(page.locator('text=/PDF|pack|report|generate|download/i').first()).toBeVisible({ timeout: 10_000 });
  });
});

// ================================================================
// PERFORMANCE
// ================================================================
test.describe('Performance', () => {
  test('dashboard loads within 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/dashboard');
    await waitForApp(page);
    expect(Date.now() - start).toBeLessThan(10_000);
  });
});
