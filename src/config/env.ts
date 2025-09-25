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
    sepolia: {
      chainId: number;
      rpcUrl: string;
      contracts: {
        subscriptionManager: string;
        subscriptionNFT: string;
        testToken: string;
      };
    };
    reactive: {
      chainId: number;
      rpcUrl: string;
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
    sepolia: {
      chainId: 11155111,
      rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://ethereum-sepolia.publicnode.com',
      contracts: {
        subscriptionManager: process.env.NEXT_PUBLIC_SEPOLIA_SUBSCRIPTION_MANAGER || '0x82b069578ae3dA9ea740D24934334208b83E530E',
        subscriptionNFT: process.env.NEXT_PUBLIC_SEPOLIA_SUBSCRIPTION_NFT || '0x404cb817FA393D3689D1405DB0B76a20eDE72d43',
        testToken: process.env.NEXT_PUBLIC_SEPOLIA_TEST_TOKEN || '0x10586EBF2Ce1F3e851a8F15659cBa15b03Eb8B8A',
      },
    },
    reactive: {
      chainId: 5318008,
      rpcUrl: process.env.NEXT_PUBLIC_REACTIVE_RPC_URL || 'https://lasna-rpc.rnk.dev/',
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
  
  // Check WalletConnect Project ID in production
  if (config.app.environment === 'production' && !config.walletConnect.projectId) {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for production');
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
    
    if (config.app.environment === 'production') {
      throw new Error('Configuration validation failed in production environment');
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
export const getNetworkConfig = (network: 'sepolia' | 'reactive') => appConfig.networks[network];
export const getSepoliaConfig = () => appConfig.networks.sepolia;
export const getReactiveConfig = () => appConfig.networks.reactive;
export const isProduction = () => appConfig.app.environment === 'production';
export const isDevelopment = () => appConfig.app.environment === 'development';
export const isDebugEnabled = () => appConfig.features.debugging;
export const isDemoMode = () => appConfig.features.demoMode;

// Default merchant ID for demo/testing purposes - should be configurable per deployment
export const DEFAULT_MERCHANT_ID = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MERCHANT_ID || '1', 10);