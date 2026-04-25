'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PostPropertyPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Don't show if we are on the list-property page
        if (pathname === '/list-property') {
            setIsVisible(false);
            return;
        }

        // Check if it's already dismissed in this session
        const isDismissed = sessionStorage.getItem('postPropertyPopupDismissed');
        if (isDismissed) return;

        // Show after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 3 seconds delay for a better user experience

        return () => clearTimeout(timer);
    }, [pathname]);

    const handleDismiss = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
        sessionStorage.setItem('postPropertyPopupDismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed bottom-6 left-6 z-[60] max-w-[calc(100vw-48px)] sm:max-w-xs"
                >
                    <div className="relative group">
                        <Link 
                            href="/list-property"
                            className="flex items-center gap-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border border-sky-100/50 hover:border-sky-300/50 transition-all hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.2)]"
                        >
                            <div className="flex-shrink-0 w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                                <PlusCircle size={22} />
                            </div>
                            <div className="flex flex-col pr-4">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-sky-600 mb-0.5">Limited Offer</span>
                                <span className="text-[15px] font-bold text-slate-800 leading-tight">
                                    Post your property free
                                </span>
                            </div>
                        </Link>
                        
                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 hover:shadow-md transition-all z-10"
                            aria-label="Dismiss"
                        >
                            <X size={15} strokeWidth={2.5} />
                        </button>

                        {/* Subtle Badge/Glow effect */}
                        <div className="absolute -z-10 inset-0 bg-sky-400/5 blur-2xl rounded-3xl group-hover:bg-sky-400/10 transition-colors" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
