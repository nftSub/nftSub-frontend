'use client';

import { motion } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  Link, 
  Shield, 
  Zap, 
  RefreshCw, 
  Layers,
  ArrowRight,
  ArrowDown,
  Users,
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code,
  Coins,
  FileCheck,
  Network
} from 'lucide-react';
import { H1, H2, H3, P, Lead, GradientText } from '@/components/Typography';

export default function HowItWorksPage() {
  return (
    <div className="space-y-16">
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
          See how smart contracts, reactive programming, and blockchain technology work together.
        </Lead>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        <H2 className="mb-8">System Architecture</H2>
        
        {/* Main Architecture Diagram */}
        <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card via-card/95 to-accent/10 p-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
          
          <div className="relative space-y-8">
            {/* Layer 1: User & Merchant Layer */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-blue/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold">Users</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4" />
                    <span>Connect wallet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4" />
                    <span>Approve tokens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Subscribe to services</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-purple/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-purple" />
                  </div>
                  <h3 className="font-semibold">Merchants</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="w-4 h-4" />
                    <span>Register on-chain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4" />
                    <span>Set pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Configure duration</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
            </div>

            {/* Layer 2: Smart Contracts (Multi-Chain) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-4 -right-4 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <div className="relative bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 rounded-xl border border-brand-primary/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Smart Contracts Layer</h3>
                      <p className="text-xs text-muted-foreground">Deployed on Base, BSC, Avalanche, Sonic</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-brand-green/10 text-brand-green text-xs rounded-full">Active</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2 text-brand-primary">SubscriptionManager</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Payment processing</li>
                      <li>• Merchant registry</li>
                      <li>• Token management</li>
                    </ul>
                  </div>
                  <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2 text-brand-secondary">SubscriptionNFT</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• ERC-1155 NFTs</li>
                      <li>• Access control</li>
                      <li>• Expiry tracking</li>
                    </ul>
                  </div>
                  <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2 text-brand-accent">Payment Tokens</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Multi-token support</li>
                      <li>• ERC-20 compatible</li>
                      <li>• Price feeds</li>
                    </ul>
                  </div>
                </div>

                {/* Chain Icons */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Base</div>
                  <div className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">BSC</div>
                  <div className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Avalanche</div>
                  <div className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Sonic</div>
                </div>
              </div>
            </motion.div>

            {/* Bidirectional Arrows */}
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <ArrowDown className="w-5 h-5 text-brand-green mb-1" />
                <span className="text-xs text-brand-green">Events</span>
              </div>
              <div className="flex flex-col items-center">
                <ArrowDown className="w-5 h-5 text-brand-purple mb-1 rotate-180" />
                <span className="text-xs text-brand-purple">Callbacks</span>
              </div>
            </div>

            {/* Layer 3: Reactive Network */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-brand-purple/10 to-brand-green/10 rounded-xl border border-brand-purple/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-green rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reactive Network</h3>
                    <p className="text-xs text-muted-foreground">Cross-chain automation layer</p>
                  </div>
                </div>
                <Network className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Zap className="w-5 h-5 text-brand-yellow mx-auto mb-2" />
                  <p className="text-xs font-medium">Event Listeners</p>
                  <p className="text-xs text-muted-foreground mt-1">Monitor payments</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
                  <RefreshCw className="w-5 h-5 text-brand-blue mx-auto mb-2" />
                  <p className="text-xs font-medium">Auto Renewal</p>
                  <p className="text-xs text-muted-foreground mt-1">Process payments</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-brand-purple mx-auto mb-2" />
                  <p className="text-xs font-medium">CRON Jobs</p>
                  <p className="text-xs text-muted-foreground mt-1">Check expiry</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Link className="w-5 h-5 text-brand-green mx-auto mb-2" />
                  <p className="text-xs font-medium">Cross-Chain</p>
                  <p className="text-xs text-muted-foreground mt-1">Bridge events</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Subscription Flow Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <H2 className="mb-8">Subscription Lifecycle</H2>
        
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          {/* Flow Steps */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {[
                { icon: Users, label: 'User Subscribes', color: 'brand-blue' },
                { icon: Coins, label: 'Token Approval', color: 'brand-yellow' },
                { icon: FileCheck, label: 'Payment Sent', color: 'brand-green' },
                { icon: Database, label: 'NFT Minted', color: 'brand-purple' },
                { icon: Clock, label: 'Active Period', color: 'brand-primary' },
                { icon: RefreshCw, label: 'Auto Renewal', color: 'brand-secondary' }
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative z-10"
                >
                  <div className="bg-card rounded-xl border border-border p-4 hover:border-accent transition-colors">
                    <div className={`w-12 h-12 bg-${step.color}/20 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className={`w-6 h-6 text-${step.color}`} />
                    </div>
                    <p className="text-xs font-medium text-center">{step.label}</p>
                  </div>
                  {index < 5 && (
                    <ArrowRight className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hidden lg:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status States */}
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-semibold mb-4 text-center">Subscription States</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-brand-yellow" />
                <span className="text-sm">Grace Period</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm">Expired</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">Renewing</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Code Example */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <H2 className="mb-6">Integration Example</H2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Setup Code */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-accent/50 px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">merchant-setup.js</span>
              <Code className="w-4 h-4 text-muted-foreground" />
            </div>
            <pre className="p-4 overflow-x-auto text-xs">
              <code className="font-mono">{`// 1. Register as merchant
const tx = await manager.registerMerchant(
  walletAddress,     // Payment receiver
  2592000,          // 30 days duration
  259200,           // 3 days grace period
);

// 2. Set payment tokens
await manager.setPaymentToken(
  USDC_ADDRESS,
  parseUnits("9.99", 6)  // $9.99/month
);

// 3. Add metadata (off-chain)
await registerMetadata({
  merchantId: 1,
  name: "Premium Service",
  logo: logoBase64
});`}</code>
            </pre>
          </div>

          {/* User Code */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-accent/50 px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">user-subscribe.js</span>
              <Code className="w-4 h-4 text-muted-foreground" />
            </div>
            <pre className="p-4 overflow-x-auto text-xs">
              <code className="font-mono">{`// 1. Approve token spending
const approval = await token.approve(
  SUBSCRIPTION_MANAGER,
  parseUnits("9.99", 6)
);
await approval.wait();

// 2. Subscribe to merchant
const subscription = await manager.subscribe(
  merchantId,
  USDC_ADDRESS
);

// 3. Check NFT ownership
const isActive = await nft.balanceOf(
  userAddress,
  merchantId
) > 0;`}</code>
            </pre>
          </div>
        </div>

        {/* SDK Usage */}
        <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-accent/50 px-4 py-3 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">react-integration.tsx</span>
            <Code className="w-4 h-4 text-muted-foreground" />
          </div>
          <pre className="p-4 overflow-x-auto text-xs">
            <code className="font-mono">{`import { useSubscription, SubscriptionButton } from '@nft-sub/sdk';

function App() {
  const { isActive, expiry, renew } = useSubscription(merchantId);
  
  return (
    <div>
      {isActive ? (
        <p>Subscription active until {expiry}</p>
      ) : (
        <SubscriptionButton 
          merchantId={merchantId}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </motion.section>

      {/* Key Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <H2 className="mb-8">Platform Features</H2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Automated Renewals',
              description: 'No manual intervention needed - payments process automatically',
              color: 'brand-yellow'
            },
            {
              icon: Shield,
              title: 'Fully Decentralized',
              description: 'All logic runs on-chain with no centralized dependencies',
              color: 'brand-purple'
            },
            {
              icon: RefreshCw,
              title: 'Grace Periods',
              description: 'Configurable buffer time for payment issues',
              color: 'brand-blue'
            },
            {
              icon: Layers,
              title: 'Multi-Token',
              description: 'Accept ETH, USDC, DAI, or any ERC-20 token',
              color: 'brand-green'
            },
            {
              icon: Network,
              title: 'Cross-Chain',
              description: 'Deploy on multiple chains simultaneously',
              color: 'brand-primary'
            },
            {
              icon: Database,
              title: 'NFT Access Control',
              description: 'Subscription status represented by tradeable NFTs',
              color: 'brand-secondary'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="group rounded-xl border border-border bg-card/50 p-6 hover:border-accent hover:bg-card/80 transition-all"
            >
              <div className={`w-12 h-12 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <H3 className="text-lg mb-2">{feature.title}</H3>
              <P className="text-sm text-muted-foreground m-0">
                {feature.description}
              </P>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Learn More */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="rounded-2xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 p-8"
      >
        <div className="text-center">
          <H2 className="mb-4">Ready to Get Started?</H2>
          <P className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our comprehensive documentation to integrate subscription NFTs into your application.
          </P>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/quickstart"
              className="px-6 py-3 bg-brand-gradient text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Quick Start Guide
            </a>
            <a
              href="/docs/contracts"
              className="px-6 py-3 bg-card border border-border rounded-xl font-medium hover:border-accent transition-colors"
            >
              View Contracts
            </a>
            <a
              href="/docs/api"
              className="px-6 py-3 bg-card border border-border rounded-xl font-medium hover:border-accent transition-colors"
            >
              API Reference
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}