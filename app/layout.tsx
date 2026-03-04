import type { Metadata } from 'next';
import { inter, jetbrainsMono, outfit } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'GasStation Pro - Management System',
  description: 'Professional gas station operational and administrative dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-[#f8fafc] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
