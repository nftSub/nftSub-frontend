// Extracted ABIs from contract artifacts

export const subscriptionManagerABI = [
  {
    "type": "function",
    "name": "getMerchantBalance",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "token", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMerchantPlan",
    "inputs": [{"name": "merchantId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "tuple", "components": [{"name": "payoutAddress", "type": "address"}, {"name": "subscriptionPeriod", "type": "uint64"}, {"name": "gracePeriod", "type": "uint64"}, {"name": "isActive", "type": "bool"}, {"name": "totalSubscribers", "type": "uint256"}]}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMerchantPrice",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "token", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isMerchantTokenAccepted",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "token", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "platformFeeBps",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint16"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerMerchant",
    "inputs": [{"name": "payoutAddress", "type": "address"}, {"name": "subscriptionPeriod", "type": "uint64"}, {"name": "gracePeriod", "type": "uint64"}],
    "outputs": [{"name": "merchantId", "type": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setMerchantPrice",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "paymentToken", "type": "address"}, {"name": "price", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "subscribe",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "paymentToken", "type": "address"}],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "updateMerchantPlan",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "payoutAddress", "type": "address"}, {"name": "subscriptionPeriod", "type": "uint64"}, {"name": "isActive", "type": "bool"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawMerchantBalance",
    "inputs": [{"name": "merchantId", "type": "uint256"}, {"name": "token", "type": "address"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawPlatformFees",
    "inputs": [{"name": "token", "type": "address"}, {"name": "to", "type": "address"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "MerchantRegistered",
    "inputs": [{"name": "merchantId", "type": "uint256", "indexed": true}, {"name": "owner", "type": "address", "indexed": true}, {"name": "payoutAddress", "type": "address", "indexed": false}]
  },
  {
    "type": "event",
    "name": "MerchantWithdrawal",
    "inputs": [{"name": "merchantId", "type": "uint256", "indexed": true}, {"name": "token", "type": "address", "indexed": false}, {"name": "amount", "type": "uint256", "indexed": false}, {"name": "payoutAddress", "type": "address", "indexed": false}]
  },
  {
    "type": "event",
    "name": "PaymentReceived",
    "inputs": [{"name": "subscriber", "type": "address", "indexed": true}, {"name": "merchantId", "type": "uint256", "indexed": true}, {"name": "paymentToken", "type": "address", "indexed": false}, {"name": "amount", "type": "uint256", "indexed": false}, {"name": "platformFee", "type": "uint256", "indexed": false}, {"name": "subscriptionPeriod", "type": "uint64", "indexed": false}]
  },
  {
    "type": "event",
    "name": "PlatformFeeWithdrawal",
    "inputs": [{"name": "token", "type": "address", "indexed": false}, {"name": "amount", "type": "uint256", "indexed": false}, {"name": "to", "type": "address", "indexed": false}]
  }
] as const;

export const subscriptionNFTABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}, {"name": "id", "type": "uint256"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubscriptionStatus",
    "inputs": [{"name": "subscriber", "type": "address"}, {"name": "merchantId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "tuple", "components": [{"name": "isActive", "type": "bool"}, {"name": "expiresAt", "type": "uint64"}, {"name": "renewalCount", "type": "uint256"}, {"name": "lastRenewal", "type": "uint64"}, {"name": "merchantId", "type": "uint256"}]}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserSubscriptions",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovedForAll",
    "inputs": [{"name": "account", "type": "address"}, {"name": "operator", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isSubscriptionActive",
    "inputs": [{"name": "subscriber", "type": "address"}, {"name": "merchantId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mintOrRenew",
    "inputs": [{"name": "subscriber", "type": "address"}, {"name": "merchantId", "type": "uint256"}, {"name": "duration", "type": "uint64"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {"name": "id", "type": "uint256"}, {"name": "value", "type": "uint256"}, {"name": "data", "type": "bytes"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "inputs": [{"name": "operator", "type": "address"}, {"name": "approved", "type": "bool"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "uri",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "SubscriptionMinted",
    "inputs": [{"name": "subscriber", "type": "address", "indexed": true}, {"name": "merchantId", "type": "uint256", "indexed": true}, {"name": "expiresAt", "type": "uint64", "indexed": false}]
  },
  {
    "type": "event",
    "name": "SubscriptionRenewed",
    "inputs": [{"name": "subscriber", "type": "address", "indexed": true}, {"name": "merchantId", "type": "uint256", "indexed": true}, {"name": "newExpiresAt", "type": "uint64", "indexed": false}, {"name": "renewalCount", "type": "uint256", "indexed": false}]
  },
  {
    "type": "event",
    "name": "TransferSingle",
    "inputs": [{"name": "operator", "type": "address", "indexed": true}, {"name": "from", "type": "address", "indexed": true}, {"name": "to", "type": "address", "indexed": true}, {"name": "id", "type": "uint256", "indexed": false}, {"name": "value", "type": "uint256", "indexed": false}]
  }
] as const;

export const mockERC20ABI = [
  {
    "type": "function",
    "name": "allowance",
    "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [{"name": "spender", "type": "address"}, {"name": "value", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "burn",
    "inputs": [{"name": "amount", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [{"name": "to", "type": "address"}, {"name": "value", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {"name": "value", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [{"name": "owner", "type": "address", "indexed": true}, {"name": "spender", "type": "address", "indexed": true}, {"name": "value", "type": "uint256", "indexed": false}]
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [{"name": "from", "type": "address", "indexed": true}, {"name": "to", "type": "address", "indexed": true}, {"name": "value", "type": "uint256", "indexed": false}]
  }
] as const;