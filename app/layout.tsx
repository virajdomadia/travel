import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { PersonalizationProvider } from "@/context/PersonalizationContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import dbConnect from "@/app/lib/db";
import SiteContent from "@/app/lib/models/SiteContent";

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

async function getSiteSettings() {
  try {
    await dbConnect();
    const settings = await SiteContent.findOne().lean();
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider initialSettings={siteSettings}>
          <PersonalizationProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </PersonalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
