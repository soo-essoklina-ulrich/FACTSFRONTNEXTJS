import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/Providers';
import { ChildrenType } from '@/types/types';

const roboto_slab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SOOSMART',
  description: 'SOOSMART application de facturation',
  icons: {
    icon: '/identity_redim.ico',
    shortcut: '/identity_redim.ico',
    apple: '/identity_redim.ico',
  },
};

export default function RootLayout({ children }: Readonly<ChildrenType>) {
  return (
    <html lang="fr">
      <body className={`${roboto_slab.variable}  antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" expand={false} richColors={true} />
      </body>
    </html>
  );
}
