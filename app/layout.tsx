import type {Metadata} from 'next';
import './globals.css';
import PaperMouseTrail from '@/components/PaperMouseTrail';

export const metadata: Metadata = {
  title: 'PODI - Doradca drukowania na żądanie',
  description: 'Cześć... Jestem PODI. Twój inteligentny Doradca od drukowania na żądanie.',
  openGraph: {
    title: 'PODI - Doradca drukowania na żądanie',
    description: 'Cześć... Jestem PODI. Twój inteligentny Doradca od drukowania na żądanie.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PODI - Doradca drukowania na żądanie',
    description: 'Cześć... Jestem PODI. Twój inteligentny Doradca od drukowania na żądanie.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl">
      <body suppressHydrationWarning className="bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white min-h-screen">
        <PaperMouseTrail />
        {children}
      </body>
    </html>
  );
}
