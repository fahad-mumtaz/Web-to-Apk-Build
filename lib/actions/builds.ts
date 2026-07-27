'use server'

import { createServerSupabaseClient } from '../supabaseServer'
import { canUserBuild } from '../planLimits'
import { CreateBuildData } from '../types'

export async function checkPlanLimits(userId: string) {
  const supabase = createServerSupabaseClient()
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, builds_used_today, last_build_date')
    .eq('id', userId)
    .single()

  if (!profile) {
    throw new Error('User profile not found')
  }

  // Check if we need to reset daily count
  const today = new Date().toISOString().split('T')[0]
  if (profile.last_build_date !== today) {
    // Reset daily count
    await supabase
      .from('profiles')
      .update({ 
        builds_used_today: 0, 
        last_build_date: today 
      })
      .eq('id', userId)
    
    profile.builds_used_today = 0
  }

  // Check plan limits
  const { canBuild, remaining } = canUserBuild(profile.plan, profile.builds_used_today)
  
  return {
    canBuild,
    remaining,
    plan: profile.plan,
    buildsUsedToday: profile.builds_used_today
  }
}

export async function createBuild(userId: string, buildData: CreateBuildData) {
  const supabase = createServerSupabaseClient()
  
  // Check plan limits first
  const limits = await checkPlanLimits(userId)
  
  if (!limits.canBuild) {
    throw new Error(`Build limit exceeded. You have ${limits.remaining} builds remaining today. Upgrade your plan to continue building.`)
  }

  // Create the build
  const { data, error } = await supabase
    .from('builds')
    .insert({
      user_id: userId,
      input_type: buildData.input_type,
      input_value: buildData.input_value,
      zip_file_url: buildData.zip_file_url,
      app_name: buildData.app_name,
      package_name: buildData.package_name,
      version: buildData.version || '1.0.0',
      icon_url: buildData.icon_url,
      splash_url: buildData.splash_url,
      permissions: buildData.permissions || {},
      status: 'queued',
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create build: ${error.message}`)
  }

  // Increment build count
  await supabase
    .rpc('increment_build_count', { 
      user_uuid: userId 
    })

  return data
}

export async function getUserBuilds(userId: string, limit = 50) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('builds')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch builds: ${error.message}`)
  }

  return data || []
}

export async function getBuildById(buildId: string, userId: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('builds')
    .select('*')
    .eq('id', buildId)
    .eq('user_id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch build: ${error.message}`)
  }

  return data
}
