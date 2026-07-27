'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Eye,
  Filter,
  Globe,
  Github,
  Package,
  Calendar
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabaseClient'
import { Build } from '@/lib/types'
import Link from 'next/link'

type FilterStatus = 'all' | 'success' | 'failed' | 'building'

const statusConfig = {
  queued: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    label: 'Queued'
  },
  building: {
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    label: 'Building'
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Success'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    label: 'Failed'
  }
}

const inputTypeConfig = {
  url: {
    icon: Globe,
    label: 'URL'
  },
  github: {
    icon: Github,
    label: 'GitHub'
  },
  zip: {
    icon: Package,
    label: 'ZIP'
  }
}

export default function BuildHistoryPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const { toast } = useToast()

  const fetchBuilds = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('builds')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      setBuilds(data || [])
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuilds()
  }, [filter])

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return config.icon
  }

  const getStatusColor = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return config.color
  }

  const getStatusBgColor = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return config.bgColor
  }

  const getStatusLabel = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return config.label
  }

  const getInputTypeIcon = (inputType: string) => {
    const config = inputTypeConfig[inputType as keyof typeof inputTypeConfig]
    return config.icon
  }

  const getInputTypeLabel = (inputType: string) => {
    const config = inputTypeConfig[inputType as keyof typeof inputTypeConfig]
    return config.label
  }

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Builds' },
    { value: 'success', label: 'Success' },
    { value: 'failed', label: 'Failed' },
    { value: 'building', label: 'Building' },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Build History</h1>
        <p className="text-muted-foreground">
          View and manage all your Android app builds
        </p>
      </div>

      {/* Filters */}
      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Builds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? 'default' : 'outline'}
                onClick={() => setFilter(option.value)}
                className={filter === option.value ? 'btn-primary' : ''}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Builds List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : builds.length > 0 ? (
        <div className="space-y-4">
          {builds.map((build) => {
            const StatusIcon = getStatusIcon(build.status)
            const InputTypeIcon = getInputTypeIcon(build.input_type)

            return (
              <Card key={build.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Status Badge */}
                      <Badge className={`${getStatusBgColor(build.status)} ${getStatusColor(build.status)} border-none`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {getStatusLabel(build.status)}
                      </Badge>

                      {/* Build Info */}
                      <div>
                        <h3 className="font-semibold text-lg">{build.app_name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <InputTypeIcon className="w-4 h-4" />
                            <span>{getInputTypeLabel(build.input_type)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(build.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Link href={`/dashboard/builds/${build.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Package Name</p>
                        <p className="font-mono">{build.package_name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Version</p>
                        <p className="font-medium">{build.version}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Input</p>
                        <p className="font-medium truncate">{build.input_value}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No builds found</h3>
              <p className="text-muted-foreground mb-6">
                {filter === 'all' 
                  ? "You haven't created any builds yet. Start by creating your first Android app!"
                  : `No ${filter} builds found. Try changing the filter or create a new build.`
                }
              </p>
              <Link href="/dashboard/new-build">
                <Button className="btn-primary">
                  Create Your First Build
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {builds.length > 0 && (
        <Card className="glass-card mt-6">
          <CardHeader>
            <CardTitle>Build Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{builds.length}</p>
                <p className="text-sm text-muted-foreground">Total Builds</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">
                  {builds.filter(b => b.status === 'success').length}
                </p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {builds.filter(b => b.status === 'failed').length}
                </p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">
                  {builds.filter(b => b.status === 'building').length}
                </p>
                <p className="text-sm text-muted-foreground">Building</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
