import { test, expect } from '@playwright/test';

// These tests manage their own auth — don't use saved session
test.use({ storageState: { cookies: [], origins: [] } });

// ================================================================
// ONBOARDING — FULL WIZARD E2E
// ================================================================
test.describe('Onboarding — Full Flow', () => {
  test('complete 3-step wizard end-to-end', async ({ page }) => {
    // Login as un-onboarded user
    await page.goto('/auth/login');
    await page.getByLabel('Email').fill(process.env.TEST_ONBOARD_EMAIL || 'test-onboard@klarvo.io');
    await page.getByLabel('Password').fill(process.env.TEST_ONBOARD_PASSWORD || 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should redirect to /onboarding, NOT /dashboard
    await page.waitForURL('**/onboarding', { timeout: 30_000 });

    // ---- STEP 1: Company Details ----
    await expect(page.locator('text=Company Details')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#companyName')).toBeVisible();

    // Continue should be disabled
    const continueBtn = page.getByRole('button', { name: /continue/i });
    await expect(continueBtn).toBeDisabled();

    // Fill company name
    await page.locator('#companyName').fill('E2E Test Corp');

    // Select industry (shadcn Select: click trigger, then click option)
    await page.locator('label:has-text("Industry Sector")').locator('..').locator('button').first().click();
    await page.getByRole('option', { name: 'Technology & Software' }).click();

    // Select company size
    await page.locator('label:has-text("Company Size")').locator('..').locator('button').first().click();
    await page.getByRole('option', { name: '11-50 employees' }).click();

    // Continue should now be enabled
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // ---- STEP 2: Your Role ----
    await expect(page.locator('text=Your Role')).toBeVisible({ timeout: 5_000 });

    // All 5 role buttons visible
    await expect(page.locator('button:has-text("Founder / CEO")')).toBeVisible();
    await expect(page.locator('button:has-text("Compliance / DPO")')).toBeVisible();
    await expect(page.locator('button:has-text("Product / CTO")')).toBeVisible();
    await expect(page.locator('button:has-text("Reviewer / Approver")')).toBeVisible();
    await expect(page.locator('button:has-text("Team Member")')).toBeVisible();

    // Select a role
    await page.locator('button:has-text("Founder / CEO")').click();

    // Should get selected styling
    await expect(page.locator('button:has-text("Founder / CEO")')).toHaveClass(/border-primary/);

    await page.getByRole('button', { name: /continue/i }).click();

    // ---- STEP 3: Confirmation ----
    await expect(page.locator('text=You\'re all set!')).toBeVisible({ timeout: 5_000 });
    await expect(page.locator('text=Your Growth Trial includes:')).toBeVisible();
    await expect(page.locator('text=No credit card required')).toBeVisible();

    // Complete onboarding
    await page.getByRole('button', { name: /start free trial/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 30_000 });
  });
});

// ================================================================
// ONBOARDING — STEP NAVIGATION
// ================================================================
test.describe('Onboarding — Navigation', () => {
  test('back button preserves Step 1 data', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel('Email').fill(process.env.TEST_ONBOARD_EMAIL || 'test-onboard@klarvo.io');
    await page.getByLabel('Password').fill(process.env.TEST_ONBOARD_PASSWORD || 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('**/onboarding', { timeout: 30_000 });

    // Fill Step 1
    await page.locator('#companyName').fill('Nav Test Corp');
    await page.locator('label:has-text("Industry Sector")').locator('..').locator('button').first().click();
    await page.getByRole('option', { name: 'Education' }).click();
    await page.locator('label:has-text("Company Size")').locator('..').locator('button').first().click();
    await page.getByRole('option', { name: '1-10 employees' }).click();

    await page.getByRole('button', { name: /continue/i }).click();

    // On Step 2, go back
    await expect(page.locator('text=Your Role')).toBeVisible();
    await page.getByRole('button', { name: /back/i }).click();

    // Step 1 data should be preserved
    await expect(page.locator('#companyName')).toHaveValue('Nav Test Corp');
  });
});

// ================================================================
// ONBOARDING — ALREADY ONBOARDED USER
// ================================================================
test.describe('Onboarding — Already Completed', () => {
  test('onboarded user → /onboarding redirects to /dashboard', async ({ page }) => {
    // Login as the already-onboarded admin user
    await page.goto('/auth/login');
    await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@klarvo.io');
    await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('**/dashboard', { timeout: 30_000 });

    // Try to access onboarding
    await page.goto('/onboarding');
    await page.waitForURL('**/dashboard', { timeout: 10_000 });
  });
});

// ================================================================
// ONBOARDING — UNAUTHENTICATED
// ================================================================
test.describe('Onboarding — Auth Guard', () => {
  test('unauthenticated → /onboarding redirects to /auth/login', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForURL('**/auth/login', { timeout: 15_000 });
  });
});
