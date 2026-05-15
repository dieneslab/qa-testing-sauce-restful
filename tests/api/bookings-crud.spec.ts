import { test, expect } from '@playwright/test';
import { API_BASE_URL, BOOKING_TEMPLATE } from '../utils/test-data';

test.describe('API Bookings CRUD', () => {
  let token: string;
  let createdBookingId: number;

  test.beforeAll(async ({ request }) => {
    const authResponse = await request.post(`${API_BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    token = (await authResponse.json()).token;
  });

  test('GET /booking', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/booking`);
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });

  test('POST /booking', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe(BOOKING_TEMPLATE.VALID.firstname);
    expect(body.booking.lastname).toBe(BOOKING_TEMPLATE.VALID.lastname);
    expect(body.booking.totalprice).toBe(BOOKING_TEMPLATE.VALID.totalprice);
    expect(body.booking.depositpaid).toBe(BOOKING_TEMPLATE.VALID.depositpaid);
    createdBookingId = body.bookingid;
  });

  test('GET /booking/{id}', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.get(`${API_BASE_URL}/booking/${createdBookingId}`, {
      headers: { Accept: 'application/json' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe(BOOKING_TEMPLATE.VALID.firstname);
    expect(body.lastname).toBe(BOOKING_TEMPLATE.VALID.lastname);
  });

  test('PUT /booking/{id}', async ({ request }) => {
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
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Pedro');
    expect(body.lastname).toBe('Almeida');
    expect(body.totalprice).toBe(500);
    expect(body.depositpaid).toBe(false);
  });

  test('PATCH /booking/{id}', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.patch(`${API_BASE_URL}/booking/${createdBookingId}`, {
      data: { firstname: 'Ana', lastname: 'Costa' },
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Ana');
    expect(body.lastname).toBe('Costa');
    expect(body.totalprice).toBe(500);
  });

  test('DELETE /booking/{id}', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.delete(`${API_BASE_URL}/booking/${createdBookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(201);
  });

  test('GET /booking/{id} após delete', async ({ request }) => {
    expect(createdBookingId).toBeDefined();
    const response = await request.get(`${API_BASE_URL}/booking/${createdBookingId}`);
    expect(response.status()).toBe(404);
  });

  test('DELETE sem token', async ({ request }) => {
    const createRes = await request.post(`${API_BASE_URL}/booking`, {
      data: BOOKING_TEMPLATE.VALID,
      headers: { 'Content-Type': 'application/json' },
    });
    const tempId = (await createRes.json()).bookingid;
    const response = await request.delete(`${API_BASE_URL}/booking/${tempId}`);
    expect(response.status()).toBe(403);
  });
});
