'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu, X, BookOpen, Code, Play, Settings, Github, ExternalLink, FileCode, Zap, Braces, Layers, HelpCircle, Rocket } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { appConfig } from '@/config/env';

const navigation = [
  { name: 'Getting Started', href: '/docs', icon: BookOpen },
  { name: 'Quick Start', href: '/docs/quickstart', icon: Zap },
  { name: 'Components', href: '/docs/components', icon: Code },
  { name: 'React Hooks', href: '/docs/hooks', icon: Braces },
  { name: 'Contracts', href: '/docs/contracts', icon: FileCode },
  { name: 'API Reference', href: '/docs/api', icon: Settings },
  { name: 'Demos', href: '/docs/demos', icon: Play },
  { name: 'How It Works', href: '/docs/how-it-works', icon: Layers },
  { name: 'FAQ', href: '/docs/faq', icon: HelpCircle },
  { name: 'Coming Soon', href: '/docs/coming-soon', icon: Rocket },
];

const externalLinks = [
  { 
    name: 'GitHub', 
    href: 'https://github.com/nftSub/nftSub-sdk', 
    icon: Github 
  },
  { 
    name: 'Reactive Docs', 
    href: 'https://docs.reactive.network/', 
    icon: ExternalLink 
  },
];

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-72 flex-col bg-card border-r border-border shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">{appConfig.app.name}</h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-border">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                External Links
              </p>
              {externalLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r border-border">
          <div className="flex h-16 items-center px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">{appConfig.app.name}</h1>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-border">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                External Links
              </p>
              {externalLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation bar */}
        <div className="sticky top-0 z-40 flex h-16 bg-card/95 backdrop-blur border-b border-border">
          <div className="flex flex-1 items-center justify-between px-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-accent text-muted-foreground lg:hidden transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Mobile title */}
            <div className="flex items-center lg:hidden">
              <h1 className="text-lg font-semibold text-foreground">{appConfig.app.name}</h1>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="hidden sm:block">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {appConfig.app.name} v{appConfig.app.version}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <a 
                  href="https://reactive.network/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Powered by Reactive Network
                </a>
                <span>•</span>
                <a 
                  href="https://github.com/nftSub/nftSub-sdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center space-x-1"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


