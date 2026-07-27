'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Download, 
  ArrowLeft,
  Terminal,
  Package,
  FileText
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabaseClient'
import { Build } from '@/lib/types'

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

export default function BuildDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [build, setBuild] = useState<Build | null>(null)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const buildId = params.id as string

  // Simulate build process
  useEffect(() => {
    if (!build || build.status !== 'queued') return

    const simulateBuild = async () => {
      // Start building after 5 seconds
      setTimeout(async () => {
        const { error } = await supabase
          .from('builds')
          .update({ 
            status: 'building',
            logs: 'Starting build process...\nInitializing Android project...\n'
          })
          .eq('id', buildId)

        if (error) {
          console.error('Error updating build status:', error)
          return
        }

        // Add logs progressively
        const logMessages = [
          'Downloading web assets...',
          'Converting HTML to Android WebView...',
          'Configuring Android manifest...',
          'Generating APK file...',
          'Optimizing app resources...',
          'Signing APK...',
          'Build completed successfully!'
        ]

        let currentLogs = ['Starting build process...\nInitializing Android project...\n']
        
        for (let i = 0; i < logMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 2000))
          currentLogs.push(logMessages[i])
          
          await supabase
            .from('builds')
            .update({ logs: currentLogs.join('\n') })
            .eq('id', buildId)
        }

        // Complete build after 20 seconds
        setTimeout(async () => {
          const { error: finalError } = await supabase
            .from('builds')
            .update({ 
              status: 'success',
              logs: currentLogs.join('\n'),
              apk_url: `https://example.com/downloads/${buildId}.apk`,
              aab_url: `https://example.com/downloads/${buildId}.aab`
            })
            .eq('id', buildId)

          if (finalError) {
            console.error('Error completing build:', finalError)
          }
        }, 2000)
      }, 5000)
    }

    simulateBuild()
  }, [build, buildId])

  // Fetch build data
  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const { data, error } = await supabase
          .from('builds')
          .select('*')
          .eq('id', buildId)
          .single()

        if (error) {
          throw error
        }

        setBuild(data)
        
        // Parse logs into array
        if (data.logs) {
          setLogs(data.logs.split('\n').filter((log: string) => log.trim()))
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
        router.push('/dashboard/history')
      } finally {
        setLoading(false)
      }
    }

    fetchBuild()

    // Set up real-time subscription
    const subscription = supabase
      .channel(`build:${buildId}`)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'builds', 
          filter: `id=eq.${buildId}` 
        },
        (payload) => {
          const updatedBuild = payload.new as Build
          setBuild(updatedBuild)
          
          if (updatedBuild.logs) {
            setLogs(updatedBuild.logs.split('\n').filter(log => log.trim()))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [buildId, router, toast])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#00f5ff]" />
      </div>
    )
  }

  if (!build) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Build not found</h1>
          <Button onClick={() => router.push('/dashboard/history')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </Button>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[build.status as keyof typeof statusConfig]
  const StatusIcon = statusInfo.icon

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/dashboard/history')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to History
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">{build.app_name}</h1>
        <div className="flex items-center gap-4">
          <Badge className={`${statusInfo.bgColor} ${statusInfo.color} border-none`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusInfo.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Created {new Date(build.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Build Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Build Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">App Name</p>
              <p className="font-medium">{build.app_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Package Name</p>
              <p className="font-medium font-mono text-sm">{build.package_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-medium">{build.version}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Input Type</p>
              <p className="font-medium capitalize">{build.input_type}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Input Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Input Value</p>
              <p className="font-medium text-sm break-all">{build.input_value}</p>
            </div>
            {build.zip_file_url && (
              <div>
                <p className="text-sm text-muted-foreground">ZIP File</p>
                <p className="font-medium text-sm">Uploaded</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Permissions</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(build.permissions).map(([key, value]) => (
                  value && (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}
                    </Badge>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      {build.status === 'building' && (
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Build Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Building your Android app...</span>
                <span className="text-sm text-muted-foreground">This may take a few minutes</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-[#00f5ff] h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Download Buttons */}
      {build.status === 'success' && (
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="neon-button flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download APK
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download AAB
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              APK is for direct installation, AAB is for Google Play Store submission.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Build Logs */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Build Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 border border-border/50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-muted-foreground">
                    [{new Date().toLocaleTimeString()}]
                  </span>{' '}
                  <span className="text-green-400">{log}</span>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">
                {build.status === 'queued' ? 'Waiting to start build...' : 'No logs available'}
              </div>
            )}
            {build.status === 'building' && (
              <div className="flex items-center mt-2">
                <Loader2 className="w-3 h-3 animate-spin mr-2" />
                <span className="text-muted-foreground">Building...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
