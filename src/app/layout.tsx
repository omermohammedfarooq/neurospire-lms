import type { Metadata } from "next";
import { Inter, Space_Grotesk, Lora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neurospire AI Technologies — Enterprise AI Infrastructure",
  description:
    "Advancing the next generation of AI leaders through enterprise-grade project immersion. Deploy real-world models, optimize complex pipelines, and scale solutions for modern industry demands.",
  keywords: [
    "AI",
    "Machine Learning",
    "EdTech",
    "LMS",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Neurospire",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Geist Mono for code/labels */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash: default to dark until JS loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('neurospire_theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-on-background font-sans antialiased overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
