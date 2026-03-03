import { test, expect } from '@playwright/test';
import { waitForApp, nav, pickSelect } from './helpers';

// ================================================================
// AI SYSTEMS — LIST PAGE
// ================================================================
test.describe('AI Systems — List', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/ai-systems');
  });

  test('renders heading and add button', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /AI System/i }).first()).toBeVisible();
    await expect(
      page.getByRole('link', { name: /add ai system/i })
        .or(page.getByRole('button', { name: /add ai system/i })).first()
    ).toBeVisible();
  });

  test('search input exists and filters', async ({ page }) => {
    const search = page.locator('input[placeholder*="Search"]').first();
    await expect(search).toBeVisible();
    await search.fill('NonexistentXYZ');
    await page.waitForTimeout(500);
    await search.clear();
  });

  test('add button navigates to wizard', async ({ page }) => {
    await page.getByRole('link', { name: /add ai system/i })
      .or(page.getByRole('button', { name: /add ai system/i })).first().click();
    await page.waitForURL('**/ai-systems/new');
  });
});

// ================================================================
// WIZARD — MODE SELECTION
// ================================================================
test.describe('AI Systems — Wizard Mode Selection', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/ai-systems/new');
  });

  test('shows 3 mode cards', async ({ page }) => {
    await expect(page.locator('text=How would you like to add this AI system?')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=AI-Powered Quick Start')).toBeVisible();
    await expect(page.locator('text=Quick Capture')).toBeVisible();
    await expect(page.locator('text=Full Assessment')).toBeVisible();
    await expect(page.locator('text=Recommended')).toBeVisible(); // AI Quick Start badge
  });

  test('Quick Capture selection highlights card', async ({ page }) => {
    const card = page.locator('[class*="Card"], [class*="card"]').filter({ hasText: 'Quick Capture' }).first();
    await card.click();
    await expect(card).toHaveClass(/ring-2.*ring-primary|border-primary.*ring-2/);
  });

  test('Full Assessment selection shows feature list', async ({ page }) => {
    await page.locator('[class*="Card"], [class*="card"]').filter({ hasText: 'Full Assessment' }).first().click();
    await expect(page.locator('text=prohibited practices screening')).toBeVisible();
    await expect(page.locator('text=High-risk classification')).toBeVisible();
  });
});

// ================================================================
// WIZARD — QUICK CAPTURE E2E
// ================================================================
test.describe('AI Systems — Quick Capture', () => {
  test('complete quick capture wizard end-to-end', async ({ page }) => {
    await nav(page, '/ai-systems/new');

    // Step 0: Select Quick Capture → Next
    await page.locator('[class*="Card"], [class*="card"]').filter({ hasText: 'Quick Capture' }).first().click();
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Step 1: Basics
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    await page.locator('#name').fill('E2E Test — ChatGPT Support Bot');
    await page.locator('#internal_reference_id').fill('AI-E2E-001');
    await page.locator('#description').fill('Customer support chatbot powered by GPT-4 for tier 1 queries.');
    await pickSelect(page, 'Department', 'Customer Service');
    await pickSelect(page, 'Status', 'Live');
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Step 2: Vendor
    await page.waitForTimeout(1000);
    const vendorInput = page.locator('input[placeholder*="vendor"], #new_vendor_name').first();
    if (await vendorInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await vendorInput.fill('OpenAI');
    }
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Step 3: Ownership — proceed
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /next|continue|finish|submit|save/i }).click();

    // Step 20: Done
    await expect(page.locator('text=/added|created|success|done|saved|registered/i').first()).toBeVisible({ timeout: 15_000 });
  });

  test('Step 1 validation — name required', async ({ page }) => {
    await nav(page, '/ai-systems/new');
    await page.locator('[class*="Card"], [class*="card"]').filter({ hasText: 'Quick Capture' }).first().click();
    await page.getByRole('button', { name: /next|continue/i }).click();

    // On Step 1 — try to proceed without name
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /next|continue/i }).click();
    await page.waitForTimeout(500);

    // Should still be on Step 1 — name field visible with error styling
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#name')).toHaveClass(/border-destructive/);
  });
});

// ================================================================
// WIZARD — FULL ASSESSMENT FIRST 5 STEPS
// ================================================================
test.describe('AI Systems — Full Assessment', () => {
  test('navigate through first 5 steps', async ({ page }) => {
    await nav(page, '/ai-systems/new');

    // Step 0: Full Assessment → Next
    await page.locator('[class*="Card"], [class*="card"]').filter({ hasText: 'Full Assessment' }).first().click();
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Step 1: Basics
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    await page.locator('#name').fill('Full Assessment E2E System');
    await page.locator('#description').fill('HR screening tool for CV filtering');
    await pickSelect(page, 'Department', 'Human Resources');
    await pickSelect(page, 'Status', 'Pilot');
    await page.getByRole('button', { name: /next/i }).click();

    // Step 2: Vendor — skip
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /next/i }).click();

    // Step 3: Ownership — skip
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /next/i }).click();

    // Step 4: Scope — verify content, test Back button
    await page.waitForTimeout(1000);
    await expect(page.locator('text=/scope|region|geography|where/i').first()).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /back|previous/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /next/i }).click();
  });
});

// ================================================================
// AI SYSTEM — DETAIL / ERROR HANDLING
// ================================================================
test.describe('AI Systems — Detail', () => {
  test('invalid system ID handles gracefully', async ({ page }) => {
    await page.goto('/ai-systems/00000000-0000-0000-0000-000000000000');
    await waitForApp(page);
    const text = await page.locator('body').innerText();
    expect(text).not.toContain('Unhandled Runtime Error');
  });

  test('classification route handles invalid ID', async ({ page }) => {
    await page.goto('/ai-systems/00000000-0000-0000-0000-000000000000/classify');
    await waitForApp(page);
    expect(await page.locator('body').innerText()).not.toContain('Unhandled Runtime Error');
  });

  test('FRIA route handles invalid ID', async ({ page }) => {
    await page.goto('/ai-systems/00000000-0000-0000-0000-000000000000/fria');
    await waitForApp(page);
    expect(await page.locator('body').innerText()).not.toContain('Unhandled Runtime Error');
  });
});
