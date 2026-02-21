
'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Users, Eye, TrendingUp, Building2, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0,
        sold: 0,
        forSale: 0,
        rent: 0,
        lease: 0
    });

    const fetchDashboardData = async () => {
        // setLoading(true); // Removed as per instruction
        try {
            const res = await fetch('/api/properties?limit=100&admin=true');
            const data = await res.json();
            if (data.success) {
                const props = data.data;
                setProperties(props);

                // Calculate stats
                setStats({
                    total: props.length,
                    active: props.filter(p => p.isApproved && p.status !== 'Sold').length,
                    pending: props.filter(p => !p.isApproved).length,
                    sold: props.filter(p => p.status === 'Sold').length,
                    forSale: props.filter(p => p.status === 'For Sale').length,
                    rent: props.filter(p => p.status === 'Rent').length,
                    lease: props.filter(p => p.status === 'Lease').length,
                });
            }
        } catch (error) {
            console.error('Dashboard fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleApprove = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setProcessingId(id);

        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved: true }),
            });

            if (res.ok) {
                // Instantly update local state for better UX
                setProperties(prev => prev.map(p =>
                    p._id === id ? { ...p, isApproved: true } : p
                ));
                // Then refresh everything from server
                fetchDashboardData();
            } else {
                const err = await res.json();
                alert('Fail: ' + err.message);
            }
        } catch (error) {
            console.error('Approve error:', error);
            alert('Approval failed. Check network.');
        } finally {
            setProcessingId(null);
        }
    };

    const pendingProperties = properties.filter(p => !p.isApproved);
    const recentProperties = properties.slice(0, 5);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                <p className="text-slate-500 font-medium tracking-wide">Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-sky-100 p-3 rounded-xl text-sky-600">
                            <Building2 size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Properties</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.total}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-rose-50 border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
                            <Clock size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Pending Approval</p>
                    <h3 className="text-2xl font-bold text-rose-600">{stats.pending}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Active Listings</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.active}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Sold Properties</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.sold}</h3>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Pending Approval Section */}
                <div className="lg:col-span-2 space-y-8">
                    {pendingProperties.length > 0 && (
                        <div className="bg-white rounded-2xl border-2 border-rose-100  overflow-hidden animate-pulse-subtle">
                            <div className="p-6 bg-rose-50/50 border-b border-rose-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-rose-800 flex items-center gap-2">
                                    <Clock size={20} /> Action Required: New Listings
                                </h3>
                                <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {pendingProperties.length} Pending
                                </span>
                            </div>
                            <div className="divide-y divide-rose-50">
                                {pendingProperties.map((prop) => (
                                    <div key={prop._id} className="p-4 hover:bg-rose-50/30 transition-colors flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                                {prop.images?.[0] ? (
                                                    <img src={prop.images[0]} className="w-full h-full object-cover" />
                                                ) : <Building2 className="w-full h-full p-3 text-slate-300" />}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-800 truncate">{prop.title}</h4>
                                                <p className="text-xs text-slate-500 truncate">{prop.location} • {prop.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => handleApprove(e, prop._id)}
                                                disabled={processingId === prop._id}
                                                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-100 transition-all flex items-center gap-1.5"
                                            >
                                                {processingId === prop._id ? (
                                                    <Loader2 size={14} className="animate-spin" />
                                                ) : (
                                                    <CheckCircle size={14} />
                                                )}
                                                Approve
                                            </button>
                                            <Link
                                                href={`/admin/properties/edit/${prop._id}`}
                                                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                                            >
                                                Review
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Properties Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">Recent Listings</h3>
                            <Link href="/admin/properties" className="text-sm text-sky-600 font-semibold hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Property</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Visibility</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentProperties.map((prop) => (
                                        <tr key={prop._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{prop.title}</div>
                                                <div className="text-[10px] text-slate-400">{prop.location}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{prop.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${prop.status === 'For Sale' ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {prop.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {prop.isApproved ? (
                                                    <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
                                                        <CheckCircle size={12} /> PUBLIC
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-rose-500 font-bold text-[10px]">
                                                        <XCircle size={12} /> HIDDEN
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="space-y-6">
                    {/* <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <Link href="/admin/properties/add" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                                <div className="p-2 bg-sky-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <Building2 size={18} />
                                </div>
                                <span className="font-medium">Add New Property</span>
                            </Link>
                            <Link href="/admin/leads" className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                                <div className="p-2 bg-emerald-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <Users size={18} />
                                </div>
                                <span className="font-medium">View All Leads</span>
                            </Link>
                        </div>
                    </div> */}

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center justify-between">
                            Inventory Status
                            <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-1 rounded-full uppercase tracking-tighter">Live Data</span>
                        </h3>

                        <div className="space-y-6">
                            {[
                                { label: 'For Sale', count: stats.forSale, color: 'bg-sky-500', bgColor: 'bg-sky-50', textColor: 'text-sky-600' },
                                { label: 'For Rent', count: stats.rent, color: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
                                { label: 'For Lease', count: stats.lease, color: 'bg-indigo-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
                            ].map((item) => {
                                const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
                                return (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                                <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-900">{item.count}</span>
                                        </div>
                                        <div className={`w-full h-3 ${item.bgColor} rounded-full overflow-hidden border border-slate-100/50`}>
                                            <div
                                                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                                style={{ width: `${Math.max(percentage, 2)}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Listings</span>
                                            <span className={`text-[9px] font-black uppercase tracking-tighter ${item.textColor}`}>
                                                {percentage.toFixed(0)}% SHARE
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Property Distribution</h4>
                            <div className="space-y-3">
                                {[
                                    { label: 'Houses', type: 'House' },
                                    { label: 'Plots', type: 'Plot' },
                                    { label: 'Commercial', type: 'Commercial' }
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">{item.label}</span>
                                        <span className="font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                            {properties.filter(p => p.type === item.type).length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
