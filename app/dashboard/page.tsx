import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { requireAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { PlusCircle, Clock, CheckCircle, XCircle, TrendingUp, Settings, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await requireAuth()
  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  const { data: builds } = await supabase
    .from('builds')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: allBuilds } = await supabase
    .from('builds')
    .select('status')
    .eq('user_id', session.user.id)

  const stats = {
    total: allBuilds?.length || 0,
    success: allBuilds?.filter(b => b.status === 'success').length || 0,
    failed: allBuilds?.filter(b => b.status === 'failed').length || 0,
    building: allBuilds?.filter(b => b.status === 'building').length || 0,
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your Android app builds
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/settings">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Builds</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Successful</p>
              <p className="text-2xl font-bold text-green-500">{stats.success}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-500">{stats.failed}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Building</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.building}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard/new-build">
            <Button className="btn-primary">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New Build
            </Button>
          </Link>
          <Link href="/dashboard/history">
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              View All Builds
            </Button>
          </Link>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Builds</h2>
          <Link href="/dashboard/history">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {builds && builds.length > 0 ? (
          <div className="space-y-4">
            {builds.map((build) => (
              <div key={build.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {build.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {build.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                  {build.status === 'building' && <Clock className="w-4 h-4 text-yellow-500" />}
                  <div>
                    <p className="font-medium">{build.app_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {build.input_type === 'url' ? 'URL' : build.input_type === 'github' ? 'GitHub' : 'ZIP'} • 
                      {new Date(build.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/dashboard/builds/${build.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven't created any builds yet
            </p>
            <Link href="/dashboard/new-build">
              <Button className="btn-primary">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Your First Build
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
