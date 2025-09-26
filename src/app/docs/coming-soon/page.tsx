'use client';

import { motion } from 'framer-motion';
import { Rocket, Target, Shield, Globe, Zap, Users, CheckCircle, Circle, Clock } from 'lucide-react';
import { H1, H2, H3, P, Lead, GradientText } from '@/components/Typography';

const milestones = [
  {
    quarter: 'Q1 2025',
    title: 'Foundation & Testing',
    status: 'in-progress',
    items: [
      {
        title: 'Mainnet Deployment to Base',
        description: 'Deploy production-ready contracts to Base mainnet with lower gas fees',
        icon: Globe,
        status: 'upcoming'
      },
      {
        title: 'Smart Contract Audit',
        description: 'Complete security audit with reputable firms like OpenZeppelin or Certik',
        icon: Shield,
        status: 'upcoming'
      },
      {
        title: 'SDK v2.0 Release',
        description: 'Enhanced SDK with batch operations, gas optimizations, and new hooks',
        icon: Zap,
        status: 'in-progress'
      },
      {
        title: 'Multi-Chain Support',
        description: 'Expand to Arbitrum, Optimism, and Polygon for wider reach',
        icon: Globe,
        status: 'upcoming'
      }
    ]
  },
  {
    quarter: 'Q2 2025',
    title: 'Enterprise Features',
    status: 'planned',
    items: [
      {
        title: 'Subscription Analytics Dashboard',
        description: 'Real-time metrics, revenue tracking, and subscriber insights for merchants',
        icon: Target,
        status: 'planned'
      },
      {
        title: 'Bulk Operations',
        description: 'Batch subscription management for enterprise clients',
        icon: Users,
        status: 'planned'
      },
      {
        title: 'Custom Pricing Models',
        description: 'Support for tiered pricing, usage-based billing, and dynamic pricing',
        icon: Zap,
        status: 'planned'
      },
      {
        title: 'Webhook Integration',
        description: 'Real-time notifications for subscription events via webhooks',
        icon: Globe,
        status: 'planned'
      }
    ]
  },
  {
    quarter: 'Q3 2025',
    title: 'DeFi Integration',
    status: 'planned',
    items: [
      {
        title: 'Yield Generation',
        description: 'Auto-stake subscription payments to generate yield for merchants',
        icon: Rocket,
        status: 'planned'
      },
      {
        title: 'Lending Protocol Integration',
        description: 'Use subscription NFTs as collateral for loans',
        icon: Shield,
        status: 'planned'
      },
      {
        title: 'Cross-Chain Bridges',
        description: 'Native cross-chain subscription management without bridges',
        icon: Globe,
        status: 'planned'
      },
      {
        title: 'DAO Governance',
        description: 'Decentralized governance for protocol upgrades and fee management',
        icon: Users,
        status: 'planned'
      }
    ]
  },
  {
    quarter: 'Q4 2025',
    title: 'Mass Adoption',
    status: 'planned',
    items: [
      {
        title: 'Mobile SDK',
        description: 'Native iOS and Android SDKs for mobile app integration',
        icon: Zap,
        status: 'planned'
      },
      {
        title: 'Fiat On-Ramp',
        description: 'Direct fiat-to-subscription payments via payment providers',
        icon: Globe,
        status: 'planned'
      },
      {
        title: 'AI-Powered Insights',
        description: 'Machine learning for churn prediction and pricing optimization',
        icon: Rocket,
        status: 'planned'
      },
      {
        title: 'Enterprise Partnerships',
        description: 'Strategic partnerships with major Web3 platforms',
        icon: Users,
        status: 'planned'
      }
    ]
  }
];

const features = [
  {
    title: 'Account Abstraction',
    description: 'Gasless transactions and social recovery for better UX',
    targetDate: 'Q2 2025'
  },
  {
    title: 'Subscription Marketplace',
    description: 'Discover and compare subscription services in one place',
    targetDate: 'Q3 2025'
  },
  {
    title: 'Loyalty Rewards',
    description: 'NFT-based loyalty programs with exclusive benefits',
    targetDate: 'Q2 2025'
  },
  {
    title: 'Privacy Features',
    description: 'Zero-knowledge proofs for private subscriptions',
    targetDate: 'Q4 2025'
  }
];

export default function ComingSoonPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-brand-green" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-brand-blue" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };


  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>Coming</GradientText> Soon
        </H1>
        <Lead className="max-w-3xl">
          Our roadmap to revolutionize subscription payments on the blockchain.
          Track our progress as we build the future of decentralized recurring payments.
        </Lead>
      </motion.div>

      {/* Current Focus */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-8"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center mr-4">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <H2 className="m-0">Current Focus</H2>
            <P className="text-sm text-brand-green m-0 mt-1">Active Development</P>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0">Sepolia Testnet Deployment</P>
                <P className="text-sm text-muted-foreground m-0">Live and operational</P>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0">SDK Documentation</P>
                <P className="text-sm text-muted-foreground m-0">90% complete</P>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0">Gas Optimizations</P>
                <P className="text-sm text-muted-foreground m-0">Reducing transaction costs by 30%</P>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Circle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0">Audit Preparation</P>
                <P className="text-sm text-muted-foreground m-0">Starting Q1 2025</P>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Roadmap */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <H2 className="mb-8">Development Roadmap</H2>
        
        <div className="space-y-8">
          {milestones.map((quarter, quarterIndex) => (
            <motion.div
              key={quarter.quarter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + quarterIndex * 0.1 }}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <H3 className="text-2xl m-0">{quarter.quarter}</H3>
                  <span className={`text-sm px-3 py-1 rounded-full border ${
                    quarter.status === 'in-progress' 
                      ? 'bg-brand-blue/10 border-brand-blue text-brand-blue'
                      : 'bg-accent border-border text-muted-foreground'
                  }`}>
                    {quarter.title}
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {quarter.items.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card/50 p-6 hover:border-accent transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <P className="font-semibold m-0">{item.title}</P>
                          {getStatusIcon(item.status)}
                        </div>
                        <P className="text-sm text-muted-foreground m-0">{item.description}</P>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card/50 p-8"
      >
        <H2 className="mb-6">Upcoming Features</H2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-3"
            >
              <Zap className="w-5 h-5 text-brand-purple mt-1 flex-shrink-0" />
              <div>
                <P className="font-semibold m-0 mb-1">{feature.title}</P>
                <P className="text-sm text-muted-foreground m-0 mb-2">{feature.description}</P>
                <P className="text-xs text-brand-green m-0">Target: {feature.targetDate}</P>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Community Involvement */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="rounded-2xl bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border border-border p-8"
      >
        <div className="text-center">
          <H2 className="mb-4">Help Shape the Future</H2>
          <P className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your feedback drives our development. Join our community to suggest features,
            report issues, and contribute to the open-source ecosystem.
          </P>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="https://github.com/reactive-network/nft-subscription-sdk/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit Feature Request
            </a>
            <a
              href="https://discord.gg/subscription-nft"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border bg-card text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
            >
              Join Discord Community
            </a>
          </div>
        </div>
      </motion.section>

      {/* Timeline Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center"
      >
        <P className="text-sm text-muted-foreground">
          * Timeline is subject to change based on development progress and community feedback.
          <br />
          Last updated: January 2025
        </P>
      </motion.div>
    </div>
  );
}