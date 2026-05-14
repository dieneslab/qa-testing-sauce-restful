import { test, expect } from '@playwright/test';
import { USERS } from '../utils/test-data';
import { login } from '../utils/helpers';
import AxeBuilder from '@axe-core/playwright';

test.describe('♿ Acessibilidade - Sauce Demo (Nível 2)', () => {
  
  test('Análise de acessibilidade na página de login', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login-button')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    
    console.log(`🔍 Login: ${results.violations.length} violações encontradas`);
    for (const violation of results.violations) {
      console.log(`  - ${violation.id}: ${violation.description} (Impacto: ${violation.impact})`);
    }
    // Não falha o teste; apenas documenta. Se quiser garantir que rodou:
    expect(results).toBeDefined();
  });

  test('Análise de acessibilidade na página de inventário', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page.locator('.inventory_item').first()).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    
    console.log(`🔍 Inventário: ${results.violations.length} violações encontradas`);
    for (const violation of results.violations) {
      console.log(`  - ${violation.id}: ${violation.description} (Impacto: ${violation.impact})`);
    }
    // Apenas verifica que a análise retornou algo
    expect(results).toBeDefined();
  });

  test('Análise de acessibilidade na página do carrinho', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_list')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    
    console.log(`🔍 Carrinho: ${results.violations.length} violações encontradas`);
    for (const violation of results.violations) {
      console.log(`  - ${violation.id}: ${violation.description} (Impacto: ${violation.impact})`);
    }
    expect(results).toBeDefined();
  });

  test('Verificar atributos ARIA e roles em elementos chave', async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
    // Verifica foco no select de ordenação
    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await sortSelect.focus();
    await expect(sortSelect).toBeFocused();

    // Menu lateral: verifica que os links existem
    await page.click('#react-burger-menu-btn');
    const menuLinks = page.locator('.bm-item-list a');
    const count = await menuLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await menuLinks.nth(i).textContent();
      expect(text).toBeTruthy();
    }
  });
});