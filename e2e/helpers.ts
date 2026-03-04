import { Page, expect } from '@playwright/test';

export async function login(page: Page, email?: string, password?: string) {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 15_000 });
      await expect(page.getByLabel('Email')).toBeVisible({ timeout: 10_000 });
      await page.getByLabel('Email').fill(email || process.env.TEST_USER_EMAIL || 'test@klarvo.io');
      await page.getByLabel('Password').fill(password || process.env.TEST_USER_PASSWORD || 'TestPassword123!');
      await page.getByRole('button', { name: 'Sign In', exact: true }).click();
      await page.waitForURL('**/dashboard', { timeout: 30_000 });
      await expect(page.locator('aside')).toBeVisible({ timeout: 30_000 });
      return; // success
    } catch (e) {
      if (attempt === maxRetries) throw e;
      console.log(`Login attempt ${attempt} failed, retrying...`);
    }
  }
}

const SIDEBAR_LINKS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ai-systems': 'AI Systems',
  '/vendors': 'Vendors',
  '/evidence': 'Evidence',
  '/policies': 'Policies',
  '/training': 'Training',
  '/tasks': 'Tasks',
  '/incidents': 'Incidents',
  '/assessments': 'Assessments',
  '/controls': 'Controls',
  '/disclosures': 'Disclosures',
  '/discovery': 'Discovery',
  '/exports': 'Exports',
  '/audit-log': 'Audit Log',
  '/settings': 'Settings',
  '/provider-track': 'Provider Track',
};

export async function nav(page: Page, path: string) {
  const linkName = SIDEBAR_LINKS[path];

  // Try sidebar click navigation first (fast, SPA-friendly)
  if (linkName) {
    try {
      const sidebar = page.locator('aside');
      if (await sidebar.isVisible().catch(() => false)) {
        const link = sidebar.getByRole('link', { name: linkName });
        await link.click({ timeout: 5_000 });
        await page.waitForURL('**' + path, { timeout: 8_000 });
        await page.waitForTimeout(500);
        return;
      }
    } catch {
      // Sidebar click didn't navigate — fall through to page.goto
    }
  }

  // Fallback: direct navigation via page.goto
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 30_000 });
}

export async function loginAndNav(page: Page, path: string) {
  await login(page);
  // Brief wait for React to finish rendering after login redirect
  await page.waitForTimeout(500);
  if (path !== '/dashboard') {
    await nav(page, path);
  }
}

export async function pickSelect(page: Page, labelText: string, optionText: string) {
  const label = page.locator('label, [class*="Label"]').filter({ hasText: labelText }).first();
  const container = label.locator('..');
  await container.locator('button, [role="combobox"]').first().click();
  await page.getByRole('option', { name: optionText }).click();
}

export async function expectDialogTitle(page: Page, title: string | RegExp) {
  await expect(
    page.getByRole('dialog').locator('h2, h3, [class*="DialogTitle"]').filter({ hasText: title })
  ).toBeVisible({ timeout: 5000 });
}

export async function closeDialog(page: Page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
}
