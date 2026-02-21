
'use client';

import { useState } from 'react';
import { Star, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function FeedbackForm() {
    const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', text: '', rating: 5 });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Thank You!</h3>
                <p className="text-slate-600">Your feedback has been submitted successfully and is waiting for review.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-emerald-600 font-bold hover:underline"
                >
                    Submit another feedback
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">Leave a Review</h3>
                <p className="text-slate-500 text-sm">Your feedback helps us provide better service to the Edappal community.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        suppressHydrationWarning
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul K"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                suppressHydrationWarning
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className={`p-2 rounded-lg transition-all ${formData.rating >= star ? 'text-amber-400 bg-amber-50' : 'text-slate-300 bg-slate-50'}`}
                            >
                                <Star size={20} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Experience</label>
                    <textarea
                        required
                        rows="4"
                        value={formData.text}
                        suppressHydrationWarning
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Tell us about your experience with Sameer and the team..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                    ></textarea>
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                suppressHydrationWarning
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
            >
                {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                        <Send size={20} /> Submit Feedback
                    </>
                )}
            </button>
            {status === 'error' && <p className="text-rose-500 text-sm font-medium text-center">Submission failed. Please try again.</p>}
        </form>
    );
}
