import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('✅ API - Validação de Campos Obrigatórios', () => {
  test('POST /booking - Ausência de firstname deve retornar erro 500', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.MISSING_FIRSTNAME,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(500);
    console.log('⚠️ API retorna 500 quando firstname está ausente (comportamento esperado documentado)');
  });

  test('POST /booking - Ausência de lastname deve retornar erro 500', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.MISSING_LASTNAME,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(500);
  });

  test('POST /booking - Valores inválidos para campos numéricos', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.NEGATIVE_PRICE,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`💰 Status para preço negativo: ${response.status()}`);
    if (response.status() === 200) {
      console.log('🐛 BUG: API aceitou reserva com preço negativo!');
    }
  });

  test('POST /booking - Datas inconsistentes (checkout antes do checkin)', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.INVALID_DATES,
      headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.json();
    console.log(`📅 Status para datas inválidas: ${response.status()}`);
    if (response.status() === 200) {
      console.log('🐛 BUG: API aceitou reserva com checkout anterior ao checkin!');
    }
  });

  test('GET /booking - Filtrar por nome existente', async ({ request }) => {
    await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await request.get(`${API_BASE_URL}/booking`, {
      params: { firstname: 'João', lastname: 'Silva' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    console.log(`🔍 Resultados da busca por nome: ${body.length} reserva(s)`);
  });

  test('GET /booking - Filtrar por data de checkin', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`, {
      params: { checkin: '2026-01-15' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(`📅 Reservas com checkin em 2026-01-15: ${body.length}`);
  });
});