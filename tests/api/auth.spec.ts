import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../utils/test-data';

test.describe('🔑 API - Autenticação (Restful Booker)', () => {
  const credentials = { username: 'admin', password: 'password123' };

  test('POST /auth - Criar token de autenticação com sucesso', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, { data: credentials });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
    console.log(`✅ Token gerado: ${body.token.substring(0, 20)}...`);
  });

  test('POST /auth - Credenciais inválidas devem retornar 200 com motivo', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'wrong' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });

  test('POST /auth - Campos vazios devem ser tratados', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: '', password: '' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason');
    console.log(`ℹ️ Resposta para credenciais vazias: ${JSON.stringify(body)}`);
  });
});