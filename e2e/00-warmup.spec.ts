import { test, expect } from '@playwright/test';
import { login } from './helpers';

// This test runs first (alphabetical order) to warm up the server connection.
// Cold-start of the SPA + Supabase auth can take 15-20s on first load.
// By warming up here, subsequent tests start fast (~2-3s login).
test.describe('Warmup', () => {
  test('warm up server and browser', async ({ page }) => {
    test.setTimeout(120_000); // Extra time for cold-start
    await login(page);
    await expect(page.locator('aside')).toBeVisible();
  });
});
