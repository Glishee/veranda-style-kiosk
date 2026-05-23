/**
 * @jest-environment node
 */

// Mock PrismaClient and Resend so the module loads without a DB connection
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      lead: { create: jest.fn().mockResolvedValue({ id: 'test-id' }) },
    })),
  }
})

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: { send: jest.fn().mockResolvedValue({}) },
    })),
  }
})

import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const VALID_BODY = {
  productSlug: 'canopy', structureSlug: 'wall-mounted', roofSlug: 'polycarbonate',
  selectedOptions: [], widthMm: 4000, depthMm: 3000, heightMm: 2700, estimatedEur: 4800,
  name: 'Jan Kowalski', phone: '+48 794 398 888', city: 'Warsaw', postcode: '00-001', lang: 'en',
}

describe('POST /api/leads validation', () => {
  it('returns 400 when name is missing', async () => {
    const { name: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/name/i)
  })

  it('returns 400 when phone is missing', async () => {
    const { phone: _, ...body } = VALID_BODY
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  it('returns 400 when widthMm is zero', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, widthMm: 0 }))
    expect(res.status).toBe(400)
  })
})
