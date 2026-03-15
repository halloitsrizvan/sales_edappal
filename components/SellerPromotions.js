'use client';

import { Check, Star, Users, MessageCircle, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerPromotions = () => {
  const premiumBenefits = [
    '90% Success Rate',
    'Network of 360+ Trusted Brokers',
    'Broadcast to 3500+ Buyers & Investor Groups',
    'Reach 13,700+ Instagram Followers',
    'Reach 6,900+ Facebook Followers',
    'Reach 1,400+ YouTube Followers',
    'Reach 460+ Facebook Page Followers',
  ];

  const standardBenefits = [
    'Zero upfront charges',
    'Share photos/videos via WhatsApp',
    'Broadcast to 500+ Active WhatsApp Viewers',
    'Direct connection with genuine buyers',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Simple Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold text-[#005BC8] uppercase tracking-[0.2em] mb-2"
          >
            Seller Packages
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900"
          >
            Sell Your Property <span className="text-[#005BC8]">Faster</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Choose a promotion package that fits your goals and let our local expertise do the hard work for you.
          </p>
        </div>

        {/* Minimalist Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 px-2 lg:px-12">
          {/* Card 1 - Standard (Free) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] flex flex-col hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Standard</h3>
              <p className="text-slate-500 text-sm font-medium">Simple & Effective listing</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {standardBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-slate-600" />
                  </div>
                  <span className="text-slate-600 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-200/60 mt-auto">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-3xl font-bold text-slate-900">₹0</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Upfront</span>
                <span className="mx-2 text-slate-200">|</span>
                <span className="text-2xl font-bold text-slate-800">2%</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Commission</span>
              </div>

              <a
                href="https://wa.me/919895294949?text=I'm%20interested%20in%20Standard%20Promotion"
                className="group flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 text-slate-800 rounded-full font-bold transition-all hover:bg-slate-900 hover:text-white"
              >
                List My Property <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 2 - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#002B5B] p-8 rounded-[2rem] flex flex-col text-white shadow-xl shadow-blue-900/10 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-blue-100/60 text-sm font-medium">Maximum reach with Video</p>
              </div>
              <div className="bg-[#005BC8] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Recommended
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {premiumBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#005BC8]" />
                  </div>
                  <span className="text-blue-50/80 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-blue-800/50 mt-auto">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">₹5000</span>
                <span className="text-blue-200/60 text-sm font-medium uppercase tracking-wider">Service Fee</span>
              </div>
              <p className="text-[10px] font-bold text-[#005BC8] uppercase tracking-wider mb-6">Fully Refundable after Sale</p>

              <a
                href="https://wa.me/919895294949?text=I'm%20interested%20in%20Premium%20Promotion"
                className="group flex items-center justify-center gap-2 w-full py-4 bg-[#005BC8] text-white rounded-full font-bold transition-all hover:bg-white hover:text-[#002B5B]"
              >
                Promote My Property <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Clean CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#005BC8]/10 rounded-full blur-[80px]"></div>
          
          <h3 className="text-2xl md:text-4xl font-bold mb-6 relative z-10">
            Ready to sell your property in Edappal?
          </h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium relative z-10">
            Let&apos;s connect and find the perfect buyer for your property. Our experts are here to guide you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a href="tel:919895294949" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all">
              <Phone size={20} /> Call Now
            </a>
            <a href="https://wa.me/919895294949" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:brightness-105 transition-all">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Trust Line */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-900 font-bold text-[10px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2"><ShieldCheck size={16} /> Trusted Network</div>
          <div className="flex items-center gap-2"><Users size={16} /> Verified Buyers</div>
          <div className="flex items-center gap-2"><Star size={16} /> Local Expertise</div>
        </div>
      </div>
    </section>
  );
};

export default SellerPromotions;
