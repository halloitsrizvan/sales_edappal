
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, User, Home, Building2, MessageSquare, Info } from 'lucide-react';

import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Properties', href: '/properties', icon: Building2 },
        { name: 'Reviews', href: '/reviews', icon: MessageSquare },
        { name: 'About', href: '/about', icon: Info },
        { name: 'Contact', href: '/contact', icon: Phone },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-white border-b border-white/20 transition-all duration-300">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 md:h-24">
                    <Link href="/" className="flex items-center gap-3 group relative">
                        <div className="relative h-12 w-12 md:h-16 md:w-16 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Sales Edappal Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight md:hidden">
                            Sales Edappal
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors relative hover:text-sky-600 ${isActive ? 'text-sky-600 font-semibold' : 'text-slate-600'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-sky-500 rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <Link
                            href="/list-property"
                            className="ml-4 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            List Your Property
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-sky-600 transition-colors"
                        suppressHydrationWarning
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {links.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === link.href
                                            ? 'bg-sky-50 text-sky-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-gray-100">
                                <Link
                                    href="/list-property"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center bg-sky-500 text-white py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
                                >
                                    List Your Property
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
