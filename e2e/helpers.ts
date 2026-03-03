import { Page, expect } from '@playwright/test';

export async function waitForApp(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 30_000 });
}

export async function nav(page: Page, path: string) {
  // First attempt
  await page.goto(path, { waitUntil: 'domcontentloaded' });

  // Handle Supabase auth race condition: if we see a spinner after 5s, reload once
  try {
    await page.locator('aside, h1, h2, main, [role="main"]').first().waitFor({ state: 'visible', timeout: 5_000 });
  } catch {
    // Content not visible — likely auth race condition. Reload.
    await page.reload({ waitUntil: 'domcontentloaded' });
  }

  // Now wait for real
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
