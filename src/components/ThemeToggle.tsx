'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

/**
 * Theme toggle button component that allows switching between light, dark, and system themes
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Switch theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label={getLabel()}
      title={getLabel()}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      {getIcon()}
    </button>
  );
}