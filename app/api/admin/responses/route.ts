import { NextResponse } from 'next/server'
import { getSession } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const session = await getSession()
  console.log('Session:', session)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    console.log('Querying Supabase...')
    const { data, error } = await supabase
      .from('quiz_responses')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('Supabase response:', { data, error })
    console.log('Number of records:', data?.length || 0)

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching responses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    )
  }
}