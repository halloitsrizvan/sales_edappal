
'use client';

import { useState } from 'react';
import { Upload, Send, Home, MapPin, DollarSign, FileText, User, Phone } from 'lucide-react';

export default function ListProperty() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        type: 'House',
        location: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*New Property Listing Request*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nType: ${formData.type}\nLocation: ${formData.location}\nExpected Price: ${formData.price}\nDescription: ${formData.description}\n\n(I have images to share)`;
        window.open(`https://wa.me/919895294949?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Sell or Rent Your Property</h1>
                    <p className="text-slate-600 text-lg">Reaching thousands of buyers in Edappal & Malappuram. List with us for the best deal.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden">
                    <div className="bg-sky-500 p-8 text-white text-center">
                        <h2 className="text-2xl font-bold">Property Details Form</h2>
                        <p className="opacity-90 mt-2">Fill in the details below to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                        {/* Personal Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <User size={18} className="text-sky-500" /> Your Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Phone size={18} className="text-sky-500" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                    placeholder="Mobile Number"
                                />
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">Property Information</h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Home size={18} className="text-sky-500" /> Property Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                    >
                                        <option>House</option>
                                        <option>Plot / Land</option>
                                        <option>Commercial Building</option>
                                        <option>Apartment</option>
                                        <option>Vehicle</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin size={18} className="text-sky-500" /> Location
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                        placeholder="e.g. Amsakachery, Edappal"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <DollarSign size={18} className="text-sky-500" /> Expected Price
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                    placeholder="e.g. ₹45 Lakhs"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText size={18} className="text-sky-500" /> Description
                                </label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                    placeholder="Tell us more about the property features..."
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Upload size={18} className="text-sky-500" /> Upload Images
                                </label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-sky-50 hover:border-sky-300 transition-all cursor-pointer">
                                    <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                                    <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    <input type="file" className="hidden" multiple accept="image/*" />
                                </div>
                                <p className="text-xs text-orange-500 mt-2">* Note: You can share high-quality images directly on WhatsApp after submitting.</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                                <Send size={20} /> Submit via WhatsApp
                            </button>
                            <p className="text-center text-slate-400 text-xs mt-4">By submitting, you agree to our Terms and Privacy Policy.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
