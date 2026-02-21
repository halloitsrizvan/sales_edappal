import './globals.css';
import { Poppins } from 'next/font/google';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Sales Edappal | Buy, Sell, Rent, Lease in Edappal & Malappuram',
  description: 'Trusted Real Estate Consultant in Edappal led by Sameer. We specialize in buying, selling, renting, and leasing verified properties across Edappal and Malappuram.',
  keywords: 'Real Estate Edappal, Property for Sale Malappuram, Rent House Edappal, Land for Sale, Vehicle Sale Edappal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 selection:bg-sky-200 selection:text-sky-900`}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
