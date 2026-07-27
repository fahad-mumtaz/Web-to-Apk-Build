'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'

const companies = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'InnovateLab', logo: 'IL' },
  { name: 'DigitalFirst', logo: 'DF' },
  { name: 'WebToApp', logo: 'WA' },
  { name: 'MobilePro', logo: 'MP' },
  { name: 'AppBuilder', logo: 'AB' },
  { name: 'CloudSync', logo: 'CS' },
  { name: 'DataFlow', logo: 'DF' },
]

export default function SocialProof() {
  return (
    <section className="py-16 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative container mx-auto px-4">
        <Reveal direction="up" delay={0.1}>
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by innovative companies worldwide
          </p>
        </Reveal>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 glass-card rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-primary/50"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors">
                  {company.logo}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Reveal direction="up" delay={0.3}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Apps Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text-alt mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text-alt mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
