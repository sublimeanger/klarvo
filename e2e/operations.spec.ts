import { test, expect } from '@playwright/test';
import { waitForApp, nav, expectDialogTitle, closeDialog, pickSelect } from './helpers';

// ================================================================
// TASKS
// ================================================================
test.describe('Tasks — CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/tasks');
  });

  test('page renders with heading and add button', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /task/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /add task/i }).first()).toBeVisible();
  });

  test('Add Task dialog has all fields', async ({ page }) => {
    await page.getByRole('button', { name: /add task/i }).first().click();
    await expectDialogTitle(page, /add task/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('input[placeholder*="Complete classification"]')).toBeVisible();
    await expect(dialog.locator('textarea[placeholder*="Additional details"]')).toBeVisible();
    await expect(dialog.locator('text=Priority')).toBeVisible();
    await expect(dialog.locator('text=Due Date')).toBeVisible();
    await expect(dialog.locator('text=Assign To')).toBeVisible();
    await expect(dialog.locator('text=Task Type')).toBeVisible();
    await expect(dialog.locator('text=Link to AI System')).toBeVisible();

    // Submit disabled when title empty
    await expect(dialog.getByRole('button', { name: /create task/i })).toBeDisabled();
    await closeDialog(page);
  });

  test('create a task', async ({ page }) => {
    await page.getByRole('button', { name: /add task/i }).first().click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('input[placeholder*="Complete classification"]').fill('E2E Test Task — Review AI System');
    await expect(dialog.getByRole('button', { name: /create task/i })).toBeEnabled();
    await dialog.locator('textarea[placeholder*="Additional details"]').fill('Created by Playwright E2E');

    // Select priority
    await dialog.locator('label:has-text("Priority")').locator('..').locator('button, [role="combobox"]').first().click();
    await page.getByRole('option', { name: /high/i }).first().click();

    // Select task type
    await dialog.locator('label:has-text("Task Type")').locator('..').locator('button, [role="combobox"]').first().click();
    await page.getByRole('option', { name: 'Classification' }).click();

    await dialog.getByRole('button', { name: /create task/i }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('text=E2E Test Task')).toBeVisible({ timeout: 10_000 });
  });
});

// ================================================================
// INCIDENTS
// ================================================================
test.describe('Incidents — CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/incidents');
  });

  test('page renders with heading and report button', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /incident/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /report incident/i }).first()).toBeVisible();
  });

  test('Report Incident dialog has all fields', async ({ page }) => {
    await page.getByRole('button', { name: /report incident/i }).first().click();
    await expectDialogTitle(page, /report incident/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('input[placeholder*="Brief description"]')).toBeVisible();
    await expect(dialog.locator('text=Severity')).toBeVisible();
    await expect(dialog.locator('textarea[placeholder*="Detailed description"]')).toBeVisible();
    await expect(dialog.locator('text=Related AI System')).toBeVisible();
    await expect(dialog.locator('text=When did it occur')).toBeVisible();
    await expect(dialog.locator('text=Affected Parties')).toBeVisible();
    await expect(dialog.locator('textarea[placeholder*="impact"]')).toBeVisible();
    await expect(dialog.getByRole('button', { name: /report incident/i })).toBeDisabled();
    await closeDialog(page);
  });

  test('create an incident', async ({ page }) => {
    await page.getByRole('button', { name: /report incident/i }).first().click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('input[placeholder*="Brief description"]').fill('E2E Test Incident — PII Exposure');
    await expect(dialog.getByRole('button', { name: /report incident/i })).toBeEnabled();
    await dialog.locator('textarea[placeholder*="Detailed description"]').fill('Chatbot returned PII from different user session.');

    // Severity
    await dialog.locator('label:has-text("Severity")').locator('..').locator('button, [role="combobox"]').first().click();
    await page.getByRole('option', { name: /high/i }).first().click();

    // Toggle affected parties
    await dialog.getByRole('button', { name: 'Customers', exact: true }).click();
    await dialog.getByRole('button', { name: 'Employees', exact: true }).click();

    // Impact
    await dialog.locator('textarea[placeholder*="impact"]').fill('Customer records exposed');

    await dialog.getByRole('button', { name: /report incident/i }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('text=E2E Test Incident')).toBeVisible({ timeout: 10_000 });
  });
});

// ================================================================
// TRAINING
// ================================================================
test.describe('Training', () => {
  test.beforeEach(async ({ page }) => {
    await nav(page, '/training');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /training/i }).first()).toBeVisible();
  });

  test('Assign Training dialog has all fields', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: /assign|add|record/i }).first();
    await addBtn.click();
    await expectDialogTitle(page, /assign training/i);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('text=Staff Member')).toBeVisible();
    await expect(dialog.locator('text=Training Type')).toBeVisible();
    await expect(dialog.locator('input[placeholder*="EU AI Act"]')).toBeVisible();
    await expect(dialog.locator('text=Expiry Date')).toBeVisible();
    await closeDialog(page);
  });

  test('Training Type select has correct options', async ({ page }) => {
    await page.getByRole('button', { name: /assign|add|record/i }).first().click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('label:has-text("Training Type")').locator('..').locator('button, [role="combobox"]').first().click();
    await expect(page.getByRole('option', { name: 'AI Basics' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'AI Operator' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'High-Risk Operator' })).toBeVisible();
    await page.keyboard.press('Escape'); // close dropdown
    await closeDialog(page);
  });
});
