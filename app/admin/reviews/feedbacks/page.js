
'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Star, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function AdminFeedbacks() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews?admin=true');
            const data = await res.json();
            if (data.success) setReviews(data.data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleToggleVisibility = async (id, currentStatus) => {
        setProcessingId(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ showInPage: !currentStatus }),
            });
            if (res.ok) await fetchReviews();
        } catch (error) {
            alert('Update failed');
        } finally {
            setProcessingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this feedback permanently?')) return;
        setProcessingId(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) await fetchReviews();
        } catch (error) {
            alert('Delete failed');
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                <p className="text-slate-500 font-medium tracking-wide">Loading feedbacks...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquare className="text-sky-500" /> User Feedbacks
                </h1>
                <span className="bg-sky-50 text-sky-600 px-4 py-1.5 rounded-full text-sm font-bold border border-sky-100">
                    {reviews.length} Submissions
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">No feedbacks received yet.</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className={`bg-white p-6 rounded-3xl border transition-all ${review.showInPage ? 'border-emerald-200 ring-4 ring-emerald-50' : 'border-slate-100 shadow-sm'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{review.name}</h3>
                                    <div className="flex gap-1 text-amber-400 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={review.rating > i ? 'currentColor' : 'none'} className={review.rating <= i ? 'text-slate-200' : ''} />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                    {review.showInPage && (
                                        <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-2">
                                            LIVE ON PAGE
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">"{review.text}"</p>

                            <div className="flex gap-3 pt-4 border-t border-slate-50">
                                <button
                                    onClick={() => handleToggleVisibility(review._id, review.showInPage)}
                                    disabled={processingId === review._id}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${review.showInPage
                                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                            : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100'
                                        }`}
                                >
                                    {processingId === review._id ? <Loader2 size={14} className="animate-spin" /> : (
                                        review.showInPage ? <><XCircle size={14} /> Hide from Page</> : <><CheckCircle2 size={14} /> Show in Page</>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    disabled={processingId === review._id}
                                    className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
