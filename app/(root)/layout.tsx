import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import '../globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'RapidLink',
  description: 'RapidLink helps you cut your URLs rapidly and easily'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      baseTheme: dark,
      elements: {
        userButtonAvatarBox: 'h-8 w-8 xs:h-12 xs:w-12'
      }
    }}
  >
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-900 pb-10`}>
        <Navbar />
        <main className="container mx-auto px-10 sm:px-20">{children}</main>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
