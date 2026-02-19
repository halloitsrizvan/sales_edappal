
import { properties } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, Phone, Calendar, Shield } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return properties.map((property) => ({
        id: property.id.toString(),
    }));
}

export default async function PropertyDetails({ params }) {
    const { id } = await params;
    const property = properties.find((p) => p.id === parseInt(id));

    if (!property) {
        notFound();
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link href="/properties" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Listings
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Price Header (Mobile only) */}
                        <div className="lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h1 className="text-2xl font-bold text-slate-800 mb-2">{property.title}</h1>
                            <div className="flex items-center text-slate-500 mb-4">
                                <MapPin size={18} className="mr-1 text-sky-500" />
                                {property.location}
                            </div>
                            <div className="text-3xl font-bold text-sky-600 bg-sky-50 inline-block px-4 py-1 rounded-lg border border-sky-100">{property.price}</div>
                        </div>

                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                            <div className="h-[400px] md:h-[500px] relative group">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    {property.status}
                                </div>
                            </div>
                            {/* Thumbnails (Static for now as mostly 1 image in data) */}
                            <div className="grid grid-cols-4 gap-2 p-2 bg-white">
                                {[property.image, property.image, property.image, property.image].map((img, idx) => (
                                    <div key={idx} className="h-20 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity border-2 border-transparent hover:border-sky-500">
                                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Table */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Property Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-100 transition-colors">
                                    <div className="text-sky-500 mb-2 flex justify-center"><Square size={24} /></div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Area</div>
                                    <div className="font-bold text-slate-800 text-lg">{property.area || 'N/A'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-100 transition-colors">
                                    <div className="text-sky-500 mb-2 flex justify-center"><Bed size={24} /></div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Bedrooms</div>
                                    <div className="font-bold text-slate-800 text-lg">{property.beds || '-'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-100 transition-colors">
                                    <div className="text-sky-500 mb-2 flex justify-center"><Bath size={24} /></div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Bathrooms</div>
                                    <div className="font-bold text-slate-800 text-lg">{property.baths || '-'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-100 transition-colors">
                                    <div className="text-sky-500 mb-2 flex justify-center"><Calendar size={24} /></div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Age</div>
                                    <div className="font-bold text-slate-800 text-lg">5 Years</div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                                <p className="text-slate-600 leading-relaxed space-y-4">
                                    Welcome to this exquisite property in {property.location}.
                                    {property.type === 'House' ? 'This modern home features spacious living areas, premium fittings, and a peaceful neighborhood.' : ''}
                                    {property.type === 'Plot' ? 'A prime plot perfect for building your dream home or for investment purposes.' : ''}
                                    {property.type === 'Commercial' ? 'High-visibility commercial space ideal for showrooms or offices.' : ''}
                                    It offers excellent connectivity to major roads and nearby amenities.
                                    Verified documents and clear title ensuring a hassle-free transaction.
                                </p>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {['Car Parking', 'Well Water', 'Compound Wall', 'Main Road Access', '3 Phase Connection', 'Garden Area'].map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-2 text-slate-600 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 h-80 overflow-hidden">
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

                    {/* Sidebar Sticky */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 sticky top-24">
                            <div className="hidden lg:block mb-6 border-b border-dashed border-slate-200 pb-6">
                                <h1 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">{property.title}</h1>
                                <div className="flex items-center text-slate-500 mb-4">
                                    <MapPin size={18} className="mr-1 text-sky-500" />
                                    {property.location}
                                </div>
                                <div className="text-3xl font-bold text-sky-600">{property.price}</div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md">
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Agent" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-lg">Sameer</div>
                                    <div className="text-xs text-sky-500 font-semibold uppercase tracking-wider">Real Estate Consultant</div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Shield size={10} /> Verified Agent</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2">
                                    <Phone size={20} /> Call Agent
                                </button>
                                <a
                                    href={`https://wa.me/919895294949?text=Hi, I am interested in ${property.title}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5" /> WhatsApp
                                </a>
                                <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">
                                    Schedule Visit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
