import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from Supabase CLI)
export interface User {
  id: string
  email: string
  role: 'student' | 'mentor' | 'recruiter' | 'placement_cell' | 'admin'
  full_name?: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  student_id: string
  opportunity_id: string
  status: 'pending' | 'approved' | 'rejected' | 'interview' | 'hired'
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  title: string
  company: string
  description: string
  type: 'internship' | 'job' | 'training'
  location: string
  requirements: string[]
  salary_range?: string
  application_deadline: string
  created_by: string
  created_at: string
  updated_at: string
}