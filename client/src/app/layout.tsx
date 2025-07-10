import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import StoreProvider from "../lib/store/StoreProvider";
const PeerProvider = dynamic(() => import('@/lib/provider/peer'), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Made with Passion by Divyansh Gupta",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
        <StoreProvider>
          <PeerProvider>
          {children}
          </PeerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
