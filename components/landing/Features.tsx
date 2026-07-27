'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import Card3D from '@/components/ui/Card3D'
import { Globe, Github, Package, Download, Zap, Shield, Clock, Code } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'URL to APK',
    description: 'Convert any live website into an Android app instantly with our intelligent web scraper.',
    size: 'large',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Github,
    title: 'GitHub Integration',
    description: 'Build APKs directly from your GitHub repositories with automatic CI/CD.',
    size: 'small',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Package,
    title: 'ZIP Upload',
    description: 'Upload your web app as a ZIP file and we handle the rest.',
    size: 'small',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Download,
    title: 'Dual Format',
    description: 'Get both APK and AAB files ready for Play Store submission.',
    size: 'large',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Build your apps in under 2 minutes with our optimized build pipeline.',
    size: 'small',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with encrypted builds and secure storage.',
    size: 'small',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Monitor your build progress with live status updates and detailed logs.',
    size: 'small',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Code,
    title: 'Custom Permissions',
    description: 'Fine-tune Android permissions for your specific use case.',
    size: 'small',
    gradient: 'from-secondary/20 to-secondary/5',
  },
]

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="relative container mx-auto px-4">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Everything You Need</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make web-to-app conversion effortless
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = feature.size === 'large'
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1'
            const rowSpan = isLarge ? 'md:row-span-2' : 'md:row-span-1'

            return (
              <Reveal key={feature.title} direction="up" delay={0.1 + index * 0.1}>
                <Card3D className={`${colSpan} ${rowSpan}`} intensity={15}>
                  <motion.div
                    className={`glass-card p-6 h-full bg-gradient-to-br ${feature.gradient} transition-all duration-300 hover:border-primary/50`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </Card3D>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
