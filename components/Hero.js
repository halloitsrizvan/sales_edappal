
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Home, Key, MessageCircle, ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('Buy');
    const [searchParams, setSearchParams] = useState({
        location: '',
        type: '',
        area: '',
        budget: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (activeTab) params.append('status', activeTab);
        if (searchParams.location) params.append('location', searchParams.location);
        if (searchParams.type) params.append('type', searchParams.type);
        if (searchParams.area) params.append('area', searchParams.area);
        if (searchParams.budget) params.append('budget', searchParams.budget);

        window.location.href = `/properties?${params.toString()}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

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

                    <div className="space-y-4 pt-4">
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://wa.me/919895294949?text=Hi, I am looking for a property in Edappal..."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] hover:brightness-110 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                <MessageCircle size={20} /> Contact on WhatsApp
                            </a>
                            <a
                                href="tel:9895294949"
                                className="bg-white hover:bg-slate-50 text-sky-600 px-8 py-4 rounded-full font-semibold shadow-lg shadow-white/10 transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                <Phone size={20} /> Call Now
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/properties" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1 flex items-center gap-2">
                                View Properties <ArrowRight size={20} />
                            </Link>
                            <Link href="/list-property" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1">
                                List Your Property
                            </Link>
                        </div>
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

                    <form onSubmit={handleSearch} className="space-y-6">
                        {/* Location Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="location"
                                    value={searchParams.location}
                                    onChange={handleInputChange}
                                    placeholder="Enter location (e.g. Edappal)"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        {/* Property Type Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Property Type</label>
                            <div className="relative group">
                                <Home className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                                <select
                                    name="type"
                                    value={searchParams.type}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                                    suppressHydrationWarning
                                >
                                    <option value="">All Types</option>
                                    <option value="House">House</option>
                                    <option value="Plot">Plot / Land</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Vehicle">Vehicle</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Cent Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Area (Cent)</label>
                                <div className="relative group">
                                    <Key className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                                    <input
                                        type="number"
                                        name="area"
                                        value={searchParams.area}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 5"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                        suppressHydrationWarning
                                    />
                                </div>
                            </div>

                            {/* Budget Range Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Budget</label>
                                <div className="relative group">
                                    <DollarSign className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                                    <select
                                        name="budget"
                                        value={searchParams.budget}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                                        suppressHydrationWarning
                                    >
                                        <option value="">Any Budget</option>
                                        <option value="0-10">Below 10 Lakhs</option>
                                        <option value="10-25">10 - 25 Lakhs</option>
                                        <option value="25-50">25 - 50 Lakhs</option>
                                        <option value="50-100">50 Lakhs - 1 Cr</option>
                                        <option value="100+">Above 1 Cr</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 text-lg"
                            suppressHydrationWarning
                        >
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
