
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Send, Home, MapPin, DollarSign, FileText, User, Phone, X, Loader2, Check, Copy } from 'lucide-react';
import Image from 'next/image';

export default function ListProperty() {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        title: '',
        type: 'House',
        status: 'For Sale',
        location: '',
        price: '',
        area: '',
        description: '',
        path: '',
        water: [],
        amenities: [],
        images: [],
        paymentScreenshot: '',
        mapUrl: '',
    });

    const [newAmenity, setNewAmenity] = useState('');

    const coreAmenities = [
        'Gate applied', 'Tar Road Access', '3 Phase Connection', 'Interlock', 'Garden',
        'Compound Wall', 'Solar Power', 'CCTV', 'Security', 'Waste Management'
    ];

    const waterOptions = ['Well', 'Borewell', 'Pipeline'];

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handleWaterToggle = (source) => {
        setFormData(prev => {
            const water = prev.water.includes(source)
                ? prev.water.filter(w => w !== source)
                : [...prev.water, source];
            return { ...prev, water };
        });
    };

    const addCustomAmenity = (e) => {
        e.preventDefault();
        if (!newAmenity.trim()) return;
        if (!formData.amenities.includes(newAmenity.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
        }
        setNewAmenity('');
    };

    const handleScreenshotUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const data = new FormData();
            data.append('file', file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, paymentScreenshot: result.url }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Screenshot upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (formData.images.length + files.length > 5) {
            alert('You can only upload up to 5 images.');
            return;
        }

        setUploading(true);

        try {
            for (const file of files) {
                const data = new FormData();
                data.append('file', file);
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                const result = await res.json();
                if (result.success) {
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, result.url]
                    }));
                }
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.paymentScreenshot) {
            alert('Please upload the payment screenshot to proceed.');
            return;
        }

        setLoading(true);

        try {
            // Merge specialized fields into amenities array for storage
            const finalAmenities = [...formData.amenities];
            if (formData.water.length > 0) {
                finalAmenities.push(`Water: ${formData.water.join(', ')}`);
            }
            if (formData.path) {
                finalAmenities.push(`Path: ${formData.path}`);
            }

            // Extract numeric price for sorting (simple extraction)
            const numericPrice = parseInt(formData.price.replace(/[^\d]/g, '')) || 0;

            const payload = {
                ...formData,
                ownerName: formData.name, // Map to model field
                ownerPhone: formData.phone, // Map to model field
                paymentScreenshot: formData.paymentScreenshot, // Explicit mapping
                amenities: finalAmenities,
                priceAmount: numericPrice,
                beds: 0,
                baths: 0,
                parking: '',
                age: '',
                isApproved: false, // Explicitly false
                featured: false,
            };

            console.log('Final Payload to API:', payload);

            // Save to database
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Failed to save to database');
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {submitted ? (
                    <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Submitted Successfully!</h2>
                            <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
                                Thank you for listing your property with us. We will review the details and add it to our properties list shortly.
                            </p>
                        </div>
                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/properties" className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-sky-200 transition-all hover:-translate-y-1">
                                View Listings
                            </Link>
                            <Link href="/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold transition-all">
                                Go Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-slate-800 mb-4">Sell or Rent Your Property</h1>
                            <p className="text-slate-600 text-lg">Reaching thousands of buyers in Edappal & Malappuram. List with us for the best deal.</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden">
                            <div className="bg-sky-500 p-8 text-white text-center">
                                <h2 className="text-2xl font-bold">Property Details Form</h2>
                                <p className="opacity-90 mt-2">Fill in the details below to get started</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                                {/* Personal Info */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <User size={20} className="text-sky-500" /> Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="Full Name"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="Mobile Number"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Property Basic Info */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <Home size={20} className="text-sky-500" /> Basic Details
                                    </h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Property Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                            placeholder="e.g. 3BHK House in Edappal"
                                            suppressHydrationWarning
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Property Type</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                suppressHydrationWarning
                                            >
                                                <option>House</option>
                                                <option>Plot</option>
                                                <option>Commercial</option>
                                                <option>Apartment</option>
                                                <option>Villa</option>
                                                <option>Vehicle</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                suppressHydrationWarning
                                            >
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                                <option>For Lease</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Location</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="Town / Neighborhood"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-2 border-t border-slate-50 pt-4">
                                            <label className="text-sm font-bold text-slate-700">Google Map Link (Optional)</label>
                                            <input
                                                type="text"
                                                value={formData.mapUrl}
                                                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="Paste Google Maps Embed or Share Link"
                                                suppressHydrationWarning
                                            />
                                            <p className="text-[10px] text-slate-400 font-medium tracking-tight">Help buyers find your property accurately by adding a map link.</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Display Price</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="e.g. ₹45 Lakhs"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Area / Size</label>
                                            <input
                                                type="text"
                                                value={formData.area}
                                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none"
                                                placeholder="e.g. 10 Cents / 1500 Sqft"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <FileText size={20} className="text-sky-500" /> More Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-sky-50 rounded-2xl border border-sky-100/50">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-3">Water Source</label>
                                            <div className="flex flex-wrap gap-2">
                                                {waterOptions.map(opt => (
                                                    <label key={opt} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${formData.water.includes(opt) ? 'bg-white border-sky-500 text-sky-600 shadow-sm' : 'bg-white/50 border-slate-200 text-slate-500'
                                                        }`}>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={formData.water.includes(opt)}
                                                            onChange={() => handleWaterToggle(opt)}
                                                        />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.water.includes(opt) ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white border-slate-300'}`}>
                                                            {formData.water.includes(opt) && <Check size={10} strokeWidth={4} />}
                                                        </div>
                                                        <span className="text-sm font-bold">{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-3">Path / Road Access</label>
                                            <input
                                                type="text"
                                                value={formData.path}
                                                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 outline-none font-bold text-slate-700"
                                                placeholder="e.g. 15ft Tar Road"
                                                suppressHydrationWarning
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Description</label>
                                        <textarea
                                            rows="4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-200 focus:border-sky-500 transition-all outline-none resize-none"
                                            placeholder="Tell us more about the property features..."
                                            suppressHydrationWarning
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-800">Amenities & Features</h3>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newAmenity}
                                                onChange={(e) => setNewAmenity(e.target.value)}
                                                placeholder="Custom feature..."
                                                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-200 outline-none"
                                                suppressHydrationWarning
                                            />
                                            <button
                                                type="button"
                                                onClick={addCustomAmenity}
                                                className="bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-sky-700 transition-colors"
                                                suppressHydrationWarning
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {coreAmenities.map(item => (
                                            <label key={item}
                                                className={`flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${formData.amenities.includes(item)
                                                    ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm'
                                                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200'
                                                    }`}>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={formData.amenities.includes(item)}
                                                    onChange={() => handleAmenityToggle(item)}
                                                />
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.amenities.includes(item) ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white border-slate-300'
                                                    }`}>
                                                    {formData.amenities.includes(item) && <Check size={14} strokeWidth={3} />}
                                                </div>
                                                <span className="text-xs font-bold whitespace-nowrap">{item}</span>
                                            </label>
                                        ))}

                                        {formData.amenities.filter(a => !coreAmenities.includes(a)).map(item => (
                                            <div key={item} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl shadow-sm">
                                                <span className="text-xs font-bold truncate max-w-[80%]">{item}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAmenityToggle(item)}
                                                    className="text-indigo-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Property Images */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <Upload size={20} className="text-sky-500" /> Property Images
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {formData.images.map((url, index) => (
                                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group shadow-md border border-slate-100 bg-slate-50">
                                                <img
                                                    src={url}
                                                    alt={`Listing ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {formData.images.length < 5 && (
                                            <label className="aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-all group overflow-hidden">
                                                {uploading ? (
                                                    <Loader2 className="animate-spin text-sky-500" size={32} />
                                                ) : (
                                                    <>
                                                        <Upload className="text-slate-400 group-hover:text-sky-500 mb-2" size={32} />
                                                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-sky-600 uppercase tracking-wider">Add Photo</span>
                                                    </>
                                                )}
                                                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium">* You can upload up to 5 photos. First one will be the primary cover.</p>
                                </div>

                                {/* Payment Verification */}
                                <div className="space-y-6 pt-8 border-t border-slate-100">
                                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
                                            <Check className="text-orange-500" size={20} /> Listing Verification Fee
                                        </h3>
                                        <p className="text-orange-700 text-sm mb-4 leading-relaxed">
                                            To maintain high-quality listings, we charge a one-time verification fee of <b>₹100</b>.
                                            Please pay to <b>+91 9895294949</b> via GPay, PhonePe, or Paytm and upload the screenshot below.
                                        </p>

                                        <div className="flex flex-col md:flex-row gap-6 items-center">
                                            <div className="flex-1 w-full">
                                                {formData.paymentScreenshot ? (
                                                    <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md border border-orange-200 bg-white">
                                                        <img
                                                            src={formData.paymentScreenshot}
                                                            alt="Payment Screenshot"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, paymentScreenshot: '' }))}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="w-full h-40 border-2 border-dashed border-orange-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100/50 transition-all group bg-white">
                                                        {uploading ? (
                                                            <Loader2 className="animate-spin text-orange-500" size={32} />
                                                        ) : (
                                                            <>
                                                                <Upload className="text-orange-400 group-hover:text-orange-500 mb-2" size={32} />
                                                                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Upload Screenshot</span>
                                                            </>
                                                        )}
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleScreenshotUpload} disabled={uploading} />
                                                    </label>
                                                )}
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-orange-200 text-center flex-shrink-0">
                                                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Pay Now</p>
                                                <p className="text-lg font-black text-slate-800">₹100</p>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy('9895294949')}
                                                    className={`mt-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all border ${copied
                                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-orange-300 hover:text-orange-600'
                                                        }`}
                                                    suppressHydrationWarning
                                                >
                                                    {copied ? <Check size={10} /> : <Copy size={10} />}
                                                    {copied ? 'COPIED!' : '9895294949'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={uploading || !formData.paymentScreenshot}
                                        className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-sky-200 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:opacity-70 disabled:grayscale"
                                        suppressHydrationWarning
                                    >
                                        <Send size={24} />
                                        <span className="text-lg">Submit Listing Request</span>
                                    </button>
                                    <div className="flex items-center justify-center gap-4 mt-6">
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Secure Listing Process</p>
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
