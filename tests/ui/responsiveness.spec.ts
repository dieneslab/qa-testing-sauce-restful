import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { USERS } from '../utils/test-data';

const evidenciasDir = path.join(__dirname, '..', '..', 'evidencias');
if (!fs.existsSync(evidenciasDir)) {
  fs.mkdirSync(evidenciasDir, { recursive: true });
}

test.describe('📱 Responsividade - Sauce Demo (Nível 2)', () => {

  const viewports = [
    { name: 'Desktop Full HD', width: 1920, height: 1080 },
    { name: 'Desktop HD', width: 1366, height: 768 },
    { name: 'Tablet (iPad)', width: 768, height: 1024 },
    { name: 'Mobile (iPhone 12)', width: 390, height: 844 },
    { name: 'Mobile Pequeno (iPhone SE)', width: 375, height: 667 },
  ];

  for (const vp of viewports) {
    test(`Layout responsivo - ${vp.name} (${vp.width}x${vp.height})`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();

      // Login manual
      await page.goto('/');
      await page.fill('[data-test="username"]', USERS.STANDARD.username);
      await page.fill('[data-test="password"]', USERS.STANDARD.password);
      await page.click('[data-test="login-button"]');
      await expect(page.locator('.title')).toHaveText('Products', { timeout: 15000 });

      // Screenshot imediatamente após login, antes de verificações de elementos
      const screenshotPath = path.join(evidenciasDir, `responsividade-${vp.name.replace(/\s+/g, '-').toLowerCase()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // Verificações mais seguras (usando seletores exatos)
      await expect(page.locator('.app_logo')).toBeVisible();
      await expect(page.locator('.shopping_cart_link')).toBeVisible();
      await expect(page.locator('#react-burger-menu-btn')).toBeVisible();

      // Verifica o primeiro produto com seletores específicos para evitar ambiguidade
      const firstProduct = page.locator('.inventory_item').first();
      await expect(firstProduct).toBeVisible();
      await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible();
      await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();

      await context.close();
    });
  }

  test('Menu hamburguer funcional em resolução mobile', async ({ browser }) => {
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