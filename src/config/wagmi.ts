import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { getWalletConnectConfig, getSepoliaConfig, appConfig } from './env';

const walletConnectConfig = getWalletConnectConfig();
const sepoliaConfig = getSepoliaConfig();

export const config = getDefaultConfig({
  appName: appConfig.app.name,
  projectId: walletConnectConfig.projectId || 'demo-project-id',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(sepoliaConfig.rpcUrl),
  },
});