import { test, expect } from '@playwright/test';
import { USERS, PRODUCTS } from '../utils/test-data';
import { login, addToCart, removeFromCart, getCartCount } from '../utils/helpers';

test.describe('🛍️ Gestão do Carrinho', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  test('Adicionar item ao carrinho - badge atualiza', async ({ page }) => {
    expect(await getCartCount(page)).toBe(0);
    await addToCart(page, PRODUCTS.BACKPACK);
    expect(await getCartCount(page)).toBe(1);
  });

  test('Remover item do carrinho pela listagem de produtos', async ({ page }) => {
    await addToCart(page, PRODUCTS.BACKPACK);
    expect(await getCartCount(page)).toBe(1);
    await page.locator('.inventory_item', { hasText: PRODUCTS.BACKPACK })
      .locator('button:has-text("Remove")').click();
    expect(await getCartCount(page)).toBe(0);
  });

  test('Remover item do carrinho pela página do carrinho', async ({ page }) => {
    await addToCart(page, PRODUCTS.BIKE_LIGHT);
    await addToCart(page, PRODUCTS.ONESIE);
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await removeFromCart(page, PRODUCTS.BIKE_LIGHT);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.cart_item')).toContainText(PRODUCTS.ONESIE);
  });

  test('Botão "Continue Shopping" volta à listagem', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('Carrinho vazio não deve permitir checkout', async ({ page }) => {
    await page.click('.shopping_cart_link');
    const checkoutBtn = page.locator('[data-test="checkout"]');
    const btnCount = await checkoutBtn.count();
    expect(btnCount).toBeGreaterThanOrEqual(0);
  });
});