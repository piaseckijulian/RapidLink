import Navbar from '@/components/Navbar';
import { createMetadata } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { type PropsWithChildren } from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = createMetadata(
  'RapidLink',
  'RapidLink, your go-to Link shortener, facilitates quick and easy link management with a user-friendly interface, making it the perfect solution for all your links shortening needs.',
  '/thumbnail.png',
  new URL('https://julian-rapidlink.vercel.app')
);

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      elements: {
        userButtonAvatarBox: 'h-8 w-8 xs:h-12 xs:w-12'
      },
      variables: {
        colorPrimary: '#2563eb'
      }
    }}
  >
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main className="xs:container max-xs:px-4">{children}</main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
