import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('API Validação de campos', () => {
  test('POST /booking sem firstname', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.MISSING_FIRSTNAME,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(500);
  });

  test('POST /booking sem lastname', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.MISSING_LASTNAME,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(500);
  });

  test('POST /booking com preço negativo', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.NEGATIVE_PRICE,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBeGreaterThan(0);
  });

  test('POST /booking com datas invertidas', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.INVALID_DATES,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBeGreaterThan(0);
  });

  test('GET /booking filtro por nome', async ({ request }) => {
    await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await request.get(`${API_BASE_URL}/booking`, {
      params: { firstname: 'João', lastname: 'Silva' },
    });
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });

  test('GET /booking filtro por checkin', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`, {
      params: { checkin: '2026-01-15' },
    });
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });
});
