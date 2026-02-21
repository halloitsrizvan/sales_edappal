
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    PlusSquare,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Star,
    CreditCard // Assuming credit card icon for Sold properties or similar
} from 'lucide-react';
import Image from 'next/image';

const AdminSidebar = ({ isMobileOpen, toggleMobile }) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        // Clear cookie call to API
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const links = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'All Properties', href: '/admin/properties', icon: Building2 },
        { name: 'Add Property', href: '/admin/properties/add', icon: PlusSquare },
        { name: 'Property Leads', href: '/admin/leads', icon: Users },
        { name: 'General Inquiries', href: '/admin/inquiries', icon: MessageSquare },
        { name: 'Reviews', href: '/admin/reviews', icon: Star }, // I see Star was used for reviews in some places, but Sidebar had MessageSquare. Let's keep it consistent.
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={toggleMobile}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-slate-800`}>
                <div className="flex items-center justify-between p-6 border-b border-slate-800 h-20">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 relative">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-lg tracking-wide">Admin</span>
                    </Link>
                    <button onClick={toggleMobile} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => isMobileOpen && toggleMobile()}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors"
                        suppressHydrationWarning
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
