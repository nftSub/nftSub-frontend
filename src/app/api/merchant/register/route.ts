import { NextRequest, NextResponse } from 'next/server';
import merchantStore from '@/lib/merchant-store';

// Max file size: 500KB (reasonable for logos)
const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, name, description, logo } = body;

    // Validate required fields
    if (!merchantId || !name) {
      return NextResponse.json(
        { error: 'merchantId and name are required' },
        { status: 400 }
      );
    }

    // Process logo if provided
    let processedLogo = null;
    if (logo) {
      // Check if it's already base64 or needs conversion
      if (logo.startsWith('data:image')) {
        // Validate size
        const base64Length = logo.length - (logo.indexOf(',') + 1);
        const sizeInBytes = (base64Length * 3) / 4;
        
        if (sizeInBytes > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `Logo too large. Max size is ${MAX_FILE_SIZE / 1024}KB` },
            { status: 400 }
          );
        }
        processedLogo = logo;
      }
    }

    // Create merchant using the store
    const merchant = await merchantStore.createMerchant({
      merchantId: merchantId.toString(),
      name,
      description: description || '',
      logo: processedLogo || null
    });

    return NextResponse.json({
      success: true,
      merchantId,
      message: 'Merchant metadata saved successfully',
      merchant
    });
  } catch (error) {
    console.error('Error saving merchant metadata:', error);
    return NextResponse.json(
      { error: 'Failed to save merchant metadata' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (merchantId) {
      const merchant = await merchantStore.getMerchant(merchantId);
      if (!merchant) {
        return NextResponse.json(
          { error: 'Merchant not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(merchant);
    }
    
    // Return all merchants (without logos to reduce size)
    const merchants = await merchantStore.getAllMerchants();
    const merchantsList = merchants.map((m) => ({
      ...m,
      logo: m.logo ? 'base64...' : null // Don't send full base64 in list
    }));
    
    return NextResponse.json(merchantsList);
  } catch (error) {
    console.error('Error fetching merchants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch merchants' },
      { status: 500 }
    );
  }
}