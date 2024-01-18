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
      baseTheme: dark
    }}
  >
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-900`}>
        <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </main>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
