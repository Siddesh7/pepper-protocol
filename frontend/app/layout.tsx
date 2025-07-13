import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "next-themes";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Providers from "./Providers";
import { Footer } from "@/components/home/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pepper Protocol",
  description: "Pepper Protocol - Cross-chain fan token swaps made easy.",
  openGraph: {
    title: "Pepper Protocol",
    description: "Pepper Protocol - Cross-chain fan token swaps made easy.",
    url: "https://pepperprotocol.xyz/",
    siteName: "Pepper Protocol",
    images: [
      {
        url: "/pepper_logo.png",
        width: 1200,
        height: 630,
        alt: "Pepper Protocol Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pepper Protocol",
    description: "Pepper Protocol - Cross-chain fan token swaps made easy.",
    images: ["/pepper_logo.png"],
    creator: "@pepperprotocol",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </Providers>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
