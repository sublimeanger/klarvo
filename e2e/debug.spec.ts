import { test } from '@playwright/test';

test('debug — check auth state with curl-injected storageState', async ({ page }) => {
  // Check what localStorage looks like before navigation
  await page.goto('about:blank');
  const preNavStorage = await page.evaluate(() => {
    const keys = Object.keys(localStorage);
    const items: Record<string, string> = {};
    keys.forEach(k => items[k] = localStorage[k]?.substring(0, 100));
    return { keys, items };
  });
  console.log('=== PRE-NAV localStorage ===');
  console.log(JSON.stringify(preNavStorage, null, 2));

  // Navigate to dashboard
  await page.goto('https://app.klarvo.io/dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Check localStorage on the actual page
  const postNavStorage = await page.evaluate(() => {
    const keys = Object.keys(localStorage);
    const items: Record<string, string> = {};
    keys.forEach(k => items[k] = localStorage[k]?.substring(0, 100));
    return { keys, items };
  });
  console.log('=== POST-NAV localStorage (3s) ===');
  console.log(JSON.stringify(postNavStorage, null, 2));

  // Wait longer
  await page.waitForTimeout(7000);

  const url = page.url();
  const bodyText = await page.locator('body').innerText();
  const hasSpinner = await page.locator('.animate-spin').count();
  const hasAside = await page.locator('aside').count();
  const hasLoginForm = await page.locator('input[type="email"]').count();
  console.log('=== PAGE STATE (10s) ===');
  console.log('URL:', url);
  console.log('Body (first 300):', bodyText.substring(0, 300));
  console.log('spinner:', hasSpinner, 'aside:', hasAside, 'loginForm:', hasLoginForm);

  // Check for console errors
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));

  // Check network failures
  const failedRequests: string[] = [];
  page.on('requestfailed', req => failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`));

  await page.goto('https://app.klarvo.io/dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(10000);

  console.log('=== ERRORS ===');
  console.log('Page errors:', errors);
  console.log('Failed requests:', failedRequests);

  await page.screenshot({ path: 'test-results/debug-curl-auth.png', fullPage: true });
});
