
'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, User, Search, ExternalLink, Trash2, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Dialog state
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: null, id: null, status: null, title: '', message: '' });
    const [openStatusId, setOpenStatusId] = useState(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = () => setOpenStatusId(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [page]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/leads?type=property&page=${page}&limit=10`);
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

    const handleStatusChange = (id, status) => {
        const titles = {
            'Contacted': 'Mark as Contacted?',
            'Checked': 'Mark as Checked?',
            'Rejected': 'Reject Lead?',
            'New': 'Reset to New?'
        };
        const messages = {
            'Contacted': 'This will indicate that you have reached out to this customer.',
            'Checked': 'This will indicate that you have verified this lead.',
            'Rejected': 'This will move the lead to rejected status.',
            'New': 'This will reset the lead back to new status.'
        };

        setConfirmDialog({
            isOpen: true,
            type: 'status',
            id,
            status,
            title: titles[status],
            message: messages[status]
        });
    };

    const processStatusChange = async () => {
        const { id, status } = confirmDialog;
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, contacted: status === 'Contacted' || status === 'Checked' })
            });
            if (res.ok) fetchLeads();
        } catch (error) {
            console.error(error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    };

    const handleDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            type: 'delete',
            id,
            title: 'Delete Lead?',
            message: 'This lead will be permanently removed. Are you sure?'
        });
    };

    const processDelete = async () => {
        const { id } = confirmDialog;
        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            if (res.ok) fetchLeads();
        } catch (error) {
            console.error(error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Property Leads</h1>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Property Interest</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">Loading...</td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">No leads found.</td>
                                </tr>
                            ) : leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs uppercase">
                                                {lead.name?.charAt(0)}
                                            </div>
                                            {lead.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-slate-600">
                                            <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> {lead.phone}</span>
                                            {lead.email && <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {lead.email}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lead.propertyId ? (
                                            <Link
                                                href={`/properties/${lead.propertyId}`}
                                                target="_blank"
                                                className="text-sky-600 font-medium hover:underline flex items-center gap-1"
                                            >
                                                View Property <ExternalLink size={12} />
                                            </Link>
                                        ) : (
                                            <span className="text-slate-400 italic">General Inquiry</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={lead.message}>
                                        {lead.message || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-xs">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenStatusId(openStatusId === lead._id ? null : lead._id);
                                                    }}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 hover:shadow-md ${lead.status === 'Checked' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        lead.status === 'Contacted' ? 'bg-sky-50 text-sky-600 border-sky-100' :
                                                            lead.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                                'bg-amber-50 text-amber-600 border-amber-100'
                                                        }`}
                                                >
                                                    {lead.status === 'Checked' && <CheckCircle size={14} />}
                                                    {lead.status === 'Contacted' && <Phone size={14} />}
                                                    {lead.status === 'Rejected' && <XCircle size={14} />}
                                                    {(!lead.status || lead.status === 'New') && <Clock size={14} />}
                                                    {lead.status || 'New'}
                                                </button>

                                                {/* Status Dropdown - Open on Click */}
                                                {openStatusId === lead._id && (
                                                    <div
                                                        className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-slate-100 p-1 z-20 w-32 animate-in fade-in slide-in-from-top-1 duration-200"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {['New', 'Contacted', 'Checked', 'Rejected'].map(s => (
                                                            <button
                                                                key={s}
                                                                onClick={() => {
                                                                    if (s !== lead.status) handleStatusChange(lead._id, s);
                                                                    setOpenStatusId(null);
                                                                }}
                                                                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${lead.status === s ? 'bg-slate-50 text-sky-600 font-bold' : 'hover:bg-slate-50 text-slate-600'
                                                                    }`}
                                                            >
                                                                {s} {lead.status === s && '✓'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleDelete(lead._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Dialog */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${confirmDialog.type === 'delete' ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-600'
                                }`}>
                                {confirmDialog.type === 'delete' ? <Trash2 size={20} /> : <CheckCircle size={20} />}
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
                                    else if (confirmDialog.type === 'status') processStatusChange();
                                }}
                                className={`flex-1 px-4 py-2 text-white rounded-xl text-sm font-bold transition-all shadow-lg ${confirmDialog.type === 'delete' || confirmDialog.status === 'Rejected'
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-100'
                                    : 'bg-sky-600 hover:bg-sky-700 shadow-sky-100'
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
