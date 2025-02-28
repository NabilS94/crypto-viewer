import AppHeader from '@/components/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import Providers from './providers';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'] // Light, Regular, Bold
});

export const metadata: Metadata = {
  title: 'CryptoViewer - Live Cryptocurrency Prices & Market Data ',
  description:
    'Stay up-to-date with live cryptocurrency prices, market caps, trading volumes, and trends. Track your favorite coins like Bitcoin, Ethereum, and more',
  keywords:
    'cryptocurrency, bitcoin, ethereum, crypto market cap, live crypto prices, blockchain, crypto tracker'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={`w-full h-full bg-gradient-to-r from-navy-500 to-navy-900 overflow-auto ${lato.variable}`}
        >
          <AppHeader />
          <Providers>
            <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
