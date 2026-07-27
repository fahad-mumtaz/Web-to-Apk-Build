export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  plan: 'free' | 'pro' | 'business'
  builds_used_today: number
  last_build_date?: string
  created_at: string
  updated_at: string
}

export interface Build {
  id: string
  user_id: string
  input_type: 'url' | 'github' | 'zip'
  input_value: string
  zip_file_url?: string
  app_name: string
  package_name: string
  version: string
  icon_url?: string
  splash_url?: string
  permissions: Record<string, boolean>
  status: 'queued' | 'building' | 'success' | 'failed'
  logs: string
  apk_url?: string
  aab_url?: string
  created_at: string
  updated_at: string
}

export interface CreateBuildData {
  input_type: 'url' | 'github' | 'zip'
  input_value: string
  zip_file_url?: string
  app_name: string
  package_name: string
  version?: string
  icon_url?: string
  splash_url?: string
  permissions?: Record<string, boolean>
}

export interface BuildFormData {
  appName: string
  packageName: string
  version: string
  permissions: {
    camera: boolean
    storage: boolean
    location: boolean
    microphone: boolean
  }
}
