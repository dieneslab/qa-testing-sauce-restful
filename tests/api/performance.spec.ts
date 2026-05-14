import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('⚡ API - Testes de Performance (Nível 2)', () => {
  const PERFORMANCE_THRESHOLD_MS = 2000;

  test('GET /booking - Tempo de resposta deve ser aceitável', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}/booking`);
    const elapsed = Date.now() - start;
    expect(response.status()).toBe(200);
    console.log(`⏱️ GET /booking: ${elapsed}ms`);
    expect(elapsed).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
  });

  test('POST /booking - Tempo de criação de reserva', async ({ request }) => {
    const start = Date.now();
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    const elapsed = Date.now() - start;
    expect(response.status()).toBe(200);
    console.log(`⏱️ POST /booking: ${elapsed}ms`);
    expect(elapsed).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
  });

  test('POST /auth - Tempo de autenticação', async ({ request }) => {
    const start = Date.now();
    const response = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    const elapsed = Date.now() - start;
    expect(response.status()).toBe(200);
    console.log(`⏱️ POST /auth: ${elapsed}ms`);
    expect(elapsed).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
  });

  test('Teste de carga leve - 10 requisições GET consecutivas', async ({ request }) => {
    const iterations = 10;
    const times: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      const response = await request.get(`${API_BASE_URL}/booking`);
      times.push(Date.now() - start);
      expect(response.status()).toBe(200);
    }
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const max = Math.max(...times);
    const min = Math.min(...times);
    console.log(`📊 Carga leve (${iterations} reqs):`);
    console.log(`   Média: ${avg.toFixed(2)}ms | Min: ${min}ms | Max: ${max}ms`);
    expect(avg).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
  });
});