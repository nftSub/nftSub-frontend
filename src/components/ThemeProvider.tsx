'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ComponentProps } from 'react';

/**
 * Theme provider component that wraps the application with dark/light mode support
 * Uses next-themes for seamless theme switching with system preference detection
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}