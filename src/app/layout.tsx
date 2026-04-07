import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unconfinedcinema.art"),
  title: {
    default: "The Unconfined Cinema",
    template: "%s | The Unconfined Cinema",
  },
  description:
    "A Filipino art collective where cinema escapes the screen. Immersive installations, experimental screenings, and collaborative workshops.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Unconfined Cinema",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unconfined Cinema",
    description:
      "A Filipino art collective where cinema escapes the screen. Immersive installations, experimental screenings, and collaborative workshops.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

/*
 * Inline script to set data-theme before React hydrates, preventing
 * a flash of the wrong color scheme. Content is a static string
 * authored in this file — no user input, no XSS vector.
 */
const themeInitScript = [
  "(function(){try{",
  "var t=localStorage.getItem('theme');",
  "if(!t){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}",
  "document.documentElement.setAttribute('data-theme',t);",
  "}catch(e){}})();",
].join("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Static, author-controlled content — safe to inline
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-cinema-black text-cinema-warm antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded focus:bg-cinema-gold focus:px-4 focus:py-2 focus:text-cinema-black"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <GrainOverlay />
        <ScrollProgressBar />
        <CustomCursor />
      </body>
    </html>
  );
}
