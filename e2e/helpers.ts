import { Page, expect } from '@playwright/test';

export async function loginAndNavigate(page: Page, targetPath: string) {
  // Login via form — this is proven to work
  await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await expect(page.getByLabel('Email')).toBeVisible({ timeout: 30_000 });
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@klarvo.io');
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.waitForURL('**/dashboard', { timeout: 30_000 });
  await expect(page.locator('aside')).toBeVisible({ timeout: 30_000 });

  // If target is dashboard, we're done
  if (targetPath === '/dashboard') return;

  // Navigate via client-side routing (sidebar click or URL bar with SPA router)
  // Use evaluate to push state — React Router picks it up without full remount
  await page.evaluate((path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, targetPath);
  await page.waitForTimeout(1000);

  // If the page didn't update (React Router might not listen to popstate), click sidebar
  const content = await page.locator('aside, h1, h2, main').first().innerText().catch(() => '');
  if (!content || content.length < 5) {
    // Fallback: use sidebar link
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
    };
    const linkName = sidebarLinks[targetPath];
    if (linkName) {
      await page.locator('aside').getByRole('link', { name: linkName }).click();
      await page.waitForTimeout(1000);
    }
  }
}

export async function waitForApp(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 15_000 });
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
