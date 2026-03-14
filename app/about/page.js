
'use client';

import { Check, Target, Compass, Award, Calendar, Users, Building, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-900">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-[#002B5B]/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
                    >
                        <Award size={14} className="text-[#005BC8]" />
                        <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Our Story</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
                    >
                        Building Trust in <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005BC8] to-sky-400">
                            Real Estate
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Since 2015, Sales Edappal has redefined property transactions with unwavering transparency, deep local expertise, and a commitment to your family's future.
                    </motion.p>
                </div>
                
                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </section>

            {/* Clean Intro Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Decorative background blocks */}
                            {/* <div className="absolute -inset-4 bg-[#005BC8]/10 rounded-[3rem] transform -rotate-3 transition-transform duration-500"></div>
                            <div className="absolute -inset-4 bg-sky-100 rounded-[3rem] transform rotate-3 transition-transform duration-500 opacity-50"></div> */}
                            
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Modern Real Estate Office"
                                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay Stats Box */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white flex justify-around">
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-[#002B5B] mb-1">10+</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years Active</div>
                                    </div>
                                    <div className="w-px bg-slate-200"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-[#005BC8] mb-1">500+</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Happy Clients</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                                    Who We Are
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                                    Sales Edappal is a premier real estate consultancy located near OMG Shoes Footwear, Amsakachery, Edappal. Founded by Sameer, we have grown to become the most reliable name in the Malappuram real estate market.
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We specialize in residential spaces, commercial properties, and land investments. Our approach is uniquely simple: Honesty, Integrity, and absolute Customer Satisfaction.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-[#005BC8]/10 text-[#005BC8] flex items-center justify-center shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Verified Properties</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">100% Legal Check Built-in</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-[#005BC8]/10 text-[#005BC8] flex items-center justify-center shrink-0">
                                        <Building size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Local Expertise</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Deep Roots in Edappal</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Bento Style */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#005BC8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#005BC8] mb-8 shadow-sm border border-slate-100">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To make property transactions remarkably simple, transparent, and accessible to everyone in Edappal. We aim to eliminate the common complexities of buying and selling real estate by providing only verified listings and honest, expert guidance.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#002B5B] p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#005BC8]/20 to-transparent"></div>
                            
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                                    <Compass size={32} />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-6">Our Vision</h3>
                                <p className="text-blue-100 leading-relaxed text-lg">
                                    To become the most trusted and preferred real estate brand in Malappuram, recognized universally for our unshakable integrity and our lifelong commitment to delivering true value to our clients and their future generations.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Seamless Elegant Timeline */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-[#005BC8] uppercase tracking-widest mb-4">
                            History
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Our Journey</h2>
                    </div>

                    <div className="relative">
                        {/* Hidden Center Line on Mobile, Visible on Desktop */}
                        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#005BC8]/10 via-[#005BC8]/30 to-[#005BC8]/10 md:-translate-x-1/2 -ml-0.5 rounded-full z-0"></div>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
                            >
                                <div className="md:w-[45%] md:text-right md:pr-12 pl-24 md:pl-0 w-full mb-4 md:mb-0 relative z-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Founded</h3>
                                    <p className="text-slate-500 font-medium">Started operations as a localized consultancy focusing on tight-knit residential deals.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#005BC8] shadow-lg flex items-center justify-center md:-translate-x-1/2 z-10 transform -translate-x-1/2 md:transform-none shadow-[#005BC8]/20">
                                    <span className="text-[10px] font-black text-[#005BC8]">2015</span>
                                </div>
                                <div className="md:w-[45%] hidden md:block"></div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
                            >
                                <div className="md:w-[45%] hidden md:block"></div>
                                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#005BC8] shadow-lg flex items-center justify-center md:-translate-x-1/2 z-10 transform -translate-x-1/2 md:transform-none shadow-[#005BC8]/20">
                                    <span className="text-[10px] font-black text-[#005BC8]">2018</span>
                                </div>
                                <div className="md:w-[45%] md:pl-12 pl-24 w-full relative z-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Expansion</h3>
                                    <p className="text-slate-500 font-medium">Expanded our physical footprint and services to cover Malappuram and Ponnani regions.</p>
                                </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
                            >
                                <div className="md:w-[45%] md:text-right md:pr-12 pl-24 md:pl-0 w-full mb-4 md:mb-0 relative z-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Digital Era</h3>
                                    <p className="text-slate-500 font-medium">Launched our online platform to provide highly transparent, verified property data to everyone.</p>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#005BC8] shadow-lg flex items-center justify-center md:-translate-x-1/2 z-10 transform -translate-x-1/2 md:transform-none shadow-[#005BC8]/20">
                                    <span className="text-[10px] font-black text-[#005BC8]">2021</span>
                                </div>
                                <div className="md:w-[45%] hidden md:block"></div>
                            </motion.div>

                            {/* Step 4 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
                            >
                                <div className="md:w-[45%] hidden md:block"></div>
                                <div className="absolute left-8 md:left-1/2 w-14 h-14 bg-[#005BC8] rounded-full border-4 border-white shadow-xl flex items-center justify-center md:-translate-x-1/2 z-10 transform -translate-x-1/2 md:transform-none shadow-[#005BC8]/30">
                                    <MapPin size={20} className="text-white" />
                                </div>
                                <div className="md:w-[45%] md:pl-12 pl-24 w-full relative z-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Market Leader</h3>
                                    <p className="text-[#005BC8] font-bold">Today</p>
                                    <p className="text-slate-500 font-medium mt-2">Trusted by hundreds, setting the premium standard for real estate consulting in Edappal.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

