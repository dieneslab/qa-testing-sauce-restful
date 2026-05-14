import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('🔒 API - Testes de Segurança (Nível 2)', () => {
  test('Acessar endpoint protegido sem token deve falhar', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/booking/1`);
    expect(response.status()).toBe(403);
    console.log('🔒 DELETE /booking/1 sem token: 403 Forbidden ✅');
  });

  test('Acessar endpoint protegido com token inválido', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/booking/1`, {
      headers: { 'Cookie': 'token=token_invalido_12345' },
    });
    expect(response.status()).toBe(403);
    console.log('🔒 DELETE com token inválido: 403 Forbidden ✅');
  });

  test('Injeção de SQL - tentativa simples', async ({ request }) => {
    const maliciousPayload = {
      firstname: "'; DROP TABLE bookings; --",
      lastname: 'Hacker',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-01-01', checkout: '2026-01-05' },
      additionalneeds: 'SQL Injection test',
    };
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: maliciousPayload,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`⚠️ SQL Injection test - Status: ${response.status()}`);
    if (response.status() === 200) {
      console.log('🐛 ALERTA: API aceitou payload com possível injeção SQL!');
    }
  });

  test('XSS - Cross-Site Scripting no campo firstname', async ({ request }) => {
    const xssPayload = {
      firstname: '<script>alert("XSS")</script>',
      lastname: 'Teste',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-01-01', checkout: '2026-01-05' },
      additionalneeds: 'XSS test',
    };
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: xssPayload,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`⚠️ XSS test - Status: ${response.status()}`);
    if (response.status() === 200) {
      const body = await response.json();
      console.log(`🐛 ALERTA: API aceitou e retornou script XSS no nome: "${body.booking.firstname}"`);
    }
  });

  test('Headers de segurança nas respostas', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`);
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'strict-transport-security',
      'content-security-policy',
    ];
    console.log('🔍 Headers de segurança presentes:');
    for (const header of securityHeaders) {
      const value = response.headers()[header];
      if (value) {
        console.log(`  ✅ ${header}: ${value}`);
      } else {
        console.log(`  ❌ ${header}: AUSENTE`);
      }
    }
  });

  test('Rate limiting - múltiplas requisições rápidas', async ({ request }) => {
    const requests = Array(20).fill(null).map(() => request.get(`${API_BASE_URL}/booking`));
    const responses = await Promise.all(requests);
    const statusCodes = responses.map(r => r.status());
    const hasRateLimit = statusCodes.some(code => code === 429);
    console.log(`🔄 Rate limit test - 20 requisições rápidas`);
    console.log(`   Status codes: ${[...new Set(statusCodes)].join(', ')}`);
    console.log(`   Rate limit ativo: ${hasRateLimit ? 'Sim (429)' : 'Não detectado'}`);
  });
});