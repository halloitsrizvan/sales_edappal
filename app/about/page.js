
import { Check, Target, Compass, Award, Calendar } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-sky-900 to-sky-700 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About Sales Edappal</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto leading-relaxed">
                        Your trusted partner in Real Estate. We simplify property transactions with transparency and expertise.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-sky-100 rounded-3xl transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Office"
                            className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Who We Are</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Sales Edappal is a premier real estate consultancy located near OMG Shoes Footwear, Amsakachery, Edappal.
                            Founded by Sameer, we have grown to become the most reliable name in the Malappuram real estate market.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We specialize in residential and commercial properties, helping over 500 families find their perfect home.
                            Our approach is simple: Honesty, Integrity, and Customer Satisfaction.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                <div className="text-3xl font-bold text-sky-600 mb-1">10+</div>
                                <div className="text-sm font-semibold text-slate-500">Years Active</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                <div className="text-3xl font-bold text-sky-600 mb-1">100+</div>
                                <div className="text-sm font-semibold text-slate-500">Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 shadow-sm">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To make property transactions simple, transparent, and accessible to everyone in Edappal.
                            We aim to eliminate the complexities of buying and selling real estate by providing verified listings and expert guidance.
                        </p>
                    </div>
                    <div className="bg-sky-600 p-10 rounded-3xl shadow-lg border border-sky-500 hover:-translate-y-2 transition-transform duration-300 text-white">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm backdrop-blur-sm">
                            <Compass size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-sky-100 leading-relaxed">
                            To become the most trusted and preferred real estate brand in Malappuram, known for our integrity
                            and commitment to delivering value to our clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 md:left-1/2 md:-translate-x-1/2"></div>

                        <div className="space-y-12">
                            {/* Item 1 - Left */}
                            <div className="relative pl-20 md:pl-0">
                                {/* Dot */}
                                <div className="absolute left-[24px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>

                                <div className="md:flex md:justify-between md:items-center w-full">
                                    <div className="md:w-[45%] md:text-right pr-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 font-bold rounded-full mb-3 text-sm">2015</span>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2">Founded</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">Started operations as a small consultancy in Edappal, focusing on local residential deals.</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-[45%]"></div>
                                </div>
                            </div>

                            {/* Item 2 - Right */}
                            <div className="relative pl-20 md:pl-0">
                                <div className="absolute left-[24px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>
                                <div className="md:flex md:justify-between md:items-center w-full">
                                    <div className="hidden md:block md:w-[45%]"></div>
                                    <div className="md:w-[45%] pl-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 font-bold rounded-full mb-3 text-sm">2018</span>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2">Expansion</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">Expanded services to cover Malappuram and Ponnani regions, establishing a second office.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Item 3 - Left */}
                            <div className="relative pl-20 md:pl-0">
                                <div className="absolute left-[24px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>
                                <div className="md:flex md:justify-between md:items-center w-full">
                                    <div className="md:w-[45%] md:text-right pr-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 font-bold rounded-full mb-3 text-sm">2021</span>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2">Digital Launch</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">Launched our online portal to provide transparent, verified listings to a wider audience.</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-[45%]"></div>
                                </div>
                            </div>

                            {/* Item 4 - Right */}
                            <div className="relative pl-20 md:pl-0">
                                <div className="absolute left-[24px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>
                                <div className="md:flex md:justify-between md:items-center w-full">
                                    <div className="hidden md:block md:w-[45%]"></div>
                                    <div className="md:w-[45%] pl-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 font-bold rounded-full mb-3 text-sm">Present</span>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2">Market Leader</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">Trusted by hundreds of families for their property needs, setting the standard in Edappal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
