
'use client';

import { useState } from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function PropertyGallery({ images, title, status }) {
    const [mainImage, setMainImage] = useState(images?.[0] || null);

    if (!images || images.length === 0) {
        return (
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <div className="h-[400px] md:h-[500px] bg-slate-100 flex items-center justify-center">
                    <Building2 size={64} className="text-slate-300" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            {/* Main Featured Image */}
            <div className="h-[400px] md:h-[500px] relative group overflow-hidden">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                    {status }
                </div>

                {/* Overlays for navigation if many images (optional, but nice) */}
                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => {
                                const currentIndex = images.indexOf(mainImage);
                                const nextIndex = (currentIndex - 1 + images.length) % images.length;
                                setMainImage(images[nextIndex]);
                            }}
                            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg text-slate-800 transition-all hover:scale-110"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => {
                                const currentIndex = images.indexOf(mainImage);
                                const nextIndex = (currentIndex + 1) % images.length;
                                setMainImage(images[nextIndex]);
                            }}
                            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg text-slate-800 transition-all hover:scale-110"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-4 bg-slate-50">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setMainImage(img)}
                            className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${mainImage === img ? 'border-sky-500 ring-2 ring-sky-200 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
