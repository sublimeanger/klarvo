import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page.getByLabel('Email')).toBeVisible({ timeout: 15_000 });
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@klarvo.io');
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('**/dashboard', { timeout: 30_000 });
  await expect(page.locator('aside')).toBeVisible({ timeout: 15_000 });
  await page.context().storageState({ path: authFile });
});
