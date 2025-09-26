'use client';

import { useState } from 'react';
import { CreditCard, Check, AlertCircle, Loader2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock SubscriptionWidget Preview
export function SubscriptionWidgetPreview() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = () => {
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Premium Subscription</h3>
          <p className="text-sm text-muted-foreground">Merchant #1</p>
        </div>
        <div className="w-12 h-12 bg-brand-gradient rounded-lg flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Price</span>
          <span className="font-medium">0.01 ETH</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium">30 days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="text-brand-green font-medium">Active</span>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={status === 'loading'}
        className="w-full py-3 px-4 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center"
      >
        {status === 'idle' && 'Subscribe Now'}
        {status === 'loading' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="w-5 h-5 mr-2" />
            Subscribed!
          </>
        )}
      </button>
    </div>
  );
}

// Mock PaymentForm Preview
export function PaymentFormPreview() {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const tokens = ['ETH', 'USDC', 'DAI'];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl border border-border shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      
      <div className="space-y-3 mb-6">
        {tokens.map(token => (
          <button
            key={token}
            onClick={() => setSelectedToken(token)}
            className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
              selectedToken === token
                ? 'border-brand-blue bg-brand-blue/10'
                : 'border-border hover:border-brand-blue/30'
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-brand-gradient rounded-full mr-3" />
              <span className="font-medium">{token}</span>
            </div>
            {selectedToken === token && (
              <Check className="w-5 h-5 text-brand-blue" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 bg-accent rounded-lg mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-medium">0.01 {selectedToken}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Network Fee</span>
          <span className="font-medium">~0.001 ETH</span>
        </div>
      </div>

      <button className="w-full py-3 px-4 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-all">
        Pay with {selectedToken}
      </button>
    </div>
  );
}

// Mock AccessGate Preview
export function AccessGatePreview() {
  const [hasAccess, setHasAccess] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <button
          onClick={() => setHasAccess(!hasAccess)}
          className="text-sm px-4 py-2 rounded-lg bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 transition-colors"
        >
          Toggle Access: {hasAccess ? 'Granted' : 'Denied'}
        </button>
      </div>

      <div className="p-6 bg-card rounded-xl border border-border shadow-lg">
        {hasAccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
            <p className="text-muted-foreground">You have access to this exclusive content!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Subscription Required</h3>
            <p className="text-muted-foreground mb-4">Subscribe to access this content</p>
            <button className="px-6 py-2 bg-brand-gradient text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
              Subscribe Now
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Mock StatusIndicator Preview
export function StatusIndicatorPreview() {
  const statuses = [
    { status: 'active', label: 'Active', color: 'text-brand-green', bg: 'bg-brand-green/10', icon: Check },
    { status: 'expired', label: 'Expired', color: 'text-red-500', bg: 'bg-red-500/10', icon: AlertCircle },
    { status: 'pending', label: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {statuses.map(({ status, label, color, bg, icon: Icon }) => (
        <div key={status} className="p-4 bg-card rounded-lg border border-border flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mr-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="font-medium">Subscription Status</p>
              <p className={`text-sm ${color}`}>{label}</p>
            </div>
          </div>
          {status === 'active' && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Expires in</p>
              <p className="text-sm font-medium">28 days</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}