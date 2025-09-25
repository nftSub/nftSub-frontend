'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: bigint;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
}

const paymentTokens = [
  { symbol: 'ETH', name: 'Ethereum', icon: '⟠' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'DAI', name: 'DAI Stablecoin', icon: '◈' },
];

export function SubscriptionModal({
  isOpen,
  onClose,
  merchantId,
  onSuccess,
  onError
}: SubscriptionModalProps) {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      setStatus('loading');
      setStatusMessage('Processing subscription...');

      // Simulate subscription (replace with actual SDK call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTxHash = '0x' + Math.random().toString(16).slice(2);
      
      setStatus('success');
      setStatusMessage('Subscription successful!');
      onSuccess?.(mockTxHash);
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setStatusMessage('Subscription failed. Please try again.');
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setStatusMessage('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Subscribe to Service</h2>
                    <p className="text-sm text-muted-foreground">Merchant #{merchantId.toString()}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {status === 'idle' && (
                  <>
                    {/* Token Selection */}
                    <div className="space-y-3 mb-6">
                      <label className="text-sm font-medium text-foreground">Select Payment Token</label>
                      <div className="grid grid-cols-3 gap-3">
                        {paymentTokens.map((token) => (
                          <button
                            key={token.symbol}
                            onClick={() => setSelectedToken(token.symbol)}
                            className={`p-3 rounded-lg border transition-all ${
                              selectedToken === token.symbol
                                ? 'border-brand-blue bg-brand-blue/10'
                                : 'border-border hover:border-brand-blue/30'
                            }`}
                          >
                            <div className="text-2xl mb-1">{token.icon}</div>
                            <div className="text-sm font-medium">{token.symbol}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="bg-accent rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="font-semibold">0.01 {selectedToken}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-semibold">30 days</span>
                      </div>
                    </div>

                    {/* Subscribe Button */}
                    <button
                      onClick={handleSubscribe}
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </span>
                      ) : (
                        `Subscribe with ${selectedToken}`
                      )}
                    </button>
                  </>
                )}

                {/* Status States */}
                {status === 'loading' && (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 animate-spin text-brand-blue mx-auto mb-4" />
                    <p className="text-muted-foreground">{statusMessage}</p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
                    <p className="font-semibold text-brand-green mb-2">{statusMessage}</p>
                    <p className="text-sm text-muted-foreground">Redirecting...</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="font-semibold text-red-500 mb-2">{statusMessage}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm text-brand-blue hover:underline"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}