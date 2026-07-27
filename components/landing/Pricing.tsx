'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Reveal from '@/components/animations/Reveal'
import Card3D from '@/components/ui/Card3D'
import MagneticButton from '@/components/ui/MagneticButton'
import { Check, Zap, Shield, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for testing and personal projects',
    features: [
      '5 builds per day',
      'URL to APK conversion',
      'Basic customization',
      'Standard build speed',
      'Email support',
      'Community access',
    ],
    popular: false,
    gradient: 'from-gray-800/50 to-gray-900/50',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious developers and small teams',
    features: [
      '50 builds per day',
      'All input methods',
      'Advanced customization',
      'Priority build speed',
      'Priority email support',
      'API access',
      'Custom branding',
      'Build analytics',
    ],
    popular: true,
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For enterprises and high-volume users',
    features: [
      'Unlimited builds',
      'All Pro features',
      'Dedicated support',
      'White-label solution',
      'Custom integrations',
      'SLA guarantee',
      'Team collaboration',
      'Advanced analytics',
      'Priority queue',
    ],
    popular: false,
    gradient: 'from-gray-800/50 to-gray-900/50',
  },
]

export default function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="relative container mx-auto px-4">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Simple, Transparent Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} direction="up" delay={0.1 + index * 0.15}>
              <div className="relative">
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold shadow-lg shadow-primary/30"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <Card3D className={plan.popular ? 'scale-105' : ''} intensity={plan.popular ? 25 : 15}>
                  <motion.div
                    className={`glass-card p-8 h-full bg-gradient-to-br ${plan.gradient} transition-all duration-300 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/20' : ''}`}
                    whileHover={{ y: -10 }}
                  >
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.popular && <Crown className="w-5 h-5 text-primary" />}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3"
                          whileHover={{ x: 5 }}
                        >
                          <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Link href="/login" className="block">
                      <MagneticButton
                        variant={plan.popular ? 'primary' : 'secondary'}
                        className="w-full"
                      >
                        {plan.popular ? 'Start Pro Trial' : 'Get Started'}
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </Card3D>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom enterprise solution?{' '}
              <a href="/contact" className="text-primary hover:underline">
                Contact our sales team
              </a>
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Instant activation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
