import { test as setup, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const authFile = 'e2e/.auth/user.json';

function loadEnvValue(key: string): string {
  const envPath = resolve(__dirname, '../.env');
  const content = readFileSync(envPath, 'utf-8');
  const match = content.match(new RegExp(`^${key}=["']?(.+?)["']?$`, 'm'));
  return match?.[1] ?? '';
}

setup('authenticate', async ({ page }) => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || loadEnvValue('VITE_SUPABASE_URL');
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || loadEnvValue('VITE_SUPABASE_PUBLISHABLE_KEY');
  const email = process.env.TEST_USER_EMAIL || 'test@klarvo.io';
  const password = process.env.TEST_USER_PASSWORD || 'TestPassword123!';

  // Authenticate via API (bypasses browser proxy/CORS issues)
  const body = JSON.stringify({ email, password });
  const result = execSync(
    `curl -s -X POST "${supabaseUrl}/auth/v1/token?grant_type=password" ` +
    `-H "apikey: ${supabaseKey}" ` +
    `-H "Content-Type: application/json" ` +
    `-d ${JSON.stringify(body)}`,
    { encoding: 'utf-8' },
  );
  const session = JSON.parse(result);
  if (!session.access_token) {
    throw new Error(`Auth failed: ${result}`);
  }

  // Build the localStorage key Supabase JS SDK uses
  const projectRef = supabaseUrl.replace('https://', '').split('.')[0];
  const storageKey = `sb-${projectRef}-auth-token`;
  const storageValue = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    expires_in: session.expires_in,
    token_type: session.token_type,
    user: session.user,
  });

  // Inject session into browser localStorage
  await page.goto('/auth/login');
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key, value),
    [storageKey, storageValue],
  );

  // Navigate to dashboard — ProtectedRoute will pick up the session
  await page.goto('/dashboard');
  await expect(page.locator('aside')).toBeVisible({ timeout: 15_000 });
  await page.context().storageState({ path: authFile });
});
