
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { properties, reviews } from '@/lib/data';
import { Check, Star, ArrowRight, MapPin, Shield, Clock, Users, Phone, MessageCircle, Quote } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className='relative'>
        <Hero />
      </div>

      {/* About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
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
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-sky-500 font-semibold tracking-wider uppercase text-sm">Exclusive Listings</span>
            <h2 className="text-4xl font-bold text-slate-800">Featured Properties</h2>
            <p className="text-slate-500 text-lg">Explore our handpicked selection of premium properties in Edappal and Malappuram.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/properties" className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-slate-800 font-bold rounded-full hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 transition-all shadow-lg shadow-gray-200/50 hover:shadow-sky-200/50 transform hover:-translate-y-1">
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services / Why Choose Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-50/50 skew-x-12 transform translate-x-32 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Us</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Local Expertise', icon: MapPin, desc: 'Deep knowledge of Edappal real estate market trends and values.' },
              { title: 'Verified Listings', icon: Shield, desc: '100% verified properties ensuring safe and secure transactions.' },
              { title: 'Fast Response', icon: Clock, desc: 'Quick responses and dedicated support for all your queries.' },
              { title: 'Trusted Service', icon: Users, desc: 'Trusted by 100+ happy clients across Malappuram district.' },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group text-center hover:border-sky-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shadow-sm">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900 via-slate-900 to-slate-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors relative">
                <Quote className="absolute top-8 right-8 text-sky-500/20" size={48} />
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-slate-300 italic mb-8 leading-relaxed relative z-10">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center font-bold text-white shadow-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="text-xs text-sky-400">Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-br from-sky-500 to-sky-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Looking to Buy or Sell Property in Edappal?</h2>
          <p className="text-sky-100 text-xl mb-12 max-w-2xl mx-auto">Get the best deals and professional guidance from the most trusted consultant in the region.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <a href="tel:9895294949" className="w-full sm:w-auto px-10 py-5 bg-white text-sky-600 rounded-full font-bold shadow-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group">
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
              Call Now: 9895294949
            </a>
            <a href="https://wa.me/919895294949" className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white rounded-full font-bold shadow-2xl hover:brightness-105 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
              <MessageCircle size={24} />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
