
'use client';

import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="bg-slate-50 min-h-screen">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-900">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1578505504285-b15234ad1b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Contact Us Background"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-[#002B5B]/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
                    >
                        <MessageCircle size={14} className="text-[#005BC8]" />
                        <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Contact Us</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
                    >
                        Let's Work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005BC8] to-sky-400">
                            Together.
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Whether you are looking to buy, sell, or just need expert real estate advice in Edappal, our team is ready to help you every step of the way.
                    </motion.p>
                </div>
                
                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20 bg-slate-50 relative -mt-16 z-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                        
                        {/* Contact Information (2 Columns Width) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 h-full flex flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-8">Get in Touch</h2>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-5 group">
                                            <div className="w-14 h-14 bg-[#005BC8]/10 rounded-2xl flex items-center justify-center text-[#005BC8] shrink-0 group-hover:bg-[#005BC8] group-hover:text-white transition-all duration-300">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Office</h3>
                                                <p className="text-slate-700 font-medium leading-relaxed">
                                                    OMG Shoes Footwear,<br />
                                                    Amsakachery, Edappal,<br />
                                                    Kerala 679576
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-5 group">
                                            <div className="w-14 h-14 bg-[#005BC8]/10 rounded-2xl flex items-center justify-center text-[#005BC8] shrink-0 group-hover:bg-[#005BC8] group-hover:text-white transition-all duration-300">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</h3>
                                                <a href="tel:9895294949" className="text-slate-700 font-bold hover:text-[#005BC8] text-lg transition-colors">
                                                    +91 9895294949
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-5 group">
                                            <div className="w-14 h-14 bg-[#005BC8]/10 rounded-2xl flex items-center justify-center text-[#005BC8] shrink-0 group-hover:bg-[#005BC8] group-hover:text-white transition-all duration-300">
                                                <Mail size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</h3>
                                                <a href="mailto:samedappal@gmail.com" className="text-slate-700 font-bold hover:text-[#005BC8] transition-colors break-all">
                                                    samedappal@gmail.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-5 group">
                                            <div className="w-14 h-14 bg-[#005BC8]/10 rounded-2xl flex items-center justify-center text-[#005BC8] shrink-0 group-hover:bg-[#005BC8] group-hover:text-white transition-all duration-300">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Working Hours</h3>
                                                <p className="text-slate-700 font-medium">9:00 AM – 6:00 PM<br/><span className="text-slate-500 text-sm">(Mon - Sat)</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-12 pt-8 border-t border-slate-100">
                                    <p className="text-sm text-slate-500 font-medium">
                                        Need immediate assistance? Reach us explicitly fast on WhatsApp.
                                    </p>
                                    <a href="https://wa.me/919895294949" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:brightness-105 transition-all w-full justify-center">
                                        <MessageCircle size={18} /> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form (3 Columns Width) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-3 bg-[#002B5B] p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white"
                        >
                            {/* Decorative Form Backgrounds */}
                            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#005BC8]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 md:translate-x-1/4 pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-2">Send us a Message</h2>
                                <p className="text-blue-200/80 mb-10 font-medium">Fill out the form below and we will get back to you immediately.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                suppressHydrationWarning
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-[#005BC8] focus:ring-2 focus:ring-[#005BC8]/50 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                suppressHydrationWarning
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-[#005BC8] focus:ring-2 focus:ring-[#005BC8]/50 outline-none transition-all"
                                                placeholder="+91 9876543210"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            suppressHydrationWarning
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-[#005BC8] focus:ring-2 focus:ring-[#005BC8]/50 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">Message</label>
                                        <textarea
                                            rows="5"
                                            required
                                            value={formData.message}
                                            suppressHydrationWarning
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-[#005BC8] focus:ring-2 focus:ring-[#005BC8]/50 outline-none transition-all resize-none"
                                            placeholder="I'm interested in..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        suppressHydrationWarning
                                        className="w-full bg-[#005BC8] hover:bg-white hover:text-[#002B5B] disabled:bg-white/20 disabled:text-white/50 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg mt-8"
                                    >
                                        {loading ? 'Sending Request...' : <><Send size={20} /> Submit Message</>}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                    {/* Elegant Map Header */}
                    <div className="mt-24 text-center mb-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Visit Us at Edappal</h2>
                        <p className="text-slate-500 font-medium mt-2">Come over to our office for a direct consultation. We'd love to host you.</p>
                    </div>

                    {/* Elegant Map Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 h-[500px] overflow-hidden max-w-6xl mx-auto"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.37890632348!2d76.0242!3d10.7788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ba1f8c14828d%3A0xf6a2a07d4b4f0b2a!2sEdappal%2C%20Kerala!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            className="rounded-[2rem]"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
