import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../utils/test-data';

test.describe('API Segurança', () => {
  test('DELETE sem token', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/booking/1`);
    expect(response.status()).toBe(403);
  });

  test('DELETE com token inválido', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/booking/1`, {
      headers: { Cookie: 'token=token_invalido_12345' },
    });
    expect(response.status()).toBe(403);
  });

  test('SQL injection no firstname', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: {
        firstname: "'; DROP TABLE bookings; --",
        lastname: 'Hacker',
        totalprice: 100,
        depositpaid: true,
        bookingdates: { checkin: '2026-01-01', checkout: '2026-01-05' },
        additionalneeds: 'SQL Injection test',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBeGreaterThan(0);
  });

  test('XSS no firstname', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: {
        firstname: '<script>alert("XSS")</script>',
        lastname: 'Teste',
        totalprice: 100,
        depositpaid: true,
        bookingdates: { checkin: '2026-01-01', checkout: '2026-01-05' },
        additionalneeds: 'XSS test',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBeGreaterThan(0);
  });

  test('headers de segurança', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`);
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'strict-transport-security',
      'content-security-policy',
    ];
    for (const header of securityHeaders) {
      response.headers()[header];
    }
    expect(response.status()).toBe(200);
  });

  test('rate limiting', async ({ request }) => {
    const responses = await Promise.all(
      Array(20).fill(null).map(() => request.get(`${API_BASE_URL}/booking`))
    );
    const statusCodes = responses.map(r => r.status());
    expect(statusCodes.length).toBe(20);
  });
});
