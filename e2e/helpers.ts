import { Page, expect } from '@playwright/test';

export async function login(page: Page, email?: string, password?: string) {
  await page.goto('/auth/login');
  await expect(page.getByLabel('Email')).toBeVisible({ timeout: 15_000 });
  await page.getByLabel('Email').fill(email || process.env.TEST_USER_EMAIL || 'test@klarvo.io');
  await page.getByLabel('Password').fill(password || process.env.TEST_USER_PASSWORD || 'TestPassword123!');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.waitForURL('**/dashboard', { timeout: 30_000 });
  await expect(page.locator('aside')).toBeVisible({ timeout: 30_000 });
}

export async function waitForApp(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 30_000 });
}

export async function nav(page: Page, path: string) {
  await page.goto(path);
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
