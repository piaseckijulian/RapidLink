import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import '../globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'RapidLink',
  description:
    'RapidLink, your go-to URL shortener, facilitates quick and easy link management with a user-friendly interface, making it the perfect solution for all your URL shortening needs.'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      elements: {
        userButtonAvatarBox: 'h-8 w-8 xs:h-12 xs:w-12'
      }
    }}
  >
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main className="xs:container max-xs:px-5">{children}</main>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
