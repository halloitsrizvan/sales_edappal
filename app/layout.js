
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <Navbar />
        <main className="flex-grow relative z-0 mt-20">
          {children}
        </main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          <a
            href="tel:9895294949"
            className="bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 transition-all hover:-translate-y-1"
            aria-label="Call Now"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a
            href="https://wa.me/919895294949"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:-translate-y-1 animate-bounce duration-1000"
            aria-label="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
          </a>
        </div>
      </body>
    </html>
  );
}
