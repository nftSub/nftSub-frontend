'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  AlertCircle, 
  CheckCircle, 
  Building2,
  FileImage,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fileToBase64, 
  validateImageFile, 
  compressImage, 
  generateDefaultLogo,
  formatFileSize,
  MAX_FILE_SIZE 
} from '@/utils/imageUtils';

interface MerchantData {
  merchantId: string;
  name: string;
  description: string;
  logo: string | null;
}

interface MerchantRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess?: (data: MerchantData) => void;
  onError?: (error: string) => void;
}

export default function MerchantRegistrationModal({ 
  isOpen,
  onClose,
  merchantId, 
  onSuccess, 
  onError 
}: MerchantRegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', description: '' });
        setLogoPreview(null);
        setError(null);
        setSuccess(false);
        setFileSize(null);
      }, 300);
    }
  }, [isOpen]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = async (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      setError(null);
      setFileSize(formatFileSize(file.size));
      
      let base64 = await fileToBase64(file);
      
      if (file.size > MAX_FILE_SIZE * 0.7) {
        try {
          base64 = await compressImage(base64, 400, 400, 0.7);
          setFileSize(formatFileSize(base64.length * 0.75));
        } catch {
          console.log('Compression failed, using original');
        }
      }
      
      setLogoPreview(base64);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError('Business name is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const logo = logoPreview || generateDefaultLogo(formData.name);
      
      const response = await fetch('/api/merchant/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchantId,
          name: formData.name.trim(),
          description: formData.description.trim(),
          logo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save merchant data');
      }

      setSuccess(true);
      onSuccess?.(data);
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register merchant';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFileSize(null);
    setError(null);
  };

  const canProceed = step === 1 ? formData.name.trim() !== '' : true;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-gradient-to-br from-card via-card/95 to-card/90 rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 p-6 border-b border-border/50">
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse,transparent_30%,black)]" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Complete Merchant Profile
                      </h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Merchant ID: #{merchantId}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="p-2.5 hover:bg-background/50 rounded-xl transition-all disabled:opacity-50 group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="relative mt-6 flex items-center justify-between">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 -translate-y-1/2" />
                  <div className="relative flex items-center justify-between w-full">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                          step >= s 
                            ? 'bg-brand-gradient text-white shadow-lg shadow-brand-primary/30' 
                            : 'bg-background border-2 border-border text-muted-foreground'
                        }`}
                      >
                        {success && s === 3 ? <CheckCircle className="w-4 h-4" /> : s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!success ? (
                  <AnimatePresence mode="wait">
                    {/* Step 1: Business Details */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">
                              Business Name *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 pl-12 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                                placeholder="Enter your business name"
                                required
                              />
                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-semibold mb-2 text-foreground">
                              Description
                            </label>
                            <textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all resize-none"
                              placeholder="Describe your subscription service"
                              rows={4}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              This will appear on your subscription NFTs
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Logo Upload */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-semibold text-foreground">
                              Business Logo
                            </label>
                            <span className="text-xs text-muted-foreground">
                              Optional - We&apos;ll generate one if not provided
                            </span>
                          </div>
                          
                          {!logoPreview ? (
                            <div 
                              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                dragActive 
                                  ? 'border-brand-primary bg-brand-primary/5' 
                                  : 'border-border hover:border-brand-primary/50 hover:bg-accent/50'
                              }`}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            >
                              <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="logo"
                                className="cursor-pointer flex flex-col items-center"
                              >
                                <div className="w-16 h-16 bg-brand-gradient rounded-xl flex items-center justify-center mb-4">
                                  <FileImage className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-sm font-medium text-foreground mb-1">
                                  Drop your logo here or click to browse
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  JPG, PNG, GIF, WebP, SVG (max {MAX_FILE_SIZE / 1024}KB)
                                </span>
                              </label>
                            </div>
                          ) : (
                            <div className="bg-accent/50 rounded-xl p-6">
                              <div className="flex items-start space-x-4">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-background border border-border">
                                  <Image
                                    src={logoPreview}
                                    alt="Logo preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <p className="text-sm font-semibold text-foreground">Logo uploaded</p>
                                  {fileSize && (
                                    <p className="text-xs text-muted-foreground">Size: {fileSize}</p>
                                  )}
                                  <button
                                    type="button"
                                    onClick={removeLogo}
                                    className="text-sm text-red-500 hover:text-red-600 flex items-center transition-colors"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Remove logo
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-blue-600 mb-1">Logo Tips</p>
                              <ul className="text-xs text-blue-600/80 space-y-1">
                                <li>• Square images work best (1:1 ratio)</li>
                                <li>• Transparent backgrounds are supported</li>
                                <li>• Will be displayed at 400x400px on NFTs</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-foreground flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-brand-primary" />
                            Review Your Information
                          </h3>

                          <div className="bg-accent/50 rounded-xl p-6 space-y-4">
                            <div className="flex items-start space-x-4">
                              {logoPreview ? (
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-background border border-border flex-shrink-0">
                                  <Image
                                    src={logoPreview}
                                    alt="Logo"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center flex-shrink-0">
                                  <span className="text-2xl font-bold text-brand-primary">
                                    {formData.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-1">{formData.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {formData.description || 'No description provided'}
                                </p>
                                <div className="mt-3 flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span className="flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1 text-brand-green" />
                                    Ready to publish
                                  </span>
                                  <span>Merchant #{merchantId}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-xl p-4">
                            <p className="text-xs text-muted-foreground text-center">
                              This information will be stored and used to generate NFT metadata when users subscribe
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/30">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Registration Complete!
                    </h3>
                    <p className="text-muted-foreground">
                      Your merchant profile has been created successfully
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && !success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start space-x-2 text-red-500 bg-red-500/10 rounded-xl p-3"
                  >
                    <AlertCircle className="w-5 h-5 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                {/* Actions */}
                {!success && (
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                      disabled={isLoading}
                      className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <button
                      onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                      disabled={isLoading || !canProceed}
                      className="px-6 py-2.5 bg-brand-gradient text-white font-medium rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center group"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Saving...
                        </span>
                      ) : step < 3 ? (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}