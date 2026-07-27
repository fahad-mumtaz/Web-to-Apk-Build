'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut,
  Zap,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'New Build', href: '/dashboard/new-build', icon: PlusCircle },
  { name: 'Build History', href: '/dashboard/history', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  userPlan?: string
}

export function Sidebar({ userPlan = 'free' }: SidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="w-64 h-full glass-card border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f5ff] to-[#00ccff] bg-clip-text text-transparent">
          Vibe2APK
        </h1>
        <div className="flex items-center mt-2 text-sm">
          {userPlan === 'free' && (
            <div className="flex items-center text-muted-foreground">
              <Zap className="w-4 h-4 mr-1" />
              Free Plan
            </div>
          )}
          {userPlan === 'pro' && (
            <div className="flex items-center text-[#00f5ff]">
              <Zap className="w-4 h-4 mr-1" />
              Pro Plan
            </div>
          )}
          {userPlan === 'business' && (
            <div className="flex items-center text-[#00ff88]">
              <Crown className="w-4 h-4 mr-1" />
              Business Plan
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30'
                      : 'text-muted-foreground hover:text-[#00f5ff] hover:bg-[#00f5ff]/5'
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border/50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-[#00f5ff] hover:bg-[#00f5ff]/5"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
