import { type Metadata } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import { type PropsWithChildren } from 'react';

import './globals.css';

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next WebAssembly API demo',
  description: 'Generate WASM modules using C3 and expose them as Next.js API routes',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-950 dark:bg-black dark:text-zinc-50`}
      >
        {children}
        <div
          className={[
            'absolute inset-0',
            'bg-[radial-gradient(125%_125%_at_50%_90%,transparent_40%,var(--color-violet-300)_100%)]',
            'dark:bg-[radial-gradient(125%_125%_at_50%_90%,transparent_40%,var(--color-violet-900)_100%)]',
          ].join(' ')}
        />
      </body>
    </html>
  );
}
