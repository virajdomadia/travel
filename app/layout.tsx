import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { PersonalizationProvider } from "@/context/PersonalizationContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
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
