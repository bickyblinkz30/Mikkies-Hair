import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AnimatedBackground } from "@/components/AnimatedBackground"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FFFFFF'/%3E%3Cstop offset='35%25' stop-color='%23E0E0E0'/%3E%3Cstop offset='50%25' stop-color='%23C0C0C0'/%3E%3Cstop offset='65%25' stop-color='%23E0E0E0'/%3E%3Cstop offset='100%25' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='50' y='68' font-family='Playfair%20Display,Georgia,serif' font-size='80' font-weight='700' fill='url(%23g)' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimatedBackground />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              border: "1px solid #C9A84C",
              color: "#F5F5F5",
            },
          }}
        />
      </body>
    </html>
  )
}
