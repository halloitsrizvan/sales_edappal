

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, User, Home, Building2, MessageSquare, Info, ChevronDown, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Properties for Sale', href: '/properties?status=Buy' },
        { name: 'Properties for Rent', href: '/properties?status=Rent' },
        { name: 'Properties for Lease', href: '/properties?status=Lease' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <header className="fixed w-full top-0 z-50 transition-all duration-300">
            {/* Top Bar - Blue */}
            <div className="bg-[#0056b3] text-white py-2 md:py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-32 md:h-12 md:w-40 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Sales Edappal"
                                fill
                                className="object-contain brightness-0 invert" // Make logo white for blue background
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Contact & Buttons */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                        <div className="flex items-center gap-2 text-sm xl:text-base font-semibold">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Phone size={18} className="fill-white" />
                            </div>
                            <span>+91 98952 94949</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <a
                                href="https://wa.me/919895294949"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-sm text-sm font-bold flex items-center gap-2 transition-colors shadow-lg"
                            >
                                WhatsApp
                            </a>
                            <a
                                href="tel:9895294949"
                                className="bg-[#00aeef] hover:bg-[#0096ce] text-white px-4 py-2 rounded-sm text-sm font-bold flex items-center gap-2 transition-colors shadow-lg"
                            >
                                Call Now
                            </a>
                        </div>

                        <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                            <Link
                                href="/list-property?action=post"
                                className="bg-white text-[#0056b3] hover:bg-slate-50 px-4 py-2 rounded-sm text-sm font-bold transition-all"
                            >
                                Post Property
                            </Link>
                            <Link
                                href="/list-property?action=requirement"
                                className="bg-white text-[#0056b3] hover:bg-slate-50 px-4 py-2 rounded-sm text-sm font-bold transition-all"
                            >
                                Post Requirement
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        suppressHydrationWarning
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Navigation Bar - White */}
            <div className={`hidden lg:block bg-white border-b border-gray-100 transition-all duration-300 ${scrolled ? 'py-1.5 shadow-md' : 'py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="hidden lg:flex justify-center items-center gap-6 xl:gap-10">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs xl:text-sm font-medium transition-all relative hover:text-[#0056b3] ${
                                        isActive ? 'text-[#0056b3]' : 'text-gray-700'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                    

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-white lg:hidden h-screen overflow-y-auto"
                    >
                        <div className="p-4 bg-[#0056b3] text-white flex justify-between items-center">
                            <span className="font-bold">Menu</span>
                            <button onClick={() => setIsOpen(false)} suppressHydrationWarning className="p-2">
                                <X size={32} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-xl font-medium text-gray-900 border-b border-gray-50 pb-3"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 space-y-4">
                                <div className="text-gray-500 font-bold text-sm uppercase">Connect with us</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="https://wa.me/919895294949"
                                        className="bg-[#25D366] text-white p-4 rounded-md flex flex-col items-center gap-2 font-bold shadow-md"
                                    >
                                        <MessageCircle size={24} />
                                        <span>WhatsApp</span>
                                    </a>
                                    <a
                                        href="tel:9895294949"
                                        className="bg-[#00aeef] text-white p-4 rounded-md flex flex-col items-center gap-2 font-bold shadow-md"
                                    >
                                        <Phone size={24} />
                                        <span>Call Now</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-2xl text-[#0056b3] font-bold">
                                    <Phone size={20} />
                                    <span>+91 98952 94949</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 pt-4">
                                <Link
                                    href="/list-property?action=post"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#0056b3] text-white py-4 rounded-xl text-center font-bold text-lg shadow-lg"
                                >
                                    Post Property
                                </Link>
                                <Link
                                    href="/list-property?action=requirement"
                                    onClick={() => setIsOpen(false)}
                                    className="border-2 border-[#0056b3] text-[#0056b3] py-4 rounded-xl text-center font-bold text-lg"
                                >
                                    Post Requirement
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

