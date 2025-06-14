import { getUser } from '@/lib/auth'
import { SignJWT } from 'jose'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock next/headers cookies
const mockCookies = vi.fn()
vi.mock('next/headers', () => ({
  cookies: mockCookies,
}))

const secret = 'test-secret'
process.env.JWT_SECRET = secret

async function createToken(payload: object) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(secret))
}

describe('getUser', () => {
  beforeEach(() => {
    mockCookies.mockReset()
  })

  it('returns user for valid token', async () => {
    const token = await createToken({ userId: 1, email: 'test@example.com' })
    mockCookies.mockResolvedValue({
      get: (name: string) =>
        name === 'token' ? { value: token } : undefined,
    })
    const user = await getUser()
    expect(user).toEqual({ userId: 1, email: 'test@example.com' })
  })

  it('returns null for invalid token', async () => {
    mockCookies.mockResolvedValue({
      get: () => ({ value: 'invalid-token' }),
    })
    const user = await getUser()
    expect(user).toBeNull()
  })
})
