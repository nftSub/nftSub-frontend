'use client'

import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  className?: string
  variant?: 'subtle' | 'prominent'
}

export default function AnimatedBackground({ 
  className = '', 
  variant = 'subtle' 
}: AnimatedBackgroundProps) {
  const opacity = variant === 'subtle' ? 0.05 : 0.1

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-brand-blue/10 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      />
      
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 bg-brand-green/10 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
        style={{ opacity }}
      />
      
      <motion.div
        className="absolute -bottom-32 left-20 w-96 h-96 bg-brand-purple/10 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -10,
        }}
        style={{ opacity }}
      />
      
      <motion.div
        className="absolute bottom-10 -right-10 w-64 h-64 bg-brand-blue/10 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -15,
        }}
        style={{ opacity }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-purple/5" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgb(var(--brand-blue)) 2px, transparent 0),
            radial-gradient(circle at 75px 75px, rgb(var(--brand-green)) 2px, transparent 0)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}