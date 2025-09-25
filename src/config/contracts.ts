import { getSepoliaConfig, getReactiveConfig, DEFAULT_MERCHANT_ID } from './env';

// Get contract addresses from environment configuration
const sepoliaConfig = getSepoliaConfig();
const reactiveConfig = getReactiveConfig();

export const CONTRACT_ADDRESSES = {
  sepolia: {
    subscriptionManager: sepoliaConfig.contracts.subscriptionManager as const,
    subscriptionNFT: sepoliaConfig.contracts.subscriptionNFT as const,
    testToken: sepoliaConfig.contracts.testToken as const,
  },
  reactive: {
    subscriptionReactive: reactiveConfig.contracts.subscriptionReactive as const,
  },
} as const;

export const CHAIN_IDS = {
  sepolia: sepoliaConfig.chainId,
  reactive: reactiveConfig.chainId,
} as const;

// Use environment-configured default merchant ID
export const MERCHANT_ID = DEFAULT_MERCHANT_ID;