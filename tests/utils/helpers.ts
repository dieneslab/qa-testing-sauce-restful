import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string, expectSuccess = true): Promise<void> {
  await page.goto('/');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  if (expectSuccess) {
    await expect(page).toHaveURL(/.*inventory/);
  }
}

export async function logout(page: Page): Promise<void> {
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL(/.*/);
}

export async function addToCart(page: Page, productName: string): Promise<void> {
  const productCard = page.locator('.inventory_item', { hasText: productName });
  await productCard.locator('button:has-text("Add to cart")').click();
}

export async function removeFromCart(page: Page, productName: string): Promise<void> {
  const cartItem = page.locator('.cart_item', { hasText: productName });
  await cartItem.locator('button:has-text("Remove")').click();
}

export async function getCartCount(page: Page): Promise<number> {
  const badge = page.locator('.shopping_cart_badge');
  if ((await badge.count()) === 0) return 0;
  return parseInt(await badge.textContent() || '0', 10);
}

export async function fillCheckoutInfo(page: Page, firstName: string, lastName: string, zipCode: string): Promise<void> {
  await page.fill('[data-test="firstName"]', firstName);
  await page.fill('[data-test="lastName"]', lastName);
  await page.fill('[data-test="postalCode"]', zipCode);
  await page.click('[data-test="continue"]');
}
