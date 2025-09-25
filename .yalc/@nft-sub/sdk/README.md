# NFT Sub SDK

TypeScript SDK for NFT Sub - The Web3 Subscription Platform. Built with Reactive Network for automated cross-chain subscription management.

## Overview

NFT Sub SDK provides a complete toolkit for implementing Web3 subscription services on blockchain. It enables merchants to create subscription plans, accept recurring payments, and issue NFT-based subscription tokens that serve as access passes.

## Features

- **ERC-1155 Based Subscriptions**: Each subscription is an NFT that can be transferred or traded
- **Multiple Payment Tokens**: Support for ETH and ERC-20 tokens
- **Automated Renewals**: Reactive Network integration for automatic subscription management
- **Merchant Management**: Complete merchant registration and revenue management
- **Analytics**: Built-in analytics for tracking subscriptions and revenue
- **Event Monitoring**: Real-time event tracking for all subscription activities
- **TypeScript First**: Full type safety and IntelliSense support

## Installation

```bash
npm install @nft-sub/sdk
# or
pnpm add @nft-sub/sdk
# or
yarn add @nft-sub/sdk
```

## Quick Start

### Basic Setup

```typescript
import { SubscriptionSDK } from '@nft-sub/sdk';

// Initialize SDK in read-only mode
const sdk = new SubscriptionSDK({
  chain: 'sepolia',
  readOnly: true
});

// Initialize with wallet for transactions
const sdkWithWallet = new SubscriptionSDK({
  chain: 'sepolia',
  privateKey: process.env.PRIVATE_KEY
});
```

### Subscribe to a Merchant

```typescript
// Subscribe with ETH
const txHash = await sdk.subscribe(merchantId, 'ETH');

// Subscribe with ERC-20 token
const tokenAddress = '0x...';
const txHash = await sdk.subscribe(merchantId, tokenAddress);

// Wait for confirmation
await sdk.waitForTransaction(txHash);
```

### Check Subscription Status

```typescript
// Check if user has active subscription
const hasAccess = await sdk.checkAccess(merchantId, userAddress);

// Get detailed subscription status
const status = await sdk.subscriptions.getSubscriptionStatus(
  userAddress,
  merchantId
);
console.log('Expires at:', new Date(Number(status.expiresAt) * 1000));
```

## Merchant Operations

### Register as Merchant

```typescript
const merchantId = await sdk.merchants.registerMerchant({
  name: 'Premium Service',
  description: 'Access to premium features',
  imageUrl: 'https://example.com/logo.png',
  externalUrl: 'https://example.com',
  paymentTokens: [
    {
      address: '0x0000000000000000000000000000000000000000', // ETH
      price: '0.01',
      decimals: 18
    }
  ]
});
```

### Manage Merchant Revenue

```typescript
// Check merchant balance
const balance = await sdk.getMerchantBalance(merchantId, 'ETH');
console.log('Balance:', sdk.formatAmount(balance, 18));

// Withdraw earnings
const txHash = await sdk.withdrawMerchantBalance(merchantId, 'ETH');
```

### Update Subscription Price

```typescript
await sdk.merchants.setMerchantPrice({
  merchantId,
  paymentToken: '0x...', // Token address or zero for ETH
  price: '0.02' // New price in token units
});
```

## NFT Operations

### Check NFT Balance

```typescript
const balance = await sdk.nfts.getBalance(userAddress, merchantId);
console.log('NFT balance:', balance);
```

### Transfer Subscription NFT

```typescript
const txHash = await sdk.nfts.safeTransferFrom({
  from: currentOwner,
  to: newOwner,
  merchantId,
  amount: 1n
});
```

### Get NFT Metadata

```typescript
const metadata = await sdk.nfts.getFullMetadata(userAddress, merchantId);
console.log('Subscription NFT:', metadata);
```

## Event Monitoring

### Monitor Real-time Events

```typescript
sdk.startEventMonitoring({
  onPaymentReceived: (event) => {
    console.log('Payment received:', event);
  },
  onSubscriptionMinted: (event) => {
    console.log('New subscription:', event);
  },
  onSubscriptionRenewed: (event) => {
    console.log('Subscription renewed:', event);
  },
  onMerchantRegistered: (event) => {
    console.log('New merchant:', event);
  }
});

// Stop monitoring when done
sdk.stopEventMonitoring();
```

## Analytics

### Get Platform Statistics

```typescript
const stats = await sdk.analytics.getPlatformStatistics();
console.log('Total merchants:', stats.totalMerchants);
console.log('Total subscriptions:', stats.totalSubscriptions);
console.log('Total volume:', sdk.formatAmount(stats.totalVolume, 18));
```

### Get Merchant Statistics

```typescript
const merchantStats = await sdk.analytics.getMerchantStatistics(merchantId);
console.log('Active subscribers:', merchantStats.activeSubscriptions);
console.log('Total revenue:', sdk.formatAmount(merchantStats.totalRevenue, 18));
```

## Reactive Network Integration

The SDK includes Reactive Network support for automated cross-chain operations.

### Subscribe to Cross-Chain Events

```typescript
// Subscribe to payment events from L1
await sdk.reactive.subscribeToPaymentEvents({
  chainId: 11155111n, // Sepolia
  contractAddress: sdk.getContracts().subscriptionManager
});

// Subscribe to CRON for automatic expiry checks
await sdk.reactive.subscribeToCronJob({
  interval: 3600n // Check every hour
});
```

### Monitor Reactive Events

```typescript
sdk.reactive.watchReactiveEvents({
  onPaymentProcessed: (event) => {
    console.log('Payment processed on L1:', event);
  },
  onSubscriptionExpired: (event) => {
    console.log('Subscription expired:', event);
  }
});
```

## React Components

NFT Sub SDK includes pre-built React components for rapid integration.

### SubscribeButton

A ready-to-use subscription button with built-in wallet connection and payment flow.

```typescript
import { SubscribeButton } from '@nft-sub/sdk/components';

<SubscribeButton
  sdk={sdk}
  merchantId={1n}
  paymentToken="ETH"
  onSuccess={(txHash) => console.log('Subscribed!', txHash)}
  className="custom-class"
/>
```

### SubscriptionCard

Display subscription plans with pricing and status information.

```typescript
import { SubscriptionCard } from '@nft-sub/sdk/components';

<SubscriptionCard
  sdk={sdk}
  merchantId={1n}
  variant="detailed" // 'default' | 'detailed' | 'compact'
  showPricing={true}
  showStatus={true}
  showActions={true}
  onSubscribe={() => console.log('Subscribe clicked')}
  onViewDetails={() => console.log('View details')}
/>
```

### SubscriptionModal

Multi-step subscription modal with payment processing.

```typescript
import { SubscriptionModal } from '@nft-sub/sdk/components';

<SubscriptionModal
  sdk={sdk}
  merchantId={1n}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={(hash) => console.log('Success!', hash)}
  onError={(error) => console.error(error)}
/>
```

### MerchantDashboard

Complete dashboard for merchants to manage subscriptions and view analytics.

```typescript
import { MerchantDashboard } from '@nft-sub/sdk/components';

<MerchantDashboard
  sdk={sdk}
  merchantId={1n}
  onEditMerchant={() => console.log('Edit')}
  onViewAnalytics={() => console.log('Analytics')}
  onAddSubscription={() => console.log('Add subscription')}
/>
```

### AnalyticsWidget

Display real-time analytics for platform or merchant metrics.

```typescript
import { AnalyticsWidget } from '@nft-sub/sdk/components';

<AnalyticsWidget
  sdk={sdk}
  merchantId={1n} // Optional - omit for platform analytics
  timeRange="30d" // '7d' | '30d' | '90d' | '1y'
  variant="merchant" // 'platform' | 'merchant'
  onTimeRangeChange={(range) => console.log('New range:', range)}
/>
```

### WalletConnect

Wallet connection component with multi-wallet support.

```typescript
import { WalletConnect } from '@nft-sub/sdk/components';

<WalletConnect
  onConnect={(address) => console.log('Connected:', address)}
  onDisconnect={() => console.log('Disconnected')}
/>
```

## React Hooks

The SDK also provides React hooks for custom implementations.

```typescript
import { useSubscription, useMerchant } from '@nft-sub/sdk/hooks';

function CustomComponent({ merchantId }) {
  const {
    subscription,
    isActive,
    isLoading,
    subscribe,
    renew
  } = useSubscription(sdk, merchantId);

  const {
    merchant,
    balance,
    withdraw
  } = useMerchant(sdk, merchantId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isActive ? (
        <button onClick={renew}>Renew Subscription</button>
      ) : (
        <button onClick={() => subscribe('ETH')}>Subscribe</button>
      )}
    </div>
  );
}
```

## Configuration

### Supported Chains

Currently supports:
- Sepolia testnet

### Contract Addresses (Sepolia)

- SubscriptionManager: `0x58a70e0D47952b2f0eE37B0Ef88904B537c00faF`
- SubscriptionNFT: `0x7Be0caf652F85fDEc8cf3E6152Ec9e5CcbC867D5`
- TestToken: `0xA1FA1a5054695175881163266C9082e435AD9DF1`

### Reactive Network

- SubscriptionReactive: `0x607E82739502624ce951D5d67054745389D02861`
- RPC: `https://lasna-rpc.rnk.dev/`

## API Reference

### Core SDK

#### Constructor Options

```typescript
interface SDKConfig {
  chain: 'sepolia';
  privateKey?: `0x${string}`;
  readOnly?: boolean;
  rpc?: string;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
}
```

#### Main Methods

- `subscribe(merchantId, paymentToken)` - Subscribe to a merchant
- `checkAccess(merchantId, userAddress?)` - Check subscription status
- `getMerchantBalance(merchantId, token)` - Get merchant balance
- `withdrawMerchantBalance(merchantId, token)` - Withdraw earnings
- `formatAmount(amount, decimals)` - Format token amounts
- `parseAmount(amount, decimals)` - Parse token amounts

### Services

The SDK exposes the following services:

- `sdk.merchants` - Merchant management
- `sdk.subscriptions` - Subscription operations
- `sdk.tokens` - Token operations
- `sdk.nfts` - NFT management
- `sdk.events` - Event monitoring
- `sdk.analytics` - Analytics and statistics
- `sdk.admin` - Admin operations
- `sdk.reactive` - Reactive Network integration

## Error Handling

The SDK uses custom error types for better error handling:

```typescript
import { SDKError, SDKErrorCode } from '@nft-sub/sdk';

try {
  await sdk.subscribe(merchantId);
} catch (error) {
  if (error instanceof SDKError) {
    switch (error.code) {
      case SDKErrorCode.WALLET_NOT_CONNECTED:
        console.error('Please connect wallet');
        break;
      case SDKErrorCode.INSUFFICIENT_BALANCE:
        console.error('Insufficient funds');
        break;
      default:
        console.error('SDK Error:', error.message);
    }
  }
}
```

## Testing

Run the test suite:

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# All tests
npm run test:run
```

## Building

Build the SDK:

```bash
npm run build
```

## License

MIT

## Support

For issues and feature requests, please open an issue on [GitHub](https://github.com/nft-sub/sdk).

## About NFT Sub

NFT Sub is the leading Web3 subscription platform, enabling merchants to accept recurring payments and issue NFT-based access tokens. Built on Ethereum with Reactive Network integration for seamless cross-chain operations.

Visit [nft-sub.com](https://nft-sub.com) to learn more.