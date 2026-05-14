import { test, expect } from '@playwright/test';
import { USERS, PRODUCTS } from '../utils/test-data';
import { login, addToCart, fillCheckoutInfo } from '../utils/helpers';

test.describe('🛒 Fluxo Completo de Compra', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  test('Fluxo completo: adicionar → checkout → finalizar compra', async ({ page }) => {
    await addToCart(page, PRODUCTS.BACKPACK);
    await addToCart(page, PRODUCTS.BOLT_T_SHIRT);
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('2');
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await fillCheckoutInfo(page, 'Maria', 'Santos', '04567-000');
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    const subtotalText = await page.locator('.summary_subtotal_label').textContent();
    expect(subtotalText).toContain('$');
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/.*checkout-complete/);
    const header = page.locator('.complete-header');
    await expect(header).toHaveText('Thank you for your order!');
    await expect(page.locator('.pony_express')).toBeVisible();
  });

  test('Checkout sem preencher campos obrigatórios deve mostrar erro', async ({ page }) => {
    await addToCart(page, PRODUCTS.ONESIE);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="continue"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('First Name is required');
  });

  test('Checkout sem preencher sobrenome deve mostrar erro específico', async ({ page }) => {
    await addToCart(page, PRODUCTS.FLEECE_JACKET);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Maria');
    await page.fill('[data-test="postalCode"]', '04567-000');
    await page.click('[data-test="continue"]');
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toContainText('Last Name is required');
  });

  test('Cancelar no overview deve voltar ao carrinho', async ({ page }) => {
    await addToCart(page, PRODUCTS.BACKPACK);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await fillCheckoutInfo(page, 'Maria', 'Santos', '04567-000');
    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/.*inventory/);
  });
});