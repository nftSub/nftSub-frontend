import { 
  getSepoliaConfig, 
  getReactiveConfig, 
  getBaseConfig,
  getBscConfig,
  getAvalancheConfig,
  getSonicConfig,
  DEFAULT_MERCHANT_ID 
} from './env';

// Get contract addresses from environment configuration
const baseConfig = getBaseConfig();
const bscConfig = getBscConfig();
const avalancheConfig = getAvalancheConfig();
const sonicConfig = getSonicConfig();
const sepoliaConfig = getSepoliaConfig();
const reactiveConfig = getReactiveConfig();

export const CONTRACT_ADDRESSES = {
  // Mainnet chains - all use same addresses
  base: {
    subscriptionManager: baseConfig.contracts.subscriptionManager,
    subscriptionNFT: baseConfig.contracts.subscriptionNFT,
    explorer: baseConfig.explorer,
  },
  bsc: {
    subscriptionManager: bscConfig.contracts.subscriptionManager,
    subscriptionNFT: bscConfig.contracts.subscriptionNFT,
    explorer: bscConfig.explorer,
  },
  avalanche: {
    subscriptionManager: avalancheConfig.contracts.subscriptionManager,
    subscriptionNFT: avalancheConfig.contracts.subscriptionNFT,
    explorer: avalancheConfig.explorer,
  },
  sonic: {
    subscriptionManager: sonicConfig.contracts.subscriptionManager,
    subscriptionNFT: sonicConfig.contracts.subscriptionNFT,
    explorer: sonicConfig.explorer,
  },
  // Testnet
  sepolia: {
    subscriptionManager: sepoliaConfig.contracts.subscriptionManager,
    subscriptionNFT: sepoliaConfig.contracts.subscriptionNFT,
    testToken: sepoliaConfig.contracts.testToken,
    explorer: sepoliaConfig.explorer,
  },
  reactive: {
    subscriptionReactive: reactiveConfig.contracts.subscriptionReactive,
    explorer: reactiveConfig.explorer,
  },
} as const;

export const CHAIN_IDS = {
  base: baseConfig.chainId,
  bsc: bscConfig.chainId,
  avalanche: avalancheConfig.chainId,
  sonic: sonicConfig.chainId,
  sepolia: sepoliaConfig.chainId,
  reactive: reactiveConfig.chainId,
} as const;

// Helper function to get explorer URL for a contract
export function getExplorerUrl(network: keyof typeof CONTRACT_ADDRESSES, contractType: 'manager' | 'nft'): string {
  const config = CONTRACT_ADDRESSES[network];
  const explorer = config.explorer;
  
  if (contractType === 'manager' && 'subscriptionManager' in config) {
    return `${explorer}/address/${config.subscriptionManager}`;
  } else if (contractType === 'nft' && 'subscriptionNFT' in config) {
    return `${explorer}/address/${config.subscriptionNFT}`;
  }
  
  return explorer;
}

// Use environment-configured default merchant ID
export const MERCHANT_ID = DEFAULT_MERCHANT_ID;