import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../utils/test-data';

test.describe('API Auth', () => {
  const credentials = { username: 'admin', password: 'password123' };

  test('POST /auth - credenciais válidas', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, { data: credentials });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /auth - senha incorreta', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'wrong' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('POST /auth - campos vazios', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: '', password: '' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason');
  });
});
