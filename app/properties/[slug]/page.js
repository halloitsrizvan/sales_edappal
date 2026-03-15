import Property from '@/models/Property';
import dbConnect from '@/lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, Phone, Calendar, Shield, Building2, Droplets, Map, Share2, Copy } from 'lucide-react';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import PropertyGallery from '@/components/PropertyGallery';
import PropertyInquiryForm from '@/components/PropertyInquiryForm';
import CopyLink from '@/components/CopyLink';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    await dbConnect();
    const property = await Property.findOne({
        $or: [
            { slug: slug },
            ...(isObjectId ? [{ _id: slug }] : [])
        ]
    }).lean();

    if (!property) return { title: 'Property Not Found' };

    const title = `${property.title} in ${property.location} | Sales Edappal`;
    const description = property.description.substring(0, 160);

    return {
        title,
        description,
        alternates: {
            canonical: `/properties/${slug}`,
        },
        openGraph: {
            title,
            description,
            images: property.images?.length > 0 ? [property.images[0]] : [],
        },
    };
}

export default async function PropertyDetails({ params }) {
    const { slug } = await params;
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    await dbConnect();
    let property;
    try {
        property = await Property.findOne({
            $or: [
                { slug: slug },
                ...(isObjectId ? [{ _id: slug }] : [])
            ]
        }).lean();
        if (property) {
            property._id = property._id.toString();
        }
    } catch (error) {
        console.error('Lookup error:', error);
        notFound();
    }

    if (!property) {
        notFound();
    }

    // Extract specialized strings from amenities
    let waterInfo = 'N/A';
    let pathInfo = 'N/A';
    const displayAmenities = property.amenities?.filter(a => {
        if (a.startsWith('Water: ')) {
            waterInfo = a.replace('Water: ', '');
            return false;
        }
        if (a.startsWith('Path: ')) {
            pathInfo = a.replace('Path: ', '');
            return false;
        }
        return true;
    }) || [];

    const getMapSrc = () => {
        if (!property.mapUrl) {
            return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.37890632348!2d76.0242!3d10.7788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ba1f8c14828d%3A0xf6a2a07d4b4f0b2a!2s${encodeURIComponent(property.location)}%2C%20Kerala!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin`;
        }

        // Handle case where user pastes full iframe tag
        if (property.mapUrl.includes('<iframe')) {
            const match = property.mapUrl.match(/src="([^"]+)"/);
            return match ? match[1] : property.mapUrl;
        }

        // If it's a share link (not an embed link), we can't easily turn it into an embed link without API
        // But if it's already an embed link, use it.
        if (property.mapUrl.includes('google.com/maps/embed')) {
            return property.mapUrl;
        }

        // Fallback for direct share links - try to wrap it (though Google often blocks this in iframes)
        // Best practice is to tell users to use the 'Embed' link
        return property.mapUrl;
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': property.title,
        'image': property.images,
        'description': property.description,
        'brand': {
            '@type': 'Brand',
            'name': 'Sales Edappal'
        },
        'offers': {
            '@type': 'Offer',
            'url': `https://salesedappal.com/properties/${property._id}`,
            'priceCurrency': 'INR',
            'price': property.priceAmount,
            'availability': 'https://schema.org/InStock',
        },
        'category': property.type,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': property.location,
            'addressRegion': 'Kerala',
            'addressCountry': 'IN'
        }
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://salesedappal.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Properties',
                'item': 'https://salesedappal.com/properties'
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': property.title,
                'item': `https://salesedappal.com/properties/${property._id}`
            }
        ]
    };

    return (
        <div className="bg-slate-50 min-h-screen py-4">
            <Script
                id="property-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Script
                id="breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link href="/properties" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-medium w-fit">
                        <ArrowLeft size={16} /> Back to Listings
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Price Header (Mobile only) */}
                        <div className="lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <h1 className="text-2xl font-bold text-slate-800">{property.title}</h1>
                                <CopyLink slug={property.slug || property._id} />
                            </div>
                            <div className="flex items-center text-slate-500 mb-4">
                                <MapPin size={18} className="mr-1 text-sky-500" />
                                {property.location}
                            </div>
                            <div className="text-3xl font-bold text-sky-600 bg-sky-50 inline-block px-4 py-1 rounded-lg border border-sky-100">{property.price}</div>
                        </div>

                        {/* Image Gallery (Interactive Client Component) */}
                        <PropertyGallery
                            images={property.images}
                            title={property.title}
                            status={property.status}
                        />

                        {/* Details Table */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Property Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-left p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <div className="text-sky-500 mb-2"><Square size={20} /></div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Area</div>
                                    <div className="font-extrabold text-slate-900 text-lg">{property.area || 'N/A'}</div>
                                </div>
                                <div className="text-left p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <div className="text-sky-500 mb-2"><Droplets size={20} /></div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Water Source</div>
                                    <div className="font-extrabold text-slate-900 text-lg">{waterInfo}</div>
                                </div>
                                <div className="text-left p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <div className="text-sky-500 mb-2"><Map size={20} /></div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Route / Path</div>
                                    <div className="font-extrabold text-slate-900 text-lg">{pathInfo}</div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {property.description}
                                </div>
                            </div>

                            {displayAmenities.length > 0 && (
                                <div className="mt-8 border-t border-slate-100 pt-8">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Amenities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {displayAmenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                                                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Map */}
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 h-80 overflow-hidden">
                            <iframe
                                src={getMapSrc()}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-xl"
                            ></iframe>
                        </div>
                    </div>

                    {/* Sidebar Sticky */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 sticky top-24">
                            <div className="hidden lg:block mb-6 border-b border-dashed border-slate-200 pb-6">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h1 className="text-2xl font-bold text-slate-800 leading-tight">{property.title}</h1>
                                    <div className="shrink-0">
                                        <CopyLink slug={property.slug || property._id} />
                                    </div>
                                </div>
                                <div className="flex items-center text-slate-500 mb-4">
                                    <MapPin size={18} className="mr-1 text-sky-500" />
                                    {property.location}
                                </div>
                                <div className="text-3xl font-bold text-sky-600">{property.price}</div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md flex items-center justify-center">
                                    {/* <Building2 className="text-slate-400" size={32} /> */}
                                    <Image src="/sameer.png" alt="Sameer Edappal - Property Consultant" width={64} height={64} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-lg">Sameer Edappal</div>
                                    <div className="text-xs text-sky-500 font-semibold uppercase tracking-wider">Property Consultant</div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Shield size={10} /> Verified Listing</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href="tel:+919895294949"
                                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone size={20} /> Call Agent
                                </a>
                                <a
                                    href={`https://wa.me/919895294949?text=Hi, I am interested in ${property.title} at ${property.location}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5" /> WhatsApp
                                </a>

                                <PropertyInquiryForm
                                    propertyId={property._id}
                                    propertyTitle={property.title}
                                />
                                {/* 
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                    <p className="text-xs text-slate-500 font-medium">Listing ID: {property._id.toString().slice(-6).toUpperCase()}</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
