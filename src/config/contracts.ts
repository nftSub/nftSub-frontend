import { getSepoliaConfig, getReactiveConfig, DEFAULT_MERCHANT_ID } from './env';

// Get contract addresses from environment configuration
const sepoliaConfig = getSepoliaConfig();
const reactiveConfig = getReactiveConfig();

export const CONTRACT_ADDRESSES = {
  sepolia: {
    subscriptionManager: sepoliaConfig.contracts.subscriptionManager,
    subscriptionNFT: sepoliaConfig.contracts.subscriptionNFT,
    testToken: sepoliaConfig.contracts.testToken,
  },
  reactive: {
    subscriptionReactive: reactiveConfig.contracts.subscriptionReactive,
  },
} as const;

export const CHAIN_IDS = {
  sepolia: sepoliaConfig.chainId,
  reactive: reactiveConfig.chainId,
} as const;

// Use environment-configured default merchant ID
export const MERCHANT_ID = DEFAULT_MERCHANT_ID;