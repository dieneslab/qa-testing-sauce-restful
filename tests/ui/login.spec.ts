import { test, expect } from '@playwright/test';
import { USERS, ERROR_MESSAGES } from '../utils/test-data';
import { login, logout } from '../utils/helpers';

test.describe('🔐 Login - Sauce Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login com standard_user deve funcionar', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login com locked_out_user deve exibir mensagem de bloqueio', async ({ page }) => {
    await login(page, USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password, false);
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(ERROR_MESSAGES.LOCKED_OUT);
  });

  test('Login com performance_glitch_user deve funcionar (com lentidão)', async ({ page }) => {
    const start = Date.now();
    await login(page, USERS.GLITCH.username, USERS.GLITCH.password);
    const elapsed = Date.now() - start;
    await expect(page.locator('.title')).toHaveText('Products');
    console.log(`⏱️ Tempo de login (glitch_user): ${elapsed}ms`);
    expect(elapsed).toBeLessThan(15000);
  });

  test('Login com campos vazios deve exibir mensagem de erro', async ({ page }) => {
    await page.fill('[data-test="username"]', '');
    await page.fill('[data-test="password"]', '');
    await page.click('[data-test="login-button"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username is required');
  });

  test('Login com credenciais inválidas deve exibir erro', async ({ page }) => {
    await page.fill('[data-test="username"]', 'usuario_inexistente');
    await page.fill('[data-test="password"]', 'senha_errada');
    await page.click('[data-test="login-button"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username and password do not match');
  });

  test('Logout deve redirecionar para tela de login', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await logout(page);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});