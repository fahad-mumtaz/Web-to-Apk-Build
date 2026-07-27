'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'
import Float from '@/components/animations/Float'
import Reveal from '@/components/animations/Reveal'
import { ArrowRight, Smartphone, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:pr-12">
            <Reveal direction="up" delay={0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Now with AI-powered optimization
                </span>
              </motion.div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Transform Any Web App</span>
                <br />
                <span className="gradient-text-alt">Into Android APK</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Convert your web applications into native Android apps in minutes. 
                No coding required. Just paste your URL and build.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <MagneticButton variant="primary" className="text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </MagneticButton>
                </Link>
                <Link href="/pricing">
                  <MagneticButton variant="secondary" className="text-lg">
                    View Pricing
                  </MagneticButton>
                </Link>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>5 free builds/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>Instant setup</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Content - 40% - 3D Device Mockup */}
          <div className="relative lg:pl-12">
            <Float duration={8} delay={0.5}>
              <Reveal direction="left" delay={0.6}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  {/* Phone Frame */}
                  <div className="relative mx-auto w-64 h-[500px] glass-card rounded-[3rem] p-3">
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2.5rem] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
                      
                      {/* Screen Content */}
                      <div className="pt-12 px-4 space-y-4">
                        <div className="w-full h-32 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl animate-pulse" />
                        <div className="w-3/4 h-4 bg-white/10 rounded" />
                        <div className="w-1/2 h-4 bg-white/10 rounded" />
                        <div className="w-full h-24 bg-white/5 rounded-xl" />
                        <div className="w-full h-24 bg-white/5 rounded-xl" />
                      </div>

                      {/* Bottom Bar */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                    </div>

                    {/* Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] pointer-events-none" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Smartphone className="w-8 h-8 text-primary" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-8 w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  >
                    <Zap className="w-8 h-8 text-secondary" />
                  </motion.div>
                </motion.div>
              </Reveal>
            </Float>
          </div>
        </div>
      </div>
    </section>
  )
}
