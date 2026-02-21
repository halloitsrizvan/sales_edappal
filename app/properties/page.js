'use client';

import { useState, useEffect, Suspense } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Filter, Search, X, Loader2 } from 'lucide-react';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import { useSearchParams } from 'next/navigation';

function PropertiesContent() {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        type: 'All',
        status: 'All',
        location: 'All',
        priceRange: 'All',
        bedrooms: 'All',
    });

    const [sortOption, setSortOption] = useState('Newest First');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Initial load from URL params
    useEffect(() => {
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const location = searchParams.get('location');
        const budget = searchParams.get('budget');

        if (type || status || location || budget) {
            setFilters(prev => {
                const newFilters = { ...prev };

                if (type) {
                    // Normalize case to match sidebar values (e.g. "commercial" -> "Commercial")
                    const validTypes = ['House', 'Plot', 'Commercial', 'Apartment', 'Vehicle'];
                    const matchedType = validTypes.find(t => t.toLowerCase() === type.toLowerCase());
                    newFilters.type = matchedType || type;
                }

                if (status) {
                    // Map "For Sale" to "Buy" and normalize case
                    let normalizedStatus = status;
                    if (status.toLowerCase() === 'for sale' || status.toLowerCase() === 'buy') normalizedStatus = 'Buy';
                    else if (status.toLowerCase() === 'rent') normalizedStatus = 'Rent';
                    else if (status.toLowerCase() === 'lease') normalizedStatus = 'Lease';

                    newFilters.status = normalizedStatus;
                }

                if (location) newFilters.location = location;

                if (budget) {
                    newFilters.priceRange = budget === '0-10' ? 'Under 10 Lakhs' :
                        budget === '10-25' ? '10 - 25 Lakhs' :
                            budget === '25-50' ? '10 - 50 Lakhs' :
                                budget === '50-100' ? '50 Lakhs - 1 Crore' :
                                    budget === '100+' ? 'Above 1 Crore' : 'All';
                }

                return newFilters;
            });
        }
    }, [searchParams]);

    useEffect(() => {
        let isMounted = true;

        const performFetch = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page,
                    limit: 12,
                    type: filters.type === 'All' ? '' : filters.type,
                    status: filters.status === 'All' ? '' : filters.status,
                    location: filters.location === 'All' ? '' : filters.location,
                });

                if (filters.priceRange !== 'All') {
                    switch (filters.priceRange) {
                        case 'Under 10 Lakhs':
                            params.append('maxPrice', '1000000');
                            break;
                        case '10 - 50 Lakhs':
                            params.append('minPrice', '1000000');
                            params.append('maxPrice', '5000000');
                            break;
                        case '50 Lakhs - 1 Crore':
                            params.append('minPrice', '5000000');
                            params.append('maxPrice', '10000000');
                            break;
                        case 'Above 1 Crore':
                            params.append('minPrice', '10000000');
                            break;
                    }
                }

                const res = await fetch(`/api/properties?${params.toString()}`);
                const data = await res.json();

                if (isMounted && data.success) {
                    setProperties(data.data);
                    setTotalPages(data.pagination.pages);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        performFetch();

        return () => {
            isMounted = false;
        };
    }, [page, filters, sortOption]);

    const sortedProperties = [...properties].sort((a, b) => {
        switch (sortOption) {
            case 'Price: Low to High':
                return (a.priceAmount || 0) - (b.priceAmount || 0);
            case 'Price: High to Low':
                return (b.priceAmount || 0) - (a.priceAmount || 0);
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Properties </h1>

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
                            suppressHydrationWarning
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
                                    onClick={() => setFilters({ type: 'All', status: 'All', location: 'All', priceRange: 'All', bedrooms: 'All' })}
                                    className="text-xs text-sky-500 font-semibold hover:underline"
                                    suppressHydrationWarning
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['All', 'Buy', 'Rent', 'Lease'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setFilters({ ...filters, status });
                                                    setPage(1);
                                                }}
                                                suppressHydrationWarning
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${filters.status === status
                                                    ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

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
                                                    onChange={() => {
                                                        setFilters({ ...filters, type });
                                                        setPage(1);
                                                    }}
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
                                        onChange={(e) => {
                                            setFilters({ ...filters, location: e.target.value });
                                            setPage(1);
                                        }}
                                        className="w-full rounded-lg border-slate-200 text-sm py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-700"
                                        suppressHydrationWarning
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
                                        onChange={(e) => {
                                            setFilters({ ...filters, priceRange: e.target.value });
                                            setPage(1);
                                        }}
                                        className="w-full rounded-lg border-slate-200 text-sm py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-700"
                                        suppressHydrationWarning
                                    >
                                        <option>All</option>
                                        <option>Under 10 Lakhs</option>
                                        <option>10 - 50 Lakhs</option>
                                        <option>50 Lakhs - 1 Crore</option>
                                        <option>Above 1 Crore</option>
                                    </select>
                                </div>

                                {/* <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                                    <div className="flex gap-2">
                                        {['All', '2', '3', '4+'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setFilters({ ...filters, bedrooms: opt === filters.bedrooms ? 'All' : opt });
                                                    setPage(1);
                                                }}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${filters.bedrooms === opt
                                                    ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
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
                                suppressHydrationWarning
                            >
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => <PropertyCardSkeleton key={i} />)}
                            </div>
                        ) : sortedProperties.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedProperties.map((property) => (
                                        <PropertyCard key={property._id} property={property} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center gap-2 mt-12">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                suppressHydrationWarning
                                                className={`w-10 h-10 rounded-lg font-semibold transition-all ${page === i + 1
                                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No properties found</h3>
                                <p className="text-slate-500 mb-6 font-medium">Try adjusting your search criteria.</p>
                                <button
                                    onClick={() => {
                                        setFilters({ type: 'All', status: 'All', location: 'All', priceRange: 'All', bedrooms: 'All' });
                                        setPage(1);
                                    }}
                                    suppressHydrationWarning
                                    className="bg-sky-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-100"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-sky-500" size={40} />
            </div>
        }>
            <PropertiesContent />
        </Suspense>
    );
}
