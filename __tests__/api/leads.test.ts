/**
 * @jest-environment node
 */

import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    lead: { create: jest.fn().mockResolvedValue({ id: 'lead-1' }) },
    product: { findUnique: jest.fn() },
  },
}))

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'email-1' }, error: null }),
    },
  })),
}))

const VALID_BODY = {
  categorySlug: 'zadaszenia',
  productSlug: 'vs-cube',
  name: 'Jan Kowalski',
  phone: '+48500000000',
  city: 'Warszawa',
  postcode: '00-001',
  lang: 'pl',
}

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/leads', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/leads', () => {
  beforeEach(() => jest.clearAllMocks())

  test('201 with valid body', async () => {
    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(201)
  })

  test('201 with optional comment', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, comment: '5m × 4m' }))
    expect(res.status).toBe(201)
  })

  test('400 when name is missing', async () => {
    const { name: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  test('400 when phone is missing', async () => {
    const { phone: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  test('400 when city is missing', async () => {
    const { city: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  test('400 when productSlug is missing', async () => {
    const { productSlug: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })
})
