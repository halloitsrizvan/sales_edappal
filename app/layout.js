
import './globals.css';
import { Poppins } from 'next/font/google';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://salesedappal.com'),
  title: {
    default: 'Sales Edappal | Real Estate Edappal & Malappuram',
    template: '%s | Sales Edappal'
  },
  description: 'Trusted Real Estate Consultant in Edappal led by Sameer. Buy, sell, rent, or lease verified properties, houses, and land across Edappal and Malappuram district.',
  keywords: [
    'Real Estate Edappal',
    'Property for Sale Malappuram',
    'Rent House Edappal',
    'Land for Sale Edappal',
    'Vehicle Sale Edappal',
    'Commercial Property Edappal',
    'Sameer Real Estate Edappal',
    'Buy House Edappal',
    'Lease Property Malappuram'
  ],
  authors: [{ name: 'Sameer', url: 'https://salesedappal.com' }],
  creator: 'Sameer',
  publisher: 'Sales Edappal',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Sales Edappal | Buy, Sell, Rent, Lease in Edappal & Malappuram',
    description: 'Trusted Real Estate Consultant in Edappal. Verified listings for houses, plots, and commercial spaces.',
    url: 'https://salesedappal.com',
    siteName: 'Sales Edappal',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Sales Edappal Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Edappal | Real Estate Edappal',
    description: 'Trusted Real Estate Consultant in Edappal. Buy, sell, or rent verified properties.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // User should replace this
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Sales Edappal',
    'image': 'https://salesedappal.com/logo.png',
    '@id': 'https://salesedappal.com',
    'url': 'https://salesedappal.com',
    'telephone': '+919895294949',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'OMG Shoes Footwear, Amsakachery',
      'addressLocality': 'Edappal',
      'addressRegion': 'Kerala',
      'postalCode': '679576',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 10.7634, // Approximate latitude for Edappal
      'longitude': 75.9892 // Approximate longitude for Edappal
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '09:00',
      'closes': '20:00'
    },
    'sameAs': [
      'https://www.facebook.com/profile.php?id=61552641255941&mibextid=ViGcVu',
      'https://instagram.com/sales_edappal?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr',
      'https://www.youtube.com/@salesedappal'
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 selection:bg-sky-200 selection:text-sky-900`}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
