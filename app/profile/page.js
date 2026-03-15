'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, LogOut, Loader2, Home, MapPin, ClipboardList, CheckCircle2, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('/api/user/me');
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                    setProperties(data.properties);
                    setRequirements(data.requirements);
                } else {
                    router.push('/login');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/user/logout', { method: 'POST' });
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-sky-500" size={40} />
            </div>
        );
    }

    if (!user) return null;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'New': return <Clock className="text-amber-500" size={16} />;
            case 'Contacted':
            case 'Checked': return <CheckCircle2 className="text-emerald-500" size={16} />;
            case 'Rejected': return <XCircle className="text-red-500" size={16} />;
            default: return <Clock className="text-slate-400" size={16} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Contacted':
            case 'Checked': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 md:py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-sky-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-[#005BC8] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-sky-200">
                            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{user.name || 'User'}</h1>
                            <p className="text-slate-500 font-medium text-lg mt-1">{user.email}</p>
                            <div className="flex items-center gap-2 justify-center md:justify-start mt-3">
                                <span className="px-3 py-1 bg-sky-50 text-[#005BC8] font-bold text-xs rounded-full border border-sky-100">
                                    Member
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all border border-red-100"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Properties Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Home className="text-sky-500" size={24} /> 
                                Posted Properties
                            </h2>
                            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                                {properties.length}
                            </span>
                        </div>

                        {properties.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Home className="text-slate-400" size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">No Properties Found</h3>
                                <p className="text-slate-500 mt-2 text-sm font-medium">You haven't listed any properties yet.</p>
                                <Link href="/list-property?action=post" className="inline-block mt-4 px-6 py-2 bg-sky-50 text-sky-600 font-bold text-sm rounded-lg border border-sky-200 hover:bg-sky-100 transition-all">
                                    Post Property
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {properties.map((prop) => (
                                    <div key={prop._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{prop.title}</h3>
                                                <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                                                    <MapPin size={14} /> {prop.location}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-lg font-black text-[#005BC8]">{prop.price}</span>
                                                {prop.isApproved ? (
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <CheckCircle2 size={12} /> Approved
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <Clock size={12} /> Pending Review
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-50 flex gap-2">
                                            <span className="text-xs font-bold px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg">{prop.type}</span>
                                            <span className="text-xs font-bold px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg">{prop.status}</span>
                                            {prop.isApproved && (
                                                <Link href={`/properties/${prop.slug || prop._id}`} className="ml-auto text-xs font-bold text-sky-500 hover:underline">
                                                    View Public Listing →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Requirements Section */}
                    {/* <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <ClipboardList className="text-[#005BC8]" size={24} /> 
                                Posted Requirements
                            </h2>
                            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                                {requirements.length}
                            </span>
                        </div>

                        {requirements.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ClipboardList className="text-slate-400" size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">No Requirements Found</h3>
                                <p className="text-slate-500 mt-2 text-sm font-medium">You haven't posted any requirements yet.</p>
                                <Link href="/list-property?action=requirement" className="inline-block mt-4 px-6 py-2 bg-sky-50 text-sky-600 font-bold text-sm rounded-lg border border-sky-200 hover:bg-sky-100 transition-all">
                                    Post Requirement
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requirements.map((req) => (
                                    <div key={req._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start gap-4">
                                            <p className="text-sm font-bold text-slate-700 italic leading-relaxed line-clamp-2">"{req.message}"</p>
                                            
                                            <div className="flex-shrink-0">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border ${getStatusColor(req.status)}`}>
                                                    {getStatusIcon(req.status)} {req.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-500">
                                            <span>Posted: {new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div> */}
                </div>
            </div>
        </div>
    );
}
