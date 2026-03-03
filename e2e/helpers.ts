import { Page, Browser, BrowserContext, expect } from '@playwright/test';

let sharedContext: BrowserContext | null = null;

export async function setupAuth(browser: Browser): Promise<BrowserContext> {
  if (sharedContext) return sharedContext;

  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.getByLabel('Email')).toBeVisible({ timeout: 30_000 });
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@klarvo.io');
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.waitForURL('**/dashboard', { timeout: 60_000 });
  await expect(page.locator('aside')).toBeVisible({ timeout: 60_000 });

  // Save storage state for reuse
  await context.storageState({ path: 'e2e/.auth/user.json' });
  await page.close();
  await context.close();

  sharedContext = await browser.newContext({
    ignoreHTTPSErrors: true,
    storageState: 'e2e/.auth/user.json',
  });
  return sharedContext;
}

export async function nav(page: Page, path: string) {
  // Use sidebar click for client-side routing (no full page reload)
  const sidebarLinks: Record<string, string> = {
    '/ai-systems': 'AI Systems',
    '/vendors': 'Vendors',
    '/evidence': 'Evidence',
    '/policies': 'Policies',
    '/training': 'Training',
    '/tasks': 'Tasks',
    '/incidents': 'Incidents',
    '/settings': 'Settings',
    '/assessments': 'Assessments',
    '/controls': 'Controls',
    '/disclosures': 'Disclosures',
    '/discovery': 'Discovery',
    '/exports': 'Exports',
    '/audit-log': 'Audit Log',
    '/dashboard': 'Dashboard',
  };

  const linkName = sidebarLinks[path];
  if (linkName && await page.locator('aside').isVisible().catch(() => false)) {
    await page.locator('aside').getByRole('link', { name: linkName }).click();
    await page.waitForTimeout(1000);
    await page.locator('h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 15_000 });
  } else {
    // Fallback for routes not in sidebar (e.g. /ai-systems/new, /settings/billing)
    await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 30_000 });
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
