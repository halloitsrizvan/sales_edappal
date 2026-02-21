
'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function PropertyInquiryForm({ propertyId, propertyTitle }) {
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Quick Inquiry',
                    phone: phone,
                    propertyId: propertyId,
                    message: `Interested in property: ${propertyTitle}`,
                }),
            });

            if (res.ok) {
                setStatus('success');
                setPhone('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <p className="text-sm font-bold text-emerald-800">Inquiry Sent!</p>
                {/* <button
                    onClick={() => setStatus('idle')}
                    className="text-xs text-emerald-600 hover:underline font-medium"
                >
                    Send another
                </button> */}
            </div>
        );
    }

    return (
        <div className="pt-4 border-t border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Quick Enquiry</p>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                    <input
                        type="tel"
                        required
                        value={phone}
                        suppressHydrationWarning
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone Number"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    suppressHydrationWarning
                    className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300 shadow-sm"
                >
                    {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        <>
                            Enquiry Now <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
                {status === 'error' && <p className="text-[10px] text-rose-500 text-center font-bold">Failed. Try again.</p>}
            </form>
        </div>
    );
}
