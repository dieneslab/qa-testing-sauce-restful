import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('API Performance', () => {
  const thresholdMs = 2000;

  test('GET /booking', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}/booking`);
    expect(response.status()).toBe(200);
    expect(Date.now() - start).toBeLessThan(thresholdMs);
  });

  test('POST /booking', async ({ request }) => {
    const start = Date.now();
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(200);
    expect(Date.now() - start).toBeLessThan(thresholdMs);
  });

  test('POST /auth', async ({ request }) => {
    const start = Date.now();
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    expect(response.status()).toBe(200);
    expect(Date.now() - start).toBeLessThan(thresholdMs);
  });

  test('10 GETs consecutivos', async ({ request }) => {
    const times: number[] = [];
    for (let i = 0; i < 10; i++) {
      const start = Date.now();
      const response = await request.get(`${API_BASE_URL}/booking`);
      times.push(Date.now() - start);
      expect(response.status()).toBe(200);
    }
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    expect(avg).toBeLessThan(thresholdMs);
  });
});
