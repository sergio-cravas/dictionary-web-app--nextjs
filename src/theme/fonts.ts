import { Inconsolata, Inter, Lora } from 'next/font/google';

const sans_serif = Inter({
  subsets: ['latin'],
  variable: '--font-sans_serif',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const serif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const monospace = Inconsolata({
  subsets: ['latin'],
  variable: '--font-monospace',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export { sans_serif, serif, monospace };
