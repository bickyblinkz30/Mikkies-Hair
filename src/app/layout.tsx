import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mikkies Hair | Premium Salon Experience",
  description:
    "Radiate confidence. Stay cute. Experience luxury hair care at Mikkies Hair — where every strand tells a story.",
  keywords: [
    "hair salon",
    "braids",
    "dreadlocks",
    "hair coloring",
    "wig installation",
    "Mikkies Hair",
    "premium salon",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="noise-overlay" />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              border: "1px solid #D4AF37",
              color: "#F5F5F5",
            },
          }}
        />
      </body>
    </html>
  )
}
