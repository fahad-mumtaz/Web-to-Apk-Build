export interface PlanLimits {
  free: {
    maxBuildsPerDay: number
    features: string[]
  }
  pro: {
    maxBuildsPerDay: number
    features: string[]
  }
  business: {
    maxBuildsPerDay: number
    features: string[]
  }
}

export const PLAN_LIMITS: PlanLimits = {
  free: {
    maxBuildsPerDay: 5,
    features: ['URL to APK', 'Basic customization']
  },
  pro: {
    maxBuildsPerDay: 50,
    features: ['URL to APK', 'GitHub to APK', 'ZIP Upload', 'Advanced customization', 'Priority builds']
  },
  business: {
    maxBuildsPerDay: -1, // unlimited
    features: ['All features', 'Custom branding', 'API access', 'Dedicated support']
  }
}

export function canUserBuild(plan: string, buildsUsedToday: number): { canBuild: boolean; remaining: number } {
  const limits = PLAN_LIMITS[plan as keyof PlanLimits]
  
  if (!limits) {
    return { canBuild: false, remaining: 0 }
  }
  
  if (limits.maxBuildsPerDay === -1) {
    return { canBuild: true, remaining: -1 }
  }
  
  const remaining = Math.max(0, limits.maxBuildsPerDay - buildsUsedToday)
  return { canBuild: remaining > 0, remaining }
}

export function getPlanPrice(plan: string): { monthly: number; yearly: number } {
  const prices = {
    free: { monthly: 0, yearly: 0 },
    pro: { monthly: 29, yearly: 290 },
    business: { monthly: 99, yearly: 990 }
  }
  
  return prices[plan as keyof typeof prices] || { monthly: 0, yearly: 0 }
}
