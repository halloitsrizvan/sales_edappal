'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Filter, LayoutGrid, List, MoreVertical, Eye, CheckCircle2, XCircle, Clock, MapPin, Building2, ChevronLeft, ChevronRight, User, Trash2, ShieldCheck, History, ShoppingCart, Tag, Edit2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertiesList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterApproved, setFilterApproved] = useState('All');

    // Modal states

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: null, id: null, currentStatus: null, newStatus: null, title: '', isLoading: false });
    const [openStatusId, setOpenStatusId] = useState(null);

    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = () => setOpenStatusId(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 10,
                search,
                type: filterType === 'All' ? '' : filterType,
                status: filterStatus === 'All' ? '' : filterStatus,
                isApproved: filterApproved === 'All' ? '' : (filterApproved === 'Approved' ? 'true' : 'false'),
                admin: 'true', // Fetch everything
            }).toString();

            const res = await fetch(`/api/properties?${query}`);
            const data = await res.json();
            if (data.success) {
                setProperties(data.data);
                setTotalPages(data.pagination.pages);
            }
        } catch (error) {
            console.error('Failed to fetch properties:', error);
        } finally {
            setLoading(false);
        }
    }, [page, search, filterType, filterStatus, filterApproved]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleApproveToggle = async (id, currentStatus) => {
        setConfirmDialog({
            isOpen: true,
            type: 'approve',
            id,
            currentStatus,
            title: currentStatus ? 'Revoke Approval?' : 'Approve this property?',
            message: currentStatus ? 'This will hide the property from public view.' : 'This will make the property visible to all users.'
        });
    };

    const processApproveToggle = async () => {
        const { id, currentStatus } = confirmDialog;
        setConfirmDialog(prev => ({ ...prev, isLoading: true }));
        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved: !currentStatus }),
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                // Optimistic update
                setProperties(prev => prev.map(p => p._id === id ? { ...p, isApproved: !currentStatus } : p));
                setConfirmDialog({ isOpen: false, type: null, id: null, currentStatus: null, title: '', isLoading: false });
                // Background refresh to stay in sync
                fetchProperties();
            } else {
                alert(data.message || 'Failed to update property status');
                setConfirmDialog(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Approval toggle error:', error);
            alert('Something went wrong. Please try again.');
            setConfirmDialog(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleDelete = async (id) => {
        setConfirmDialog({
            isOpen: true,
            type: 'delete',
            id,
            title: 'Delete Property?',
            message: 'This action is permanent and cannot be undone. Are you sure?'
        });
    };

    const processDelete = async () => {
        const { id } = confirmDialog;
        setConfirmDialog(prev => ({ ...prev, isLoading: true }));
        try {
            const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
            const data = await res.json();
            
            if (res.ok && data.success) {
                // Remove from state immediately for better UX
                setProperties(prev => prev.filter(p => p._id !== id));
                // Then fetch fresh data to sync pagination
                fetchProperties();
                setConfirmDialog({ isOpen: false, type: null, id: null, currentStatus: null, newStatus: null, title: '', isLoading: false });
            } else {
                alert(data.message || 'Failed to delete property');
                setConfirmDialog(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Something went wrong. Please try again.');
            setConfirmDialog(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleFeatureToggle = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !currentStatus }),
            });
            if (res.ok) fetchProperties();
        } catch (error) {
            console.error('Feature toggle error:', error);
        }
    };

    const handleStatusToggle = async (id, currentStatus, newStatus) => {
        setConfirmDialog({
            isOpen: true,
            type: 'status',
            id,
            currentStatus,
            newStatus,
            title: `Change status to ${newStatus}?`,
            message: `Current: ${currentStatus}. This will update the property listing status immediately.`
        });
    };

    const processStatusToggle = async () => {
        const { id, newStatus } = confirmDialog;
        setConfirmDialog(prev => ({ ...prev, isLoading: true }));
        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                // Optimistic update
                setProperties(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
                setConfirmDialog({ isOpen: false, type: null, id: null, currentStatus: null, newStatus: null, title: '', isLoading: false });
                // Background refresh
                fetchProperties();
            } else {
                alert(data.message || 'Failed to update property status');
                setConfirmDialog(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Status update error:', error);
            alert('Something went wrong. Please try again.');
            setConfirmDialog(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm"
                        suppressHydrationWarning
                    />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            setPage(1);
                        }}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-500 outline-none cursor-pointer text-slate-600"
                        suppressHydrationWarning
                    >
                        <option value="All">All Status</option>
                        <option value="For Sale">For Sale</option>
                        <option value="Rent">For Rent</option>
                        <option value="Lease">For Lease</option>
                        <option value="Sold">Sold Out</option>
                        <option value="Rented">Rented Out</option>
                        <option value="Leased">Lease Out</option>
                    </select>

                    <select
                        value={filterApproved}
                        onChange={(e) => {
                            setFilterApproved(e.target.value);
                            setPage(1);
                        }}
                        className={`px-4 py-2 border rounded-xl text-sm outline-none cursor-pointer font-bold ${filterApproved === 'Pending' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                            filterApproved === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                                'bg-white border-slate-200 text-slate-600'
                            }`}
                        suppressHydrationWarning
                    >
                        <option value="All">All Visibility</option>
                        <option value="Approved">Approved Only</option>
                        <option value="Pending">Pending Only</option>
                    </select>

                    <Link href="/admin/properties/add" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-sky-200 transition-all flex items-center gap-2 whitespace-nowrap">
                        <Plus size={18} /> Add Property
                    </Link>
                </div>
            </div>

            {/* Properties View */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-16">#</th>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4">Approved</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                                        Loading properties...
                                    </td>
                                </tr>
                            ) : properties.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                                        No properties found.
                                    </td>
                                </tr>
                            ) : (
                                properties.map((prop, index) => (
                                    <tr key={prop._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-slate-400 font-medium">P-{index + 1 + (page - 1) * 10}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                                                    {prop.images && prop.images[0] ? (
                                                        <Image src={prop.images[0]} alt={prop.title} width={40} height={40} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Building2 className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
                                                    )}
                                                </div>
                                                <div className="max-w-[200px]">
                                                    <div className="font-semibold text-slate-800 truncate" title={prop.title}>{prop.title}</div>
                                                    <div className="text-xs text-slate-500 truncate">{prop.location}</div>
                                                    {prop.ownerName && (
                                                        <div className="text-[10px] text-sky-600 font-bold mt-1">
                                                            👤 {prop.ownerName} {prop.ownerPhone && `• ${prop.ownerPhone}`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{prop.price}</td>
                                        <td className="px-6 py-4 text-slate-600">{prop.type}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleFeatureToggle(prop._id, prop.featured)}
                                                className={`p-1 rounded-full transition-colors ${prop.featured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'}`}
                                                suppressHydrationWarning
                                            >
                                                <CheckCircle2 size={18} className={prop.featured ? 'fill-current' : ''} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleApproveToggle(prop._id, prop.isApproved)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${prop.isApproved
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
                                                suppressHydrationWarning
                                            >
                                                {confirmDialog.isLoading && confirmDialog.id === prop._id ? 'Processing...' : (
                                                    prop.isApproved ? (
                                                        <><CheckCircle2 size={14} /> Approved</>
                                                    ) : (
                                                        <><XCircle size={14} /> Pending</>
                                                    )
                                                )}
                                            </button>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenStatusId(openStatusId === prop._id ? null : prop._id);
                                                    }}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all mx-auto border shadow-sm hover:shadow-md ${prop.status === 'Sold'
                                                        ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                        : prop.status === 'Rent' ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                    : prop.status === 'Lease' ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                        : prop.status === 'Rented' ? 'bg-orange-50 text-orange-600 border-orange-100'
                                                            : prop.status === 'Leased' ? 'bg-purple-50 text-purple-600 border-purple-100'
                                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
                                                    suppressHydrationWarning
                                                >
                                                    {prop.status === 'Sold' || prop.status === 'Rented' || prop.status === 'Leased' ? <ShoppingCart size={12} /> : <Tag size={12} />}
                                                    {prop.status === 'Sold' ? 'Sold Out' :
                                                        prop.status === 'Rented' ? 'Rented Out' :
                                                            prop.status === 'Leased' ? 'Lease Out' :
                                                                prop.status === 'Rent' ? 'For Rent' :
                                                                    prop.status === 'Lease' ? 'For Lease' :
                                                                        'For Sale'}
                                                </button>

                                                {/* Status Selector Dropdown */}
                                                {openStatusId === prop._id && (
                                                    <div
                                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-1.5 z-20 w-32 animate-in fade-in slide-in-from-top-1 duration-200"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {[
                                                            { label: 'For Sale', value: 'For Sale', color: 'text-emerald-600 bg-emerald-50' },
                                                            { label: 'For Rent', value: 'Rent', color: 'text-amber-600 bg-amber-50' },
                                                            { label: 'For Lease', value: 'Lease', color: 'text-indigo-600 bg-indigo-50' },
                                                            { label: 'Sold Out', value: 'Sold', color: 'text-rose-600 bg-rose-50' },
                                                            { label: 'Rented Out', value: 'Rented', color: 'text-orange-600 bg-orange-50' },
                                                            { label: 'Lease Out', value: 'Leased', color: 'text-purple-600 bg-purple-50' }
                                                        ].map(s => (
                                                            <button
                                                                key={s.value}
                                                                onClick={() => {
                                                                    if (s.value !== prop.status) handleStatusToggle(prop._id, prop.status, s.value);
                                                                    setOpenStatusId(null);
                                                                }}
                                                                className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all mb-0.5 last:mb-0 ${prop.status === s.value
                                                                    ? s.color
                                                                    : 'hover:bg-slate-50 text-slate-500'
                                                                    }`}
                                                            >
                                                                {s.label} {prop.status === s.value && '✓'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/properties/${prop._id}`} target="_blank" className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                                                    <Eye size={18} />
                                                </Link>
                                                <Link href={`/admin/properties/edit/${prop._id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(prop._id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    suppressHydrationWarning
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-slate-100">
                    {loading ? (
                        <div className="py-20 text-center text-slate-400">Loading properties...</div>
                    ) : properties.length === 0 ? (
                        <div className="py-20 text-center text-slate-400">No properties found.</div>
                    ) : (
                        properties.map((prop, index) => (
                            <div key={prop._id} className="p-4 space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden relative shrink-0">
                                        {prop.images && prop.images[0] ? (
                                        <Image src={prop.images[0]} alt={prop.title} width={64} height={64} className="w-full h-full object-cover" />
                                        ) : (
                                            <Building2 className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-slate-800 truncate">{prop.title}</div>
                                        <div className="text-xs text-slate-500 truncate">{prop.location}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-bold text-sky-600">{prop.price}</span>
                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{prop.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleFeatureToggle(prop._id, prop.featured)}
                                            className={`p-1.5 rounded-lg transition-colors ${prop.featured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 bg-slate-50'}`}
                                            suppressHydrationWarning
                                        >
                                            <CheckCircle2 className={prop.featured ? 'fill-current' : ''} size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
                                    <button
                                        onClick={() => handleApproveToggle(prop._id, prop.isApproved)}
                                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shrink-0 ${prop.isApproved
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
                                        suppressHydrationWarning
                                    >
                                        {prop.isApproved ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                        {confirmDialog.isLoading && confirmDialog.id === prop._id ? 'Processing...' : (prop.isApproved ? 'Approved' : 'Pending')}
                                    </button>

                                    <div className="relative shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenStatusId(openStatusId === prop._id ? null : prop._id);
                                            }}
                                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border shadow-sm ${prop.status === 'Sold'
                                                ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                : prop.status === 'Rent' ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                    : prop.status === 'Lease' ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                        : prop.status === 'Rented' ? 'bg-orange-50 text-orange-600 border-orange-100'
                                                            : prop.status === 'Leased' ? 'bg-purple-50 text-purple-600 border-purple-100'
                                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
                                            suppressHydrationWarning
                                        >
                                            {prop.status === 'Sold' ? 'Sold Out' : prop.status === 'Rented' ? 'Rented Out' : prop.status === 'Leased' ? 'Lease Out' : prop.status === 'Rent' ? 'Rent' : prop.status === 'Lease' ? 'Lease' : 'Sale'}
                                            <MoreHorizontal size={10} className="ml-1 opacity-50" />
                                        </button>

                                        {openStatusId === prop._id && (
                                            <div className="fixed inset-x-4 bottom-20 z-50 lg:hidden animate-in slide-in-from-bottom-5">
                                                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
                                                    <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Set Listing Status</div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            { label: 'For Sale', value: 'For Sale' },
                                                            { label: 'For Rent', value: 'Rent' },
                                                            { label: 'For Lease', value: 'Lease' },
                                                            { label: 'Sold Out', value: 'Sold' },
                                                            { label: 'Rented Out', value: 'Rented' },
                                                            { label: 'Lease Out', value: 'Leased' }
                                                        ].map(s => (
                                                            <button
                                                                key={s.value}
                                                                onClick={() => {
                                                                    if (s.value !== prop.status) handleStatusToggle(prop._id, prop.status, s.value);
                                                                    setOpenStatusId(null);
                                                                }}
                                                                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all ${prop.status === s.value ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-600'}`}
                                                            >
                                                                {s.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-1 shrink-0 ml-auto">
                                        <Link href={`/properties/${prop._id}`} target="_blank" className="p-2 text-slate-400 bg-slate-50 rounded-lg">
                                            <Eye size={18} />
                                        </Link>
                                        <Link href={`/admin/properties/edit/${prop._id}`} className="p-2 text-indigo-600 bg-indigo-50 rounded-lg">
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(prop._id)}
                                            className="p-2 text-rose-600 bg-rose-50 rounded-lg"
                                            suppressHydrationWarning
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {properties.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 border border-slate-200 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 border border-slate-200 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Dialog */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${confirmDialog.type === 'delete' ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-600'
                                }`}>
                                {confirmDialog.type === 'delete' ? <Trash2 size={20} /> : <CheckCircle2 size={20} />}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">{confirmDialog.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{confirmDialog.message}</p>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (confirmDialog.type === 'delete') processDelete();
                                    else if (confirmDialog.type === 'approve') processApproveToggle();
                                    else if (confirmDialog.type === 'status') processStatusToggle();
                                }}
                                disabled={confirmDialog.isLoading}
                                className={`flex-1 px-4 py-2 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${confirmDialog.type === 'delete'
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-100'
                                    : 'bg-sky-600 hover:bg-sky-700 shadow-sky-100'
                                    } ${confirmDialog.isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {confirmDialog.isLoading ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
