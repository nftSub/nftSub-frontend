'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MerchantRegistrationForm from '@/components/merchant/MerchantRegistrationForm';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MerchantSetupPage() {
  const params = useParams();
  const router = useRouter();
  const merchantId = params.id as string;
  const [existingData, setExistingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if merchant already has metadata
    const checkExistingData = async () => {
      try {
        const response = await fetch(`/api/merchant/register?merchantId=${merchantId}`);
        if (response.ok) {
          const data = await response.json();
          setExistingData(data);
        }
      } catch (error) {
        console.error('Error checking existing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingData();
  }, [merchantId]);

  const handleSuccess = (data: any) => {
    // Redirect to merchant dashboard or success page after 2 seconds
    setTimeout(() => {
      router.push(`/merchant/${merchantId}`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 hover:text-brand-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">
            Complete Your Merchant Profile
          </h1>
          <p className="text-gray-600">
            Add your business details to customize your subscription NFTs
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">
                On-chain Registration Complete!
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Merchant ID: #{merchantId}
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Now add your business information to customize how your subscription NFTs appear.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <MerchantRegistrationForm 
            merchantId={merchantId}
            onSuccess={handleSuccess}
          />
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Your business information will be stored locally and used to generate
            NFT metadata when users subscribe to your service.
          </p>
        </div>
      </div>
    </div>
  );
}