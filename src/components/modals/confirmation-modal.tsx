'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}: ConfirmationModalProps) {
  const icons = {
    warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    success: <CheckCircle className="w-6 h-6 text-brand-green" />,
    info: <Info className="w-6 h-6 text-brand-blue" />
  };

  const colors = {
    warning: 'border-yellow-500/20 bg-yellow-500/10',
    success: 'border-brand-green/20 bg-brand-green/10',
    info: 'border-brand-blue/20 bg-brand-blue/10'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50"
          >
            <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg border ${colors[type]} flex items-center justify-center`}>
                    {icons[type]}
                  </div>
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="p-1 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{message}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 p-6 pt-0">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-lg bg-brand-gradient text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Processing...' : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}