import { NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // DEBUG LOGS
    console.log('Login attempt:')
    console.log('- Email from form:', email)
    console.log('- Email from env:', process.env.ADMIN_EMAIL)
    console.log('- Emails match:', email === process.env.ADMIN_EMAIL)
    console.log('- Password length:', password?.length)
    console.log('- Hash exists:', !!process.env.ADMIN_PASSWORD_HASH)

    const isValid = await verifyCredentials(email, password)
    console.log('- Verification result:', isValid)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = await createSession(email)
    const cookieStore = await cookies()
    
    cookieStore.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}