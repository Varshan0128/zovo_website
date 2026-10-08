import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zovo.digital';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ZOVO — Digital Solutions & Services',
    template: '%s | ZOVO',
  },
  description:
    'ZOVO designs and builds websites, mobile apps and digital solutions for businesses, startups and individuals.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'ZOVO',
    'digital solutions',
    'web development',
    'mobile applications',
    'UI/UX design',
    'AI solutions',
    'business automation',
    'career portfolios',
    'custom software',
  ],
  authors: [{ name: 'ZOVO' }],
  creator: 'ZOVO',
  publisher: 'ZOVO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'ZOVO — Digital Solutions & Services',
    description:
      'ZOVO designs and builds websites, mobile apps and digital solutions for businesses, startups and individuals.',
    siteName: 'ZOVO',
    images: [
      {
        url: '/brand/logo-light.png',
        width: 1024,
        height: 411,
        alt: 'ZOVO — Digital Solutions & Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZOVO — Digital Solutions & Services',
    description:
      'ZOVO designs and builds websites, mobile apps and digital solutions for businesses, startups and individuals.',
    images: ['/brand/logo-light.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZOVO',
    url: siteUrl,
    logo: `${siteUrl}/brand/icon.png`,
    slogan: 'Two blocks, one connection. Turning Ideas Into Digital Solutions.',
    description:
      'ZOVO designs and builds websites, mobile apps and digital solutions for businesses, startups and individuals.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contactzovo@gmail.com',
      telephone: '+917603865862',
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FFFFFF] text-[#14171F]">
        {children}
      </body>
    </html>
  );
}
