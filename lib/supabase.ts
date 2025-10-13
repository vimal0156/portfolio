import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for quiz response
export interface QuizResponse {
  background_level: string
  main_goal: string
  topics_interest: string[]
  math_confidence: number
  coding_confidence: number
  time_investment: string
  learning_preference: string
  payment_willingness: string
  start_timeline: string
  additional_info: string
  name: string
  email: string
  assigned_persona?: string 
  user_agent?: string
  referrer?: string
}