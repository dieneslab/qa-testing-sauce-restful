import { test, expect } from '@playwright/test';
import { USERS } from '../utils/test-data';
import { login, logout } from '../utils/helpers';

test.describe('🧭 Navegação do Site', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.STANDARD.username, USERS.STANDARD.password);
  });

  // Fecha o menu se estiver aberto, usando force e Escape como segurança
  async function closeMenuIfOpen(page: any) {
    const menu = page.locator('.bm-menu-wrap');
    if (await menu.isVisible().catch(() => false)) {
      // Tenta fechar via botão X com force
      await page.locator('#react-burger-cross-btn').click({ force: true, timeout: 5000 }).catch(() => {});
      // Se ainda visível, pressiona Escape
      if (await menu.isVisible().catch(() => false)) {
        await page.keyboard.press('Escape');
      }
    }
  }

  test('Navegar para todas as páginas pelo menu lateral', async ({ page }) => {
    await closeMenuIfOpen(page);

    // All Items: já estamos no inventário, o clique não deve quebrar
    await page.click('#react-burger-menu-btn');
    await page.click('#inventory_sidebar_link');
    await expect(page).toHaveURL(/.*inventory/);

    // Reset App State: apenas reseta, permanece na mesma página
    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');
    // O reset remove itens do carrinho, então o badge some (se existia)
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('Logo clicável retorna à página de produtos', async ({ page }) => {
    // Navega para o carrinho
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart/);

    // Fecha menu se estiver atrapalhando
    await closeMenuIfOpen(page);

    // Clica no logo com força e aguarda navegação
    await page.locator('.app_logo').click({ force: true, timeout: 10000 });
    // Aguarda até que a URL mude para inventory (com timeout maior)
    await page.waitForURL(/.*inventory/, { timeout: 15000 });
  });

  test('Ícone do carrinho navega para a página do carrinho', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart/);
  });

  test('Menu lateral fecha ao clicar no X', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();

    // Clica no X com force
    await page.locator('#react-burger-cross-btn').click({ force: true });
    await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();
  });

  test('Logout encerra sessão e impede acesso direto às páginas internas', async ({ page }) => {
    await logout(page);
    await page.goto('/inventory.html');
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/inventory');
  });
});