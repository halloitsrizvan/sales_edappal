
'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, User, Search, MessageSquare, Trash2, CheckCircle2 } from 'lucide-react';

export default function InquiriesPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [actionId, setActionId] = useState(null);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/leads?type=general&page=${page}&limit=10`);
            const data = await res.json();
            if (data.success) {
                setLeads(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page]);

    const handleToggleContacted = async (id, currentStatus) => {
        setActionId(id);
        try {
            await fetch(`/api/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacted: !currentStatus })
            });
            setLeads(leads.map(lead => lead._id === id ? { ...lead, contacted: !currentStatus } : lead));
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setActionId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this inquiry?')) return;
        setActionId(id);
        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setLeads(leads.filter(lead => lead._id !== id));
            }
        } catch (error) {
            alert('Failed to delete');
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">General Inquiries</h1>
                    <p className="text-slate-500 mt-1">Manage contact form submissions from the "Get in Touch" section.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-8 py-5">Sender</th>
                                <th className="px-8 py-5">Contact Details</th>
                                <th className="px-8 py-5">Message</th>
                                <th className="px-8 py-5">Received On</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                                            <p className="text-slate-400 font-medium">Fetching inquiries...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                <MessageSquare size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">No general inquiries found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm uppercase ring-4 ring-sky-50/30 transition-transform group-hover:scale-110">
                                                {lead.name?.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-800">{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1.5 font-medium">
                                            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors">
                                                <Phone size={14} className="text-slate-400" /> {lead.phone}
                                            </a>
                                            {lead.email && (
                                                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors text-xs">
                                                    <Mail size={14} className="text-slate-400" /> {lead.email}
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 max-w-xs">
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2" title={lead.message}>
                                            {lead.message || <span className="text-slate-300 italic">No message provided</span>}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-slate-800 font-medium">{new Date(lead.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                                            <span className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleToggleContacted(lead._id, lead.contacted)}
                                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${lead.contacted
                                                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                                        : 'bg-amber-50 text-amber-600 hover:bg-amber-100 animate-pulse'
                                                    }`}
                                            >
                                                {lead.contacted ? <><CheckCircle2 size={14} /> Contacted</> : 'New Inquiry'}
                                            </button>

                                            <button
                                                onClick={() => handleDelete(lead._id)}
                                                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
