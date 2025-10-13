import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin-auth'
import { LoginForm } from './components/login-form'

export default async function AdminPage() {
  const session = await getSession()

  if (session) {
    redirect('/admin/dashboard')
  }

  return <LoginForm />
}