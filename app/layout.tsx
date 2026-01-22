import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { PersonalizationProvider } from "@/context/PersonalizationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7 Fold Wonders | Premium Travel Experiences",
  description: "Discover the world's most breathtaking destinations with 7 Fold Wonders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PersonalizationProvider>
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Footer />
        </PersonalizationProvider>
      </body>
    </html>
  );
}
