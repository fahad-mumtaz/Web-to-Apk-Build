'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Reveal from '@/components/animations/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <Reveal direction="up" delay={0.1}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Start building for free today
            </span>
          </motion.div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Ready to Build Your First</span>
            <br />
            <span className="gradient-text-alt">Android App?</span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using Vibe2APK to convert their web apps to Android. No credit card required.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <MagneticButton variant="primary" className="text-lg px-12">
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </MagneticButton>
            </Link>
            <Link href="/pricing">
              <MagneticButton variant="secondary" className="text-lg px-12">
                View Pricing
              </MagneticButton>
            </Link>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Instant results</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
