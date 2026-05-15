import { test, expect } from '@playwright/test';
import { USERS } from '../utils/test-data';
import { login } from '../utils/helpers';
import AxeBuilder from '@axe-core/playwright';

test.describe('Acessibilidade', () => {
  test('página de login', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login-button')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results).toBeDefined();
  });

  test('inventário', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page.locator('.inventory_item').first()).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results).toBeDefined();
  });

  test('carrinho', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_list')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results).toBeDefined();
  });

  test('foco e menu lateral', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);

    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await sortSelect.focus();
    await expect(sortSelect).toBeFocused();

    await page.click('#react-burger-menu-btn');
    const menuLinks = page.locator('.bm-item-list a');
    const count = await menuLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await menuLinks.nth(i).textContent()).toBeTruthy();
    }
  });
});
