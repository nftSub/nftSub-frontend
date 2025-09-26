import { NextRequest, NextResponse } from 'next/server';
import merchantStore from '@/lib/merchant-store';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chainId: string; tokenId: string }> }
) {
  try {
    const { chainId, tokenId } = await params;
    
    // Load merchant metadata from store
    const merchantData = await merchantStore.getMerchant(tokenId);

    // If merchant data doesn't exist for this token ID
    if (!merchantData) {
      return NextResponse.json(
        { 
          error: 'Merchant not registered',
          message: `Merchant ${tokenId} has not completed metadata registration. Please visit /merchant/setup/${tokenId} to add your business information.`
        },
        { status: 404, headers: corsHeaders }
      );
    }

    // Return the actual merchant metadata
    return NextResponse.json({
      name: `${merchantData.name} - Subscription`,
      description: merchantData.description || `Active subscription to ${merchantData.name}`,
      image: merchantData.logo || null,
      external_url: `https://nft-sub.vercel.app/subscription/${tokenId}`,
      attributes: [
        {
          trait_type: 'Merchant',
          value: merchantData.name
        },
        {
          trait_type: 'Token ID',
          value: tokenId
        },
        {
          trait_type: 'Chain',
          value: getChainName(chainId)
        },
        {
          trait_type: 'Status',
          value: 'Active'
        },
        {
          trait_type: 'Type',
          value: 'Premium Subscription'
        }
      ]
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating NFT metadata:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to generate NFT metadata'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

function getChainName(chainId: string): string {
  const chains: Record<string, string> = {
    '1': 'Ethereum',
    '11155111': 'Sepolia',
    '137': 'Polygon',
    '8453': 'Base',
    '42161': 'Arbitrum',
    '10': 'Optimism',
    '56': 'BSC',
    '43114': 'Avalanche'
  };
  
  return chains[chainId] || `Chain ${chainId}`;
}