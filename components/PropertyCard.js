
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, ArrowRight, Phone, Droplets, Route } from 'lucide-react';

const PropertyCard = ({ property }) => {
    // Extract specialized amenities
    const waterSource = property.amenities?.find(a => a.startsWith('Water: '))?.replace('Water: ', '');
    const routePath = property.amenities?.find(a => a.startsWith('Path: '))?.replace('Path: ', '');

    return (
        <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <Link href={`/properties/${property._id}`}>
                    {property.images && property.images[0] ? (
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <MapPin size={32} className="text-slate-300" />
                        </div>
                    )}
                </Link>
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-sky-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                        {property.status}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-sky-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                        {property.type}
                    </span>
                    {/* <span className="bg-white/90 backdrop-blur-sm text-sky-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                        {property.status}
                    </span> */}
                </div>
                <div className="absolute bottom-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Link href={`/properties/${property._id}`} className="bg-white text-sky-600 p-2 rounded-full shadow-lg hover:bg-sky-50 transition-colors block">
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
                            <Link href={`/properties/${property._id}`}>{property.title}</Link>
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1 text-sky-400" />
                            {property.location}
                        </div>
                    </div>
                    <div className="text-sky-600 font-bold text-lg whitespace-nowrap">
                        {property.price}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 mb-4">
                    {property.area && (
                        <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg">
                            <Square size={16} className="text-slate-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center" title={property.area}>{property.area}</span>
                        </div>
                    )}
                    {waterSource && (
                        <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg">
                            <Droplets size={16} className="text-sky-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center" title={waterSource}>{waterSource}</span>
                        </div>
                    )}
                    {routePath && (
                        <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg">
                            <Route size={16} className="text-emerald-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center" title={routePath}>{routePath}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-auto">
                    <Link
                        href={`/properties/${property._id}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-sky-100 text-sky-600 font-medium hover:bg-sky-50 transition-colors"
                    >
                        View Details
                    </Link>
                    <a
                        href={`https://wa.me/919895294949?text=I'm interested in ${property.title}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center px-4 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm shadow-green-200"
                    >
                        <Phone size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
