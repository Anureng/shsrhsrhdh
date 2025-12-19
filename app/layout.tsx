import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MathFlow - Math Problems & Solutions',
  description: 'Master mathematics with interactive problems, step-by-step solutions, and personalized learning paths. Covers algebra, geometry, calculus, statistics, and more.',
  keywords: [
    'math problems',
    'mathematics',
    'algebra',
    'geometry',
    'calculus',
    'statistics',
    'trigonometry',
    'online learning',
    'homework help',
  ],
  authors: [{ name: 'MathFlow Team' }],
  creator: 'MathFlow',
  publisher: 'MathFlow',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mathflow.example.com',
    title: 'MathFlow - Master Math Problems & Solutions',
    description: 'Interactive math learning platform with thousands of problems and detailed solutions.',
    siteName: 'MathFlow',
    images: [
      {
        url: 'https://mathflow.example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MathFlow - Math Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MathFlow - Master Math Problems & Solutions',
    description: 'Interactive math learning platform with thousands of problems and detailed solutions.',
    images: ['https://mathflow.example.com/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MathFlow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="relative min-h-screen flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}