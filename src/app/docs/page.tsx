'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, Zap, Settings, BarChart3, Play, ArrowRight, Shield, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { H1, H2, P, Lead, GradientText } from '@/components/Typography';

const sections = [
  {
    title: 'Quick Start',
    description: 'Get up and running with the Subscription NFT SDK in minutes',
    icon: Zap,
    href: '/docs/quickstart',
    items: [
      'Installation & Setup',
      'Basic Configuration',
      'First Subscription',
      'Testing Your Integration'
    ]
  },
  {
    title: 'Live Demos',
    description: 'Interactive examples showcasing real-world usage',
    icon: Play,
    href: '/docs/demos',
    items: [
      'Subscription Demo',
      'Payment Processing',
      'Access Control',
      'Cross-Chain Features'
    ]
  },
  {
    title: 'Components',
    description: 'Pre-built React components for rapid development',
    icon: Code,
    href: '/docs/components',
    items: [
      'SubscriptionWidget',
      'PaymentForm',
      'AccessGate',
      'StatusIndicator'
    ]
  },
  {
    title: 'API Reference',
    description: 'Complete SDK documentation and type definitions',
    icon: Settings,
    href: '/docs/api',
    items: [
      'SubscriptionSDK',
      'Payment Methods',
      'Event Handlers',
      'Type Definitions'
    ]
  }
];

const features = [
  {
    title: 'ERC-1155 NFT Subscriptions',
    description: 'Each subscription is a tradeable NFT with built-in access control and transfer capabilities.',
    icon: Shield
  },
  {
    title: 'Reactive Network Integration',
    description: 'Automated renewals and cross-chain subscription management powered by Reactive Network.',
    icon: GitBranch
  },
  {
    title: 'Multiple Payment Options',
    description: 'Support for ETH, USDC, and other ERC-20 tokens with configurable pricing.',
    icon: BookOpen
  }
];

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <H1 className="mb-6">
          <GradientText>Subscription NFT</GradientText>
          <br />
          <span className="text-foreground">Documentation</span>
        </H1>
        <Lead className="mx-auto max-w-3xl mb-8">
          Complete guide to building Web3 subscription services with NFT-based access control, 
          automated renewals, and cross-chain compatibility.
        </Lead>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs/demos"
            className="group inline-flex items-center justify-center rounded-xl bg-brand-gradient px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Play className="mr-2 h-5 w-5" />
            Try Live Demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#getting-started"
            className="group inline-flex items-center justify-center rounded-xl border border-border bg-background/80 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-background hover:shadow-lg"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Read Documentation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

      {/* Features Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group"
          >
            <div className="h-full rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-brand-blue/30 hover:shadow-lg hover-lift">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 font-mono text-lg font-bold text-foreground">{feature.title}</h3>
              <P className="text-sm m-0">{feature.description}</P>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Documentation Sections */}
      <motion.section
        id="getting-started"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <H2 className="mb-8 text-center">
          Explore the <GradientText>Documentation</GradientText>
        </H2>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={section.href} className="group block">
                <div className="h-full rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-brand-blue/30 hover:shadow-lg hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mb-3 font-mono text-xl font-bold text-foreground">{section.title}</h3>
                  <P className="text-sm mb-4 m-0">{section.description}</P>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center text-sm text-muted-foreground">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Start Code Example */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <H2 className="mb-6 text-center">
          Get Started in <GradientText>Minutes</GradientText>
        </H2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <span className="font-mono text-sm text-muted-foreground">Installation</span>
            <Code className="h-4 w-4 text-muted-foreground" />
          </div>
          <pre className="text-sm text-foreground font-mono overflow-x-auto">
            <code>{`pnpm add @nft-sub/sdk

import { SubscriptionSDK } from '@nft-sub/sdk';

const sdk = new SubscriptionSDK({
  chain: 'sepolia',
  walletClient: walletClient
});

// Subscribe to a service
const txHash = await sdk.subscribe(merchantId, 'ETH');`}</code>
          </pre>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/docs/demos"
            className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
          >
            Try the interactive demo
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
