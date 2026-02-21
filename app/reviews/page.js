'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, MessageSquare, Loader2 } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
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
        fetchReviews();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sky-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Client Stories</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">What Our Clients Say</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        We are proud to have served hundreds of happy families in Edappal and Malappuram. Here is what they have to say about us.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                        <p className="text-slate-400 font-medium tracking-wide">Gathering stories from our clients...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length > 0 ? reviews.map((review) => (
                            <div key={review._id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative group overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    <Quote size={80} className="text-sky-900 transform rotate-180" />
                                </div>

                                <div className="flex gap-1 text-amber-400 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={review.rating > i ? 'currentColor' : 'none'} strokeWidth={review.rating > i ? 0 : 2} className={review.rating > i ? '' : 'text-slate-200'} />
                                    ))}
                                </div>

                                <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10 flex-grow">"{review.text}"</p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-100 transform -rotate-3 group-hover:rotate-0 transition-all">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 tracking-tight">{review.name}</div>
                                        <div className="text-xs text-sky-500 font-bold uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                            Verified
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-12 text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-100 italic">
                                Be the first to share your experience below!
                            </div>
                        )}
                    </div>
                )}

                <section className="py-24 bg-white relative mt-12">
                    <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                        <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">Feedback</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Share Your Experience</h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            We value your opinion. Share your experience with us and help us improve our services for the Edappal community.
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-slate-400 text-xs ${['bg-sky-100', 'bg-emerald-100', 'bg-amber-100', 'bg-rose-100'][i - 1]}`}>
                                U{i}
                                </div>
                            ))}
                            </div>
                            <p className="text-sm font-medium text-slate-500">Join 100+ happy clients</p>
                        </div>
                        </div>
                        <div>
                        <FeedbackForm />
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
