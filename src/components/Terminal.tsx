'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export default function Terminal({ 
  children, 
  title = 'Terminal', 
  className = '' 
}: TerminalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      className={`terminal-window ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot" />
          <div className="terminal-dot" />
          <div className="terminal-dot" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-sm text-muted-foreground">{title}</span>
        </div>
        <div className="w-12" />
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm bg-card min-h-32">
        {children}
      </div>
    </motion.div>
  )
}

interface TerminalLineProps {
  children: React.ReactNode
  prefix?: string
  delay?: number
  className?: string
}

export function TerminalLine({ 
  children, 
  prefix = '$', 
  delay = 0, 
  className = '' 
}: TerminalLineProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      className={`flex items-start gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-brand-green font-bold">{prefix}</span>
      <span className="text-foreground flex-1">{children}</span>
    </motion.div>
  )
}

interface TerminalOutputProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function TerminalOutput({ 
  children, 
  delay = 0, 
  className = '' 
}: TerminalOutputProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      className={`text-muted-foreground ml-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '' 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const typeTimer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, speed)
        
        return () => clearTimeout(typeTimer)
      }
    }, delay)
    
    return () => clearTimeout(startTimer)
  }, [text, currentIndex, delay, speed])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-2 h-5 bg-brand-green ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  )
}