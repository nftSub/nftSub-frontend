'use client';

import { motion } from 'framer-motion';
import { FileCode, ExternalLink, Copy, CheckCircle, Shield, Cpu, Link, Server } from 'lucide-react';
import { H1, H2, H3, P, Lead, GradientText } from '@/components/Typography';
import { useState } from 'react';

const contracts = [
  // Mainnet Contracts
  {
    name: 'SubscriptionManager',
    description: 'Main contract for managing subscriptions and payments (deployed on all mainnet chains)',
    network: 'Multi-Chain',
    address: '0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c',
    chains: [
      { name: 'Base', explorerUrl: 'https://basescan.org/address/0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c' },
      { name: 'BSC', explorerUrl: 'https://bscscan.com/address/0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c' },
      { name: 'Avalanche', explorerUrl: 'https://snowtrace.io/address/0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c' },
      { name: 'Sonic', explorerUrl: 'https://sonicscan.org/address/0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c' }
    ],
    functions: [
      'subscribe(merchantId, token)',
      'registerMerchant(wallet, duration, gracePeriod)',
      'setPaymentToken(token, price)',
      'checkSubscription(user, merchantId)'
    ]
  },
  {
    name: 'SubscriptionNFT',
    description: 'ERC-1155 NFT representing active subscriptions (deployed on all mainnet chains)',
    network: 'Multi-Chain',
    address: '0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8',
    chains: [
      { name: 'Base', explorerUrl: 'https://basescan.org/address/0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8' },
      { name: 'BSC', explorerUrl: 'https://bscscan.com/address/0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8' },
      { name: 'Avalanche', explorerUrl: 'https://snowtrace.io/address/0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8' },
      { name: 'Sonic', explorerUrl: 'https://sonicscan.org/address/0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8' }
    ],
    functions: [
      'mintSubscription(user, merchantId)',
      'updateExpiry(user, merchantId, newExpiry)',
      'isSubscriptionActive(user, merchantId)',
      'getSubscriptionExpiry(user, merchantId)'
    ]
  },
  // Testnet Contracts
  {
    name: 'SubscriptionManager (Testnet)',
    description: 'Main contract for managing subscriptions and payments',
    network: 'Sepolia',
    address: '0x82b069578ae3dA9ea740D24934334208b83E530E',
    explorerUrl: 'https://sepolia.etherscan.io/address/0x82b069578ae3dA9ea740D24934334208b83E530E',
    functions: [
      'subscribe(merchantId, token)',
      'registerMerchant(wallet, duration, gracePeriod)',
      'setPaymentToken(token, price)',
      'checkSubscription(user, merchantId)'
    ]
  },
  {
    name: 'SubscriptionNFT (Testnet)',
    description: 'ERC-1155 NFT representing active subscriptions',
    network: 'Sepolia',
    address: '0x404cb817FA393D3689D1405DB0B76a20eDE72d43',
    explorerUrl: 'https://sepolia.etherscan.io/address/0x404cb817FA393D3689D1405DB0B76a20eDE72d43',
    functions: [
      'mintSubscription(user, merchantId)',
      'updateExpiry(user, merchantId, newExpiry)',
      'isSubscriptionActive(user, merchantId)',
      'getSubscriptionExpiry(user, merchantId)'
    ]
  },
  {
    name: 'SubscriptionReactive',
    description: 'Cross-chain reactive contract for automated processing',
    network: 'Reactive Network',
    address: '0xa55B7A74D05b5D5C48E431e44Fea83a1047A7582',
    explorerUrl: 'https://reactive.network/explorer/address/0xa55B7A74D05b5D5C48E431e44Fea83a1047A7582',
    functions: [
      'processPaymentEvent(event)',
      'checkExpiredSubscriptions()',
      'sendCallback(targetChain, data)',
      'updateSubscriptionStatus(user, merchantId)'
    ]
  },
  {
    name: 'Test Token (SUBTEST)',
    description: 'ERC-20 token for testing subscription payments',
    network: 'Sepolia',
    address: '0x10586EBF2Ce1F3e851a8F15659cBa15b03Eb8B8A',
    explorerUrl: 'https://sepolia.etherscan.io/address/0x10586EBF2Ce1F3e851a8F15659cBa15b03Eb8B8A',
    functions: [
      'mint(amount)',
      'approve(spender, amount)',
      'transfer(to, amount)',
      'balanceOf(account)'
    ]
  }
];

const architecture = [
  {
    icon: Shield,
    title: 'L1 Smart Contracts',
    description: 'Deployed on Ethereum Sepolia for payment processing and NFT management'
  },
  {
    icon: Cpu,
    title: 'Reactive Network',
    description: 'Cross-chain automation layer for event processing and subscription management'
  },
  {
    icon: Link,
    title: 'Event Subscriptions',
    description: 'Real-time monitoring of payment events and automated callbacks'
  },
  {
    icon: Server,
    title: 'CRON Jobs',
    description: 'Scheduled tasks for checking subscription expiry and renewals'
  }
];

export default function ContractsPage() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
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
          <GradientText>Smart</GradientText> Contracts
        </H1>
        <Lead className="max-w-3xl">
          Deployed and verified contracts powering the subscription NFT ecosystem.
          All contracts are open-source and audited for security.
        </Lead>
      </motion.div>

      {/* Architecture Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <H2 className="mb-6">Architecture Overview</H2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architecture.map((item) => (
            <div 
              key={item.title}
              className="group rounded-xl border border-border bg-card/50 p-6 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-brand-gradient rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Deployed Contracts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <H2 className="mb-6">Deployed Contracts</H2>
        <div className="space-y-6">
          {contracts.map((contract, index) => (
            <motion.div
              key={contract.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6">
                {/* Contract Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <H3 className="text-2xl m-0">
                        <GradientText>{contract.name}</GradientText>
                      </H3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border">
                        {contract.network}
                      </span>
                    </div>
                    <P className="text-muted-foreground m-0">{contract.description}</P>
                  </div>
                  <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileCode className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Contract Address */}
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Contract Address</p>
                      <code className="font-mono text-sm text-foreground break-all">
                        {contract.address}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(contract.address)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        {copiedAddress === contract.address ? (
                          <CheckCircle className="w-4 h-4 text-brand-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      {'chains' in contract && contract.chains ? (
                        // Multi-chain contracts - show dropdown or multiple links
                        <div className="flex items-center gap-1">
                          {contract.chains.map((chain) => (
                            <a
                              key={chain.name}
                              href={chain.explorerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 text-xs hover:bg-background rounded transition-colors"
                              title={`View on ${chain.name}`}
                            >
                              {chain.name}
                            </a>
                          ))}
                        </div>
                      ) : (
                        // Single chain contract
                        <a
                          href={contract.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Functions */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Main Functions</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {contract.functions.map((func) => (
                      <div 
                        key={func}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <code className="font-mono text-muted-foreground">{func}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Integration Guide */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <H2 className="mb-6">Integration Guide</H2>
        
        <div className="space-y-6">
          <div>
            <H3 className="text-lg mb-3">1. Connect to Contracts</H3>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-card/80 px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">integration.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="font-mono">{`import { ethers } from 'ethers';
import { SubscriptionSDK } from '@nft-sub/sdk';

const provider = new ethers.JsonRpcProvider('https://sepolia.gateway.tenderly.co');

const contracts = {
  manager: '0x82b069578ae3dA9ea740D24934334208b83E530E',
  nft: '0x404cb817FA393D3689D1405DB0B76a20eDE72d43',
  reactive: '0xa55B7A74D05b5D5C48E431e44Fea83a1047A7582'
};

const sdk = new SubscriptionSDK({ provider, contracts });`}</code>
              </pre>
            </div>
          </div>

          <div>
            <H3 className="text-lg mb-3">2. Verify Deployment</H3>
            <P className="text-sm text-muted-foreground mb-3">
              Use these commands to verify contract deployment:
            </P>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-card/80 px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="font-mono">{`# Check L1 contracts on Sepolia
cast code 0x82b069578ae3dA9ea740D24934334208b83E530E --rpc-url https://sepolia.gateway.tenderly.co
cast code 0x404cb817FA393D3689D1405DB0B76a20eDE72d43 --rpc-url https://sepolia.gateway.tenderly.co

# Check Reactive contract
cast code 0xa55B7A74D05b5D5C48E431e44Fea83a1047A7582 --rpc-url https://lasna-rpc.rnk.dev/`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg border border-border bg-card">
          <P className="text-sm m-0">
            <strong>Need Help?</strong> Check out our{' '}
            <a href="/docs/api" className="text-foreground underline hover:text-muted-foreground transition-colors">API Reference</a>{' '}
            for detailed contract interactions or join our{' '}
            <a href="https://discord.gg/subscription-nft" className="text-foreground underline hover:text-muted-foreground transition-colors">Discord</a>{' '}
            for support.
          </P>
        </div>
      </motion.section>
    </div>
  );
}