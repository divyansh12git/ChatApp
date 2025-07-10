import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import StoreProvider from "../lib/store/StoreProvider";
const PeerProvider = dynamic(() => import('@/lib/provider/peer'), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zync Connect | Real-Time Chat App",
  description: "Zync Connect is a real-time chat application built for seamless and secure communication. Developed with passion by Divyansh Gupta.",
  keywords: ["Zync Connect", "chat app", "real-time messaging", "Divyansh Gupta", "WebRTC", "React chat", "Next.js chat app"],
  authors: [{ name: "Divyansh Gupta" }],
   icons: {
    icon: '/icons/favicon.ico', 
  },
  creator: "Divyansh Gupta",
  openGraph: {
    title: "Zync Connect",
    description: "Chat faster and smarter with Zync Connect — a blazing fast, real-time chat platform.",
    url: "https://your-domain.com", // Replace with your deployed URL
    siteName: "Zync Connect",
    images: [
      {
        url: "https://www.flaticon.com/free-icons/application" , 
        width: 1200,
        height: 630,
        alt: "Zync Connect Chat App",
      },
    ],
    type: "website",
  },
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
