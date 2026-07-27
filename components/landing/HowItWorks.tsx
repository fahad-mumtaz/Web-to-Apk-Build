'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import { Globe, Smartphone, Download, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Globe,
    title: 'Input Your Source',
    description: 'Paste your website URL, GitHub repository, or upload a ZIP file.',
    step: '01',
  },
  {
    icon: Smartphone,
    title: 'Configure Your App',
    description: 'Set app name, version, permissions, and customize settings.',
    step: '02',
  },
  {
    icon: Download,
    title: 'Build & Download',
    description: 'Our system builds your APK/AAB in under 2 minutes.',
    step: '03',
  },
  {
    icon: CheckCircle,
    title: 'Publish to Store',
    description: 'Upload your APK/AAB to Google Play Store and start distributing.',
    step: '04',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative container mx-auto px-4">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-alt">How It Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to convert your web app into Android
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary/20 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <Reveal key={step.step} direction="up" delay={0.1 + index * 0.15}>
                  <motion.div
                    className="relative"
                    whileHover={{ y: -10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30">
                      {step.step}
                    </div>

                    {/* Card */}
                    <div className="glass-card p-8 pt-12 h-full relative overflow-hidden group">
                      {/* Hover Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>

                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connector Dot */}
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-primary transform -translate-y-1/2 shadow-lg shadow-primary/50" />
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
