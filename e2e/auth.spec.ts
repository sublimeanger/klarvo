import { test, expect } from '@playwright/test';

// All auth tests run without saved session
test.use({ storageState: { cookies: [], origins: [] } });

// ================================================================
// LOGIN — VALIDATION
// ================================================================
test.describe('Login — Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByLabel('Email')).toBeVisible({ timeout: 15_000 });
  });

  test('renders login form elements', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('button', { name: /magic link/i })).toBeVisible();
  });

  test('empty submit → email validation error', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Please enter a valid email')).toBeVisible();
  });

  test('invalid email format → validation error', async ({ page }) => {
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByLabel('Password').fill('SomePass123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Please enter a valid email')).toBeVisible();
  });

  test('password under 8 chars → validation error', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Short1');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
  });

  test('wrong credentials → error toast', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('WrongPassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Toast shows "Error" title with destructive variant
    await expect(
      page.locator('[data-sonner-toast], [role="status"], [class*="destructive"]')
        .filter({ hasText: /error|invalid|incorrect/i }).first()
    ).toBeVisible({ timeout: 10_000 });
  });

  test('magic link without email → error toast', async ({ page }) => {
    await page.getByRole('button', { name: /magic link/i }).click();
    await expect(
      page.locator('[data-sonner-toast], [role="status"]')
        .filter({ hasText: /email required|enter your email/i }).first()
    ).toBeVisible({ timeout: 5_000 });
  });

  test('magic link with email → success toast', async ({ page }) => {
    await page.getByLabel('Email').fill('test@klarvo.io');
    await page.getByRole('button', { name: /magic link/i }).click();
    await expect(
      page.locator('[data-sonner-toast], [role="status"]')
        .filter({ hasText: /magic link sent/i }).first()
    ).toBeVisible({ timeout: 10_000 });
  });
});

// ================================================================
// LOGIN — SUCCESS
// ================================================================
test.describe('Login — Success', () => {
  test('valid credentials → redirect to /dashboard', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@klarvo.io');
    await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('**/dashboard', { timeout: 30_000 });
    await expect(page.locator('aside')).toBeVisible();
  });
});

// ================================================================
// SIGNUP — VALIDATION
// ================================================================
test.describe('Signup — Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page.getByLabel('Full Name')).toBeVisible({ timeout: 15_000 });
  });

  test('renders signup form elements', async ({ page }) => {
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('name under 2 chars → validation error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('A');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('ValidPass1');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
  });

  test('password without uppercase → validation error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('alllowercase1');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('text=Must contain at least one uppercase letter')).toBeVisible();
  });

  test('password without lowercase → validation error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('ALLUPPERCASE1');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('text=Must contain at least one lowercase letter')).toBeVisible();
  });

  test('password without number → validation error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email').fill('new@example.com');
    await page.getByLabel('Password').fill('NoNumbersHere');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('text=Must contain at least one number')).toBeVisible();
  });
});

// ================================================================
// AUTH — PAGE NAVIGATION
// ================================================================
test.describe('Auth — Navigation', () => {
  test('login → signup link', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('link', { name: /sign up|create account|register/i }).click();
    await page.waitForURL('**/auth/signup');
    await expect(page.getByLabel('Full Name')).toBeVisible();
  });

  test('login → forgot password link', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('link', { name: /forgot/i }).click();
    await page.waitForURL('**/auth/forgot-password');
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('signup → login link', async ({ page }) => {
    await page.goto('/auth/signup');
    await page.getByRole('link', { name: /log in|sign in|already have/i }).click();
    await page.waitForURL('**/auth/login');
  });

  test('forgot password page renders', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await expect(page.locator('h1, h2').filter({ hasText: /forgot|reset|password/i }).first()).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
  });
});

// ================================================================
// AUTH — PROTECTED ROUTE REDIRECTS
// ================================================================
test.describe('Auth — Redirects', () => {
  const protectedRoutes = [
    '/dashboard', '/ai-systems', '/vendors', '/evidence',
    '/settings', '/training', '/tasks', '/policies',
    '/assessments', '/controls', '/incidents', '/exports',
  ];

  for (const route of protectedRoutes) {
    test(`${route} → redirects to /auth/login`, async ({ page }) => {
      await page.goto(route);
      await page.waitForURL('**/auth/login', { timeout: 15_000 });
    });
  }
});
