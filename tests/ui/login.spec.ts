import { test, expect } from '@playwright/test';
import { USERS, ERROR_MESSAGES } from '../utils/test-data';
import { login, logout } from '../utils/helpers';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('standard_user', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('locked_out_user', async ({ page }) => {
    await login(page, USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password, false);
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(ERROR_MESSAGES.LOCKED_OUT);
  });

  test('performance_glitch_user', async ({ page }) => {
    const start = Date.now();
    await login(page, USERS.GLITCH.username, USERS.GLITCH.password);
    expect(Date.now() - start).toBeLessThan(15000);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('campos vazios', async ({ page }) => {
    await page.click('[data-test="login-button"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username is required');
  });

  test('credenciais inválidas', async ({ page }) => {
    await page.fill('[data-test="username"]', 'usuario_inexistente');
    await page.fill('[data-test="password"]', 'senha_errada');
    await page.click('[data-test="login-button"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username and password do not match');
  });

  test('logout', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await logout(page);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
