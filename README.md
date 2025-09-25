<div align="center">
  <img src="./public/images/nftSub.png" alt="nftSub Logo" width="200" />
  
  # nftSub Documentation
  
  Official documentation and interactive demos for the nftSub SDK - Web3 Subscription Platform
</div>

## Overview

This is the official documentation website for nftSub SDK. Built with Next.js 14, it provides comprehensive guides, API references, and interactive demonstrations for developers integrating Web3 subscription functionality into their applications.

The frontend integrates with:
- [nftSub Smart Contracts](../nftSub-contracts/) - Core subscription logic and payment processing
- [nftSub SDK](../nftSub-sdk/) - TypeScript SDK for easy integration

## What This Site Includes

### 📚 Documentation
- **Getting Started** - Quick setup guide for nftSub SDK
- **API Reference** - Complete SDK method documentation
- **React Hooks** - Hook reference for React applications
- **Components** - Pre-built UI component documentation

### 🎮 Interactive Demos
- Live subscription flow demonstrations
- Wallet connection examples
- Payment processing scenarios
- NFT subscription management

### 🛠 Developer Resources
- Code examples with syntax highlighting
- Copy-paste ready snippets
- Integration patterns
- Best practices

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Documentation Structure

```
src/app/docs/
├── page.tsx              # Documentation home
├── getting-started/      # Setup and installation
├── quickstart/          # 5-minute quick start
├── api/                 # API reference
├── hooks/               # React hooks documentation
├── components/          # Component library docs
├── demos/               # Interactive examples
├── contracts/           # Smart contract reference
├── how-it-works/        # Platform architecture
└── faq/                 # Frequently asked questions
```

## Key Features

### For SDK Users
- **Clear Documentation** - Step-by-step guides for SDK integration
- **Live Examples** - Interactive demos with real blockchain connections
- **Code Snippets** - Copy-ready code examples for common use cases
- **API Reference** - Complete method and parameter documentation

### For Contributors
- **Component Showcase** - Visual component library
- **Integration Guides** - Patterns for various frameworks
- **Contract Documentation** - Smart contract interfaces and ABIs

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Web3**: RainbowKit + wagmi + viem
- **SDK**: @nft-sub/sdk
- **Language**: TypeScript

## Environment Setup

Create `.env.local`:

```env
# WalletConnect (Required for wallet connections)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Contract Addresses (Sepolia Testnet)
NEXT_PUBLIC_SUBSCRIPTION_MANAGER=0x82b069578ae3dA9ea740D24934334208b83E530E
NEXT_PUBLIC_SUBSCRIPTION_NFT=0x404cb817FA393D3689D1405DB0B76a20eDE72d43
```

## Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# View at http://localhost:3000
```

### Building Documentation

```bash
# Type check
pnpm type-check

# Build production bundle
pnpm build

# Preview production build
pnpm preview
```

## Documentation Pages

### Core Documentation
- `/docs` - Documentation overview
- `/docs/getting-started` - Installation and setup
- `/docs/quickstart` - 5-minute integration guide
- `/docs/api` - Complete API reference
- `/docs/hooks` - React hooks documentation

### Interactive Content
- `/docs/demos` - Live demonstration components
- `/docs/components` - UI component showcase
- `/docs/contracts` - Smart contract documentation

### Resources
- `/docs/how-it-works` - Architecture overview
- `/docs/faq` - Common questions and answers
- `/docs/coming-soon` - Roadmap and future features

## Contributing to Documentation

### Adding New Pages

1. Create new file in `src/app/docs/[section]/page.tsx`
2. Use existing Typography components for consistency
3. Include code examples where relevant
4. Add to navigation if needed

### Code Examples

Use the provided code block components:

```tsx
<pre className="text-sm font-mono text-foreground overflow-x-auto">
  <code>{`
    // Your code example here
  `}</code>
</pre>
```

### Interactive Demos

Place demo components in `src/components/demos/`:

```tsx
export function YourDemo() {
  // Interactive demo implementation
}
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/subnft/docs)

### Self-Hosted

```bash
# Build static export
pnpm build

# Serve with any static host
npx serve out
```

## Performance

- Optimized for Core Web Vitals
- Static generation where possible
- Code splitting per route
- Image optimization with Next.js Image

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Web3 wallet support (MetaMask, WalletConnect, etc.)
- Responsive design for mobile and desktop

## Related Repositories

- [nftSub SDK](https://github.com/nftSub/nftSub-sdk) - Core TypeScript SDK
- [nftSub Contracts](https://github.com/nftSub/nftSub-contracts) - Smart contract suite
- [nftSub Examples](https://github.com/nftSub/examples) - Integration examples

## Support

- **Documentation Issues**: Open an issue in this repository
- **SDK Issues**: [nftSub SDK Repository](https://github.com/nftSub/nftSub-sdk/issues)
- **Contract Issues**: [nftSub Contracts Repository](https://github.com/nftSub/nftSub-contracts/issues)

## License

MIT

---

<div align="center">
  Built by the nftSub team
</div>