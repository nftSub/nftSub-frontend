import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubNFT - Web3 Subscription Platform",
  description: "Decentralized subscription management with NFTs. Build recurring revenue streams on blockchain.",
  icons: {
    icon: '/subnFT.svg',
    shortcut: '/subnFT.svg',
    apple: '/subnFT.svg',
  },
  openGraph: {
    title: "SubNFT - Web3 Subscription Platform",
    description: "Decentralized subscription management with NFTs. Build recurring revenue streams on blockchain.",
    images: ['/subnFT.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SubNFT - Web3 Subscription Platform",
    description: "Decentralized subscription management with NFTs",
    images: ['/subnFT.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
