import { Page, expect } from '@playwright/test';

export async function waitForApp(page: Page) {
  await page.waitForLoadState('networkidle');
  const spinner = page.locator('.animate-spin').first();
  if (await spinner.isVisible({ timeout: 1500 }).catch(() => false)) {
    await spinner.waitFor({ state: 'hidden', timeout: 15_000 });
  }
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
