
'use client';

import { useState } from 'react';
import { Building2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
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
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            {/* Main Featured Image */}
            <div className="h-[400px] md:h-[550px] relative group overflow-hidden bg-slate-100">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    priority
                />

                {/* Status Badge */}
                <div className="absolute top-6 right-6 bg-sky-600/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-black shadow-2xl z-20 border border-white/20 uppercase tracking-widest">
                    {status === 'Sold' ? 'Sold Out' :
                        status === 'Rented' ? 'Rented Out' :
                            status === 'Leased' ? 'Lease Out' :
                                status === 'Rent' ? 'For Rent' :
                                    status === 'Lease' ? 'For Lease' :
                                        status}
                </div>

                {/* Overlays for navigation if many images */}
                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                        <button
                            onClick={() => {
                                const currentIndex = images.indexOf(mainImage);
                                const nextIndex = (currentIndex - 1 + images.length) % images.length;
                                setMainImage(images[nextIndex]);
                            }}
                            className="p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl text-slate-900 transition-all hover:scale-110 active:scale-95 pointer-events-auto backdrop-blur-sm border border-slate-100"
                            suppressHydrationWarning
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={() => {
                                const currentIndex = images.indexOf(mainImage);
                                const nextIndex = (currentIndex + 1) % images.length;
                                setMainImage(images[nextIndex]);
                            }}
                            className="p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl text-slate-900 transition-all hover:scale-110 active:scale-95 pointer-events-auto backdrop-blur-sm border border-slate-100"
                            suppressHydrationWarning
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                )}
                
                {/* Image Count Gradient Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* <div className="absolute bottom-6 left-6 text-white text-xs font-bold drop-shadow-lg z-10">
                    Image {images.indexOf(mainImage) + 1} of {images.length}
                </div> */}
            </div>

            {/* Thumbnails Grid - Fixed Alignments */}
            {images.length > 1 && (
                <div className="p-3 md:p-4 bg-slate-50/50 backdrop-blur-sm border-t border-slate-50">
                    <div className="grid grid-cols-4 md:flex md:flex-wrap gap-2 md:gap-3">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`relative aspect-square md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 
                                ${mainImage === img 
                                    ? 'border-sky-500 ring-4 ring-sky-500/10 scale-95 shadow-lg' 
                                    : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-md'
                                }`}
                            >
                                <Image 
                                    src={img} 
                                    alt={`Thumbnail ${idx + 1}`} 
                                    fill 
                                    className="w-full h-full object-cover" 
                                    sizes="(max-width: 768px) 25vw, 96px"
                                />
                                
                                {/* Status Overlays */}
                                {mainImage === img ? (
                                    <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white shadow-md animate-pulse"></div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <Camera className="text-white drop-shadow-md" size={16} />
                                    </div>
                                )}

                                {/* Mobile Click Indicator (faint icon for all unselected on mobile) */}
                                {mainImage !== img && (
                                    <div className="absolute top-1 right-1 md:hidden opacity-40">
                                        <Camera className="text-white" size={10} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
