

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('Buy');
    const [searchParams, setSearchParams] = useState({
        location: '',
        type: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (activeTab) params.append('status', activeTab);
        if (searchParams.location) params.append('location', searchParams.location);
        if (searchParams.type) params.append('type', searchParams.type);

        window.location.href = `/properties?${params.toString()}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className="relative h-[66vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Bokeh Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Luxury Real Estate"
                    fill
                    priority
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                {/* Bokeh Effect Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.1)_0%,_transparent_50%),_radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.1)_0%,_transparent_50%)] opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-2xl">
                        Find Your Dream Property in Edappal
                    </h1>

                    <p className="text-xs md:text-sm text-slate-200 font-medium max-w-2xl mx-auto drop-shadow uppercase tracking-widest">
                        Verified Properties | Transparent Deals | Local Expertise. <br className="hidden md:block" /> 
                        We connect buyers and sellers with premium listings across Malappuram.
                    </p>

                    {/* Highly Professional Search Component */}
                    <div className="mt-8 max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg md:rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.25)] overflow-hidden border border-gray-100">
                            {/* Tabs Row */}
                            <div className="flex justify-center items-center border-b border-sky-50">
                                {['Buy', 'Rent', 'Lease'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        suppressHydrationWarning
                                        className={`px-8 py-3.5 text-sm md:text-base font-medium transition-all relative ${
                                            activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="hero-tab-underline"
                                                className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#0056b3] rounded-t-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Inputs Row */}
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch">
                                {/* Property Type Selection */}
                                <div className="w-full md:w-[35%] px-5 py-3.5 flex items-center justify-between border-b md:border-b-0 md:border-r border-sky-50 group transition-colors hover:bg-slate-50">
                                    <div className="flex-1 text-left">
                                        <select
                                            name="type"
                                            value={searchParams.type}
                                            onChange={handleInputChange}
                                            suppressHydrationWarning
                                            className="w-full bg-transparent text-gray-800 font-base text-base md:text-base focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">Property Type</option>
                                            <option value="House">House</option>
                                            <option value="Plot">Plot / Land</option>
                                            <option value="Commercial">Commercial</option>
                                            {activeTab !== 'Buy' && <option value="Apartment">Apartment</option>} 
                                            <option value="Villa">Villa</option>
                                        </select>
                                    </div>
                                    <ChevronDown className="text-gray-400 group-hover:text-[#0056b3] transition-colors" size={20} />
                                </div>

                                {/* Search Input Container */}
                                <div className="w-full md:w-[65%] px-5 py-3.5 flex items-center gap-3 group transition-colors hover:bg-slate-50">
                                    <div className="text-[#0056b3] transition-transform group-focus-within:scale-105">
                                        <Search size={24} strokeWidth={2.5} />
                                    </div>
                                    <input
                                        type="text"
                                        name="location"
                                        value={searchParams.location}
                                        onChange={handleInputChange}
                                        placeholder="Please enter any location..."
                                        suppressHydrationWarning
                                        className="flex-1 bg-transparent text-gray-800 font-base text-base md:text-base focus:outline-none placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        suppressHydrationWarning
                                        className="hidden md:block bg-[#0056b3] hover:bg-[#004494] text-white px-8 py-3 rounded-lg font-medium text-base transition-all shadow-lg active:scale-95 whitespace-nowrap"
                                    >
                                        Search
                                    </button>
                                </div>

                                {/* Mobile Search Button */}
                                <div className="md:hidden px-6 pb-6 pt-2">
                                    <button
                                        type="submit"
                                        suppressHydrationWarning
                                        className="w-full bg-[#0056b3] text-white py-4 rounded-xl font-medium text-lg shadow-lg active:scale-95"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

