
'use client';

import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/lib/data';
import { Filter, Search, X } from 'lucide-react';

export default function PropertiesPage() {
    const [filters, setFilters] = useState({
        type: 'All',
        location: 'All',
        priceRange: 'All',
        bedrooms: 'All',
    });

    const [sortOption, setSortOption] = useState('Newest First');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter Logic
    const filteredAndSortedProperties = properties
        .filter((property) => {
            // Type Filter
            if (filters.type !== 'All' && property.type !== filters.type) return false;

            // Location Filter
            if (filters.location !== 'All' && !property.location.includes(filters.location)) return false;

            // Bedrooms Filter
            if (filters.bedrooms !== 'All') {
                if (filters.bedrooms === '4+') {
                    if (!property.beds || property.beds < 4) return false;
                } else {
                    if (!property.beds || property.beds !== parseInt(filters.bedrooms)) return false;
                }
            }

            // Price Range Filter
            if (filters.priceRange !== 'All') {
                const price = property.priceAmount || 0;
                switch (filters.priceRange) {
                    case 'Under 10 Lakhs':
                        if (price >= 1000000) return false;
                        break;
                    case '10 - 50 Lakhs':
                        if (price < 1000000 || price > 5000000) return false;
                        break;
                    case '50 Lakhs - 1 Crore':
                        if (price < 5000000 || price > 10000000) return false;
                        break;
                    case 'Above 1 Crore':
                        if (price <= 10000000) return false;
                        break;
                    default:
                        break;
                }
            }

            return true;
        })
        .sort((a, b) => {
            switch (sortOption) {
                case 'Price: Low to High':
                    return (a.priceAmount || 0) - (b.priceAmount || 0);
                case 'Price: High to Low':
                    return (b.priceAmount || 0) - (a.priceAmount || 0);
                case 'Newest First':
                default:
                    return b.id - a.id; // Assuming higher ID is newer
            }
        });

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Properties in Edappal</h1>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600"
                    >
                        <Filter size={18} /> Filters
                    </button>

                    <div className="hidden md:flex gap-4">
                        <select
                            className="pl-4 pr-10 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-sky-500/20 text-slate-700 outline-none cursor-pointer"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-slate-800">Filters</h3>
                                <button
                                    onClick={() => setFilters({ type: 'All', location: 'All', priceRange: 'All', bedrooms: 'All' })}
                                    className="text-xs text-sky-500 font-semibold hover:underline"
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                                    <div className="space-y-2">
                                        {['All', 'House', 'Plot', 'Commercial', 'Apartment', 'Vehicle'].map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filters.type === type ? 'border-sky-500 bg-sky-500' : 'border-slate-300 bg-white group-hover:border-sky-400'}`}>
                                                    {filters.type === type && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    checked={filters.type === type}
                                                    onChange={() => setFilters({ ...filters, type })}
                                                    className="hidden"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-sky-600 transition-colors">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                    <select
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                        className="w-full rounded-lg border-slate-200 text-sm py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-700"
                                    >
                                        <option>All</option>
                                        <option>Edappal</option>
                                        <option>Amsakachery</option>
                                        <option>Malappuram</option>
                                        <option>Ponnani</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price Range</label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                        className="w-full rounded-lg border-slate-200 text-sm py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-700"
                                    >
                                        <option>All</option>
                                        <option>Under 10 Lakhs</option>
                                        <option>10 - 50 Lakhs</option>
                                        <option>50 Lakhs - 1 Crore</option>
                                        <option>Above 1 Crore</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                                    <div className="flex gap-2">
                                        {['All', '2', '3', '4+'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setFilters({ ...filters, bedrooms: opt === filters.bedrooms ? 'All' : opt })}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${filters.bedrooms === opt
                                                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        {/* Mobile Sort */}
                        <div className="md:hidden mb-4">
                            <select
                                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-sky-500/20 text-slate-700 outline-none"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {filteredAndSortedProperties.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAndSortedProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No properties found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your search criteria.</p>
                                <button
                                    onClick={() => setFilters({ type: 'All', location: 'All', priceRange: 'All', bedrooms: 'All' })}
                                    className="bg-sky-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-sky-600 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination (Visual only for now) */}
                        {filteredAndSortedProperties.length > 9 && (
                            <div className="flex justify-center gap-2 mt-12">
                                <button className="w-10 h-10 rounded-lg bg-sky-500 text-white font-semibold">1</button>
                                <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold">2</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
