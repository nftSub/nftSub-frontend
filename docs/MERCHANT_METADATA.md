# Merchant Metadata System Documentation

## Overview

The nftSub platform uses a hybrid approach for storing merchant data:
- **On-chain**: Operational data (payment address, subscription periods, pricing)
- **Off-chain**: Metadata (business name, description, logos)

This approach minimizes gas costs while providing rich merchant profiles for NFT metadata.

## Architecture

### Storage Backend

**Production**: Vercel KV (Upstash Redis)
- Persistent key-value storage
- Automatic scaling
- Low latency globally distributed

**Development**: In-memory Map
- No external dependencies
- Resets on server restart
- Perfect for local testing

### Data Flow

1. **Merchant Registration**
   - Smart contract stores operational data
   - Returns unique merchant ID
   - Metadata stored separately via API

2. **NFT Metadata Generation**
   - NFT requests metadata via tokenURI
   - API fetches merchant metadata from storage
   - Generates OpenSea-compatible JSON
   - Returns 404 if merchant not registered

## API Endpoints

### POST /api/merchant/register
Register or update merchant metadata.

**Request Body:**
```json
{
  "merchantId": "1",
  "name": "Business Name",
  "description": "Premium subscription service",
  "logo": "data:image/png;base64,..." 
}
```

**Response:**
```json
{
  "success": true,
  "merchantId": "1",
  "message": "Merchant metadata saved successfully",
  "merchant": {
    "merchantId": "1",
    "name": "Business Name",
    "description": "Premium subscription service",
    "logo": "data:image/png;base64,...",
    "createdAt": "2024-01-20T10:00:00Z",
    "updatedAt": "2024-01-20T10:00:00Z"
  }
}
```

### GET /api/merchant/register?merchantId={id}
Retrieve merchant metadata.

**Response:**
```json
{
  "merchantId": "1",
  "name": "Business Name",
  "description": "Premium subscription service",
  "logo": "data:image/png;base64,...",
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

### GET /api/metadata/{chainId}/{tokenId}
Generate NFT metadata for subscription tokens.

**Success Response:**
```json
{
  "name": "Business Name - Subscription",
  "description": "Active subscription to Business Name",
  "image": "data:image/png;base64,...",
  "external_url": "https://nft-sub.vercel.app/subscription/1",
  "attributes": [
    {
      "trait_type": "Merchant",
      "value": "Business Name"
    },
    {
      "trait_type": "Token ID",
      "value": "1"
    },
    {
      "trait_type": "Chain",
      "value": "Sepolia"
    },
    {
      "trait_type": "Status",
      "value": "Active"
    },
    {
      "trait_type": "Type",
      "value": "Premium Subscription"
    }
  ]
}
```

**Error Response (Merchant Not Registered):**
```json
{
  "error": "Merchant not registered",
  "message": "Merchant 1 has not completed metadata registration. Please visit /merchant/setup/1 to add your business information."
}
```

## Environment Setup

### Production (Vercel)

1. **Create Upstash Redis Database**
   - Go to Vercel Dashboard → Storage → Browse Storage
   - Select "Upstash Redis" from marketplace
   - Create new database
   - Copy credentials

2. **Environment Variables**
   ```env
   KV_URL="redis://..."
   KV_REST_API_URL="https://..."
   KV_REST_API_TOKEN="..."
   KV_REST_API_READ_ONLY_TOKEN="..."
   ```

3. **Deploy**
   - Variables auto-injected by Vercel
   - No additional configuration needed

### Development

No setup required! The system automatically uses in-memory storage when KV environment variables are not present.

## Components

### MerchantRegistrationForm
Located at: `/src/components/merchant/MerchantRegistrationForm.tsx`

Features:
- Business name and description input
- Logo upload with preview
- Base64 image encoding
- Image compression for large files
- 500KB file size limit
- Automatic default logo generation

Usage:
```tsx
<MerchantRegistrationForm 
  merchantId="1"
  onSuccess={(data) => console.log('Saved:', data)}
  onError={(error) => console.error(error)}
/>
```

### Merchant Setup Page
Located at: `/src/app/merchant/setup/[id]/page.tsx`

This page allows merchants to complete their metadata registration after on-chain registration.

Features:
- Auto-detects merchant ID from URL
- Checks existing metadata
- Full registration form
- Success confirmation

## Image Handling

### Supported Formats
- JPG/JPEG
- PNG
- GIF
- WebP
- SVG

### Size Limits
- Maximum file size: 500KB
- Automatic compression for files > 350KB
- Target dimensions: 400x400px for compressed images

### Storage Format
Images are stored as base64-encoded data URLs:
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==
```

## SDK Integration

The SDK v2.0.0 includes full support for merchant metadata:

```typescript
import { SubscriptionSDK } from '@nft-sub/sdk';

const sdk = new SubscriptionSDK({ chain: 'sepolia' });

// Register with metadata
const { hash, merchantId, metadataStored } = await sdk.merchants.registerMerchantWithMetadata({
  payoutAddress: '0x...',
  subscriptionPeriod: 2592000,
  gracePeriod: 604800,
  name: 'My Business',
  description: 'Premium services',
  logo: 'data:image/png;base64,...'
});

// Get metadata
const metadata = await sdk.merchants.getMerchantMetadata(merchantId);

// Update metadata
await sdk.merchants.updateMerchantMetadata({
  merchantId,
  name: 'Updated Name',
  description: 'New description',
  logo: 'data:image/png;base64,...'
});
```

## Best Practices

1. **Always register metadata** after on-chain registration
2. **Optimize images** before upload (< 500KB)
3. **Use square images** for best display (1:1 aspect ratio)
4. **Provide descriptive names** for better NFT discovery
5. **Update metadata** when rebranding or changing services

## Troubleshooting

### Merchant metadata not showing in NFT
- Check if merchant completed registration at `/merchant/setup/{id}`
- Verify KV storage is configured in production
- Check API logs for errors

### Image upload fails
- Ensure file is under 500KB
- Check file format is supported
- Try compressing image externally first

### KV connection errors
- Verify environment variables are set correctly
- Check Upstash Redis dashboard for status
- Test connection with provided test script

## Migration Guide

### From v1 to v2

1. **Update SDK**
   ```bash
   npm install @nft-sub/sdk@2.0.0
   ```

2. **Update registration code**
   ```typescript
   // Old (v1)
   const { hash, merchantId } = await sdk.merchants.registerMerchant({
     payoutAddress: '0x...',
     subscriptionPeriod: 2592000,
     gracePeriod: 604800
   });

   // New (v2)
   const { hash, merchantId, metadataStored } = await sdk.merchants.registerMerchantWithMetadata({
     payoutAddress: '0x...',
     subscriptionPeriod: 2592000,
     gracePeriod: 604800,
     name: 'Business Name',
     description: 'Description',
     logo: 'data:image/png;base64,...'
   });
   ```

3. **Direct merchants** to complete metadata registration
   - Share link: `/merchant/setup/{merchantId}`
   - Or use SDK methods to add metadata programmatically

## Security Considerations

1. **Image validation**: Always validate file type and size
2. **XSS prevention**: Base64 images are safe from script injection
3. **Rate limiting**: Consider adding rate limits to registration endpoint
4. **Access control**: Merchants can only update their own metadata
5. **Data persistence**: Use production KV for data durability

## Future Enhancements

Potential improvements for future versions:
- IPFS integration for decentralized image storage
- Multiple images per merchant (gallery)
- Rich media support (videos, animations)
- Merchant verification badges
- Analytics dashboard integration