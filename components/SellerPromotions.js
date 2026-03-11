'use client';

import { Check, Star, Video, Users, Share2, Youtube, MessageCircle, Phone, Instagram, Facebook, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerPromotions = () => {
  const premiumBenefits = [
    { icon: <Zap className="w-4 h-4" />, text: '90% Success Rate' },
    { icon: <Users className="w-4 h-4" />, text: 'Network of 325+ Trusted Brokers' },
    { icon: <Share2 className="w-4 h-4" />, text: 'Broadcast to 2800+ Buyers & Investor Groups' },
    { icon: <Instagram className="w-4 h-4" />, text: 'Reach 11,700+ Instagram Followers' },
    { icon: <Facebook className="w-4 h-4" />, text: 'Reach 5,300+ Facebook Followers' },
    { icon: <Youtube className="w-4 h-4" />, text: 'Reach 1,230+ YouTube Subscribers' },
    { icon: <MessageCircle className="w-4 h-4" />, text: 'Reach 650+ WhatsApp Status Viewers' },
    { icon: <Facebook className="w-4 h-4" />, text: 'Reach 365+ Facebook Page Followers' },
  ];

  const standardBenefits = [
    { icon: <Check className="w-4 h-4" />, text: 'Zero upfront charges' },
    { icon: <MessageCircle className="w-4 h-4" />, text: 'Share property photos/videos via WhatsApp' },
    { icon: <Users className="w-4 h-4" />, text: 'Broadcast to 500+ Active WhatsApp Viewers' },
    { icon: <Check className="w-4 h-4" />, text: 'Direct connection with genuine buyers' },
  ];

  return (
    <section className="py-24 bg-[#E0F2FE]/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#38BDF8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#38BDF8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#38BDF8]/20 shadow-sm mb-6"
          >
            <Star className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8]" />
            <span className="text-sm font-bold text-[#0C4A6E] uppercase tracking-wider">Seller Rewards</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#0C4A6E] mb-6 leading-tight"
          >
            Your Trusted Local Property Partner
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#0C4A6E]/70 text-lg md:text-xl font-medium"
          >
            Looking to <span className="text-[#38BDF8] font-bold">SELL</span> your property quickly and profitably? <br className="hidden md:block" />
            Choose the promotion package that fits your needs.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Card 1 - Premium */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-sky-200/50 border-2 border-[#38BDF8] flex flex-col h-full"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0C4A6E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 whitespace-nowrap">
              ⭐ Most Powerful Promotion
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-[#0C4A6E] mb-3">
                Premium Promotion – With Video Advertising
              </h3>
              <p className="text-slate-500 font-medium">
                Maximize reach and attract serious buyers with our premium marketing network.
              </p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {premiumBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#E0F2FE] text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <span className="text-slate-600 font-semibold text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 mt-auto">
              <div className="flex flex-wrap items-end gap-x-6 gap-y-4 mb-8">
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Service Fee</div>
                  <div className="text-3xl font-black text-[#0C4A6E]">₹5000 <span className="text-sm font-bold text-slate-400">Only</span></div>
                  <div className="text-xs font-bold text-[#38BDF8] mt-1 bg-[#E0F2FE] inline-block px-2 py-0.5 rounded">Fully Refundable after successful sale</div>
                </div>
                <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Commission</div>
                  <div className="text-3xl font-black text-[#0C4A6E]">2%</div>
                </div>
              </div>

              <div className="grid gap-4">
                <a
                  href="https://wa.me/919895294949?text=I'm%20interested%20in%20Premium%20Promotion%20for%20my%20property"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#38BDF8] text-white rounded-2xl font-bold text-lg hover:bg-[#0C4A6E] transition-all shadow-lg shadow-sky-200"
                >
                  Promote My Property <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919895294949"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-lg hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Standard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 flex flex-col h-full"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-black text-[#0C4A6E] mb-3">
                Standard Promotion – Simple & Effective
              </h3>
              <p className="text-slate-500 font-medium">
                Promote your property with our active buyer network.
              </p>
            </div>

            <div className="space-y-5 mb-10 flex-grow">
              {standardBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-[#E0F2FE] group-hover:text-[#38BDF8] transition-all">
                    {benefit.icon}
                  </div>
                  <span className="text-slate-600 font-semibold text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 mt-auto">
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4 mb-8">
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Upfront Fee</div>
                  <div className="text-3xl font-black text-[#0C4A6E]">₹0</div>
                </div>
                <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Commission</div>
                  <div className="text-3xl font-black text-[#0C4A6E]">2%</div>
                </div>
              </div>

              <a
                href="https://wa.me/919895294949?text=I'm%20interested%20in%20Standard%20Promotion%20for%20my%20property"
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-[#0C4A6E] transition-all shadow-lg"
              >
                List My Property <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-[#38BDF8] to-[#0C4A6E] p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Sell Your Property? <br />
                <span className="text-white/90">Let's Make It Happen!</span>
              </h3>
              <p className="text-white/80 font-medium text-lg max-w-xl">
                Join our trusted network and get the best value for your property in Edappal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="tel:919895294949"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-[#0C4A6E] rounded-2xl font-black text-lg hover:bg-sky-50 transition-all shadow-xl whitespace-nowrap"
              >
                <Phone className="w-6 h-6" /> Call Now
              </a>
              <a
                href="https://wa.me/919895294949"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg hover:brightness-105 transition-all shadow-xl whitespace-nowrap"
              >
                <MessageCircle className="w-6 h-6" /> WhatsApp Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          <div className="flex items-center gap-3 text-[#0C4A6E]/50 font-bold uppercase tracking-widest text-xs">
            <ShieldCheck className="w-5 h-5" /> Trusted Local Network
          </div>
          <div className="flex items-center gap-3 text-[#0C4A6E]/50 font-bold uppercase tracking-widest text-xs">
            <Users className="w-5 h-5" /> Verified Buyers
          </div>
          <div className="flex items-center gap-3 text-[#0C4A6E]/50 font-bold uppercase tracking-widest text-xs">
            <Star className="w-5 h-5" /> 10+ Years Experience
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerPromotions;
