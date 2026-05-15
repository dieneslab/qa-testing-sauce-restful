import { test, expect, Page } from '@playwright/test';
import { USERS } from '../utils/test-data';
import { login, logout } from '../utils/helpers';

test.describe('Navegação', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  async function closeMenuIfOpen(page: Page) {
    const menu = page.locator('.bm-menu-wrap');
    if (await menu.isVisible().catch(() => false)) {
      await page.locator('#react-burger-cross-btn').click({ force: true, timeout: 5000 }).catch(() => {});
      if (await menu.isVisible().catch(() => false)) {
        await page.keyboard.press('Escape');
      }
    }
  }

  test('menu lateral - All Items e Reset App State', async ({ page }) => {
    await closeMenuIfOpen(page);

    await page.click('#react-burger-menu-btn');
    await page.click('#inventory_sidebar_link');
    await expect(page).toHaveURL(/.*inventory/);

    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('logo volta para o inventário', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart/);

    await closeMenuIfOpen(page);
    await page.locator('.app_logo').click({ force: true, timeout: 10000 });
    await page.waitForURL(/.*inventory/, { timeout: 15000 });
  });

  test('ícone do carrinho', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart/);
  });

  test('menu fecha no X', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();

    await page.locator('#react-burger-cross-btn').click({ force: true });
    await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();
  });

  test('logout bloqueia acesso direto', async ({ page }) => {
    await logout(page);
    await page.goto('/inventory.html');
    expect(page.url()).not.toContain('/inventory');
  });
});
