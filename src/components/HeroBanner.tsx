import React from 'react';
import { useStore } from '../context/StoreContext';
import { Clock, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { addToast } = useStore();

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('LOCAL15');
    addToast('Promo code LOCAL15 copied to clipboard!', 'success');
  };

  return (
    <div id="hero-banner-section" className="relative bg-gradient-to-r from-emerald-900 via-emerald-850 to-teal-900 text-white overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-md border border-emerald-800">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-8 sm:py-10 lg:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column Text */}
        <div className="max-w-xl space-y-3.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Support 120+ Independent Local Farms & Artisans</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Freshness Harvested Today, Delivered To Your Door <span className="text-amber-400">In 45 Mins</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 font-normal leading-relaxed">
            Zero warehouse storage. All produce, artisan breads, raw honey, and fresh dairy are picked directly from local growers within 20 miles.
          </p>

          {/* Quick Stats Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-emerald-100">
            <div className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>45-Min Express Slot</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Freshness Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Free Delivery &gt; $25</span>
            </div>
          </div>
        </div>

        {/* Right Column Promo Card */}
        <div className="w-full md:w-auto shrink-0 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center md:text-right space-y-3 shadow-lg">
          <div className="flex items-center justify-center md:justify-end gap-2 text-amber-300 font-bold text-xs">
            <Tag className="w-4 h-4" />
            <span>LOCAL COMMUNITY SPECIAL</span>
          </div>
          <div className="text-2xl font-black text-white">
            15% OFF <span className="text-xs font-medium text-emerald-200">First Local Order</span>
          </div>
          <p className="text-xs text-emerald-100">Applied at checkout on orders $25+</p>
          <div className="pt-1 flex items-center justify-center md:justify-end gap-2">
            <code className="bg-emerald-950 text-amber-300 font-mono font-bold px-3 py-1.5 rounded-lg text-sm tracking-wider border border-amber-400/40">
              LOCAL15
            </code>
            <button
              id="copy-promo-code-btn"
              onClick={handleCopyCode}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
