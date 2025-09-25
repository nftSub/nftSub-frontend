'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import DocumentationLayout from '@/components/DocumentationLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show Header component for landing page, DocumentationLayout for /docs/* routes
  if (pathname.startsWith('/docs')) {
    return <DocumentationLayout>{children}</DocumentationLayout>;
  }

  // For landing page and other routes, show Header + content
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  );
}