
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    // Check if the current route is an admin route
    // Also handling edge case if pathname is null (unlikely but safe)
    const isAdminRoute = pathname?.startsWith('/admin');

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="flex-grow relative z-0 mt-20 lg:mt-28">
                {children}
            </main>
            <Footer />
            {/* Sticky Buttons for User Side Only */}
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
        </>
    );
}
