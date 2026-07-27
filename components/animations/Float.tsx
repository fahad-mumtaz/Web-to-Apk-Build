'use client'

import { motion } from 'framer-motion'

interface FloatProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

export default function Float({
  children,
  duration = 6,
  delay = 0,
  className = '',
}: FloatProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
