'use client';

import { useState } from 'react';
import { Upload, X, AlertCircle, Check } from 'lucide-react';
import { 
  fileToBase64, 
  validateImageFile, 
  compressImage, 
  generateDefaultLogo,
  formatFileSize,
  MAX_FILE_SIZE 
} from '@/utils/imageUtils';

interface MerchantRegistrationFormProps {
  merchantId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export default function MerchantRegistrationForm({ 
  merchantId, 
  onSuccess, 
  onError 
}: MerchantRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileSize, setFileSize] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      setError(null);
      setFileSize(formatFileSize(file.size));
      
      // Convert to base64
      let base64 = await fileToBase64(file);
      
      // If file is large, try to compress it
      if (file.size > MAX_FILE_SIZE * 0.7) { // If > 350KB, compress
        try {
          base64 = await compressImage(base64, 400, 400, 0.7);
          setFileSize(formatFileSize(base64.length * 0.75)); // Approximate size
        } catch (err) {
          console.log('Compression failed, using original');
        }
      }
      
      setLogoPreview(base64);
    } catch (err: any) {
      setError(err.message || 'Failed to process image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Business name is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use default logo if none provided
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
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', description: '' });
        setLogoPreview(null);
        setFileSize(null);
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to register merchant');
      onError?.(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFileSize(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Enter your business name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            placeholder="Describe your subscription service"
            rows={3}
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Business Logo
          </label>
          
          {!logoPreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-primary transition-colors">
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
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload logo
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF, WebP, SVG (max {MAX_FILE_SIZE / 1024}KB)
                </span>
              </label>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Logo uploaded</p>
                  {fileSize && (
                    <p className="text-xs text-gray-500">Size: {fileSize}</p>
                  )}
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-start space-x-2 text-green-600 text-sm">
            <Check className="w-5 h-5 mt-0.5" />
            <span>Merchant metadata saved successfully!</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.name.trim()}
          className="w-full py-3 px-4 bg-brand-primary text-white rounded-lg font-medium 
                   hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
        >
          {isLoading ? 'Saving...' : 'Complete Registration'}
        </button>

        {/* Info Note */}
        <p className="text-xs text-gray-500 text-center">
          This metadata will be used for your subscription NFT display.
          You can update it anytime.
        </p>
      </form>
    </div>
  );
}