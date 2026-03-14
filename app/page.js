
'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, ArrowRight, MapPin, Shield, Clock, Users, Phone, MessageCircle, Quote, Home as HomeIcon, Key, Building, Loader2 } from 'lucide-react';
import Link from 'next/link';

import FeedbackForm from '@/components/FeedbackForm';

import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import SellerPromotions from '@/components/SellerPromotions';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propsRes = await fetch('/api/properties?limit=3&featured=true');
        const propsData = await propsRes.json();
        
        if (propsData.success) {
          setFeaturedProperties(propsData.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className='relative'>
        <Hero />
      </div>
      {/* Why Choose Us Section */}
      <section className="py-8 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Why <span className="text-[#005BC8]">Sales Edappal</span> is The Right Choice for You
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Middle Column (subgrid) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col items-start gap-6 group hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                  <MapPin size={24} className="text-slate-700" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Local Expertise</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Learn from the most experienced local consultant who brings years of real-world knowledge about Edappal's property market.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col items-start gap-6 group hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                  <Shield size={24} className="text-slate-700" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Verified Listings</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Every property listing is highly regarded and verified, helping you to gain confidence and open doors to your new home.
                  </p>
                </div>
              </div>

              {/* Card 3 (Spans bottom row of the subgrid) */}
              <div className="md:col-span-2 bg-slate-50 p-10 rounded-[2.5rem] flex flex-col items-start gap-6 group hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                  <Users size={24} className="text-slate-700" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">100+ High Impact Deals</h3>
                  <p className="text-slate-500 leading-relaxed font-medium max-w-2xl">
                    Sales Edappal offers a proven track record of over 100 successful deals that cover essential residential and commercial needs in today's market. Whether you're a first-time buyer or an investor, our local insights provide practical, hands-on support.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (spanning height) */}
            <div className="bg-[#002B5B] p-10 rounded-[2.5rem] text-white flex flex-col h-full justify-between">
              <div className="space-y-10">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-transparent">
                  <Phone size={24} className="text-white" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold leading-tight">Personalized Property Guidance</h3>
                  <p className="text-blue-100/80 leading-relaxed font-medium">
                    At Sales Edappal, we understand the importance of balancing your preferences with your lifestyle. That's why our consultations are available on-demand, allowing you to find property at your own pace.
                  </p>
                  <p className="text-blue-100/60 text-sm leading-relaxed">
                    Whether you're a working professional or a local resident, you can customize your property requirements to fit your needs.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="tel:9895294949"
                  className="inline-flex items-center gap-2 bg-[#005BC8] hover:bg-[#004bb0] text-white font-bold px-8 py-4 rounded-full transition-all group shadow-lg"
                >
                  Get Started Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Properties */}
      <section className="py-10 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-[#005BC8] uppercase tracking-widest mb-2">
              Exclusive Listings
            </div>
            <h2 className="text-4xl font-bold text-slate-800">Featured Properties</h2>
            {/* <p className="text-slate-500 text-lg">Explore our handpicked selection of premium properties in Edappal and Malappuram.</p> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {loading ? (
              [1, 2, 3, 4].map((i) => <PropertyCardSkeleton key={i} />)
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400 font-medium">
                New featured properties are arriving soon!
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <Link
                href="/properties"
                className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,91,200,0.3)]"
              >
                {/* Theme Color Fill on Hover */}
                <div className="absolute inset-0 bg-[#005BC8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                
                <span className="relative z-10">View All Properties</span>
                
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={22} strokeWidth={2.5} />
                </motion.div>

                {/* Animated Liquid Shimmer */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                  style={{ skewX: -20 }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <SellerPromotions />


      {/* About Section */}
      {/* <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-sky-100 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="About Sales Edappal"
              className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover transition-transform group-hover:scale-[1.01] duration-500 z-10"
            />
            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-8 rounded-2xl shadow-2xl border border-sky-100 animate-slide-up">
              <div className="text-5xl font-bold text-sky-500 mb-1">10+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Experience</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
                Trusted Real Estate Consultant in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">Edappal</span>
              </h2>
              <div className="w-24 h-1.5 bg-sky-500 rounded-full opacity-80"></div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed font-light">
              Sales Edappal is your premier real estate partner based near OMG Shoes Footwear, Amsakachery.
              Led by Sameer, we bring transparency, integrity, and local expertise to every transaction.
              Whether you are buying your dream home, selling a plot, or looking for a commercial lease,
              we ensure a seamless experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Verified Listings', 'Transparent Pricing', 'Documentation Support', 'Local Expertise'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-700 font-medium p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-sky-50 hover:border-sky-100 transition-all cursor-default">
                  <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                    <Check size={18} />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-4 transition-all group mt-4">
              Learn More About Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* Services Section - Redesigned */}
      <section className="py-14 px-4 bg-white relative overflow-hidden"> 
        {/* Background Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-16 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Comprehensive Real Estate <br />
              <span className="text-sky-500">Solutions for Edappal</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed mx-auto">
              From finding your first home to managing large commercial portfolios, we provide specialized services tailored to the unique Malappuram market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Buy & Sell */}
            <div className="group relative bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-100 hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <HomeIcon size={120} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <HomeIcon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">Buy or Sell <br />Residential</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                End-to-end assistance for home buyers and sellers. We handle everything from site visits to legal documentation.
              </p>
              <ul className="space-y-3 mb-8">
                {['Verified Independent Houses', 'Residential Land Plots', 'Legal Title Verification', 'Fair Market Valuation'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/properties?status=Buy" className="flex items-center justify-center w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-bold text-sm group-hover:bg-sky-600 group-hover:text-white transition-all shadow-inner">
                View For Sale <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Service 2: Rent & Lease */}
            <div className="group relative bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Key size={120} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <Key size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">Rent or Lease <br />Management</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Finding the right tenants and the perfect spaces. We bridge the gap between owners and renters seamlessly.
              </p>
              <ul className="space-y-3 mb-8">
                {['Apartment Rentals', 'Short-term Leases', 'Tenant Verification', 'Agreement Drafting'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/properties?status=Rent" className="flex items-center justify-center w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                Browse Rentals <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Service 3: Commercial */}
            <div className="group relative bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-amber-100 hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Building size={120} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <Building size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4">Commercial <br />Investments</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Strategic commercial placements for businesses. We help you find high-visibility plots and shop spaces in Edappal.
              </p>
              <ul className="space-y-3 mb-8">
                {['Main Road Shop Spaces', 'Office Room Clusters', 'Commercial Land Plots', 'Investment Consulting'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/properties?type=Commercial" className="flex items-center justify-center w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-bold text-sm group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
                View Commercial <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Love - Testimonials */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-[#005BC8] uppercase tracking-widest mb-2">
              Testimonials
            </div>
          <div className="mb-14 md:text-left text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Our Wall of Love – <br className="hidden md:block" />
              Words from Happy Customers 
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Left Column (2 Cards) */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-sky-100 flex items-center justify-center text-sky-700 font-extrabold text-lg">
                      J
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">JABIR SHA</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Local Buyer</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  "Trustworthy sales in Edappal. Helped me find the perfect plot."
                </p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-lg">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Shabeer</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Home Buyer</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  "Highly professional and transparent. Sameer guided us nicely when we were looking for a new house. Strongly recommend."
                </p>
              </div>
            </div>

            {/* Center Column (Featured Dark Card) */}
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl flex flex-col relative overflow-hidden min-h-[480px] transition-transform duration-300 md:translate-y-4">
              <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                  alt="Real Estate Client"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-0"></div>
              
              <div className="relative z-10 flex-grow flex flex-col justify-end">
                <div className="mb-8">
                  <p className="text-white text-lg font-medium leading-relaxed italic">
                    "Best local real estate consultant. Highly recommended for quick deals"
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/20 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-white font-extrabold text-lg backdrop-blur-md">
                      F
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Fasil Edappal</h4>
                      <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Property Owner</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (2 Cards) */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-100 flex items-center justify-center text-rose-700 font-extrabold text-lg">
                      N
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Noufal AT</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Investor</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  "Good service for buying and selling properties. Transparent process."
                </p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center text-emerald-700 font-extrabold text-lg">
                      M
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Mohammed</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Seller</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  "Sold my plot in a week! Their network in Edappal is very strong. Hassle-free experience working with them."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      {/* <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">Feedback</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Share Your Experience</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We value your opinion. Share your experience with us and help us improve our services for the Edappal community.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-slate-400 text-xs ${['bg-sky-100', 'bg-emerald-100', 'bg-amber-100', 'bg-rose-100'][i - 1]}`}>
                      U{i}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">Join 100+ happy clients</p>
              </div>
            </div>
            <div>
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Banner - Elegant & Modern */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[3rem] overflow-hidden bg-slate-900 px-8 py-16 md:px-16 md:py-20 text-center text-white shadow-2xl shadow-sky-900/20"
          >
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#005BC8] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-sky-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10">
              <span className="text-sky-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Take the next step</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
                Looking to Buy or Sell <br className="hidden md:block"/> Property in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Edappal?</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Get the best deals and professional guidance from the most trusted real estate consultant in the region.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 items-center">
                <a 
                  href="tel:9895294949" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#005BC8] rounded-full font-bold shadow-xl hover:bg-slate-50 transition-all hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                  Call 9895294949
                </a>
                <a 
                  href="https://wa.me/919895294949" 
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-full font-bold shadow-xl hover:brightness-110 transition-all hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
