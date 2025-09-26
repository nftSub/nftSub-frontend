import { kv } from '@vercel/kv';

export interface MerchantData {
  merchantId: string;
  name: string;
  description: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Merchant store using Vercel KV for production-ready storage
 * Falls back to in-memory storage for local development
 */
class MerchantStore {
  // In-memory fallback for local development
  private inMemoryStore: Map<string, MerchantData> = new Map();
  private useKV: boolean = process.env.KV_REST_API_URL ? true : false;

  constructor() {
    console.log('MerchantStore initialized with', this.useKV ? 'Vercel KV' : 'in-memory storage');
  }

  /**
   * Create or update a merchant
   */
  async createMerchant(data: {
    merchantId: string;
    name: string;
    description: string;
    logo: string | null;
  }): Promise<MerchantData> {
    const merchant: MerchantData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.useKV) {
      try {
        // Store in Vercel KV
        await kv.set(`merchant:${data.merchantId}`, merchant);
        // Also store in a list for getAllMerchants
        await kv.sadd('merchants:all', data.merchantId);
      } catch (error) {
        console.error('Error storing in KV:', error);
        // Fallback to in-memory
        this.inMemoryStore.set(data.merchantId, merchant);
      }
    } else {
      // Use in-memory store for local development
      this.inMemoryStore.set(data.merchantId, merchant);
    }

    return merchant;
  }

  /**
   * Get a merchant by ID
   */
  async getMerchant(merchantId: string): Promise<MerchantData | null> {
    if (this.useKV) {
      try {
        const merchant = await kv.get<MerchantData>(`merchant:${merchantId}`);
        return merchant;
      } catch (error) {
        console.error('Error fetching from KV:', error);
        // Fallback to in-memory
        return this.inMemoryStore.get(merchantId) || null;
      }
    } else {
      return this.inMemoryStore.get(merchantId) || null;
    }
  }

  /**
   * Get all merchants
   */
  async getAllMerchants(): Promise<MerchantData[]> {
    if (this.useKV) {
      try {
        // Get all merchant IDs
        const merchantIds = await kv.smembers('merchants:all');
        
        // Fetch all merchants in parallel
        const merchants = await Promise.all(
          merchantIds.map((id: string) => this.getMerchant(id))
        );
        
        return merchants.filter(Boolean) as MerchantData[];
      } catch (error) {
        console.error('Error fetching all merchants from KV:', error);
        // Fallback to in-memory
        return Array.from(this.inMemoryStore.values());
      }
    } else {
      return Array.from(this.inMemoryStore.values());
    }
  }

  /**
   * Update a merchant
   */
  async updateMerchant(merchantId: string, updates: Partial<MerchantData>): Promise<MerchantData | null> {
    const existing = await this.getMerchant(merchantId);
    if (!existing) {
      return null;
    }

    const updated: MerchantData = {
      ...existing,
      ...updates,
      merchantId, // Ensure ID can't be changed
      updatedAt: new Date().toISOString()
    };

    if (this.useKV) {
      try {
        await kv.set(`merchant:${merchantId}`, updated);
      } catch (error) {
        console.error('Error updating in KV:', error);
        this.inMemoryStore.set(merchantId, updated);
      }
    } else {
      this.inMemoryStore.set(merchantId, updated);
    }

    return updated;
  }

  /**
   * Delete a merchant
   */
  async deleteMerchant(merchantId: string): Promise<boolean> {
    if (this.useKV) {
      try {
        await kv.del(`merchant:${merchantId}`);
        await kv.srem('merchants:all', merchantId);
        return true;
      } catch (error) {
        console.error('Error deleting from KV:', error);
        return this.inMemoryStore.delete(merchantId);
      }
    } else {
      return this.inMemoryStore.delete(merchantId);
    }
  }

  /**
   * Check if using Vercel KV
   */
  isUsingKV(): boolean {
    return this.useKV;
  }
}

// Export singleton instance
const merchantStore = new MerchantStore();
export default merchantStore;

