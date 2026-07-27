import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Github, Package, Download, Zap, Shield, Smartphone } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
        }} />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span style={{ background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(6, 182, 212))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Transform Any Web App
                </span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, rgb(6, 182, 212), rgb(16, 185, 129))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Into Android APK
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-xl" style={{ color: '#94a3b8' }}>
                Convert your web applications into native Android apps in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button style={{
                    background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(124, 58, 237))',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                  }} className="text-lg text-white">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button style={{
                    background: 'linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
                  }} className="text-lg text-white">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:pl-12" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="relative mx-auto w-64 h-[500px] rounded-[3rem] p-3" style={{
                background: 'rgba(15, 15, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
              }}>
                <div className="w-full h-full rounded-[2.5rem]" style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))'
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span style={{ background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(6, 182, 212))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Everything You Need
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'URL to APK', desc: 'Convert any live website' },
              { icon: Github, title: 'GitHub Integration', desc: 'Build from repositories' },
              { icon: Package, title: 'ZIP Upload', desc: 'Upload source code' },
              { icon: Download, title: 'Dual Format', desc: 'APK and AAB files' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Build in under 2 minutes' },
              { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security' },
              { icon: Smartphone, title: 'Custom Permissions', desc: 'Fine-tune permissions' },
              { icon: Smartphone, title: 'Real-time Tracking', desc: 'Live build updates' },
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="p-6 rounded-xl" style={{
                  background: 'rgba(15, 15, 20, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                    background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(6, 182, 212))'
                  }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
