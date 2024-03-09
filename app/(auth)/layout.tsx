import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import '../globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'RapidLink',
  description:
    'RapidLink, your go-to URL shortener, facilitates quick and easy link management with a user-friendly interface, making it the perfect solution for all your URL shortening needs.'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider appearance={{ variables: { colorPrimary: '#2563eb' } }}>
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex h-screen items-center justify-center">{children}</main>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
