'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabase } from '@/lib/supabaseClient'
import { User, Settings, LogOut, Crown } from 'lucide-react'

interface NavbarProps {
  user?: {
    email?: string
    full_name?: string
    avatar_url?: string
  }
  userPlan?: string
}

export function Navbar({ user, userPlan = 'free' }: NavbarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return 'U'
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro':
        return 'text-[#00f5ff]'
      case 'business':
        return 'text-[#00ff88]'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6">
      <div className="flex-1" />
      
      <div className="flex items-center space-x-4">
        {/* Plan Badge */}
        <div className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full border ${getPlanColor(userPlan)}`}>
          {userPlan === 'business' && <Crown className="w-4 h-4" />}
          <span className="text-sm font-medium capitalize">
            {userPlan === 'free' ? 'Free' : userPlan}
          </span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url} alt={user?.full_name || user?.email} />
                <AvatarFallback>
                  {getInitials(user?.full_name, user?.email)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
