
import Link from 'next/link';
import { Facebook, Instagram, Youtube, PhoneCall, Mail, MapPin } from 'lucide-react';

import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-t from-sky-50 to-white text-gray-800 border-t border-sky-100 mt-20">
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-[calc(100%+1.3px)] h-[50px] fill-white rotate-180">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="block relative h-20 w-56 mb-2 hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="Sales Edappal Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-500 leading-relaxed font-medium">
                            Trusted Local Real Estate Consultant in Edappal. We make buying, selling, and renting properties simple and transparent.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a 
                                href="https://www.facebook.com/profile.php?id=61552641255941&mibextid=ViGcVu" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-sky-100 text-sky-600 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                            >
                                <Facebook size={18} />
                            </a>
                            <a 
                                href="https://instagram.com/sales_edappal?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-sky-100 text-sky-600 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                            >
                                <Instagram size={18} />
                            </a>
                            <a 
                                href="https://www.youtube.com/@salesedappal" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-sky-100 text-sky-600 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                            >
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gray-800">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Properties', 'About Us', 'Services', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-sky-600 hover:translate-x-1.5 inline-block transition-transform duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gray-800">Our Services</h4>
                        <ul className="space-y-3">
                            {['Buy Property', 'Sell Property', 'Rent & Lease', 'Property Consultation'].map((item) => (
                                <li key={item} className="text-gray-500 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gray-800">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-500">
                                <MapPin className="text-sky-500 mt-1 flex-shrink-0" size={18} />
                                <span>OMG Shoes Footwear,<br />Amsakachery, Edappal,<br />Kerala 679576</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <PhoneCall className="text-sky-500 flex-shrink-0" size={18} />
                                <a href="tel:9895294949" className="hover:text-sky-600 font-semibold text-gray-700">9895294949</a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <Mail className="text-sky-500 flex-shrink-0" size={18} />
                                <a href="mailto:samedappal@gmail.com" className="hover:text-sky-600">samedappal@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-sky-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p suppressHydrationWarning>© {new Date().getFullYear()} Sales Edappal. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-sky-600">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-sky-600">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
