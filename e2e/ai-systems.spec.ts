import { test, expect } from '@playwright/test';
import { loginAndNav, nav, pickSelect } from './helpers';

// ================================================================
// AI SYSTEMS — LIST PAGE
// ================================================================
test.describe('AI Systems — List', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndNav(page, '/ai-systems');
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
    await loginAndNav(page, '/ai-systems');
    await page.getByRole('link', { name: /add ai system/i })
      .or(page.getByRole('button', { name: /add ai system/i })).first().click();
    await page.waitForURL('**/ai-systems/new', { timeout: 10_000 });
    // Wait for mode selection to render
    await expect(page.locator('text=How would you like to add this AI system?')).toBeVisible({ timeout: 15_000 });
  });

  test('shows 3 mode cards', async ({ page }) => {
    // Verify 3 mode card titles via heading role (h4 elements in Step0ModeSelection)
    await expect(page.getByRole('heading', { name: /AI-Powered Quick Start/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quick Capture' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Full Assessment' })).toBeVisible();
  });

  test('Quick Capture selection highlights card', async ({ page }) => {
    const card = page.locator('.cursor-pointer:has-text("Quick Capture")').first();
    await card.click();
    await expect(card).toHaveClass(/ring-2/);
    await expect(card).toHaveClass(/ring-primary/);
  });

  test('Full Assessment selection shows feature list', async ({ page }) => {
    await page.locator('.cursor-pointer:has-text("Full Assessment")').first().click();
    await expect(page.locator('text=/Prohibited practices screening/i')).toBeVisible();
    await expect(page.locator('text=/High-risk classification/i')).toBeVisible();
  });
});

// ================================================================
// WIZARD — QUICK CAPTURE E2E
// ================================================================
test.describe('AI Systems — Quick Capture', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndNav(page, '/ai-systems');
    await page.getByRole('link', { name: /add ai system/i })
      .or(page.getByRole('button', { name: /add ai system/i })).first().click();
    await page.waitForURL('**/ai-systems/new', { timeout: 10_000 });
    await expect(page.locator('text=How would you like to add this AI system?')).toBeVisible({ timeout: 15_000 });
  });

  test('complete quick capture wizard end-to-end', async ({ page }) => {
    // Step 0: Select Quick Capture → Next
    await page.locator('.cursor-pointer:has-text("Quick Capture")').first().click();
    await page.getByRole('button', { name: /next/i }).click();

    // Step 1: Basics
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    const ts = Date.now();
    await page.locator('#name').fill(`E2E Quick Capture — ${ts}`);
    await page.locator('#internal_reference_id').fill(`AI-E2E-QC-${ts}`);
    await page.locator('#description').fill('Customer support chatbot powered by GPT-4 for tier 1 queries.');
    await pickSelect(page, 'Department', 'Customer Service');
    await pickSelect(page, 'Status', 'Live');
    await page.getByRole('button', { name: /next/i }).click();

    // Step 2: Vendor — wait for "Vendor / Provider" label, then skip
    await expect(page.locator('text=/Vendor.*Provider/i').first()).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /next/i }).click();

    // Step 3: Ownership — wait for "Primary Owner" label, then submit
    await expect(page.locator('text=/Primary Owner/i').first()).toBeVisible({ timeout: 10_000 });
    const submitBtn = page.getByRole('button', { name: /create ai system/i });
    await expect(submitBtn).toBeVisible({ timeout: 10_000 });
    await submitBtn.click();

    // Step 20: Done — "AI System Added!"
    await expect(page.locator('text=/AI System Added|added.*inventory|created successfully/i').first()).toBeVisible({ timeout: 30_000 });
  });

  test('Step 1 validation — name required', async ({ page }) => {
    await page.locator('.cursor-pointer:has-text("Quick Capture")').first().click();
    await page.getByRole('button', { name: /next/i }).click();

    // On Step 1 — try to proceed without name
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /next/i }).click();
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
  test.beforeEach(async ({ page }) => {
    await loginAndNav(page, '/ai-systems');
    await page.getByRole('link', { name: /add ai system/i })
      .or(page.getByRole('button', { name: /add ai system/i })).first().click();
    await page.waitForURL('**/ai-systems/new', { timeout: 10_000 });
    await expect(page.locator('text=How would you like to add this AI system?')).toBeVisible({ timeout: 15_000 });
  });

  test('navigate through first 5 steps', async ({ page }) => {
    // Step 0: Full Assessment → Next
    await page.locator('.cursor-pointer:has-text("Full Assessment")').first().click();
    await page.getByRole('button', { name: /next/i }).click();

    // Step 1: Basics — wait for #name field to confirm step transition
    await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
    const ts = Date.now();
    await page.locator('#name').fill(`Full Assessment E2E — ${ts}`);
    await page.locator('#description').fill('HR screening tool for CV filtering');
    await pickSelect(page, 'Department', 'Human Resources');
    await pickSelect(page, 'Status', 'Pilot');
    await page.getByRole('button', { name: /next/i }).click();

    // Step 2: Vendor — wait for "Vendor / Provider" label to confirm step transition
    await expect(page.locator('text=/Vendor.*Provider/i').first()).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /next/i }).click();

    // Step 3: Ownership — wait for "Primary Owner" label to confirm step transition
    await expect(page.locator('text=/Primary Owner/i').first()).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /next/i }).click();

    // Step 4: Scope — wait for "Where is this system deployed?" label
    await expect(page.locator('text=/Where is this system deployed/i').first()).toBeVisible({ timeout: 10_000 });

    // Test Back button (goes to Step 3)
    await page.getByRole('button', { name: /back/i }).click();
    await expect(page.locator('text=/Primary Owner/i').first()).toBeVisible({ timeout: 10_000 });

    // Forward again to Step 4
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.locator('text=/Where is this system deployed/i').first()).toBeVisible({ timeout: 10_000 });
  });
});
