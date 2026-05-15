import { test, expect } from '@playwright/test';
import { USERS, SORT_OPTIONS } from '../utils/test-data';
import { login } from '../utils/helpers';

test.describe('Produtos', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  test('ordenar A-Z', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.AZ);
    const names = await page.locator('.inventory_item_name').allTextContents();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('ordenar Z-A', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.ZA);
    const names = await page.locator('.inventory_item_name').allTextContents();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('ordenar preço crescente', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.LO_HI);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const values = prices.map(p => parseFloat(p.replace('$', '')));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  test('ordenar preço decrescente', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.HI_LO);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const values = prices.map(p => parseFloat(p.replace('$', '')));
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });

  test('listagem com 6 produtos', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('detalhe do produto', async ({ page }) => {
    await page.click('.inventory_item_name:first-of-type');
    await expect(page).toHaveURL(/.*inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
  });
});
