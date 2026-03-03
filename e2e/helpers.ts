import { Page, expect } from '@playwright/test';

export async function waitForApp(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  // Wait for spinner to disappear (Supabase session restore)
  const spinner = page.locator('.animate-spin');
  await spinner.waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => {});
  // Wait for actual content
  await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 15_000 });
}

export async function nav(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await waitForApp(page);
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
