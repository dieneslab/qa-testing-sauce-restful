import { test, expect } from '@playwright/test';
import { USERS, SORT_OPTIONS } from '../utils/test-data';
import { login } from '../utils/helpers';

test.describe('📦 Produtos - Ordenação e Filtragem', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  test('Ordenar por Nome (A → Z)', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.AZ);
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sorted);
  });

  test('Ordenar por Nome (Z → A)', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.ZA);
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sorted);
  });

  test('Ordenar por Preço (menor → maior)', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.LO_HI);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);
  });

  test('Ordenar por Preço (maior → menor)', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', SORT_OPTIONS.HI_LO);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sorted);
  });

  test('Verificar que 6 produtos são exibidos na listagem', async ({ page }) => {
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });

  test('Clicar em um produto abre a página de detalhes', async ({ page }) => {
    await page.click('.inventory_item_name:first-of-type');
    await expect(page).toHaveURL(/.*inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
  });
});