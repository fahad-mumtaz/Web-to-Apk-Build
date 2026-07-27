'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  className?: string
}

export function UploadDropzone({ 
  onFileSelect, 
  accept = '.zip',
  maxSize = 50 * 1024 * 1024, // 50MB
  className 
}: UploadDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError('')
    setSelectedFile(file)
    onFileSelect(file)
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/zip': ['.zip'] },
    maxSize,
    multiple: false,
    onError: (error) => {
      setError(error.message)
    }
  })

  const removeFile = () => {
    setSelectedFile(null)
    setError('')
  }

  return (
    <div className={cn('w-full', className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-[#00f5ff]/50 hover:bg-[#00f5ff]/5',
            isDragActive && 'border-[#00f5ff] bg-[#00f5ff]/10'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? 'Drop your ZIP file here' : 'Upload ZIP file'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your ZIP file here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum file size: 50MB
          </p>
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </div>
      ) : (
        <div className="border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-[#00f5ff]" />
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
