import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jimontechhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jimon Tech Hub Academy | Learn AI, Digital Skills & Future Technologies",
    template: "%s | Jimon Tech Hub Academy",
  },
  description:
    "Master Artificial Intelligence, AI Content Creation, Website Development, Shopify, WooCommerce, Digital Marketing, Automation, and Entrepreneurship through practical training designed for Africa's future workforce.",
  keywords: [
    "AI Academy Nigeria",
    "Artificial Intelligence Training",
    "Digital Skills Academy",
    "Shopify Training Nigeria",
    "WooCommerce Classes",
    "Digital Marketing Training",
    "Website Development",
    "Vibe Coding",
    "AI Video Creation",
    "Automation Training",
    "Future Skills Africa",
    "Tech Academy Nigeria",
    "Online Learning Africa",
    "Jimon Tech Hub",
  ],
  authors: [{ name: "Jimon Tech Hub Academy" }],
  creator: "Jimon Tech Hub",
  publisher: "Jimon Tech Hub Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Jimon Tech Hub Academy",
    title: "Jimon Tech Hub Academy | Learn AI, Digital Skills & Future Technologies",
    description:
      "Master AI, Website Development, E-commerce, Digital Marketing, and Automation through practical training for Africa's future workforce.",
    url: siteUrl,
    images: [
      {
        url: "/images/og/jimon-tech-hub-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Jimon Tech Hub Academy - Empowering Africans Through Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimon Tech Hub Academy | Learn AI, Digital Skills & Future Technologies",
    description:
      "Master AI, Website Development, E-commerce, Digital Marketing, and Automation through practical training for Africa's future workforce.",
    images: ["/images/og/jimon-tech-hub-cover.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NG"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <head>
        <Analytics />
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden">
        <LoadingScreen />
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

