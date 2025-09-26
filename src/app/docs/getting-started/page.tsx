'use client';

import { motion } from 'framer-motion';
import { H1, H3, GradientText } from '@/components/Typography';

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>Getting</GradientText> Started
        </H1>
      </motion.div>

      {/* Installation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-3">Installation</H3>
        <div className="rounded-lg border border-border bg-card p-3">
          <code className="text-sm font-mono text-foreground">
            pnpm add @nft-sub/sdk wagmi viem
          </code>
        </div>
      </motion.section>

      {/* Frontend Setup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">Frontend Setup</H3>
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

      {/* Backend Setup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">Backend Setup</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`import { SubscriptionSDK } from '@nft-sub/sdk';

const sdk = new SubscriptionSDK({
  chain: 'sepolia',
  privateKey: process.env.PRIVATE_KEY,
  rpc: process.env.RPC_URL
});`}</code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Basic Usage */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">Basic Usage</H3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4">
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`// Subscribe
const txHash = await sdk.subscribe(merchantId, 'ETH');

// Check access
const hasAccess = await sdk.checkAccess(merchantId, address);

// Get subscription status
const status = await sdk.subscriptions.getSubscriptionStatus(address, merchantId);`}</code>
            </pre>
          </div>
        </div>
      </motion.section>

      {/* Contract Addresses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-4">Contract Addresses (Sepolia)</H3>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="bg-background/50">
                <td className="p-3 font-mono text-sm text-brand-green">SubscriptionManager</td>
                <td className="p-3 font-mono text-xs text-foreground">0x58a70e0D47952b2f0eE37B0Ef88904B537c00faF</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm text-brand-green">SubscriptionNFT</td>
                <td className="p-3 font-mono text-xs text-foreground">0x7Be0caf652F85fDEc8cf3E6152Ec9e5CcbC867D5</td>
              </tr>
              <tr className="bg-background/50">
                <td className="p-3 font-mono text-sm text-brand-green">TestToken</td>
                <td className="p-3 font-mono text-xs text-foreground">0xA1FA1a5054695175881163266C9082e435AD9DF1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}