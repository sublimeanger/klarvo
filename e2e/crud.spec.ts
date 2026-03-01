import { test, expect } from '@playwright/test';
import { waitForApp, nav, expectDialogTitle, closeDialog, pickSelect } from './helpers';

// ================================================================
// VENDORS
// ================================================================
test.describe('Vendors — CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/vendors');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /vendor/i }).first()).toBeVisible();
  });

  test('Add Vendor dialog has all fields', async ({ page }) => {
    await page.getByRole('button', { name: /add vendor/i }).click();
    await expectDialogTitle(page, /add vendor/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('input[placeholder*="OpenAI"]')).toBeVisible();
    await expect(dialog.locator('input[placeholder*="https"]')).toBeVisible();
    await expect(dialog.locator('input[placeholder*="contact@"]')).toBeVisible();
    await expect(dialog.locator('textarea[placeholder*="notes"]')).toBeVisible();
    await closeDialog(page);
  });

  test('create a vendor', async ({ page }) => {
    await page.getByRole('button', { name: /add vendor/i }).click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('input[placeholder*="OpenAI"]').fill('E2E Vendor — Anthropic');
    await dialog.locator('input[placeholder*="https"]').fill('https://anthropic.com');
    await dialog.locator('input[placeholder*="contact@"]').fill('compliance@anthropic.com');
    await dialog.locator('textarea').fill('Added by Playwright E2E');
    await dialog.getByRole('button', { name: /add vendor/i }).click();

    await page.waitForTimeout(2000);
    await expect(page.locator('text=E2E Vendor — Anthropic')).toBeVisible({ timeout: 10_000 });
  });

  test('search vendors', async ({ page }) => {
    const search = page.locator('input[placeholder*="Search vendor"]').first();
    await search.fill('E2E Vendor');
    await page.waitForTimeout(500);
    await search.fill('zzznonexistent');
    await page.waitForTimeout(500);
    await search.clear();
  });
});

// ================================================================
// EVIDENCE
// ================================================================
test.describe('Evidence', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/evidence');
  });

  test('page renders with heading and upload button', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /evidence/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /upload/i }).first()).toBeVisible();
  });

  test('upload dialog has file picker and fields', async ({ page }) => {
    await page.getByRole('button', { name: /upload/i }).first().click();
    await expectDialogTitle(page, /upload evidence/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('text=/click to select|drag and drop/i')).toBeVisible();
    await expect(dialog.locator('text=Display Name')).toBeVisible();
    await expect(dialog.locator('text=Description')).toBeVisible();
    await closeDialog(page);
  });

  test('tabs are interactive', async ({ page }) => {
    const tabList = page.locator('[role="tablist"]').first();
    if (await tabList.isVisible({ timeout: 3000 }).catch(() => false)) {
      const tabs = tabList.locator('[role="tab"]');
      const count = await tabs.count();
      for (let i = 0; i < count; i++) {
        await tabs.nth(i).click();
        await page.waitForTimeout(300);
        await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
      }
    }
  });
});

// ================================================================
// POLICIES
// ================================================================
test.describe('Policies — CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/policies');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /polic/i }).first()).toBeVisible();
  });

  test('Create Policy dialog has all fields', async ({ page }) => {
    await page.getByRole('button', { name: /create policy/i }).first().click();
    await expectDialogTitle(page, /create policy/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('input[placeholder*="AI Acceptable Use"]')).toBeVisible();
    await expect(dialog.locator('text=Policy Type')).toBeVisible();
    await expect(dialog.locator('input[placeholder*="Brief description"]')).toBeVisible();
    await expect(dialog.locator('textarea[placeholder*="Policy content"]')).toBeVisible();

    // Submit disabled when name empty
    await expect(dialog.getByRole('button', { name: /create policy/i })).toBeDisabled();
    await closeDialog(page);
  });

  test('create a policy', async ({ page }) => {
    await page.getByRole('button', { name: /create policy/i }).first().click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('input[placeholder*="AI Acceptable Use"]').fill('E2E Test Policy');

    // Submit should now be enabled
    await expect(dialog.getByRole('button', { name: /create policy/i })).toBeEnabled();

    await dialog.locator('input[placeholder*="Brief description"]').fill('Test policy via E2E');
    await dialog.locator('textarea[placeholder*="Policy content"]').fill('# Test Policy\n\nCreated by Playwright.');
    await dialog.getByRole('button', { name: /create policy/i }).click();

    await page.waitForTimeout(2000);
    await expect(page.locator('text=E2E Test Policy')).toBeVisible({ timeout: 10_000 });
  });
});
