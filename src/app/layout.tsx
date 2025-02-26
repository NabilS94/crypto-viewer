import AppHeader from "@/components/Header";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import Providers from "./providers";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Light, Regular, Bold
});

export const metadata: Metadata = {
  title: "CryptoViewer - Live Cryptocurrency Prices & Market Data ",
  description:
    "Stay up-to-date with live cryptocurrency prices, market caps, trading volumes, and trends. Track your favorite coins like Bitcoin, Ethereum, and more",
  keywords:
    "cryptocurrency, bitcoin, ethereum, crypto market cap, live crypto prices, blockchain, crypto tracker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          "bg-gradient-to-r from-navy-500 to-navy-900" + ` ${lato.variable}`
        }
      >
        <AppHeader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
