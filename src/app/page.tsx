'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Code, BookOpen, Zap, Shield, GitBranch, CheckCircle } from 'lucide-react'
import AnimatedBackground from '@/components/AnimatedBackground'
import Terminal, { TerminalLine, TerminalOutput, TypewriterText } from '@/components/Terminal'
import { H1, H2, H3, P, Lead, GradientText, StatNumber, StatLabel, FeatureText } from '@/components/Typography'
import { appConfig } from '@/config/env'

export default function Home() {
  const features = [
    {
      name: 'ERC-1155 Based Subscriptions',
      description: 'Each subscription is an NFT that can be transferred or traded, providing true ownership of subscription access.',
      icon: Zap,
    },
    {
      name: 'TypeScript First',
      description: 'Full type safety and IntelliSense support with comprehensive React components and hooks.',
      icon: Code,
    },
    {
      name: 'Automated Renewals',
      description: 'Reactive Network integration for automatic subscription management and cross-chain operations.',
      icon: GitBranch,
    },
    {
      name: 'Secure & Auditable',
      description: 'Built with security best practices and designed for easy auditing and compliance.',
      icon: Shield,
    },
    {
      name: 'Cross-Chain Support',
      description: 'Deploy on multiple networks with seamless cross-chain subscription management.',
      icon: Play,
    },
    {
      name: 'Developer Friendly',
      description: 'Comprehensive documentation, examples, and tooling for rapid development.',
      icon: BookOpen,
    },
  ]

  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground variant="subtle" />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/10 px-6 py-3 text-sm font-medium text-brand-blue backdrop-blur-sm">
              <Code className="mr-2 h-4 w-4" />
              <GradientText className="text-sm font-medium">
                {appConfig.app.name} v{appConfig.app.version}
              </GradientText>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <H1 className="mb-6">
              <GradientText>Web3 Subscription</GradientText>
              <br />
              <span className="text-foreground">Infrastructure</span>
            </H1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Lead className="mx-auto mb-10 max-w-3xl">
              The complete TypeScript SDK for Web3 subscription services. Built with Reactive Network 
              for automated cross-chain subscription management and NFT-based access control.
            </Lead>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/docs/demos"
              className="group inline-flex items-center justify-center rounded-xl bg-brand-gradient px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Live Demos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs"
              className="group inline-flex items-center justify-center rounded-xl border border-border bg-background/80 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-background hover:shadow-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Read Documentation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Terminal title="Quick Start Example" className="hover-lift">
              <TerminalLine prefix="$" delay={500}>
                <TypewriterText text="pnpm add @nft-sub/sdk" delay={500} />
              </TerminalLine>
              <TerminalOutput delay={2000}>
                Installing dependencies... ✓
              </TerminalOutput>
              <TerminalLine prefix="$" delay={3000}>
                <TypewriterText text="node subscribe.js" delay={3000} />
              </TerminalLine>
              <TerminalOutput delay={4500}>
                <div className="space-y-1">
                  <div>🔗 Connecting to Reactive Network...</div>
                  <div>✅ SDK initialized successfully</div>
                  <div>🎫 Creating subscription NFT...</div>
                  <div>💎 Subscription active! Token ID: 42</div>
                </div>
              </TerminalOutput>
            </Terminal>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <H2 className="mb-4">
              Everything you need to build <GradientText>subscription services</GradientText>
            </H2>
            <P className="max-w-2xl mx-auto">
              Powerful tools and abstractions for Web3 subscription management with automatic renewal capabilities.
            </P>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-brand-blue/30 hover:shadow-lg hover-lift">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <H3 className="mb-4">{feature.name}</H3>
                  <P className="text-sm">{feature.description}</P>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            <div className="text-center">
              <StatNumber className="gradient-text mb-2">100%</StatNumber>
              <H3 className="mb-2">Type Safe</H3>
              <StatLabel>Full TypeScript support with IntelliSense</StatLabel>
            </div>
            <div className="text-center">
              <StatNumber className="gradient-text mb-2">Multi</StatNumber>
              <H3 className="mb-2">Cross-Chain</H3>
              <StatLabel>Ethereum & Reactive Network compatible</StatLabel>
            </div>
            <div className="text-center">
              <StatNumber className="gradient-text mb-2">ERC-1155</StatNumber>
              <H3 className="mb-2">NFT Based</H3>
              <StatLabel>Tradeable subscription tokens</StatLabel>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <H2 className="mb-4">
              Why choose <GradientText>Reactive Subscriptions</GradientText>?
            </H2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              'Automated subscription renewals via Reactive Network',
              'NFT-based ownership with transfer capabilities',
              'Cross-chain compatibility and seamless bridging',
              'Built-in payment processing with multiple tokens',
              'Developer-friendly SDK with TypeScript support',
              'Comprehensive documentation and examples'
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureText icon={<CheckCircle className="h-5 w-5 text-brand-green" />}>
                  <P className="m-0">{benefit}</P>
                </FeatureText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="gradient-border rounded-3xl p-1"
          >
            <div className="rounded-3xl bg-background px-12 py-16">
              <H2 className="mb-4">
                Ready to build <GradientText>Web3 subscriptions</GradientText>?
              </H2>
              <Lead className="mx-auto mb-10 max-w-2xl">
                Get started with our comprehensive SDK and start accepting recurring payments today. 
                Join the future of subscription services powered by blockchain technology.
              </Lead>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/docs/demos"
                  className="group inline-flex items-center justify-center rounded-xl bg-brand-gradient px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Live Demos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/docs"
                  className="group inline-flex items-center justify-center rounded-xl border border-border bg-background/80 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-background hover:shadow-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read the Docs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
