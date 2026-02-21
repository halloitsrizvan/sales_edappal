
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
    }, [id, router]);

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
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Edit Property</h1>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${formData.isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {formData.isApproved ? 'Approved' : 'Pending Approval'}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Luxury Villa in Edappal"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Display Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. ₹45 Lakhs"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Numeric Price (for sorting)</label>
                        <input
                            type="number"
                            name="priceAmount"
                            value={formData.priceAmount}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. 4500000"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Amsakachery"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Google Map Link (Embed/Share URL)</label>
                        <input
                            type="text"
                            name="mapUrl"
                            value={formData.mapUrl}
                            onChange={handleInputChange}
                            placeholder="Paste Google Maps link here"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Example: https://www.google.com/maps/embed?pb=...</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none bg-white"
                        >
                            <option>House</option>
                            <option>Plot</option>
                            <option>Commercial</option>
                            <option>Apartment</option>
                            <option>Villa</option>
                            <option>Vehicle</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none bg-white font-medium text-slate-700"
                        >
                            <option value="For Sale">For Sale</option>
                            <option value="Rent">For Rent</option>
                            <option value="Lease">For Lease</option>
                            <option value="Sold">Sold Out</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Area / Size</label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="e.g. 1500 Sqft / 10 Cents"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                        />
                    </div>
                </div>

                {/* Key Features: Water & Path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-sky-50/50 rounded-2xl border border-sky-100">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Water Source</label>
                        <div className="flex flex-wrap gap-3">
                            {waterOptions.map(opt => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 hover:border-sky-500 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={formData.water.includes(opt)}
                                        onChange={() => handleWaterToggle(opt)}
                                        className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                                    />
                                    <span className="text-sm font-medium text-slate-600">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Path / Road Access</label>
                        <input
                            type="text"
                            name="path"
                            value={formData.path}
                            onChange={handleInputChange}
                            placeholder="e.g. 15ft Tar Road / Wide Path"
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 outline-none bg-white font-medium"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                        placeholder="Detailed description of the property..."
                    ></textarea>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                        <label className="text-sm font-bold text-slate-700">Amenities & Features</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity(e)}
                                placeholder="Add new amenity..."
                                className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none"
                            />
                            <button
                                onClick={addCustomAmenity}
                                type="button"
                                className="bg-sky-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-sky-700 transition-colors"
                            >
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {/* Core Amenities */}
                        {coreAmenities.map(item => (
                            <label key={item} className={`flex items-center gap-2 cursor-pointer p-3 border rounded-xl transition-all ${formData.amenities.includes(item) ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                                }`}>
                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(item)}
                                    onChange={() => handleAmenityToggle(item)}
                                    className="w-4 h-4 text-sky-600 rounded focus:ring-sky-50"
                                />
                                <span className="text-xs font-semibold">{item}</span>
                            </label>
                        ))}

                        {/* Custom Added Amenities */}
                        {formData.amenities.filter(a => !coreAmenities.includes(a)).map(item => (
                            <div key={item} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl shadow-sm">
                                <span className="text-xs font-bold truncate max-w-[80%]">{item}</span>
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
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Property Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {formData.images.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm bg-slate-100">
                                <img
                                    src={url}
                                    alt={`Property ${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        {formData.images.length < 4 && (
                            <label className="aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-all group">
                                {uploading ? (
                                    <Loader2 className="animate-spin text-sky-500" size={24} />
                                ) : (
                                    <>
                                        <Upload className="text-slate-400 group-hover:text-sky-500 mb-2" size={24} />
                                        <span className="text-xs text-slate-500 font-medium group-hover:text-sky-600">Upload Images</span>
                                    </>
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

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-all">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-700">Featured Property</span>
                            <span className="text-xs text-slate-400">Show on the home page gallery</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-all">
                        <input
                            type="checkbox"
                            name="isApproved"
                            checked={formData.isApproved}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-700">Approved Listing</span>
                            <span className="text-xs text-slate-400">Show to public users on properties page</span>
                        </div>
                    </label>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-6 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-sky-200 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProperty;
