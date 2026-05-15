import { test, expect } from '@playwright/test';
import { USERS, PRODUCTS } from '../utils/test-data';
import { login, addToCart, fillCheckoutInfo } from '../utils/helpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  test('fluxo completo', async ({ page }) => {
    await addToCart(page, PRODUCTS.BACKPACK);
    await addToCart(page, PRODUCTS.BOLT_T_SHIRT);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await page.click('[data-test="checkout"]');

    await fillCheckoutInfo(page, 'Maria', 'Santos', '04567-000');
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    expect(await page.locator('.summary_subtotal_label').textContent()).toContain('$');

    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('sem first name', async ({ page }) => {
    await addToCart(page, PRODUCTS.ONESIE);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('sem last name', async ({ page }) => {
    await addToCart(page, PRODUCTS.FLEECE_JACKET);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Maria');
    await page.fill('[data-test="postalCode"]', '04567-000');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('cancelar no overview', async ({ page }) => {
    await addToCart(page, PRODUCTS.BACKPACK);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await fillCheckoutInfo(page, 'Maria', 'Santos', '04567-000');
    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/.*inventory/);
  });
});
