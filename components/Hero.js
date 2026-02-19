
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Home, Key, MessageCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('Buy');

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Real Estate Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center py-20">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white space-y-6"
                >
                    <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-sky-100 tracking-wide uppercase">#1 Real Estate in Edappal</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">Dream Property</span> in Edappal
                    </h1>

                    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                        Verified Properties | Transparent Deals | Local Expertise.
                        We connect buyers and sellers with premium listings across Malappuram.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/properties" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1 flex items-center gap-2">
                            View Properties <ArrowRight size={20} />
                        </Link>
                        <Link href="/list-property" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1">
                            List Your Property
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-sm text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="bg-sky-500/20 p-2 rounded-full text-sky-400"><CheckCircleIcon /></div>
                            <span>Verified Listings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-sky-500/20 p-2 rounded-full text-sky-400"><CheckCircleIcon /></div>
                            <span>Local Expert</span>
                        </div>
                    </div>
                </motion.div>

                {/* Search Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md mx-auto lg:ml-auto w-full"
                >
                    <div className="flex gap-4 mb-8 border-b border-gray-100 pb-4">
                        {['Buy', 'Rent', 'Lease'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                suppressHydrationWarning
                                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-sky-500 text-sky-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <select suppressHydrationWarning className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none text-gray-700 font-medium">
                                    <option>Edappal</option>
                                    <option>Amsakachery</option>
                                    <option>Malappuram</option>
                                    <option>Ponnani</option>
                                    <option>Kuttipuram</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Type</label>
                            <div className="relative">
                                <Home className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <select suppressHydrationWarning className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none text-gray-700 font-medium">
                                    <option>House</option>
                                    <option>Plot / Land</option>
                                    <option>Commercial</option>
                                    <option>Apartment</option>
                                    <option>Vehicle</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Price (L)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                    <input suppressHydrationWarning type="number" placeholder="5" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-gray-700 font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Price (L)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-gray-400" size={16} />
                                    <input suppressHydrationWarning type="number" placeholder="100+" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-gray-700 font-medium" />
                                </div>
                            </div>
                        </div>

                        <button type="button" suppressHydrationWarning className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 text-lg">
                            <Search size={22} />
                            Search Properties
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

export default Hero;
