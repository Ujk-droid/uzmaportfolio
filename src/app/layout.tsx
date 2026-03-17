import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Uzma | Full-stack Developer & AI Integration Specialist",
  description: "Full-stack Developer specializing in AI Command Centers and Complex API Integrations with Odoo, n8n, and Twilio.",
  keywords: ["Full-stack Developer", "AI", "API Integration", "Odoo", "n8n", "Twilio", "Next.js", "React"],
  authors: [{ name: "Uzma" }],
  openGraph: {
    title: "Uzma | Full-stack Developer & AI Integration Specialist",
    description: "Building digital excellence through innovative full-stack solutions and AI-powered automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased bg-zinc-950 text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
