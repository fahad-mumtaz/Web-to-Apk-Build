import { requireAuth } from '@/lib/auth'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()
  const supabase = createServerSupabaseClient()

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar userPlan={profile?.plan || 'free'} />
        <div className="flex-1 flex flex-col">
          <Navbar 
            user={{
              email: session.user.email,
              full_name: profile?.full_name,
              avatar_url: profile?.avatar_url
            }}
            userPlan={profile?.plan || 'free'}
          />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
