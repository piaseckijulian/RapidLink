import { type ClassValue, clsx } from "clsx"
import type { Metadata } from "next"
import { twMerge } from "tailwind-merge"

const title = "RapidLink"
const description =
  "RapidLink swiftly shortens long URLs for convenient sharing."
const image = "/thumbnail.png"
const url = new URL("https://julian-rapidlink.vercel.app")

export const createMetadata = (): Metadata => ({
  title,
  description,
  twitter: {
    title,
    description,
    images: image,
    card: "summary_large_image",
  },
  openGraph: {
    title,
    description,
    url,
    images: image,
    siteName: title,
  },
  metadataBase: url,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
