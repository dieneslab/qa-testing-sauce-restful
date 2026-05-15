import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { USERS } from '../utils/test-data';

const evidenciasDir = path.join(__dirname, '..', '..', 'evidencias');
if (!fs.existsSync(evidenciasDir)) {
  fs.mkdirSync(evidenciasDir, { recursive: true });
}

test.describe('Responsividade', () => {
  const viewports = [
    { name: 'desktop-fhd', width: 1920, height: 1080 },
    { name: 'desktop-hd', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'mobile-se', width: 375, height: 667 },
  ];

  for (const vp of viewports) {
    test(`${vp.name} (${vp.width}x${vp.height})`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();

      await page.goto('/');
      await page.fill('[data-test="username"]', USERS.STANDARD.username);
      await page.fill('[data-test="password"]', USERS.STANDARD.password);
      await page.click('[data-test="login-button"]');
      await expect(page.locator('.title')).toHaveText('Products', { timeout: 15000 });

      await page.screenshot({
        path: path.join(evidenciasDir, `responsividade-${vp.name}.png`),
        fullPage: false,
      });

      await expect(page.locator('.app_logo')).toBeVisible();
      await expect(page.locator('.shopping_cart_link')).toBeVisible();
      await expect(page.locator('#react-burger-menu-btn')).toBeVisible();

      const firstProduct = page.locator('.inventory_item').first();
      await expect(firstProduct).toBeVisible();
      await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible();
      await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();

      await context.close();
    });
  }

  test('menu hamburguer no mobile', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();

    await page.goto('/');
    await page.fill('[data-test="username"]', USERS.STANDARD.username);
    await page.fill('[data-test="password"]', USERS.STANDARD.password);
    await page.click('[data-test="login-button"]');
    await expect(page.locator('.title')).toHaveText('Products', { timeout: 15000 });

    await page.click('#react-burger-menu-btn');
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();

    await page.click('#react-burger-cross-btn');
    await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();

    await context.close();
  });
});
