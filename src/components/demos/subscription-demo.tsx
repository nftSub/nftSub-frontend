'use client';

import { useState, useEffect } from 'react';
import { SubscriptionSDK } from '@nft-sub/sdk';
import { useAccount, useChainId, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Loader, 
  Calendar,
  DollarSign,
  Zap 
} from 'lucide-react';

interface SubscriptionDemoProps {
  merchantId?: bigint;
  className?: string;
}

export function SubscriptionDemo({ merchantId = BigInt(1), className = '' }: SubscriptionDemoProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const {data:walletClient,isLoading:walletLoading } = useWalletClient();
  
  const [sdk, setSdk] = useState<SubscriptionSDK | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'none' | 'active' | 'expired'>('none');
  const [subscriptionData, setSubscriptionData] = useState<{
    expiresAt: Date;
    plan: string;
    price: string;
  } | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize SDK when wallet connects
  useEffect(() => {
    const initializeSDK = async () => {
      if (isConnected && address && walletClient) {
        try {
          const newSdk = new SubscriptionSDK({
            chain: chainId === 11155111 ? 'sepolia' : 'mainnet',
            walletClient:walletClient,
            readOnly: false
          });
          setSdk(newSdk);
          
          // Check existing subscription status
          await checkSubscriptionStatus(newSdk);
        } catch (err) {
          console.error('Failed to initialize SDK:', err);
          setError('Failed to initialize SDK');
        }
      } else {
        setSdk(null);
        setSubscriptionStatus('none');
        setSubscriptionData(null);
      }
    };

    initializeSDK();
  }, [isConnected, address, chainId,walletClient]);

  const checkSubscriptionStatus = async (sdkInstance: SubscriptionSDK) => {
    if (!address) return;
    
    try {
      const hasAccess = await sdkInstance.checkAccess(merchantId, address);
      
      if (hasAccess) {
        setSubscriptionStatus('active');
        // Get subscription details
        // This would need to be implemented in the actual SDK
        setSubscriptionData({
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Mock: 30 days from now
          plan: 'Premium',
          price: '0.01 ETH'
        });
      } else {
        setSubscriptionStatus('none');
        setSubscriptionData(null);
      }
    } catch (err) {
      console.error('Failed to check subscription status:', err);
    }
  };

  const handleSubscribe = async (paymentToken: `0x${string}` | "ETH") => {
    if (!sdk || !address) return;

    setIsSubscribing(true);
    setError(null);
    setTxHash(null);

    try {
      const txHash = await sdk.subscribe(merchantId, paymentToken);
      setTxHash(txHash);
      
      // Wait for transaction confirmation
      await sdk.waitForTransaction(txHash);
      
      // Update subscription status
      await checkSubscriptionStatus(sdk);
      
      setIsSubscribing(false);
    } catch (err: unknown) {
      console.error('Subscription failed:', err);
      setError(err instanceof Error ? err.message : 'Subscription failed');
      setIsSubscribing(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className={`bg-card rounded-xl border border-border p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-6">
          Connect your wallet to interact with NFT subscription services
        </p>
        <ConnectButton />
      </div>
    );
  }

    // Show loading state while wallet client is loading
    if (walletLoading || !walletClient) {
      return (
        <div className={`bg-card rounded-xl border border-border p-8 text-center ${className}`}>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Loading Wallet</h3>
          <p className="text-muted-foreground">
            Setting up your wallet connection...
          </p>
        </div>
      );
    }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Subscription Status Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Subscription Status</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            subscriptionStatus === 'active' 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            {subscriptionStatus === 'active' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>No Subscription</span>
              </>
            )}
          </div>
        </div>

        {subscriptionStatus === 'active' && subscriptionData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expires</p>
                <p className="font-medium text-foreground">
                  {subscriptionData.expiresAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium text-foreground">{subscriptionData.plan}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium text-foreground">{subscriptionData.price}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground">No active subscription found</p>
          </div>
        )}
      </div>

      {/* Subscribe Actions */}
      {subscriptionStatus !== 'active' && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Subscribe to Premium</h3>
          <p className="text-muted-foreground mb-6">
            Get access to premium features including advanced analytics, priority support, and exclusive content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleSubscribe('ETH')}
              disabled={isSubscribing}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Subscribe with ETH</span>
                </>
              )}
            </button>
            
            {/* <button
              onClick={() => handleSubscribe('USDC')}
              disabled={isSubscribing}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <DollarSign className="w-5 h-5" />
                  <span>Subscribe with USDC</span>
                </>
              )}
            </button> */}
          </div>
        </div>
      )}

      {/* Transaction Status */}
      {(txHash || error) && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Status</h3>
          
          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-400">Transaction Failed</p>
                <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
              </div>
            </div>
          )}
          
          {txHash && !error && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-400">Transaction Successful</p>
                <p className="text-sm text-green-600 dark:text-green-500">
                  TX: {formatAddress(txHash)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Connected Wallet Info */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Wallet Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-mono text-sm text-foreground">{formatAddress(address!)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Network:</span>
            <span className="text-foreground">
              {chainId === 11155111 ? 'Sepolia Testnet' : 'Ethereum Mainnet'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Merchant ID:</span>
            <span className="font-mono text-sm text-foreground">{merchantId.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}