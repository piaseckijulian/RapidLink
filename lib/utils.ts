import { clsx, type ClassValue } from 'clsx';
import { type Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export const createMetadata = (
  title: string,
  description: string,
  image: string,
  url: URL
): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: image }],
    url,
    siteName: title
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@piaseckijulian'
  },
  icons: ['/favicon.ico'],
  metadataBase: url
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
