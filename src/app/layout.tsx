import { createMetadata } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type { PropsWithChildren } from "react"
import { Navbar } from "./navbar"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = createMetadata()

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      elements: {
        userButtonAvatarBox: "h-10 w-10 xs:h-12 xs:w-12",
      },
      variables: {
        colorPrimary: "#2563eb",
      },
    }}
  >
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main className="container">{children}</main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout
