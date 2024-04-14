import type { Metadata } from 'next';
import { TypographyContextProvider } from './_shared/context';

import '@/theme/globals.scss';

export const metadata: Metadata = {
  title: 'Dictionary Online',
  description: `Free online dictionary done with NextJS by Sergio Cerdá Hervás as a practice exercise. Project from frontendmentor.io`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TypographyContextProvider>{children}</TypographyContextProvider>
    </html>
  );
}
