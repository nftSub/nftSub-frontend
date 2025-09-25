'use client';

import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';
import { H1, H2, P, Lead, GradientText } from '@/components/Typography';
import { useState } from 'react';

const hooks = [
  {
    name: 'useSubscriptionSDK',
    description: 'Initialize and manage SDK instance',
    signature: `useSubscriptionSDK(config: SDKConfig)`,
    returns: {
      sdk: 'SubscriptionSDK | null',
      isInitialized: 'boolean',
      error: 'Error | null',
      isConnected: 'boolean',
      address: 'Address | undefined'
    }
  },
  {
    name: 'useSubscription',
    description: 'Manage subscription state and operations',
    signature: `useSubscription(sdk: SubscriptionSDK, merchantId: bigint, userAddress?: Address)`,
    returns: {
      isActive: 'boolean',
      status: 'SubscriptionStatus | null',
      isLoading: 'boolean',
      error: 'Error | null',
      subscribe: '(token: Address | "ETH") => Promise<Hash | undefined>',
      checkStatus: '() => Promise<void>'
    }
  },
  {
    name: 'useMerchant',
    description: 'Manage merchant data and operations',
    signature: `useMerchant(sdk: SubscriptionSDK, merchantId: bigint)`,
    returns: {
      merchant: 'MerchantPlan | null',
      balance: 'bigint',
      isLoading: 'boolean',
      error: 'Error | null',
      withdraw: '(token: Address | "ETH") => Promise<Hash | undefined>',
      setPrice: '(token: Address | "ETH", price: string) => Promise<Hash | undefined>',
      refresh: '() => Promise<void>'
    }
  },
  {
    name: 'useSubscriptionEvents',
    description: 'Monitor blockchain events with history',
    signature: `useSubscriptionEvents(sdk: SubscriptionSDK, listeners: EventListeners)`,
    returns: {
      isMonitoring: 'boolean',
      events: 'Array<{type: string, data: any, timestamp: number}>',
      clearEvents: '() => void'
    }
  }
];

export default function HooksPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, codeId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>React</GradientText> Hooks
        </H1>
        <Lead className="max-w-3xl">
          React hooks for subscription management, merchant operations, and event monitoring.
        </Lead>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H2 className="mb-4 text-lg">Installation</H2>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 relative">
            <code className="text-sm text-foreground font-mono">
              pnpm add @nft-sub/sdk wagmi viem
            </code>
            <button
              onClick={() => copyToClipboard('pnpm add @nft-sub/sdk wagmi viem', 'install')}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-background/80 hover:bg-background transition-colors"
            >
              {copiedCode === 'install' ? (
                <CheckCircle className="w-4 h-4 text-brand-green" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.section>

      {hooks.map((hook, index) => (
        <motion.section
          key={hook.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-mono font-semibold text-brand-blue mb-2">
              {hook.name}
            </h3>
            <P className="text-sm text-muted-foreground m-0">{hook.description}</P>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Signature</h4>
            <div className="rounded-lg border border-border bg-card p-4">
              <code className="text-sm font-mono text-foreground">
                {hook.signature}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Returns</h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(hook.returns).map(([key, type], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-background/50' : 'bg-card/50'}>
                      <td className="p-3 font-mono text-sm text-brand-green">{key}</td>
                      <td className="p-3 font-mono text-sm text-foreground">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
      ))}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <H2 className="mb-4">Quick Example</H2>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 relative">
            <pre className="text-sm text-foreground font-mono overflow-x-auto">
              <code>{`import { useSubscriptionSDK, useSubscription } from '@nft-sub/sdk/hooks';

function App() {
  const { sdk } = useSubscriptionSDK({ chain: 'sepolia' });
  const { isActive, subscribe } = useSubscription(sdk, 1n);
  
  return (
    <button onClick={() => subscribe('ETH')}>
      {isActive ? 'Active' : 'Subscribe'}
    </button>
  );
}`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`import { useSubscriptionSDK, useSubscription } from '@nft-sub/sdk/hooks';

function App() {
  const { sdk } = useSubscriptionSDK({ chain: 'sepolia' });
  const { isActive, subscribe } = useSubscription(sdk, 1n);
  
  return (
    <button onClick={() => subscribe('ETH')}>
      {isActive ? 'Active' : 'Subscribe'}
    </button>
  );
}`, 'example')}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-background/80 hover:bg-background transition-colors"
            >
              {copiedCode === 'example' ? (
                <CheckCircle className="w-4 h-4 text-brand-green" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}