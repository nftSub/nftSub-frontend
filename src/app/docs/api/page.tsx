'use client';

import { motion } from 'framer-motion';
import { H1, H2, H3, GradientText } from '@/components/Typography';

const apiSections = [
  {
    title: 'Core Methods',
    methods: [
      { name: 'subscribe', params: '(merchantId: bigint, token: Address | "ETH")', returns: 'Promise<Hash>' },
      { name: 'checkAccess', params: '(merchantId: bigint, address?: Address)', returns: 'Promise<boolean>' },
      { name: 'getMerchantBalance', params: '(merchantId: bigint, token: Address | "ETH")', returns: 'Promise<bigint>' },
      { name: 'withdrawMerchantBalance', params: '(merchantId: bigint, token: Address | "ETH")', returns: 'Promise<Hash>' },
      { name: 'formatAmount', params: '(amount: bigint, decimals: number)', returns: 'string' },
      { name: 'parseAmount', params: '(amount: string, decimals: number)', returns: 'bigint' },
      { name: 'waitForTransaction', params: '(hash: Hash)', returns: 'Promise<TransactionReceipt>' },
      { name: 'getAddress', params: '()', returns: 'Address | undefined' },
      { name: 'isConnected', params: '()', returns: 'boolean' },
      { name: 'getChainId', params: '()', returns: 'number' },
      { name: 'getContracts', params: '()', returns: 'ContractAddresses' }
    ]
  },
  {
    title: 'Services',
    methods: [
      { name: 'sdk.merchants', params: 'MerchantService', returns: 'registerMerchant, setMerchantPrice, getMerchantPlan, withdrawMerchantBalance' },
      { name: 'sdk.subscriptions', params: 'SubscriptionService', returns: 'subscribe, getSubscriptionStatus, isSubscriptionActive, getSubscriptionPrice' },
      { name: 'sdk.tokens', params: 'TokenService', returns: 'getTokenInfo, getBalance, approve, approveIfNeeded' },
      { name: 'sdk.nfts', params: 'NFTService', returns: 'getBalance, safeTransferFrom, getFullMetadata, getTokenURI' },
      { name: 'sdk.events', params: 'EventMonitoringService', returns: 'monitorPaymentEvents, monitorSubscriptionLifecycle, stopMonitoring' },
      { name: 'sdk.analytics', params: 'AnalyticsService', returns: 'getPlatformStatistics, getMerchantStatistics, getMerchantRevenue' },
      { name: 'sdk.admin', params: 'AdminService', returns: 'setPlatformFee, pausePlatform, withdrawPlatformFees' },
      { name: 'sdk.reactive', params: 'ReactiveNetworkService', returns: 'subscribeToPaymentEvents, subscribeToCronJob, watchReactiveEvents' }
    ]
  },
  {
    title: 'Event Monitoring',
    methods: [
      { name: 'startEventMonitoring', params: '(listeners: EventListeners)', returns: 'void' },
      { name: 'stopEventMonitoring', params: '()', returns: 'void' },
      { name: 'on', params: '(event: string, callback: Function)', returns: 'void' },
      { name: 'off', params: '(event: string, callback: Function)', returns: 'void' }
    ]
  }
];

const types = [
  {
    name: 'SDKConfig',
    properties: {
      chain: 'string',
      walletClient: 'WalletClient',
      publicClient: 'PublicClient',
      privateKey: 'string',
      rpc: 'string',
      readOnly: 'boolean'
    }
  },
  {
    name: 'SubscriptionStatus',
    properties: {
      isActive: 'boolean',
      expiresAt: 'bigint',
      renewalCount: 'bigint',
      lastRenewal: 'bigint',
      merchantId: 'bigint'
    }
  },
  {
    name: 'EventListeners',
    properties: {
      onPaymentReceived: 'EventCallback<PaymentEvent>',
      onSubscriptionMinted: 'EventCallback<SubscriptionMintedEvent>',
      onSubscriptionRenewed: 'EventCallback<SubscriptionRenewedEvent>',
      onSubscriptionExpired: 'EventCallback<SubscriptionExpiredEvent>',
      onMerchantRegistered: 'EventCallback<MerchantRegisteredEvent>',
      onMerchantWithdrawal: 'EventCallback<MerchantWithdrawalEvent>'
    }
  }
];

const events = [
  'payment:received',
  'subscription:minted',
  'subscription:renewed',
  'subscription:expired',
  'merchant:registered',
  'merchant:withdrawal'
];

export default function ApiPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <H1 className="mb-6">
          <GradientText>API</GradientText> Reference
        </H1>
      </motion.div>

      {/* Initialization */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H3 className="mb-3">Initialization</H3>
        <div className="rounded-lg border border-border bg-card p-3">
          <code className="text-sm font-mono text-foreground">
            new SubscriptionSDK({'{'} chain: &apos;sepolia&apos;, walletClient {'}'})
          </code>
        </div>
      </motion.section>

      {/* Methods */}
      {apiSections.map((section, sectionIndex) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
          className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
        >
          <H3 className="mb-4">{section.title}</H3>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Method</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Parameters</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Returns</th>
                </tr>
              </thead>
              <tbody>
                {section.methods.map((method, i) => (
                  <tr key={method.name} className={i % 2 === 0 ? 'bg-background/50' : ''}>
                    <td className="p-3 font-mono text-sm text-brand-blue">{method.name}</td>
                    <td className="p-3 font-mono text-sm text-foreground">{method.params}</td>
                    <td className="p-3 font-mono text-sm text-brand-purple">{method.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      ))}

      {/* Types */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H2 className="mb-4">Types</H2>
        <div className="grid gap-6">
          {types.map((type) => (
            <div key={type.name} className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-6 py-3 border-b border-border bg-card/80">
                <h4 className="font-mono text-lg font-semibold text-brand-blue">{type.name}</h4>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <tbody>
                    {Object.entries(type.properties).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-background/50' : ''}>
                        <td className="p-2 font-mono text-sm text-brand-green">{key}?</td>
                        <td className="p-2 font-mono text-sm text-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <H2 className="mb-4">Events</H2>
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event} className="rounded-lg border border-border bg-card p-4">
              <code className="font-mono text-sm text-brand-blue">{event}</code>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}