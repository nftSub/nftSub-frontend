/**
 * Image utilities for handling base64 conversion with size limits
 */

// Maximum file size in bytes (500KB)
export const MAX_FILE_SIZE = 500 * 1024;

/**
 * Convert a File object to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file size before conversion
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024}KB`));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPG, PNG, GIF, WebP, or SVG image.'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024}KB.`
    };
  }

  return { valid: true };
}

/**
 * Compress image using canvas (browser only)
 */
export async function compressImage(
  base64String: string,
  maxWidth: number = 400,
  maxHeight: number = 400,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        
        if (width > height) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert back to base64
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = base64String;
  });
}

/**
 * Generate a default SVG logo for merchants without custom logos
 */
export function generateDefaultLogo(merchantName: string): string {
  const initial = merchantName.charAt(0).toUpperCase();
  const colors = [
    '#7c4dff', '#6366f1', '#ec4899', '#f97316', 
    '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'
  ];
  const color = colors[merchantName.length % colors.length];
  
  const svg = `
    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="${color}"/>
      <text x="200" y="200" font-family="Arial" font-size="180" fill="white" text-anchor="middle" dominant-baseline="middle">${initial}</text>
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Estimate base64 size in bytes
 */
export function estimateBase64Size(base64String: string): number {
  // Remove data URI prefix if present
  const base64 = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String;
  
  // Calculate approximate size in bytes
  const padding = (base64.match(/=/g) || []).length;
  return Math.floor((base64.length * 3) / 4) - padding;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}