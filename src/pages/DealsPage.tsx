import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../utils/currency';
import { Percent, Copy, Tag, Clock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';

export const DealsPage: React.FC = () => {
  const { products, setView, setSelectedCategory, showToast, applyCoupon } = useApp();

  const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  const copyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    showToast(`Applied coupon ${code} to your cart!`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bento Banner */}
      <div className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24] text-slate-950 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Limited Time Performance Deals</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            FLASH DEALS & PROMO CODES
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Save big on Brembo ceramic brake kits, Amaron & Exide AGM starting batteries, Michelin cross-climate tires, and workshop diagnostics. Copy coupons below or apply directly.
          </p>
        </div>
      </div>

      {/* Coupon Codes Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Sitewide Promo</span>
            <span className="text-[10px] text-slate-400 font-mono">No minimum</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 font-mono">10% OFF ENTIRE ORDER</h3>
          <p className="text-xs text-slate-500">Save 10% on all brakes, batteries, spark plugs & lighting</p>
          <div className="pt-2 flex items-center justify-between">
            <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-xs rounded-lg">
              SAVE10
            </span>
            <button
              onClick={() => copyAndApply('SAVE10')}
              className="px-3 py-1.5 bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Apply Code</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Pro Tech Discount</span>
            <span className="text-[10px] text-slate-400 font-mono">Min. ₹5,000</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 font-mono">20% OFF ORDERS ₹5,000+</h3>
          <p className="text-xs text-slate-500">Ideal for major brake overhauls, dual battery setups, & performance parts</p>
          <div className="pt-2 flex items-center justify-between">
            <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-xs rounded-lg">
              PROFIT20
            </span>
            <button
              onClick={() => copyAndApply('PROFIT20')}
              className="px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Apply Code</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Speed Shop Special</span>
            <span className="text-[10px] text-slate-400 font-mono">Min. ₹10,000</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 font-mono">₹2,000 FLAT DISCOUNT</h3>
          <p className="text-xs text-slate-500">Equip your home garage with professional impact wrenches and tools</p>
          <div className="pt-2 flex items-center justify-between">
            <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-xs rounded-lg">
              GEAR2000
            </span>
            <button
              onClick={() => copyAndApply('GEAR2000')}
              className="px-3 py-1.5 bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Apply Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Discounted Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">PARTS ON SALE RIGHT NOW</h2>
            <p className="text-xs text-slate-500">Discounted prices applied automatically</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setView('catalog');
            }}
            className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
          >
            View Full Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {discountedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
