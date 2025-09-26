'use client';

import { motion } from 'framer-motion';
import { CreditCard, Settings, CheckCircle, ArrowRight } from 'lucide-react';
import { H1, H2, P, Lead, GradientText } from '@/components/Typography';
import { SubscriptionDemo } from '@/components/demos/subscription-demo';
import { useState } from 'react';

const demos = [
  {
    id: 'subscription',
    name: 'Live Subscription Demo',
    description: 'Try the complete subscription flow with testnet tokens',
    icon: CreditCard,
    color: 'brand-blue'
  },
  {
    id: 'payment',
    name: 'Payment Processing',
    description: 'See how multi-token payments work in real-time',
    icon: CheckCircle,
    color: 'brand-green'
  },
  {
    id: 'management',
    name: 'Subscription Management',
    description: 'Explore merchant dashboard and analytics',
    icon: Settings,
    color: 'brand-purple'
  }
];

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState('subscription');

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>Interactive</GradientText> Demos
        </H1>
        <Lead className="max-w-3xl">
          Experience the power of NFT subscriptions with our live testnet demos.
          Connect your wallet to try real transactions on Sepolia.
        </Lead>
      </motion.div>

      {/* Demo Selector */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`group relative rounded-2xl border transition-all text-left p-6 ${
              activeDemo === demo.id
                ? 'border-brand-blue bg-card shadow-lg'
                : 'border-border bg-card/50 hover:border-brand-blue/30 hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
              activeDemo === demo.id ? 'bg-brand-gradient' : 'bg-card border border-border'
            }`}>
              <demo.icon className={`w-6 h-6 ${
                activeDemo === demo.id ? 'text-white' : 'text-muted-foreground'
              }`} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{demo.name}</h3>
            <p className="text-sm text-muted-foreground">{demo.description}</p>
            {activeDemo === demo.id && (
              <div className="absolute top-6 right-6">
                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              </div>
            )}
          </button>
        ))}
      </motion.section>

      {/* Active Demo */}
      <motion.section
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {activeDemo === 'subscription' && (
          <>
            <div className="mb-8">
              <H2 className="mb-4">Subscription Demo</H2>
              <P className="text-muted-foreground max-w-3xl">
                This demo shows the complete subscription flow including wallet connection,
                subscription creation, status checking, and NFT management. All transactions
                happen on the Sepolia testnet.
              </P>
            </div>
            <SubscriptionDemo merchantId={BigInt(1)} />
          </>
        )}

        {activeDemo === 'payment' && (
          <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
            <div className="w-20 h-20 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <H2 className="mb-4">Payment Processing Demo</H2>
            <P className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The payment processing demo showcases multi-token support, price conversion,
              and automated renewal mechanisms. Coming soon!
            </P>
            <button className="inline-flex items-center px-6 py-3 rounded-xl bg-card border border-border hover:border-brand-green/30 transition-colors">
              <span className="text-muted-foreground">Demo coming soon</span>
              <ArrowRight className="ml-2 w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}

        {activeDemo === 'management' && (
          <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
            <div className="w-20 h-20 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <H2 className="mb-4">Management Dashboard Demo</H2>
            <P className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore the merchant dashboard with analytics, subscriber management,
              and revenue tracking features. Coming soon!
            </P>
            <button className="inline-flex items-center px-6 py-3 rounded-xl bg-card border border-border hover:border-brand-purple/30 transition-colors">
              <span className="text-muted-foreground">Demo coming soon</span>
              <ArrowRight className="ml-2 w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </motion.section>

      {/* Instructions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <H2 className="mb-6">How to Use the Demos</H2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Prerequisites</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0" />
                <P className="text-sm m-0">MetaMask or any Web3 wallet installed</P>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0" />
                <P className="text-sm m-0">Sepolia testnet ETH (get from faucet)</P>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0" />
                <P className="text-sm m-0">Switch wallet network to Sepolia</P>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Getting Testnet Tokens</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-sm font-mono text-brand-green mr-3">1.</span>
                <P className="text-sm m-0">
                  Visit <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Sepolia Faucet</a>
                </P>
              </li>
              <li className="flex items-start">
                <span className="text-sm font-mono text-brand-green mr-3">2.</span>
                <P className="text-sm m-0">Enter your wallet address</P>
              </li>
              <li className="flex items-start">
                <span className="text-sm font-mono text-brand-green mr-3">3.</span>
                <P className="text-sm m-0">Receive 0.5 Sepolia ETH daily</P>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
          <P className="text-sm m-0">
            <strong>Note:</strong> All demos use testnet tokens. No real funds are required or at risk.
            Smart contracts are deployed on Sepolia at address{' '}
            <code className="font-mono text-xs bg-card px-2 py-1 rounded">0xYourContractAddress</code>
          </P>
        </div>
      </motion.section>
    </div>
  );
}