
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
    default: 'Sales Edappal | Real Estate Consultant Edappal & Malappuram',
    template: '%s | Sales Edappal'
  },
  description: 'The most trusted real estate consultant in Edappal. Sameer offers verified houses, land plots, and commercial properties for sale, rent, and lease across Malappuram district.',
  keywords: [
    'property for sale in edappal',
    'land for sale edappal',
    'real estate edappal',
    'house for sale malappuram',
    'plots for sale edappal',
    'real estate consultant edappal',
    'commercial property edappal',
    'rent house edappal',
    'Sameer Edappal real estate',
    'verified properties edappal'
  ],
  authors: [{ name: 'Sameer Edappal', url: 'https://salesedappal.com' }],
  creator: 'Sameer Edappal',
  publisher: 'Sales Edappal',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sales Edappal | Real Estate Consultant in Malappuram',
    description: 'Find your dream home or investment plot in Edappal. Verified listings and expert guidance by Sameer.',
    url: 'https://salesedappal.com',
    siteName: 'Sales Edappal',
    images: [
      {
        url: '/og-image.jpg', // Should create this image
        width: 1200,
        height: 630,
        alt: 'Sales Edappal - Real Estate Edappal',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Edappal | Property Consultant Edappal',
    description: 'Verified houses and land for sale in Edappal and Malappuram district.',
    images: ['/og-image.jpg'],
    creator: '@salesedappal',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Sales Edappal',
    'description': 'Trusted Real Estate Consultant in Edappal. Expert in buying, selling, and renting houses and land plots.',
    'image': 'https://salesedappal.com/logo.png',
    '@id': 'https://salesedappal.com',
    'url': 'https://salesedappal.com',
    'telephone': '+919895294949',
    'priceRange': '₹₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Nurukkuparambil building, Opposite alnoor masjid, Ponnani road, Amsakkachery',
      'addressLocality': 'Edappal',
      'addressRegion': 'Kerala',
      'postalCode': '679576',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 10.7634,
      'longitude': 75.9892
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ],
      'opens': '09:00',
      'closes': '20:00'
    },
    'sameAs': [
      'https://www.facebook.com/profile.php?id=100070670615796&mibextid=LQQJ4d',
      'https://instagram.com/sales_edappal?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr',
      'https://www.youtube.com/@salesedappal'
    ],
    'areaServed': [
      { '@type': 'Place', 'name': 'Edappal' },
      { '@type': 'Place', 'name': 'Malappuram' },
      { '@type': 'Place', 'name': 'Ponnani' },
      { '@type': 'Place', 'name': 'Kuttippuram' }
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
