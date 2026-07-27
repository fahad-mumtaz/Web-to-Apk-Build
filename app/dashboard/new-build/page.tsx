'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UploadDropzone } from '@/components/UploadDropzone'
import { Globe, Github, Package, Upload, ArrowRight } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { createBuild } from '@/lib/actions/builds'
import { BuildFormData } from '@/lib/types'
import { requireAuth } from '@/lib/auth'

export default async function NewBuildPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('url')
  
  // Get user session
  const session = await requireAuth()
  
  // Form state
  const [formData, setFormData] = useState<BuildFormData>({
    appName: '',
    packageName: '',
    version: '1.0.0',
    permissions: {
      camera: false,
      storage: false,
      location: false,
      microphone: false,
    }
  })

  // Input-specific state
  const [url, setUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [zipFile, setZipFile] = useState<File | null>(null)

  const generatePackageName = (appName: string) => {
    return appName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/^[0-9]/, '') // Don't start with number
      || 'myapp' + Math.random().toString(36).substr(2, 9)
  }

  const handleAppNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      appName: value,
      packageName: prev.packageName || generatePackageName(value)
    }))
  }

  const uploadZipFile = async (file: File) => {
    const { supabase } = await import('@/lib/supabaseClient')
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file)

    if (uploadError) {
      toast({
        title: 'Upload failed',
        description: uploadError.message,
        variant: 'destructive',
      })
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async () => {
    try {
      const buildData = {
        input_type: activeTab as 'url' | 'github' | 'zip',
        input_value: activeTab === 'url' ? url : githubUrl,
        zip_file_url: zipFile ? await uploadZipFile(zipFile) || undefined : undefined,
        app_name: formData.appName,
        package_name: formData.packageName,
        version: formData.version,
        icon_url: undefined,
        splash_url: undefined,
        permissions: formData.permissions,
      }

      const build = await createBuild(session.user.id, buildData)
      
      toast({
        title: 'Build created!',
        description: 'Your build has been queued and will start processing soon.',
      })

      router.push(`/dashboard/builds/${build.id}`)
    } catch (error: any) {
      toast({
        title: 'Error creating build',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Build</h1>
        <p className="text-muted-foreground">
          Convert your web app into an Android APK/AAB file
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            URL Input
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub Repo
          </TabsTrigger>
          <TabsTrigger value="zip" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            ZIP Upload
          </TabsTrigger>
        </TabsList>

        {/* URL Input Tab */}
        <TabsContent value="url" className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Website URL</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the URL of the website you want to convert to an Android app.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* GitHub Repo Tab */}
        <TabsContent value="github" className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">GitHub Repository</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="github">GitHub Repository URL</Label>
                <Input
                  id="github"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the URL of your public GitHub repository.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ZIP Upload Tab */}
        <TabsContent value="zip" className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Upload ZIP File</h2>
            <UploadDropzone
              onFileSelect={setZipFile}
              accept=".zip"
              maxSize={50 * 1024 * 1024}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Upload your web application as a ZIP file. The ZIP should contain your HTML, CSS, and JavaScript files.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* App Configuration */}
      <div className="glass-card p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6">App Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="appName">App Name *</Label>
            <Input
              id="appName"
              placeholder="My Awesome App"
              value={formData.appName}
              onChange={(e) => handleAppNameChange(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              The name that will appear on the Android device.
            </p>
          </div>

          <div>
            <Label htmlFor="packageName">Package Name *</Label>
            <Input
              id="packageName"
              placeholder="com.example.myapp"
              value={formData.packageName}
              onChange={(e) => setFormData(prev => ({ ...prev, packageName: e.target.value }))}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Unique identifier for your app (e.g., com.company.appname).
            </p>
          </div>

          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              placeholder="1.0.0"
              value={formData.version}
              onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Version number for your app (semantic versioning).
            </p>
          </div>
        </div>

        {/* Permissions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">App Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div>
                <p className="font-medium">Camera</p>
                <p className="text-sm text-muted-foreground">Access device camera</p>
              </div>
              <Switch
                checked={formData.permissions.camera}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    permissions: { ...prev.permissions, camera: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div>
                <p className="font-medium">Storage</p>
                <p className="text-sm text-muted-foreground">Read/write device storage</p>
              </div>
              <Switch
                checked={formData.permissions.storage}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    permissions: { ...prev.permissions, storage: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Access device location</p>
              </div>
              <Switch
                checked={formData.permissions.location}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    permissions: { ...prev.permissions, location: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div>
                <p className="font-medium">Microphone</p>
                <p className="text-sm text-muted-foreground">Record audio</p>
              </div>
              <Switch
                checked={formData.permissions.microphone}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({
                    ...prev,
                    permissions: { ...prev.permissions, microphone: checked }
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary px-8"
          >
            {loading ? 'Creating Build...' : 'Build APK'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
