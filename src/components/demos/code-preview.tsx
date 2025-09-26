'use client';

import { useState } from 'react';
import { Copy, Check, Eye, Code } from 'lucide-react';

interface CodePreviewProps {
  title?: string;
  description?: string;
  code: string;
  language?: string;
  showPreview?: boolean;
  previewComponent?: React.ReactNode;
  className?: string;
}

const codeExamples = {
  subscribe: `import { SubscriptionSDK } from '@nft-sub/sdk';

// Initialize the SDK
const sdk = new SubscriptionSDK({
  chain: 'sepolia',
  privateKey: process.env.PRIVATE_KEY
});

// Subscribe to a merchant
async function subscribe() {
  try {
    const txHash = await sdk.subscribe(1n, 'ETH');
    console.log('Transaction hash:', txHash);
    
    // Wait for confirmation
    await sdk.waitForTransaction(txHash);
    console.log('Subscription successful!');
  } catch (error) {
    console.error('Subscription failed:', error);
  }
}`,

  checkAccess: `import { SubscriptionSDK } from '@nft-sub/sdk';

// Check if user has access
async function checkUserAccess(userAddress: string) {
  const sdk = new SubscriptionSDK({
    chain: 'sepolia',
    readOnly: true
  });

  const hasAccess = await sdk.checkAccess(1n, userAddress);
  
  if (hasAccess) {
    console.log('User has active subscription');
    return true;
  } else {
    console.log('User needs to subscribe');
    return false;
  }
}`,

  reactComponent: `import { SubscribeButton } from '@nft-sub/sdk';

function MySubscriptionPage() {
  const handleSuccess = (txHash: string) => {
    console.log('Subscription successful:', txHash);
    // Update UI, show success message, etc.
  };

  const handleError = (error: Error) => {
    console.error('Subscription failed:', error);
    // Show error message to user
  };

  return (
    <div>
      <h1>Subscribe to Premium</h1>
      <SubscribeButton
        sdk={sdk}
        merchantId={1n}
        paymentToken="ETH"
        onSuccess={handleSuccess}
        onError={handleError}
        className="w-full"
      >
        Subscribe Now
      </SubscribeButton>
    </div>
  );
}`,

  merchantSetup: `import { SubscriptionSDK } from '@nft-sub/sdk';

// Register as a merchant
async function registerMerchant() {
  const sdk = new SubscriptionSDK({
    chain: 'sepolia',
    privateKey: process.env.PRIVATE_KEY
  });

  // Register with minimal on-chain data
  const { hash, merchantId } = await sdk.merchants.registerMerchant({
    payoutAddress: '0x...', // Your wallet for receiving payments
    subscriptionPeriod: 30 * 24 * 60 * 60, // 30 days in seconds
    gracePeriod: 7 * 24 * 60 * 60 // 7 days grace period
  });

  await sdk.waitForTransaction(hash);
  console.log('Merchant registered with ID:', merchantId);

  // Set prices for accepted payment tokens
  await sdk.merchants.setMerchantPrice({
    merchantId,
    paymentToken: '0x0000000000000000000000000000000000000000', // ETH
    price: '0.01' // 0.01 ETH
  });
  
  console.log('Merchant setup complete!');
}`,

  hooks: `import { 
  useSubscription, 
  useSubscriptionStatus, 
  useMerchantData 
} from '@nft-sub/sdk';

function SubscriptionDashboard({ merchantId }: { merchantId: bigint }) {
  // Use the subscription hook
  const {
    subscribe,
    isLoading: isSubscribing,
    error: subscribeError
  } = useSubscription(merchantId);

  // Check subscription status
  const {
    hasAccess,
    isLoading: isCheckingStatus,
    subscription
  } = useSubscriptionStatus(merchantId);

  // Get merchant information
  const {
    merchant,
    isLoading: isLoadingMerchant
  } = useMerchantData(merchantId);

  if (isLoadingMerchant || isCheckingStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{merchant?.name}</h2>
      {hasAccess ? (
        <div>
          <p>✅ Active Subscription</p>
          <p>Expires: {subscription?.expiresAt}</p>
        </div>
      ) : (
        <button 
          onClick={() => subscribe('ETH')}
          disabled={isSubscribing}
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe'}
        </button>
      )}
    </div>
  );
}`
};

export function CodePreview({ 
  title, 
  description, 
  code, 
  language = 'typescript',
  showPreview = false,
  previewComponent,
  className = '' 
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`bg-card rounded-xl border border-border overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div>
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        
        <div className="flex items-center space-x-2">
          {showPreview && previewComponent && (
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  activeTab === 'code'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code className="w-4 h-4 mr-1 inline" />
                Code
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Eye className="w-4 h-4 mr-1 inline" />
                Preview
              </button>
            </div>
          )}
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'code' ? (
        <div className="relative">
          <pre className="p-4 overflow-x-auto bg-muted/20 text-sm">
            <code className={`text-foreground font-mono leading-relaxed language-${language}`}>
              {code}
            </code>
          </pre>
        </div>
      ) : showPreview && previewComponent ? (
        <div className="p-6">
          {previewComponent}
        </div>
      ) : null}
    </div>
  );
}

// Pre-built code examples component
export function CodeExamples({ className = '' }: { className?: string }) {
  const [activeExample, setActiveExample] = useState<keyof typeof codeExamples>('subscribe');

  const examples = [
    { id: 'subscribe', title: 'Basic Subscription', description: 'Subscribe a user to a merchant' },
    { id: 'checkAccess', title: 'Check Access', description: 'Verify subscription status' },
    { id: 'reactComponent', title: 'React Component', description: 'Using the subscribe button' },
    { id: 'merchantSetup', title: 'Merchant Setup', description: 'Create a new merchant' },
    { id: 'hooks', title: 'React Hooks', description: 'Using subscription hooks' }
  ] as const;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Example selector */}
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeExample === example.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Code preview */}
      <CodePreview
        title={examples.find(e => e.id === activeExample)?.title}
        description={examples.find(e => e.id === activeExample)?.description}
        code={codeExamples[activeExample]}
        language="typescript"
      />
    </div>
  );
}