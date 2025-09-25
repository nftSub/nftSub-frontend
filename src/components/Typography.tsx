import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

// Heading 1 - Large page titles
export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "font-mono text-4xl md:text-6xl font-bold leading-tight tracking-tight",
      className
    )}>
      {children}
    </h1>
  )
}

// Heading 2 - Section titles
export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "font-mono text-3xl md:text-4xl font-bold leading-tight",
      className
    )}>
      {children}
    </h2>
  )
}

// Heading 3 - Subsection titles
export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      "font-mono text-xl md:text-2xl font-bold leading-tight",
      className
    )}>
      {children}
    </h3>
  )
}

// Heading 4 - Card titles
export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn(
      "font-mono text-lg md:text-xl font-semibold leading-tight",
      className
    )}>
      {children}
    </h4>
  )
}

// Body text - Regular paragraphs
export function P({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-base md:text-lg leading-relaxed text-muted-foreground",
      className
    )}>
      {children}
    </p>
  )
}

// Large text - Lead paragraphs
export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-lg md:text-xl leading-relaxed text-muted-foreground",
      className
    )}>
      {children}
    </p>
  )
}

// Small text - Captions, footnotes
export function Small({ children, className }: TypographyProps) {
  return (
    <small className={cn(
      "text-sm text-muted-foreground",
      className
    )}>
      {children}
    </small>
  )
}

// Code text - Inline code
export function Code({ children, className }: TypographyProps) {
  return (
    <code className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className
    )}>
      {children}
    </code>
  )
}

// Gradient text - For emphasis
export function GradientText({ children, className }: TypographyProps) {
  return (
    <span className={cn(
      "gradient-text font-mono font-bold",
      className
    )}>
      {children}
    </span>
  )
}

// Muted text
export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-sm text-muted-foreground",
      className
    )}>
      {children}
    </p>
  )
}

// List components
export function List({ children, className }: TypographyProps) {
  return (
    <ul className={cn(
      "my-6 ml-6 list-disc [&>li]:mt-2",
      className
    )}>
      {children}
    </ul>
  )
}

// Blockquote
export function Blockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn(
      "mt-6 border-l-2 pl-6 italic border-brand-blue/30",
      className
    )}>
      {children}
    </blockquote>
  )
}

// Feature text with icon
interface FeatureTextProps extends TypographyProps {
  icon?: React.ReactNode
}

export function FeatureText({ children, icon, className }: FeatureTextProps) {
  return (
    <div className={cn(
      "flex items-start gap-3",
      className
    )}>
      {icon && (
        <div className="flex-shrink-0 w-6 h-6 mt-0.5 text-brand-blue">
          {icon}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

// Stat number - Large numbers for metrics
export function StatNumber({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "font-mono text-3xl md:text-4xl font-bold text-foreground",
      className
    )}>
      {children}
    </div>
  )
}

// Stat label - Labels for metrics
export function StatLabel({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "text-sm font-medium text-muted-foreground uppercase tracking-wide",
      className
    )}>
      {children}
    </div>
  )
}