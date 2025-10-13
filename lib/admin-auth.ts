import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const ADMIN_PASSWORD_HASH = Buffer.from(process.env.ADMIN_PASSWORD_HASH!, 'base64').toString('utf-8')
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
console.log('Loaded hash length:', ADMIN_PASSWORD_HASH?.length) // Should be 60
console.log('Hash starts with:', ADMIN_PASSWORD_HASH?.substring(0, 10))
export interface AdminSession {
  email: string
  isAdmin: boolean
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) return false
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export async function createSession(email: string): Promise<string> {
  const token = await new SignJWT({ email, isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  return token
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-session')?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    const payload = verified.payload as unknown as AdminSession
    return payload
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}