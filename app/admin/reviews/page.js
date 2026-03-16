
'use client';

import { useState, useEffect } from 'react';
import { Star, Trash2, Eye, EyeOff, Loader2, MessageSquare, CheckCircle } from 'lucide-react';

export default function ReviewsManagement() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/reviews?admin=true');
            const data = await res.json();
            if (data.success) {
                setReviews(data.data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleToggleVisibility = async (id, currentStatus) => {
        setActionId(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ showInPage: !currentStatus }),
            });
            if (res.ok) {
                setReviews(reviews.map(r => r._id === id ? { ...r, showInPage: !currentStatus } : r));
            }
        } catch (error) {
            alert('Failed to update review status');
        } finally {
            setActionId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you certain you want to delete this review? This action cannot be undone.')) return;

        setActionId(id);
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setReviews(reviews.filter(r => r._id !== id));
            }
        } catch (error) {
            alert('Failed to delete review');
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Review Moderation</h1>
                    <p className="text-slate-500 mt-1">Manage and approve feedback submitted by your clients.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-700">{reviews.length} Total Reviews</span>
                </div>
            </div>

            {loading ? (
                <div className="bg-white p-20 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-sky-500" size={40} />
                    <p className="text-slate-400 font-medium">Loading submissions...</p>
                </div>
            ) : reviews.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <MessageSquare size={40} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">No reviews yet</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mt-2">New feedback submitted by users will appear here for your approval.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className={`bg-white rounded-3xl border-2 transition-all p-8 relative overflow-hidden flex flex-col ${review.showInPage ? 'border-emerald-50 shadow-emerald-50' : 'border-slate-50'
                                } hover:shadow-xl`}
                        >
                            {review.showInPage && (
                                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1.5 rounded-bl-2xl flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                                    <CheckCircle size={14} /> Published
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 text-xl border border-slate-100">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{review.name}</h3>
                                    <div className="flex gap-0.5 text-amber-400 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={review.rating > i ? 'currentColor' : 'none'} strokeWidth={review.rating > i ? 0 : 2} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-50 mb-8 flex-grow">
                                <p className="text-slate-600 italic leading-relaxed font-medium">"{review.text}"</p>
                                <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest" suppressHydrationWarning>
                                    Submitted: {new Date(review.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                                <button
                                    disabled={actionId === review._id}
                                    onClick={() => handleToggleVisibility(review._id, review.showInPage)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${review.showInPage
                                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                            : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100'
                                        } disabled:opacity-50`}
                                >
                                    {actionId === review._id ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            {review.showInPage ? <><EyeOff size={18} /> Hide from Site</> : <><Eye size={18} /> Publish on Site</>}
                                        </>
                                    )}
                                </button>

                                <button
                                    disabled={actionId === review._id}
                                    onClick={() => handleDelete(review._id)}
                                    className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all disabled:opacity-50"
                                    title="Delete Review"
                                >
                                    {actionId === review._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={20} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
