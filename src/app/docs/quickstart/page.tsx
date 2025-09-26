'use client';

import { motion } from 'framer-motion';
import { H1, H3, GradientText } from '@/components/Typography';

export default function QuickstartPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>Quick</GradientText> Start
        </H1>
      </motion.div>

      {/* Install */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-3">1. Install</H3>
        <div className="rounded-lg border border-border bg-card p-3">
          <code className="text-sm font-mono text-foreground">
            pnpm add @nft-sub/sdk wagmi viem
          </code>
        </div>
      </motion.section>

      {/* Initialize */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">2. Initialize</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`import { SubscriptionSDK } from '@nft-sub/sdk';
import { useWalletClient } from 'wagmi';

const { data: walletClient } = useWalletClient();
const sdk = new SubscriptionSDK({
  chain: 'sepolia',
  walletClient
});`}</code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Subscribe */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">3. Subscribe</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`const txHash = await sdk.subscribe(merchantId, 'ETH');
await sdk.waitForTransaction(txHash);`}</code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Check Access */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">4. Check Access</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`const hasAccess = await sdk.checkAccess(merchantId, userAddress);`}</code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* React Hooks */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">Using React Hooks</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`import { useSubscriptionSDK, useSubscription } from '@nft-sub/sdk/hooks';

function App() {
  const { sdk } = useSubscriptionSDK({ chain: 'sepolia' });
  const { isActive, subscribe } = useSubscription(sdk, merchantId);
  
  return (
    <button onClick={() => subscribe('ETH')}>
      {isActive ? 'Active' : 'Subscribe'}
    </button>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </motion.section>
    </div>
  );
}