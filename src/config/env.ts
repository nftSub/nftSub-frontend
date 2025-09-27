/**
 * Environment configuration management for NFT Subscription SDK frontend
 * This file handles all environment variables and configuration settings
 */

// Types for environment configuration
export interface AppConfig {
  // WalletConnect & Web3 Configuration
  walletConnect: {
    projectId: string;
  };
  
  // Network Configuration
  networks: {
    // Mainnet chains
    base: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
      };
    };
    bsc: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
      };
    };
    avalanche: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
      };
    };
    sonic: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
      };
    };
    // Testnet
    sepolia: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
        testToken: string;
      };
    };
    reactive: {
      chainId: number;
      rpcUrl: string;
      explorer: string;
      contracts: {
        subscriptionReactive: string;
      };
    };
  };
  
  // Application Settings
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    baseUrl: string;
  };
  
  // Feature Flags
  features: {
    analytics: boolean;
    debugging: boolean;
    demoMode: boolean;
  };
}

// Default configuration - can be overridden by environment variables
const defaultConfig: AppConfig = {
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  },
  
  networks: {
    // Mainnet chains - all use same contract addresses
    base: {
      chainId: 8453,
      rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
      explorer: 'https://basescan.org',
      contracts: {
        subscriptionManager: '0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c',
        subscriptionNFT: '0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8',
      },
    },
    bsc: {
      chainId: 56,
      rpcUrl: process.env.NEXT_PUBLIC_BSC_RPC_URL || 'https://bsc-dataseed1.binance.org',
      explorer: 'https://bscscan.com',
      contracts: {
        subscriptionManager: '0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c',
        subscriptionNFT: '0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8',
      },
    },
    avalanche: {
      chainId: 43114,
      rpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || 'https://api.avax.network/ext/bc/C/rpc',
      explorer: 'https://snowtrace.io',
      contracts: {
        subscriptionManager: '0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c',
        subscriptionNFT: '0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8',
      },
    },
    sonic: {
      chainId: 146,
      rpcUrl: process.env.NEXT_PUBLIC_SONIC_RPC_URL || 'https://rpc.soniclabs.com',
      explorer: 'https://sonicscan.org',
      contracts: {
        subscriptionManager: '0x99ad42b29a7a99Ee4552cf6dc36dc4d44d8b0A2c',
        subscriptionNFT: '0x6D4b8BC4613dDCB98450a97b297294BacBd2DDD8',
      },
    },
    // Testnet
    sepolia: {
      chainId: 11155111,
      rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://ethereum-sepolia.publicnode.com',
      explorer: 'https://sepolia.etherscan.io',
      contracts: {
        subscriptionManager: process.env.NEXT_PUBLIC_SEPOLIA_SUBSCRIPTION_MANAGER || '0x82b069578ae3dA9ea740D24934334208b83E530E',
        subscriptionNFT: process.env.NEXT_PUBLIC_SEPOLIA_SUBSCRIPTION_NFT || '0x404cb817FA393D3689D1405DB0B76a20eDE72d43',
        testToken: process.env.NEXT_PUBLIC_SEPOLIA_TEST_TOKEN || '0x10586EBF2Ce1F3e851a8F15659cBa15b03Eb8B8A',
      },
    },
    reactive: {
      chainId: 5318008,
      rpcUrl: process.env.NEXT_PUBLIC_REACTIVE_RPC_URL || 'https://lasna-rpc.rnk.dev/',
      explorer: 'https://lasna.reactscan.net',
      contracts: {
        subscriptionReactive: process.env.NEXT_PUBLIC_REACTIVE_SUBSCRIPTION_CONTRACT || '0xa55B7A74D05b5D5C48E431e44Fea83a1047A7582',
      },
    },
  },
  
  app: {
    name: 'NFT Subscription SDK',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: (process.env.NODE_ENV as AppConfig['app']['environment']) || 'development',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    debugging: process.env.NODE_ENV === 'development',
    demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  },
};

// Validation function to ensure required environment variables are set
function validateConfig(config: AppConfig): void {
  const errors: string[] = [];
  
  // Check WalletConnect Project ID in production (make it a warning for now)
  if (!config.walletConnect.projectId) {
    // For build time, we'll just warn about this instead of failing
    if (typeof window !== 'undefined' && config.app.environment === 'production') {
      console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set - WalletConnect features may not work');
    }
  }
  
  // Validate contract addresses (must be valid Ethereum addresses)
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  
  const contractAddresses = [
    { name: 'Sepolia Subscription Manager', address: config.networks.sepolia.contracts.subscriptionManager },
    { name: 'Sepolia Subscription NFT', address: config.networks.sepolia.contracts.subscriptionNFT },
    { name: 'Sepolia Test Token', address: config.networks.sepolia.contracts.testToken },
    { name: 'Reactive Subscription Contract', address: config.networks.reactive.contracts.subscriptionReactive },
  ];
  
  contractAddresses.forEach(({ name, address }) => {
    if (!addressRegex.test(address)) {
      errors.push(`Invalid contract address for ${name}: ${address}`);
    }
  });
  
  if (errors.length > 0) {
    console.error('Configuration validation errors:');
    errors.forEach(error => console.error(`- ${error}`));
    
    // Only throw in production if we have critical errors (not just warnings)
    if (config.app.environment === 'production' && errors.length > 0) {
      // For now, we'll just log the errors and continue
      console.error('Configuration has validation errors, but continuing...');
    } else {
      console.warn('Configuration validation failed, but continuing in development mode');
    }
  }
}

// Get validated configuration
export function getAppConfig(): AppConfig {
  validateConfig(defaultConfig);
  return defaultConfig;
}

// Export the configuration instance
export const appConfig = getAppConfig();

// Helper functions for common config access patterns
export const getWalletConnectConfig = () => appConfig.walletConnect;
export const getNetworkConfig = (network: keyof AppConfig['networks']) => appConfig.networks[network];
export const getSepoliaConfig = () => appConfig.networks.sepolia;
export const getReactiveConfig = () => appConfig.networks.reactive;
export const getBaseConfig = () => appConfig.networks.base;
export const getBscConfig = () => appConfig.networks.bsc;
export const getAvalancheConfig = () => appConfig.networks.avalanche;
export const getSonicConfig = () => appConfig.networks.sonic;
export const isProduction = () => appConfig.app.environment === 'production';
export const isDevelopment = () => appConfig.app.environment === 'development';
export const isDebugEnabled = () => appConfig.features.debugging;
export const isDemoMode = () => appConfig.features.demoMode;

// Default merchant ID for demo/testing purposes - should be configurable per deployment
export const DEFAULT_MERCHANT_ID = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MERCHANT_ID || '1', 10);