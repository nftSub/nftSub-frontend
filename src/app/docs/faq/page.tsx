'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { H1, H2, P, Lead, GradientText } from '@/components/Typography';
import { useState } from 'react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is the Subscription NFT Platform?',
        a: 'The Subscription NFT Platform is a decentralized subscription management system that uses NFTs to represent active subscriptions. It enables merchants to accept recurring payments on-chain without any centralized intermediaries, while users maintain full control over their subscriptions.'
      },
      {
        q: 'How are subscriptions different from traditional payment systems?',
        a: 'Unlike traditional systems, our platform is fully decentralized with no single point of failure. Subscriptions are represented as NFTs that users own, payments are processed automatically via smart contracts, and users can cancel anytime without contacting support. Everything runs transparently on the blockchain.'
      },
      {
        q: 'What blockchains are supported?',
        a: 'Currently, we support Ethereum Sepolia testnet with Reactive Network for cross-chain automation. We plan to expand to Ethereum mainnet, Base, Arbitrum, and other EVM-compatible chains in the near future.'
      },
      {
        q: 'Is this platform audited?',
        a: 'We are currently in the process of getting our smart contracts audited by reputable firms. The audit reports will be published publicly once completed. In the meantime, all our contracts are open-source and available for review on GitHub.'
      }
    ]
  },
  {
    category: 'For Merchants',
    questions: [
      {
        q: 'How do I set up subscriptions for my service?',
        a: 'Setting up is simple: 1) Register as a merchant by calling registerMerchant() with your payment wallet and subscription parameters, 2) Set accepted payment tokens and prices using setPaymentToken(), 3) Integrate our SDK components into your app to enable subscription functionality.'
      },
      {
        q: 'What payment tokens can I accept?',
        a: 'You can accept any ERC-20 token including stablecoins like USDC, DAI, and USDT, as well as native ETH. You can set different prices for different tokens and let users choose their preferred payment method.'
      },
      {
        q: 'How do I receive payments?',
        a: 'Payments are automatically sent to the wallet address you specified during merchant registration. When a user subscribes or renews, the payment is instantly transferred to your wallet - no waiting for settlement periods.'
      },
      {
        q: 'Can I offer free trials or discounts?',
        a: 'Yes! You can implement free trials by minting time-limited NFTs without requiring payment. Discounts can be offered through special pricing tiers or coupon contracts that interact with the main subscription system.'
      },
      {
        q: 'How do grace periods work?',
        a: 'Grace periods give users extra time to renew expired subscriptions without losing access. You set the grace period duration during merchant registration. During this period, the subscription NFT remains valid but is marked as "in grace period".'
      }
    ]
  },
  {
    category: 'For Users',
    questions: [
      {
        q: 'How do I subscribe to a service?',
        a: 'To subscribe: 1) Connect your wallet to the merchant\'s app, 2) Choose your payment token and approve the transaction, 3) Confirm the subscription. You\'ll receive an NFT representing your active subscription that automatically grants you access.'
      },
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes! You have full control over your subscription. You can cancel anytime by calling the cancel function or simply not renewing when it expires. There are no hidden fees or complicated cancellation processes.'
      },
      {
        q: 'What happens when my subscription expires?',
        a: 'When your subscription expires, the NFT metadata is updated to reflect the expired status. If the merchant has configured a grace period, you\'ll have extra time to renew without losing access. After the grace period, access is revoked but you keep the NFT as proof of past subscription.'
      },
      {
        q: 'How are renewals handled?',
        a: 'Renewals can be automatic or manual depending on your preference. For automatic renewals, ensure you have sufficient token balance and allowance. The Reactive Network monitors expiry dates and processes renewals automatically. For manual renewals, you\'ll need to approve each payment.'
      },
      {
        q: 'Can I transfer my subscription to someone else?',
        a: 'Yes, since subscriptions are NFTs, you can transfer them like any other NFT. This enables subscription gifting, reselling, or account transfers. The new owner will have access until the subscription expires.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'How does the Reactive Network enable automation?',
        a: 'Reactive Network is a cross-chain automation layer that listens to blockchain events and triggers actions automatically. It monitors payment events, checks subscription expiries via CRON jobs, and executes renewal transactions without requiring manual intervention.'
      },
      {
        q: 'What is the gas cost for subscriptions?',
        a: 'Gas costs vary by network and transaction complexity. Typically: Initial subscription costs ~150k gas, renewals cost ~100k gas, and cancellations cost ~50k gas. We\'re working on L2 deployments and batch processing to reduce costs further.'
      },
      {
        q: 'How do I integrate the SDK into my app?',
        a: 'Integration is straightforward: 1) Install the SDK via npm/yarn, 2) Initialize the SDK with your provider and contract addresses, 3) Use our React hooks and components in your app. Check our documentation for detailed integration guides and code examples.'
      },
      {
        q: 'Can I customize the subscription logic?',
        a: 'Yes! Our contracts are modular and extensible. You can deploy custom logic contracts that interact with the core subscription system, implement custom pricing models, add loyalty rewards, or integrate with other DeFi protocols.'
      },
      {
        q: 'How are subscription NFTs stored?',
        a: 'Subscription NFTs follow the ERC-1155 standard with on-chain metadata. Each token ID represents a unique user-merchant pair, and the metadata includes subscription status, expiry date, and payment history. This ensures full transparency and decentralization.'
      }
    ]
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'Is my payment information secure?',
        a: 'Yes! All payments are processed directly on the blockchain through audited smart contracts. We never store or have access to your private keys or sensitive payment information. Every transaction is transparent and verifiable on-chain.'
      },
      {
        q: 'Can merchants change subscription terms after I subscribe?',
        a: 'No, subscription terms are locked in when you subscribe. Merchants can update terms for new subscriptions, but existing subscriptions continue with their original terms until they expire or are renewed with new terms.'
      },
      {
        q: 'What happens if there\'s a smart contract bug?',
        a: 'Our contracts include emergency pause functionality and upgrade mechanisms through proxy patterns. In case of critical bugs, contracts can be paused to prevent losses. We also maintain insurance funds and will implement bug bounty programs post-audit.'
      },
      {
        q: 'Is my subscription data private?',
        a: 'Subscription data is pseudonymous on the blockchain - tied to wallet addresses rather than personal identities. While transactions are public, your real identity remains private unless you choose to reveal it.'
      }
    ]
  }
];

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
          <GradientText>Frequently Asked</GradientText> Questions
        </H1>
        <Lead className="max-w-3xl">
          Find answers to common questions about the Subscription NFT platform.
          Can't find what you're looking for? Reach out to our community on Discord.
        </Lead>
      </motion.div>

      {/* FAQ Categories */}
      {faqs.map((category, categoryIndex) => (
        <motion.section
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1 }}
        >
          <div className="mb-6">
            <H2 className="text-2xl flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-brand-green" />
              {category.category}
            </H2>
          </div>

          <div className="space-y-4">
            {category.questions.map((item, index) => {
              const key = `${category.category}-${index}`;
              const isExpanded = expandedItems[key] || false;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="rounded-xl border border-border bg-card/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(category.category, index)}
                    className="w-full p-6 text-left hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <P className="font-semibold m-0 pr-4">{item.q}</P>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6">
                      <P className="text-muted-foreground">{item.a}</P>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      ))}

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="rounded-2xl border border-border bg-card/50 p-8 text-center"
      >
        <H2 className="mb-4">Still Have Questions?</H2>
        <P className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our community is here to help! Join our Discord server to get support from the team
          and other developers building with Subscription NFTs.
        </P>
        <div className="flex items-center justify-center space-x-4">
          <a
            href="https://discord.gg/subscription-nft"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Join Discord
          </a>
          <a
            href="https://github.com/reactive-network/nft-subscription-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border bg-card text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
          >
            View GitHub
          </a>
        </div>
      </motion.section>
    </div>
  );
}