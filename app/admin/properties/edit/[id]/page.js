
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Upload, X, Loader2, Save, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

const EditProperty = () => {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [newAmenity, setNewAmenity] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        type: 'House',
        status: 'For Sale',
        price: '',
        priceAmount: '',
        location: '',
        area: '',
        description: '',
        path: '',
        water: [],
        amenities: [],
        images: [],
        featured: false,
        isApproved: false,
        mapUrl: '',
    });

    const coreAmenities = [
        'Gate applied', 'Tar Road Access', '3 Phase Connection', 'Interlock', 'Garden',
        'Compound Wall', 'Solar Power', 'CCTV', 'Security', 'Waste Management'
    ];

    const waterOptions = ['Well', 'Borewell', 'Pipeline'];

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                const data = await res.json();
                if (data.success) {
                    const prop = data.data;

                    // Parse specialized strings from amenities
                    const water = [];
                    let path = '';
                    const filteredAmenities = prop.amenities.filter(a => {
                        if (a.startsWith('Water: ')) {
                            water.push(...a.replace('Water: ', '').split(', '));
                            return false;
                        }
                        if (a.startsWith('Path: ')) {
                            path = a.replace('Path: ', '');
                            return false;
                        }
                        return true;
                    });

                    setFormData({
                        ...prop,
                        amenities: filteredAmenities,
                        water,
                        path
                    });
                } else {
                    alert('Property not found');
                    router.push('/admin/properties');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (formData.images.length + files.length > 4) {
            alert('You can only upload up to 4 images per property.');
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
        setSaving(true);

        try {
            // Merge specialized fields into amenities array for storage
            const finalAmenities = [...formData.amenities];
            if (formData.water.length > 0) {
                finalAmenities.push(`Water: ${formData.water.join(', ')}`);
            }
            if (formData.path) {
                finalAmenities.push(`Path: ${formData.path}`);
            }

            const payload = {
                ...formData,
                amenities: finalAmenities,
                priceAmount: parseInt(formData.priceAmount) || 0,
                beds: 0,
                baths: 0,
                parking: '',
                age: ''
            };

            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin/properties');
            } else {
                alert('Failed to update property');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating property');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                <p className="text-slate-500 font-medium tracking-wide">Loading property details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-0 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Edit Property</h1>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${formData.isApproved ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                    {formData.isApproved ? 'Approved' : 'Pending Approval'}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-slate-100">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Property Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Luxury Villa in Edappal"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Display Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. ₹45 Lakhs"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Numeric Price (for sorting)</label>
                        <input
                            type="number"
                            name="priceAmount"
                            value={formData.priceAmount}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. 4500000"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Amsakachery"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Google Map Link</label>
                        <input
                            type="text"
                            name="mapUrl"
                            value={formData.mapUrl}
                            onChange={handleInputChange}
                            placeholder="Paste share link"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Property Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none bg-white text-sm"
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
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none bg-white text-sm font-semibold text-slate-700"
                        >
                            <option value="For Sale">For Sale</option>
                            <option value="Rent">For Rent</option>
                            <option value="Lease">For Lease</option>
                            <option value="Sold">Sold Out</option>
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Area / Size</label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="e.g. 1500 Sqft / 10 Cents"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Key Features: Water & Path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="space-y-3">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Water Source</label>
                        <div className="flex flex-wrap gap-2">
                            {waterOptions.map(opt => (
                                <label key={opt} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border transition-all ${formData.water.includes(opt) ? 'bg-sky-500 border-sky-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-sky-500'}`}>
                                    <input
                                        type="checkbox"
                                        checked={formData.water.includes(opt)}
                                        onChange={() => handleWaterToggle(opt)}
                                        className="hidden"
                                    />
                                    <span className="text-[10px] md:text-xs font-bold uppercase">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Road Access</label>
                        <input
                            type="text"
                            name="path"
                            value={formData.path}
                            onChange={handleInputChange}
                            placeholder="e.g. 15ft Tar Road"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none bg-white text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm leading-relaxed"
                        placeholder="Detailed description..."
                    ></textarea>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Amenities & Features</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity(e)}
                                placeholder="Other feature..."
                                className="flex-1 sm:w-auto px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/10"
                            />
                            <button
                                onClick={addCustomAmenity}
                                type="button"
                                className="bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-700 transition-all active:scale-95"
                            >
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                        {/* Core Amenities */}
                        {coreAmenities.map(item => (
                            <label key={item} className={`flex items-center gap-2 cursor-pointer p-3 border rounded-xl transition-all ${formData.amenities.includes(item) ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                                }`}>
                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => handleAmenityToggle(item)}
                                    className="w-4 h-4 text-sky-600 rounded focus:ring-sky-50"
                                />
                                <span className="text-[10px] font-bold uppercase tracking-tight truncate">{item}</span>
                            </label>
                        ))}

                        {/* Custom Added */}
                        {formData.amenities.filter(a => !coreAmenities.includes(a)).map(item => (
                            <div key={item} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl">
                                <span className="text-[10px] font-bold uppercase tracking-tight truncate max-w-[80%]">{item}</span>
                                <button
                                    onClick={() => handleAmenityToggle(item)}
                                    className="text-indigo-400 hover:text-rose-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Property Gallery (Max 4)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {formData.images.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100">
                                <img
                                    src={url}
                                    alt={`Property ${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        {formData.images.length < 4 && (
                            <label className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all group overflow-hidden">
                                {uploading ? (
                                    <Loader2 className="animate-spin text-sky-500" size={20} />
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400 group-hover:text-sky-500 transition-colors shadow-sm">
                                            <Upload size={18} />
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-sky-600">Select Image</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl transition-all border ${formData.featured ? 'bg-white border-sky-100 shadow-sm' : 'border-transparent opacity-70'}`}>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-sky-600 rounded-lg focus:ring-sky-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Featured</span>
                            <span className="text-[10px] text-slate-400 font-medium">Show on homepage gallery</span>
                        </div>
                    </label>

                    <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl transition-all border ${formData.isApproved ? 'bg-white border-emerald-100 shadow-sm' : 'border-transparent opacity-70'}`}>
                        <input
                            type="checkbox"
                            name="isApproved"
                            checked={formData.isApproved}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-emerald-600 rounded-lg focus:ring-emerald-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Approved</span>
                            <span className="text-[10px] text-slate-400 font-medium">Publicly visible</span>
                        </div>
                    </label>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4 border-t border-slate-50">
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-200/50 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Update Property Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProperty;
