'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MerchantRegistrationModal from '@/components/merchant/MerchantRegistrationModal';
import { ArrowLeft, Sparkles, Building2, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MerchantSetupPage() {
  const params = useParams();
  const router = useRouter();
  const merchantId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [existingData, setExistingData] = useState<{ name: string; description?: string; logo?: string | null } | null>(null);

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

  const handleSuccess = () => {
    // Redirect to merchant dashboard or success page after 2 seconds
    setTimeout(() => {
      router.push(`/merchant/${merchantId}`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading merchant data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link 
                href="/dashboard"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </Link>
            </motion.div>
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-gradient rounded-2xl mb-6 shadow-lg shadow-brand-primary/30">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {existingData ? 'Update Your Merchant Profile' : 'Complete Your Merchant Profile'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Customize how your subscription NFTs appear to your customers
              </p>
            </motion.div>

            {/* Status Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              {/* On-chain Status */}
              <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/20 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">
                      On-Chain Registration Complete
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your smart contract is deployed and ready
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-brand-green/10 rounded-full">
                      <span className="text-xs font-medium text-brand-green">
                        Merchant #{merchantId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Step */}
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">
                      {existingData ? 'Profile Already Set' : 'Add Business Information'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {existingData 
                        ? 'You can update your profile anytime'
                        : 'Logo, name, and description for your NFTs'
                      }
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center text-xs font-medium text-brand-primary hover:text-brand-primary/80 transition-colors group"
                    >
                      {existingData ? 'Update Profile' : 'Get Started'}
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Ready to Customize Your NFTs?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Add your business information to create a unique experience for your subscribers.
                This information will be displayed on each subscription NFT.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-brand-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-primary/30 inline-flex items-center group"
              >
                {existingData ? 'Update Profile' : 'Complete Setup'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {existingData && (
                <div className="mt-6 p-4 bg-accent/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Current Profile:</span> {existingData.name}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Info Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Your business information is stored securely and used to generate NFT metadata
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <MerchantRegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        merchantId={merchantId}
        onSuccess={handleSuccess}
      />
    </>
  );
}