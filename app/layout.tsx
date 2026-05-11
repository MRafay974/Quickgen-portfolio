import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalScrollEffects } from "@/components/common/GlobalScrollEffects";
import { CustomCursor } from "@/components/common/CustomCursor";
import { FloatingContact } from "@/components/common/FloatingContact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://quickgentech.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Quickgen | Product Design & Engineering Studio",
    template: "%s | Quickgen",
  },
  description:
    "Quickgen is a full-stack product design and engineering studio specialising in hardware, firmware, PCB design, mobile apps, and IoT solutions for global clients.",
  keywords: [
    "product design",
    "hardware engineering",
    "firmware development",
    "PCB design",
    "IoT solutions",
    "mobile app development",
    "embedded systems",
    "Quickgen",
    "product development studio",
  ],
  authors: [{ name: "Quickgen", url: BASE_URL }],
  creator: "Quickgen",
  publisher: "Quickgen",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Quickgen",
    title: "Quickgen | Product Design & Engineering Studio",
    description:
      "Full-stack product design and engineering — hardware, firmware, PCB, mobile apps and IoT for global clients.",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Quickgen — Product Design & Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quickgen | Product Design & Engineering Studio",
    description:
      "Full-stack product design and engineering — hardware, firmware, PCB, mobile apps and IoT for global clients.",
    images: ["/images/logo/logo.png"],
    creator: "@quickgentech",
  },
  icons: {
    icon: "/images/logo/logo.png",
    shortcut: "/images/logo/logo.png",
    apple: "/images/logo/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <GlobalScrollEffects>{children}</GlobalScrollEffects>
        <FloatingContact />
      </body>
    </html>
  );
}
