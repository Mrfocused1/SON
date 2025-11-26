import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { VideoModal } from "@/components/VideoModal";
import { Preloader } from "@/components/Preloader";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { VideoModalProvider } from "@/context/VideoModalContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SON Networks | Digital Production House",
  description: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
  keywords: ["production house", "digital content", "video production", "entertainment", "YouTube"],
  openGraph: {
    title: "SON Networks | Digital Production House",
    description: "We turn chaotic ideas into polished, high-octane entertainment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${anton.variable} font-sans antialiased`}>
        <LanguageProvider>
          <PreloaderProvider>
            <VideoModalProvider>
            <Preloader />
            <ScrollAnimations />
            <CustomCursor />
            <VideoModal />
            <Navbar />
            <main className="pt-16 md:pt-20 overflow-x-hidden">
              {children}
            </main>
            <Footer />
            </VideoModalProvider>
          </PreloaderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
