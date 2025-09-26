'use client';

import { motion } from 'framer-motion';
import { Play, Layers, Cpu, Zap, Shield, RefreshCw, Database, Link } from 'lucide-react';
import { H1, H2, H3, P, Lead, GradientText } from '@/components/Typography';

const architectureLayers = [
  {
    icon: Database,
    title: 'L1 Smart Contracts',
    subtitle: 'Ethereum Sepolia',
    description: 'Core subscription logic and NFT management deployed on Ethereum Layer 1',
    components: [
      'SubscriptionManager - Handles payments and merchant registration',
      'SubscriptionNFT - ERC-1155 tokens representing active subscriptions',
      'Payment Token contracts - Support for multiple ERC-20 tokens'
    ]
  },
  {
    icon: Cpu,
    title: 'Reactive Network',
    subtitle: 'Cross-chain Automation',
    description: 'Event-driven reactive smart contracts that monitor and respond to blockchain events',
    components: [
      'Event listeners for payment transactions',
      'Automated subscription renewal processing',
      'Cross-chain message passing',
      'CRON jobs for expiry checking'
    ]
  },
  {
    icon: Link,
    title: 'Event Subscriptions',
    subtitle: 'Real-time Processing',
    description: 'Subscribe to specific contract events and automatically trigger actions',
    components: [
      'Payment event monitoring',
      'NFT minting triggers',
      'Expiry notifications',
      'Grace period management'
    ]
  },
  {
    icon: Shield,
    title: 'SDK & Frontend',
    subtitle: 'Developer Tools',
    description: 'React components and hooks for seamless integration',
    components: [
      'Pre-built UI components',
      'React hooks for subscription management',
      'Wallet integration',
      'Real-time status updates'
    ]
  }
];

const workflowSteps = [
  {
    step: 1,
    title: 'Merchant Registration',
    description: 'Merchants register on-chain with subscription parameters like price, duration, and grace period'
  },
  {
    step: 2,
    title: 'User Subscription',
    description: 'Users subscribe by approving payment tokens and calling the subscribe function'
  },
  {
    step: 3,
    title: 'NFT Minting',
    description: 'An ERC-1155 NFT is minted to represent the active subscription with expiry metadata'
  },
  {
    step: 4,
    title: 'Reactive Monitoring',
    description: 'Reactive Network monitors payment events and automatically processes renewals'
  },
  {
    step: 5,
    title: 'Expiry Management',
    description: 'CRON jobs check for expired subscriptions and handle grace periods'
  },
  {
    step: 6,
    title: 'Access Control',
    description: 'Merchants verify subscription status via NFT ownership for gated content'
  }
];

export default function HowItWorksPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          How <GradientText>It Works</GradientText>
        </H1>
        <Lead className="max-w-3xl">
          A revolutionary subscription system powered by NFTs and cross-chain automation.
          Learn how we combine smart contracts, reactive programming, and blockchain technology
          to create seamless recurring payments.
        </Lead>
      </motion.div>

      {/* Video Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 overflow-hidden"
      >
        <div className="aspect-video bg-accent relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <P className="text-lg font-semibold">Architecture Overview Video</P>
              <P className="text-sm text-muted-foreground">Coming Soon - 5 minute walkthrough</P>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Architecture Layers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <H2 className="mb-8">System Architecture</H2>
        
        <div className="space-y-6">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="rounded-xl border border-border bg-card/50 p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <layer.icon className="w-7 h-7 text-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="mb-3">
                    <H3 className="text-xl m-0">{layer.title}</H3>
                    <P className="text-sm text-brand-green m-0 mt-1">{layer.subtitle}</P>
                  </div>
                  
                  <P className="text-muted-foreground mb-4">{layer.description}</P>
                  
                  <div className="space-y-2">
                    {layer.components.map((component, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <P className="text-sm text-muted-foreground m-0">{component}</P>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Workflow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <H2 className="mb-8">Subscription Workflow</H2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="relative"
            >
              {/* Connection line */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent z-0" />
              )}
              
              <div className="relative rounded-xl border border-border bg-card/50 p-6 hover:border-accent transition-colors z-10">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-foreground">{step.step}</span>
                </div>
                
                <H3 className="text-lg mb-2">{step.title}</H3>
                <P className="text-sm text-muted-foreground m-0">{step.description}</P>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="rounded-2xl border border-border bg-card/50 p-8"
      >
        <H2 className="mb-6">Key Features</H2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">Automated Renewals</P>
                <P className="text-sm text-muted-foreground m-0">
                  No manual intervention needed - payments are processed automatically based on subscription terms
                </P>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-brand-purple mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">Decentralized & Trustless</P>
                <P className="text-sm text-muted-foreground m-0">
                  All logic runs on-chain with no centralized servers or third-party dependencies
                </P>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RefreshCw className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">Grace Period Management</P>
                <P className="text-sm text-muted-foreground m-0">
                  Configurable grace periods ensure users don&apos;t lose access due to temporary payment issues
                </P>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Layers className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">Multi-Token Support</P>
                <P className="text-sm text-muted-foreground m-0">
                  Accept payments in ETH, USDC, DAI, or any ERC-20 token of your choice
                </P>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Link className="w-5 h-5 text-brand-purple mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">Cross-Chain Ready</P>
                <P className="text-sm text-muted-foreground m-0">
                  Reactive Network enables cross-chain subscription management and payments
                </P>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Database className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">NFT-Based Access</P>
                <P className="text-sm text-muted-foreground m-0">
                  Subscription status is represented by NFTs, enabling easy integration with existing systems
                </P>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technical Details */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <H2 className="mb-6">Technical Implementation</H2>
        
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-card/80 px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">subscription-flow.js</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="font-mono">{`// 1. Merchant sets up subscription plan
const tx = await subscriptionManager.registerMerchant(
  merchantWallet,        // Wallet to receive payments
  30 * 24 * 60 * 60,    // Duration: 30 days in seconds (2592000)
  3 * 24 * 60 * 60,     // Grace period: 3 days in seconds (259200)
  { gasLimit: 200000 }
);

// 2. Set accepted payment tokens and prices
await subscriptionManager.setPaymentToken(
  USDC_ADDRESS,
  ethers.parseUnits("10", 6)  // $10 USDC
);

// 3. User subscribes
const approveTx = await usdcToken.approve(
  SUBSCRIPTION_MANAGER,
  ethers.parseUnits("10", 6)
);
await approveTx.wait();

const subscribeTx = await subscriptionManager.subscribe(
  merchantId,
  USDC_ADDRESS
);

// 4. Reactive Network monitors events
// Automatically processes renewals when subscription expires

// 5. Check subscription status
const isActive = await subscriptionNFT.isSubscriptionActive(
  userAddress,
  merchantId
);`}</code>
          </pre>
        </div>
        
        <div className="mt-6 p-4 rounded-lg border border-border bg-card">
          <P className="text-sm m-0">
            <strong>Learn More:</strong> Check out our{' '}
            <a href="/docs/contracts" className="text-foreground underline hover:text-muted-foreground transition-colors">Smart Contracts</a>{' '}
            documentation for detailed contract interfaces and deployment addresses.
          </P>
        </div>
      </motion.section>
    </div>
  );
}