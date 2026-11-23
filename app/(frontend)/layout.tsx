import type { Metadata } from 'next';

import { SiteHeader } from '@/components/site/site-header';

import './globals.css';
import { neueMontreal } from './fonts';

export const metadata: Metadata = {
  title: 'ReachDem',
  description: 'Landing en reconstruction.',
  metadataBase: new URL('https://reachdem.cc'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={neueMontreal.variable}>
      <body className="bg-surface text-ink min-h-dvh antialiased">
        <a
          href="#contenu"
          className="focus:bg-ink focus:text-surface sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <div id="contenu">{children}</div>
      </body>
    </html>
  );
}
