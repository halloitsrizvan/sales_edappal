
'use client';

import { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { Menu, Search, Bell, X, User, MessageSquare, Building2, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const searchRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            if (data.success) {
                setNotifications(data.data);
                setUnreadCount(data.unreadCount);
            }
        } catch (error) {
            console.error('Notif fetch error:', error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            const res = await fetch('/api/notifications/read', { method: 'POST' });
            if (res.ok) {
                setUnreadCount(0);
                // Mark all local notifications as read too
                setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
            }
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    // Global Search Handle
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsSearchLoading(true);
                try {
                    const res = await fetch(`/api/admin-search?q=${searchQuery}`);
                    const data = await res.json();
                    if (data.success) {
                        setSearchResults(data.data);
                        setIsSearchOpen(true);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsSearchLoading(false);
                }
            } else {
                setSearchResults([]);
                setIsSearchOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    useEffect(() => {
        fetchNotifications();
        // Polling for new notifications every 1 minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    // Outside click handlers
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPageTitle = (path) => {
        if (path === '/admin/dashboard') return 'Dashboard Overview';
        if (path === '/admin/properties') return 'All Properties';
        if (path === '/admin/properties/add') return 'Add New Property';
        if (path.includes('/admin/properties/edit')) return 'Edit Property';
        if (path === '/admin/leads') return 'Leads & Inquiries';
        if (path === '/admin/reviews') return 'Review Management';
        if (path === '/admin/settings') return 'Admin Settings';
        return 'Admin Portal';
    };

    const getTimeAgo = (date) => {
        if (!mounted) return '...';
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return new Date(date).toLocaleDateString();
    };

    if (pathname === '/admin/login') {
        return <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800">{children}</div>;
    }

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-slate-800 tracking-tight">
            <AdminSidebar
                isMobileOpen={isMobileOpen}
                toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
            />

            <main className="flex-1 md:ml-64 transition-all duration-300">
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 h-20 px-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 md:hidden transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
                            {getPageTitle(pathname)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Search Bar */}
                        <div className="relative hidden md:block" ref={searchRef}>
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-sky-600' : 'text-slate-400'}`} size={18} />
                            <input
                                type="text"
                                placeholder="Search leads, properties..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery.length >= 2 && setIsSearchOpen(true)}
                                className="pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm w-72 lg:w-96 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white outline-none transition-all font-medium"
                                suppressHydrationWarning
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                                    suppressHydrationWarning
                                >
                                    <X size={14} />
                                </button>
                            )}

                            {/* Search Results Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    <div className="p-2 max-h-[400px] overflow-y-auto">
                                        {isSearchLoading ? (
                                            <div className="p-4 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                                                <Clock className="animate-spin" size={16} /> Searching...
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            <div className="space-y-1">
                                                {searchResults.map((result) => (
                                                    <Link
                                                        key={`${result.type}-${result.id}`}
                                                        href={result.link}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                                    >
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${result.type === 'property' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'
                                                            }`}>
                                                            {result.type === 'property' ? <Building2 size={18} /> : <User size={18} />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-800 truncate">{result.title}</p>
                                                            <p className="text-xs text-slate-500 truncate">{result.subtitle}</p>
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                                                            {result.type}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <Search size={20} className="text-slate-300" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-500">No results found for "{searchQuery}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Notifications */}
                            <div className="relative" ref={notifRef}>
                                <button
                                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                                    className={`relative p-2.5 rounded-xl transition-all duration-200 ${isNotifOpen ? 'bg-sky-50 text-sky-600 shadow-inner' : 'text-slate-500 hover:bg-slate-100'
                                        }`}
                                    suppressHydrationWarning
                                >
                                    <Bell size={20} className={unreadCount > 0 ? 'animate-ring' : ''} />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                    )}
                                </button>

                                {isNotifOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                                        <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="font-bold text-slate-800">Recent Updates</h3>
                                            <span className="px-2 py-1 bg-sky-100 text-sky-700 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                                {unreadCount} New
                                            </span>
                                        </div>

                                        <div className="max-h-[450px] overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                <div className="divide-y divide-slate-50">
                                                    {notifications.map((notif) => (
                                                        <Link
                                                            key={notif.id}
                                                            href={notif.link}
                                                            onClick={() => setIsNotifOpen(false)}
                                                            className={`flex gap-4 p-4 transition-colors group ${notif.isUnread ? 'bg-sky-50/50 hover:bg-sky-100/50' : 'hover:bg-slate-50'}`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform ${notif.type === 'property' ? 'bg-amber-100 text-amber-600' :
                                                                notif.type === 'lead' ? 'bg-sky-100 text-sky-600' :
                                                                    'bg-emerald-100 text-emerald-600'
                                                                }`}>
                                                                {notif.type === 'property' ? <Building2 size={18} /> :
                                                                    notif.type === 'lead' ? <MessageSquare size={18} /> :
                                                                        <CheckCircle size={18} />}
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{notif.title}</p>
                                                                    {notif.isUnread && <span className="w-2 h-2 bg-sky-500 rounded-full"></span>}
                                                                </div>
                                                                <p className={`text-xs leading-relaxed line-clamp-2 ${notif.isUnread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{notif.message}</p>
                                                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 pt-1">
                                                                    <Clock size={10} />
                                                                    {getTimeAgo(notif.time)}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-10 text-center">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Bell size={24} className="text-slate-300" />
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-800">All caught up!</p>
                                                    <p className="text-xs text-slate-500 mt-1">No new notifications to show.</p>
                                                </div>
                                            )}
                                        </div>

                                        {unreadCount > 0 && (
                                            <div className="p-3 bg-slate-50/80 border-t border-slate-50">
                                                <button
                                                    onClick={handleMarkAllRead}
                                                    className="w-full py-2 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors uppercase tracking-widest"
                                                >
                                                    Mark all as Read
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-800 leading-none mb-1">Admin</p>
                                    <p className="text-[10px] font-bold text-sky-600 uppercase tracking-tight">Verified Portal</p>
                                </div>
                                <div className="w-11 h-11 relative rounded-2xl overflow-hidden bg-sky-100 border-2 border-white shadow-md ring-1 ring-slate-100">
                                    <Image
                                        src="/logo.png"
                                        alt="Admin Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
