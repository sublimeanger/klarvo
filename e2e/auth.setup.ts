import { test as setup } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://dakhmawakfpwyxshhzmd.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRha2htYXdha2Zwd3l4c2hoem1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjY5MzYsImV4cCI6MjA4NTM0MjkzNn0.adv9rgoKPNJWQ9UuFlFOIZC6LLvTS2Mvw3qEGpCSzwc';

const AUTH_DIR = path.join(__dirname, '.auth');
const BASE_URL = process.env.BASE_URL || 'https://app.klarvo.io';

function supabaseAuth(email: string, password: string) {
  const result = execSync(
    `curl -s -X POST '${SUPABASE_URL}/auth/v1/token?grant_type=password' ` +
      `-H 'apikey: ${SUPABASE_ANON_KEY}' ` +
      `-H 'Content-Type: application/json' ` +
      `-d '{"email":"${email}","password":"${password}"}'`,
    { timeout: 15000 },
  );
  return JSON.parse(result.toString());
}

function buildStorageState(authData: any) {
  const storageKey = `sb-dakhmawakfpwyxshhzmd-auth-token`;
  const tokenValue = JSON.stringify({
    access_token: authData.access_token,
    refresh_token: authData.refresh_token,
    expires_at: authData.expires_at,
    expires_in: authData.expires_in,
    token_type: authData.token_type,
    user: authData.user,
  });

  return {
    cookies: [],
    origins: [
      {
        origin: BASE_URL,
        localStorage: [{ name: storageKey, value: tokenValue }],
      },
      {
        origin: SUPABASE_URL,
        localStorage: [{ name: storageKey, value: tokenValue }],
      },
    ],
  };
}

setup('authenticate', async () => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  const email = process.env.TEST_USER_EMAIL || 'test@klarvo.io';
  const password = process.env.TEST_USER_PASSWORD || 'TestPassword123!';

  console.log(`Authenticating ${email} via Supabase REST API...`);
  const authData = supabaseAuth(email, password);

  if (authData.error) {
    throw new Error(
      `Auth failed: ${authData.error} — ${authData.error_description || authData.msg}`,
    );
  }

  const storageState = buildStorageState(authData);
  const outPath = path.join(AUTH_DIR, 'user.json');
  fs.writeFileSync(outPath, JSON.stringify(storageState, null, 2));
  console.log(`Session saved to ${outPath} (token expires at ${authData.expires_at})`);
});
