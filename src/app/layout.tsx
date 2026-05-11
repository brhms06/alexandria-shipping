import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import LiveChat from "@/components/LiveChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Alexandria | Global Freight Tracking",
  description: "Elite shipment tracking and logistics management. Real-time package tracking, global port network, and premium freight intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className="font-inter antialiased">
        {/* GTranslate Widget Container */}
        <div className="gtranslate_wrapper relative z-[101]"></div>
        <LiveChat />
        
        {/* GTranslate Configuration */}
        <Script id="gtranslate-settings" strategy="beforeInteractive">
          {`
            window.gtranslateSettings = {
              "default_language": "en",
              "native_language_names": true,
              "detect_browser_language": true,
              "languages": ["en","fr","it","es","ru","de","sq"],
              "wrapper_selector": ".gtranslate_wrapper",
              "flag_size": 16,
              "switcher_horizontal_position": "left",
              "switcher_vertical_position": "top",
              "alt_flags": {"en": "usa"}
            }
          `}
        </Script>
        
        {/* GTranslate Main Script */}
        <Script 
          src="https://cdn.gtranslate.net/widgets/latest/dwf.js" 
          strategy="afterInteractive"
          defer
        />

        {children}
      </body>
    </html>
  );
}
