import { test, expect } from '@playwright/test';

test('debug — what does the page look like with saved auth?', async ({ page }) => {
  // Go to dashboard with saved auth state
  await page.goto('/dashboard');

  // Wait a few seconds for any redirects or rendering
  await page.waitForTimeout(5000);

  // Capture what we see
  const url = page.url();
  const title = await page.title();
  const bodyText = await page.locator('body').innerText();

  console.log('=== DEBUG INFO ===');
  console.log('Final URL:', url);
  console.log('Page title:', title);
  console.log('Body text (first 500 chars):', bodyText.substring(0, 500));
  console.log('=== END DEBUG ===');

  // Take screenshot
  await page.screenshot({ path: 'test-results/debug-dashboard.png', fullPage: true });

  // Check what elements exist
  const hasAside = await page.locator('aside').count();
  const hasSpinner = await page.locator('.animate-spin').count();
  const hasLoginForm = await page.locator('input[type="email"]').count();

  console.log('aside count:', hasAside);
  console.log('spinner count:', hasSpinner);
  console.log('login form count:', hasLoginForm);
});
