'use client';

import { motion } from 'framer-motion';
import { Code, Copy, CheckCircle, Package, Zap, CreditCard, Shield, Eye, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { H1, H2, H3, P, Lead, GradientText } from '@/components/Typography';
import {
  SubscriptionWidgetPreview,
  PaymentFormPreview,
  AccessGatePreview,
  StatusIndicatorPreview
} from '@/components/component-previews';

const components = [
  {
    name: 'SubscriptionWidget',
    description: 'All-in-one subscription management component',
    preview: SubscriptionWidgetPreview,
    props: [
      { name: 'merchantId', type: 'bigint', description: 'The merchant ID to subscribe to' },
      { name: 'className', type: 'string?', description: 'Optional CSS class names' },
      { name: 'onSuccess', type: '(txHash: string) => void', description: 'Callback on successful subscription' },
      { name: 'onError', type: '(error: Error) => void', description: 'Callback on error' }
    ],
    example: `<SubscriptionWidget
  merchantId={1n}
  onSuccess={(txHash) => console.log('Success:', txHash)}
  onError={(error) => console.error('Error:', error)}
/>`
  },
  {
    name: 'PaymentForm',
    description: 'Flexible payment form with multiple token support',
    preview: PaymentFormPreview,
    props: [
      { name: 'supportedTokens', type: 'string[]', description: 'Array of supported payment tokens' },
      { name: 'defaultToken', type: 'string', description: 'Default selected token' },
      { name: 'onSubmit', type: '(token: string, amount: bigint) => void', description: 'Submit handler' },
      { name: 'loading', type: 'boolean?', description: 'Loading state indicator' }
    ],
    example: `<PaymentForm
  supportedTokens={['ETH', 'USDC', 'DAI']}
  defaultToken="ETH"
  onSubmit={(token, amount) => handlePayment(token, amount)}
  loading={isProcessing}
/>`
  },
  {
    name: 'AccessGate',
    description: 'Conditional rendering based on subscription status',
    preview: AccessGatePreview,
    props: [
      { name: 'merchantId', type: 'bigint', description: 'Merchant ID to check access for' },
      { name: 'children', type: 'ReactNode', description: 'Content to show when access is granted' },
      { name: 'fallback', type: 'ReactNode?', description: 'Content to show when access is denied' },
      { name: 'loading', type: 'ReactNode?', description: 'Content to show while checking access' }
    ],
    example: `<AccessGate 
  merchantId={1n}
  fallback={<SubscribePrompt />}
  loading={<Spinner />}
>
  <PremiumContent />
</AccessGate>`
  },
  {
    name: 'StatusIndicator',
    description: 'Visual subscription status display',
    preview: StatusIndicatorPreview,
    props: [
      { name: 'status', type: "'active' | 'expired' | 'none'", description: 'Current subscription status' },
      { name: 'expiresAt', type: 'Date?', description: 'Expiration date for active subscriptions' },
      { name: 'showDetails', type: 'boolean?', description: 'Show detailed information' },
      { name: 'compact', type: 'boolean?', description: 'Use compact display mode' }
    ],
    example: `<StatusIndicator
  status="active"
  expiresAt={new Date('2024-12-31')}
  showDetails={true}
/>`
  }
];

export default function ComponentsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewModes, setViewModes] = useState<{ [key: string]: 'code' | 'preview' }>({});
  const [expandedComponent, setExpandedComponent] = useState<string>('SubscriptionWidget'); // First component expanded by default

  const copyToClipboard = async (text: string, codeId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getViewMode = (componentName: string) => viewModes[componentName] || 'code';
  const setViewMode = (componentName: string, mode: 'code' | 'preview') => {
    setViewModes(prev => ({ ...prev, [componentName]: mode }));
  };

  const toggleExpanded = (componentName: string) => {
    setExpandedComponent(expandedComponent === componentName ? '' : componentName);
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
          <GradientText>Component</GradientText> Library
        </H1>
        <Lead className="max-w-3xl">
          Pre-built React components designed to accelerate your subscription NFT integration.
          Copy, paste, and customize to match your brand.
        </Lead>
      </motion.div>

      {/* Installation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center mr-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          <H2 className="m-0">Installation</H2>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-6 relative">
            <pre className="text-sm text-foreground font-mono overflow-x-auto">
              <code>pnpm add @nft-sub/components @nft-sub/sdk</code>
            </pre>
            <button
              onClick={() => copyToClipboard('pnpm add @nft-sub/components @nft-sub/sdk', 'install')}
              className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors"
            >
              {copiedCode === 'install' ? (
                <CheckCircle className="w-4 h-4 text-brand-green" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-brand-blue" />
            <span>TypeScript support</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-brand-green" />
            <span>Fully tested</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CreditCard className="w-4 h-4 text-brand-purple" />
            <span>Production ready</span>
          </div>
        </div>
      </motion.section>


      {/* Components List */}
      {components.map((component, index) => {
        const isExpanded = expandedComponent === component.name;
        
        return (
          <motion.section
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            {/* Clickable Header */}
            <div 
              className="p-6 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => toggleExpanded(component.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <H3 className="text-xl mb-1 font-mono">
                    <GradientText>{component.name}</GradientText>
                  </H3>
                  <P className="text-sm text-muted-foreground m-0">{component.description}</P>
                </div>
                
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="px-8 pb-8">
                {/* View Mode Toggle */}
                <div className="flex justify-end mb-6">
                  <div className="inline-flex items-center p-1 bg-background rounded-lg border border-border">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewMode(component.name, 'code');
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        getViewMode(component.name) === 'code'
                          ? 'bg-brand-gradient text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Code className="w-4 h-4 inline mr-1.5" />
                      Code
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewMode(component.name, 'preview');
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        getViewMode(component.name) === 'preview'
                          ? 'bg-brand-gradient text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Eye className="w-4 h-4 inline mr-1.5" />
                      Preview
                    </button>
                  </div>
                </div>

                {getViewMode(component.name) === 'code' ? (
              <>
                {/* Props Table */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Props</h4>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-card/50">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Prop</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Type</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {component.props.map((prop, i) => (
                          <tr key={prop.name} className={i % 2 === 0 ? 'bg-background/50' : ''}>
                            <td className="p-3 font-mono text-sm text-brand-blue">{prop.name}</td>
                            <td className="p-3 font-mono text-sm text-foreground">{prop.type}</td>
                            <td className="p-3 text-sm text-muted-foreground">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example Code */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Example Usage</h4>
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="border-b border-border bg-card/80 px-4 py-2">
                      <span className="font-mono text-xs text-muted-foreground">component.tsx</span>
                    </div>
                    <div className="p-4 relative">
                      <pre className="text-sm text-foreground font-mono overflow-x-auto">
                        <code>{component.example}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(component.example, component.name)}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors"
                      >
                        {copiedCode === component.name ? (
                          <CheckCircle className="w-4 h-4 text-brand-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Live Preview */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Live Preview</h4>
                  <div className="rounded-lg border border-border bg-background p-8">
                    <component.preview />
                  </div>
                </div>
                
                {/* Code snippet below preview */}
                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3">Usage Code</h4>
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="p-4 relative">
                      <pre className="text-sm text-foreground font-mono overflow-x-auto">
                        <code>{component.example}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(component.example, component.name + '-preview')}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors"
                      >
                        {copiedCode === component.name + '-preview' ? (
                          <CheckCircle className="w-4 h-4 text-brand-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
              </div>
            </div>
          </motion.section>
        );
      })}

      {/* Best Practices */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
      >
        <H2 className="mb-6">Best Practices</H2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-foreground">1</span>
            </div>
            <div>
              <P className="font-semibold m-0 mb-1">Handle Loading States</P>
              <P className="text-sm text-muted-foreground m-0">
                Always provide visual feedback during blockchain transactions
              </P>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-brand-green">2</span>
            </div>
            <div>
              <P className="font-semibold m-0 mb-1">Error Boundaries</P>
              <P className="text-sm text-muted-foreground m-0">
                Wrap components in error boundaries to gracefully handle failures
              </P>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-brand-purple">3</span>
            </div>
            <div>
              <P className="font-semibold m-0 mb-1">Optimize Re-renders</P>
              <P className="text-sm text-muted-foreground m-0">
                Use React.memo and useMemo for expensive computations
              </P>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-white">4</span>
            </div>
            <div>
              <P className="font-semibold m-0 mb-1">Accessibility First</P>
              <P className="text-sm text-muted-foreground m-0">
                Ensure all interactive elements are keyboard navigable and screen reader friendly
              </P>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}