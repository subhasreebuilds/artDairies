import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const dmSans = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Art Diaries | Independent Artist Portfolio",
  description: "Traditional Indian artistic inspiration expressed through intricate contemporary handmade art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${dmSans.variable} ${cormorant.variable} ${greatVibes.variable} font-sans min-h-screen bg-background text-foreground antialiased flex flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}

