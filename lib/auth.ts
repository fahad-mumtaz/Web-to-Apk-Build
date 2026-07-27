import { createServerSupabaseClient } from './supabaseServer'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = createServerSupabaseClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  
  return session
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  return session
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user || null
}
