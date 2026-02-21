
'use client';

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                alert('Thank you! Your message has been sent. We will contact you soon.');
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-800 text-center mb-12">Get in Touch</h1>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Our Office</h3>
                                        <p className="text-slate-500">OMG Shoes Footwear,<br />Amsakachery, Edappal,<br />Kerala 679576</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Phone Number</h3>
                                        <p className="text-slate-500">
                                            <a href="tel:9895294949" className="hover:text-sky-600 font-medium">+91 9895294949</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Email Address</h3>
                                        <p className="text-slate-500">contact@salesedappal.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Working Hours</h3>
                                        <p className="text-slate-500">9:00 AM – 6:00 PM (Mon - Sat)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        suppressHydrationWarning
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        suppressHydrationWarning
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    suppressHydrationWarning
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.message}
                                    suppressHydrationWarning
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                                    placeholder="I'm interested in..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                suppressHydrationWarning
                                className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? 'Sending...' : <><Send size={20} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 h-96 overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.37890632348!2d76.0242!3d10.7788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ba1f8c14828d%3A0xf6a2a07d4b4f0b2a!2sEdappal%2C%20Kerala!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-xl"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
