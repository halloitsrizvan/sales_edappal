
import { reviews } from '@/lib/data';
import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Reviews() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sky-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Client Stories</span>
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">What Our Clients Say</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        We are proud to have served hundreds of happy families in Edappal and Malappuram. Here is what they have to say about us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote size={64} className="text-sky-500 transform rotate-180" />
                            </div>

                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10">"{review.text}"</p>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center font-bold text-sky-600 text-lg">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">{review.name}</div>
                                    <div className="text-xs text-sky-500 font-medium">Verified Client</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-sky-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">Have a Feedback?</h2>
                        <p className="text-sky-100 mb-8 max-w-xl mx-auto">We value your opinion. Share your experience with us and help us improve.</p>
                        <a
                            href="https://wa.me/919895294949?text=Hi, I would like to share my feedback..."
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-full font-bold hover:bg-sky-50 transition-all shadow-lg hover:-translate-y-1"
                        >
                            <MessageSquare size={20} /> Share Review on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
