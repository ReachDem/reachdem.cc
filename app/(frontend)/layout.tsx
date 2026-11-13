import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ReachDem',
  description: 'Landing en reconstruction.',
  metadataBase: new URL('https://reachdem.cc'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
