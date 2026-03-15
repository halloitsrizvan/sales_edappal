'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, Check, X, Building2, Phone, User, MessageCircle, Camera, Upload, Loader2, Coins, ArrowRight, ShieldCheck, ChevronRight, CreditCard, Copy, LayoutGrid, Info, Home, Building, FileText, User as UserIcon, DollarSign, Hash, Map, Trees, Send } from 'lucide-react';
import Image from 'next/image';

export default function ListProperty() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [user, setUser] = useState(null);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text === '9895294949');
        setTimeout(() => setCopied(false), 2000);
    };

    const [formData, setFormData] = useState({
        name: '', phone: '', title: '', type: 'House', status: 'For Sale',
        location: '', price: '', priceAmount: '', area: '', description: '', path: '',
        water: [], amenities: [], images: [], paymentScreenshot: '', mapUrl: '',
        userId: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user/me');
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                    setFormData(prev => ({
                        ...prev,
                        userId: data.user._id,
                        name: data.user.name || prev.name,
                        phone: data.user.phone || prev.phone
                    }));
                } else {
                    // Optionally redirect to login if not authenticated
                    router.push('/login?redirect=/list-property');
                }
            } catch (err) {
                console.error('Auth error:', err);
            }
        };
        fetchUser();
    }, [router]);

    const [newAmenity, setNewAmenity] = useState('');

    const coreAmenities = [
        'Gate applied', 'Tar Road Access', '3 Phase Connection', 'Interlock', 'Garden',
        'Compound Wall', 'Solar Power', 'CCTV', 'Security', 'Waste Management'
    ];

    const waterOptions = ['Well', 'Borewell', 'Pipeline'];

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleWaterToggle = (source) => {
        setFormData(prev => ({
            ...prev,
            water: prev.water.includes(source)
                ? prev.water.filter(w => w !== source)
                : [...prev.water, source]
        }));
    };

    const addCustomAmenity = (e) => {
        e.preventDefault();
        if (!newAmenity.trim()) return;
        if (!formData.amenities.includes(newAmenity.trim())) {
            setFormData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity.trim()] }));
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
            const res = await fetch('/api/upload', { method: 'POST', body: data });
            const result = await res.json();
            if (result.success) setFormData(prev => ({ ...prev, paymentScreenshot: result.url }));
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
                const res = await fetch('/api/upload', { method: 'POST', body: data });
                const result = await res.json();
                if (result.success) {
                    setFormData(prev => ({ ...prev, images: [...prev.images, result.url] }));
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
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.paymentScreenshot) {
            alert('Please upload the payment screenshot to proceed.');
            return;
        }

        if (!formData.userId) {
            alert('Please login to submit a property.');
            router.push('/login?redirect=/list-property');
            return;
        }

        setLoading(true);
        try {
            const finalAmenities = [...formData.amenities];
            if (formData.water.length > 0) finalAmenities.push(`Water: ${formData.water.join(', ')}`);
            if (formData.path) finalAmenities.push(`Path: ${formData.path}`);

            const payload = {
                ...formData,
                ownerName: formData.name,
                ownerPhone: formData.phone,
                amenities: finalAmenities,
                priceAmount: parseInt(formData.priceAmount) || 0,
                beds: 0, baths: 0, parking: '', age: '',
                isApproved: false, featured: false,
            };

            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save to database');
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-10 md:p-16 max-w-xl w-full text-center relative overflow-hidden animate-in fade-in zoom-in duration-700">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-emerald-50/50">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Listing Submitted!</h2>
                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        Thank you for choosing us. Our team will review your property details and publish it shortly to reach thousands of potential buyers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/properties" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            View Properties <ChevronRight size={18} />
                        </Link>
                        <Link href="/" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                            <Home size={18} /> Home Directory
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f7fa] font-sans pb-20 selection:bg-indigo-500 selection:text-white">
            {/* Elegant Hero Section */}
            <div className="bg-slate-900 pt-24 pb-32 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
                
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-sm font-medium mb-6 backdrop-blur-md">
                        <Building size={16} /> Premium Real Estate Network
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                        List Your Property <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Reach Thousands</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Join Edappal's fastest growing property marketplace. Secure, verified, and trusted by hundreds of buyers and sellers.
                    </p>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                    {/* Header Strip */}
                    <div className="px-8 py-6 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FileText size={22} className="text-indigo-600" /> Listing Form
                        </h2>
                        <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            Takes ~3 mins
                        </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        
                        {/* Section 1: Personal Info */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <UserIcon size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Contact Details</h3>
                                    <p className="text-sm text-slate-500">How buyers will reach you.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                                <div className="space-y-2.5">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                                        placeholder="John Doe" suppressHydrationWarning />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                                        placeholder="+91 99999 99999" suppressHydrationWarning />
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-100" />

                        {/* Section 2: Property Overview */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                                    <Home size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Property Overview</h3>
                                    <p className="text-sm text-slate-500">Basic information about what you are listing.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <label className="text-sm font-semibold text-slate-700">Listing Title <span className="text-rose-500">*</span></label>
                                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800"
                                        placeholder="e.g. Beautiful 3BHK Villa in Heart of Edappal" suppressHydrationWarning />
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                     <div className="space-y-2.5">
                                         <label className="text-sm font-semibold text-slate-700">Property Type</label>
                                         <div className="relative">
                                             <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                 className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none appearance-none font-medium text-slate-800 cursor-pointer" suppressHydrationWarning>
                                                 <option>House</option>
                                                 <option>Plot</option>
                                                 <option>Commercial</option>
                                                 <option>Apartment</option>
                                                 <option>Villa</option>
                                                 <option>Vehicle</option>
                                             </select>
                                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                 <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </div>
                                         </div>
                                     </div>
                                     <div className="space-y-2.5">
                                         <label className="text-sm font-semibold text-slate-700">Purpose</label>
                                         <div className="relative">
                                             <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                 className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none appearance-none font-medium text-slate-800 cursor-pointer" suppressHydrationWarning>
                                                 <option>For Sale</option>
                                                 <option>For Rent</option>
                                                 <option>For Lease</option>
                                             </select>
                                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                 <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                             </div>
                                         </div>
                                     </div>
                                     <div className="space-y-2.5">
                                         <label className="text-sm font-semibold text-slate-700">Display Price <span className="text-rose-500">*</span></label>
                                         <div className="relative">
                                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                 <DollarSign size={18} />
                                             </div>
                                             <input type="text" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                 className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800"
                                                 placeholder="₹45 Lakhs" suppressHydrationWarning />
                                         </div>
                                     </div>
                                     <div className="space-y-2.5">
                                         <label className="text-sm font-semibold text-slate-700">Numeric Price <span className="text-slate-400 font-normal">(Sorting)</span></label>
                                         <div className="relative">
                                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                 <Hash size={18} />
                                             </div>
                                             <input type="number" required value={formData.priceAmount} onChange={(e) => setFormData({ ...formData, priceAmount: e.target.value })}
                                                 className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800"
                                                 placeholder="4500000" suppressHydrationWarning />
                                         </div>
                                     </div>
                                 </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <label className="text-sm font-semibold text-slate-700">Location Area</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <MapPin size={18} />
                                            </div>
                                            <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800"
                                                placeholder="Town / Neighborhood" suppressHydrationWarning />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-sm font-semibold text-slate-700">Area / Size</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Map size={18} />
                                            </div>
                                            <input type="text" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800"
                                                placeholder="e.g. 10 Cents / 1500 Sqft" suppressHydrationWarning />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-sm font-semibold text-slate-700">Google Map URL <span className="text-slate-400 font-normal">(Optional)</span></label>
                                    <input type="text" value={formData.mapUrl} onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all outline-none font-medium text-slate-800 text-sm"
                                        placeholder="Paste Google Maps Sharing Link" suppressHydrationWarning />
                                </div>
                            </div>
                        </section>

                        <hr className="border-slate-100" />

                        {/* Section 3: Deep Details */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                                    <Trees size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Additional Specifics</h3>
                                    <p className="text-sm text-slate-500">Utilities and description parameters.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-6">
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 transition-colors">
                                    <label className="block text-sm font-bold text-slate-800 mb-4">Water Source Available</label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {waterOptions.map(opt => (
                                            <button type="button" key={opt} onClick={() => handleWaterToggle(opt)}
                                                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2
                                                ${formData.water.includes(opt) ? 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-200' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 transition-colors">
                                    <label className="block text-sm font-bold text-slate-800 mb-4">Road Access Type</label>
                                    <input type="text" value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-medium text-slate-700"
                                        placeholder="e.g. 15ft Tar Road" suppressHydrationWarning />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
                                <textarea rows="5" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 focus:bg-white transition-all outline-none resize-none font-medium text-slate-800 leading-relaxed"
                                    placeholder="Write a compelling description highlighting the best features of your property..." suppressHydrationWarning></textarea>
                            </div>
                        </section>

                        <hr className="border-slate-100" />

                        {/* Section 4: Amenities */}
                        <section>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Amenities & Perks</h3>
                                        <p className="text-sm text-slate-500">Select all that apply.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 relative">
                                    <input type="text" value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)}
                                        placeholder="Add custom amenity..."
                                        className="pl-4 pr-20 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none w-full sm:w-64" suppressHydrationWarning />
                                    <button type="button" onClick={addCustomAmenity}
                                        className="absolute right-1 top-1 bottom-1 bg-slate-900 text-white px-4 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors" suppressHydrationWarning>
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {coreAmenities.map(item => (
                                    <button type="button" key={item} onClick={() => handleAmenityToggle(item)}
                                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all text-left group
                                        ${formData.amenities.includes(item)
                                            ? 'bg-orange-50 border-orange-500 text-orange-900'
                                            : 'bg-white border-slate-100 text-slate-600 hover:border-orange-200 hover:bg-orange-50/30'}`}>
                                        <span className="text-sm font-semibold">{item}</span>
                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors
                                            ${formData.amenities.includes(item) ? 'bg-orange-500 text-white' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    </button>
                                ))}
                                {formData.amenities.filter(a => !coreAmenities.includes(a)).map(item => (
                                    <div key={item} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-800 shadow-sm relative pr-10 overflow-hidden group">
                                        <span className="text-sm font-semibold truncate z-10">{item}</span>
                                        <button type="button" onClick={() => handleAmenityToggle(item)}
                                            className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors z-20">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-slate-100" />

                        {/* Section 5: Photos */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                                        <Camera size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Media Gallery</h3>
                                        <p className="text-sm text-slate-500">Upload up to 5 clear photos.</p>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{formData.images.length}/5 Added</div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {formData.images.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-slate-200">
                                        <Image src={url} alt={`Listing ${index}`} width={200} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={() => removeImage(index)}
                                                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                                                <X size={18} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {formData.images.length < 5 && (
                                    <label className={`aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden
                                        ${uploading ? 'bg-slate-50 border-slate-200' : 'border-slate-300 hover:border-pink-500 hover:bg-pink-50/50 bg-slate-50/50'}`}>
                                        {uploading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="animate-spin text-pink-500" size={28} />
                                                <span className="text-xs font-semibold text-slate-500">Uploading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-slate-400 group-hover:text-pink-500 group-hover:shadow-md transition-all">
                                                    <Upload size={20} strokeWidth={2.5} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-600 group-hover:text-pink-600">Select Images</span>
                                            </>
                                        )}
                                        <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                    </label>
                                )}
                            </div>
                        </section>

                        {/* Section 6: Payment */}
                        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30"></div>
                            <div className="bg-white rounded-[22px] p-6 md:p-8 relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                                        <ShieldCheck size={14} /> Low One-Time Fee
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Verification Fee</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                                        To maintain platform quality and filter spam, we require a nominal verification fee of <strong className="text-slate-800">₹100</strong>. Transfer via UPI and attach proof.
                                    </p>
                                    
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 max-w-sm">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                                            <CreditCard size={24} className="text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">UPI Number</p>
                                            <p className="font-mono text-lg font-bold text-slate-800 tracking-wider">9895294949</p>
                                        </div>
                                        <button type="button" onClick={() => handleCopy('9895294949')}
                                            className={`p-2.5 rounded-lg border transition-all ${copied ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'}`}>
                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="w-full md:w-64 shrink-0">
                                    {formData.paymentScreenshot ? (
                                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-4 border-white ring-1 ring-slate-200">
                                            <Image src={formData.paymentScreenshot} alt="Payment" width={256} height={340} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, paymentScreenshot: '' }))}
                                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-sm hover:bg-rose-500 transition-colors">
                                                <X size={16} />
                                            </button>
                                            <div className="absolute bottom-0 inset-x-0 bg-emerald-500 text-white text-center py-1.5 text-xs font-bold backdrop-blur-md">
                                                PROOF ATTACHED
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="aspect-[3/4] border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 bg-slate-50/50 transition-all group overflow-hidden">
                                            {uploading ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2 className="animate-spin text-indigo-500" size={32} />
                                                    <span className="text-xs font-bold text-indigo-600">Uploading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-indigo-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                                                        <Upload size={24} strokeWidth={2.5} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">Upload Screenshot</span>
                                                    <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Required *</span>
                                                </>
                                            )}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleScreenshotUpload} disabled={uploading} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </section>
                        
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <ShieldCheck size={20} className="text-emerald-500" />
                            Secure & Encrypted Form
                        </div>
                        <button type="submit" disabled={uploading || loading || !formData.paymentScreenshot}
                            className={`px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all duration-300
                            ${(uploading || loading || !formData.paymentScreenshot) 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-600/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/30'}`}>
                            {loading ? (
                                <>Processing... <Loader2 size={20} className="animate-spin" /></>
                            ) : (
                                <>Submit Property <Send size={20} /></>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
