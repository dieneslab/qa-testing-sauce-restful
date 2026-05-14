import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('📋 API - CRUD de Reservas (Restful Booker)', () => {
  let token: string;
  let createdBookingId: number;

  test.beforeAll(async ({ request }) => {
    const authResponse = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    const authBody = await authResponse.json();
    token = authBody.token;
    console.log('🔑 Token obtido para testes CRUD');
  });

  test('GET /booking - Listar todas as reservas', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    console.log(`📊 Total de reservas existentes: ${body.length}`);
  });

  test('POST /booking - Criar nova reserva', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    expect(body.booking.firstname).toBe(BOOKING_TEMPLATE.VALID.firstname);
    expect(body.booking.lastname).toBe(BOOKING_TEMPLATE.VALID.lastname);
    expect(body.booking.totalprice).toBe(BOOKING_TEMPLATE.VALID.totalprice);
    expect(body.booking.depositpaid).toBe(BOOKING_TEMPLATE.VALID.depositpaid);
    createdBookingId = body.bookingid;
    console.log(`🆕 Reserva criada com ID: ${createdBookingId}`);
  });

  test('GET /booking/{id} - Buscar reserva criada', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.get(`${API_BASE_URL}/booking/${createdBookingId}`, {
      headers: { 'Accept': 'application/json' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe(BOOKING_TEMPLATE.VALID.firstname);
    expect(body.lastname).toBe(BOOKING_TEMPLATE.VALID.lastname);
  });

  test('PUT /booking/{id} - Atualizar reserva completa', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const updatedData = {
      firstname: 'Pedro',
      lastname: 'Almeida',
      totalprice: 500,
      depositpaid: false,
      bookingdates: { checkin: '2026-02-01', checkout: '2026-02-10' },
      additionalneeds: 'Jantar incluso',
    };
    const response = await request.put(`${API_BASE_URL}/booking/${createdBookingId}`, {
      data: updatedData,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Pedro');
    expect(body.lastname).toBe('Almeida');
    expect(body.totalprice).toBe(500);
    expect(body.depositpaid).toBe(false);
    console.log(`✏️ Reserva ${createdBookingId} atualizada: ${body.firstname} ${body.lastname}`);
  });

  test('PATCH /booking/{id} - Atualizar parcialmente', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const partialUpdate = { firstname: 'Ana', lastname: 'Costa' };
    const response = await request.patch(`${API_BASE_URL}/booking/${createdBookingId}`, {
      data: partialUpdate,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Ana');
    expect(body.lastname).toBe('Costa');
    expect(body.totalprice).toBe(500);
  });

  test('DELETE /booking/{id} - Excluir reserva', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.delete(`${API_BASE_URL}/booking/${createdBookingId}`, {
      headers: { 'Cookie': `token=${token}` },
    });
    expect(response.status()).toBe(201);
    console.log(`🗑️ Reserva ${createdBookingId} excluída`);
  });

  test('GET /booking/{id} - Buscar reserva excluída deve retornar 404', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.get(`${API_BASE_URL}/booking/${createdBookingId}`);
    expect(response.status()).toBe(404);
  });

  test('DELETE sem token deve retornar 403 Forbidden', async ({ request }) => {
    const createRes = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    const tempId = (await createRes.json()).bookingid;
    const response = await request.delete(`${API_BASE_URL}/booking/${tempId}`);
    expect(response.status()).toBe(403);
    console.log('🔒 DELETE sem token retornou 403 conforme esperado');
  });
});