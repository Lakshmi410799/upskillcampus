import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { VehicleSelectorModal } from '../components/VehicleSelectorModal';
import { CATEGORIES_LIST } from '../data/mockProducts';
import { POPULAR_YEARS, VEHICLE_DATABASE } from '../data/mockVehicles';
import { Vehicle } from '../types';
import { 
  Car, 
  Search, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Percent, 
  Flame, 
  Copy, 
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setView, 
    setSelectedCategory, 
    activeVehicle, 
    setActiveVehicle, 
    addUserVehicle, 
    showToast,
    applyCoupon
  } = useApp();

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Hero Quick Finder states
  const [heroYear, setHeroYear] = useState<number | ''>(activeVehicle?.year || '');
  const [heroMake, setHeroMake] = useState<string>(activeVehicle?.make || '');
  const [heroModel, setHeroModel] = useState<string>(activeVehicle?.model || '');

  const availableMakes = heroYear ? Object.keys(VEHICLE_DATABASE) : [];
  const makeData = heroMake ? VEHICLE_DATABASE[heroMake] : null;
  const availableModels = makeData ? makeData.models.filter(m => !heroYear || m.years.includes(Number(heroYear))) : [];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroYear || !heroMake || !heroModel) return;

    const newVehicle: Vehicle = {
      year: Number(heroYear),
      make: heroMake,
      model: heroModel
    };

    setActiveVehicle(newVehicle);
    addUserVehicle(newVehicle);
    setSelectedCategory(null);
    setView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    showToast(`Applied coupon ${code} to your cart!`);
  };

  // Featured sections
  const featuredBentoProducts = products.slice(0, 3);
  const bestSellers = products.filter(p => p.badges?.includes('Best Seller') || p.rating >= 4.9).slice(0, 4);
  const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  // Category Emoji map for bento icons
  const categoryIcons: Record<string, string> = {
    'Brake Systems': '🛑',
    'Batteries & Electrical': '🔋',
    'Tires & Wheels': '🛞',
    'Engine & Performance': '📦',
    'Lighting & Bulbs': '💡',
    'Diagnostics & Electronics': '📱',
    'Tools & Garage': '🔧',
    'Accessories & Care': '🧼'
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. PRIMARY BENTO GRID COMPOSITION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Bento 1: Main Seasonal Showcase Hero (Span 8) */}
        <div className="md:col-span-12 lg:col-span-8 bg-[#0f172a] rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center text-white shadow-xs min-h-[380px]">
          <div className="relative z-10 max-w-xl">
            <span className="bg-[#fbbf24] text-slate-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Seasonal Sale
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-none tracking-tight text-white">
              PERFORMANCE<br />
              <span className="text-[#fbbf24]">BRAKE SYSTEMS</span>
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Upgrade your stopping power with Brembo ceramic kits. Up to 25% off for all European & domestic models this week.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('Brake Systems');
                  setView('catalog');
                }}
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#fbbf24] transition-colors cursor-pointer text-sm shadow-xs"
              >
                Shop Collection
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setView('catalog');
                }}
                className="bg-slate-800/80 text-slate-200 hover:text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm hover:bg-slate-800"
              >
                Browse All 50,000+ Parts
              </button>
            </div>
          </div>

          {/* Subtle background brake rotor graphic */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <svg width="360" height="360" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="6" r="1" />
              <circle cx="12" cy="18" r="1" />
              <circle cx="6" cy="12" r="1" />
              <circle cx="18" cy="12" r="1" />
            </svg>
          </div>
        </div>

        {/* Bento 2: Vehicle Selector Tile (Span 4) */}
        <div className="md:col-span-6 lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs flex flex-col border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
              <Car className="w-5 h-5" />
            </div>
            <span>Select Your Vehicle</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">Lock in guaranteed vehicle fitment before shopping.</p>

          <form onSubmit={handleHeroSubmit} className="space-y-2.5 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5">
              <select
                id="hero-year-select"
                value={heroYear}
                onChange={(e) => {
                  setHeroYear(Number(e.target.value));
                  setHeroModel('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24]"
              >
                <option value="">Year: Select (e.g. 2024)</option>
                {POPULAR_YEARS.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                id="hero-make-select"
                disabled={!heroYear}
                value={heroMake}
                onChange={(e) => {
                  setHeroMake(e.target.value);
                  setHeroModel('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24] disabled:opacity-50"
              >
                <option value="">Make: Select (e.g. BMW, Ford)</option>
                {availableMakes.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                id="hero-model-select"
                disabled={!heroMake}
                value={heroModel}
                onChange={(e) => setHeroModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24] disabled:opacity-50"
              >
                <option value="">Model: Select (e.g. M3, F-150)</option>
                {availableModels.map(m => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                id="hero-find-parts-btn"
                type="submit"
                disabled={!heroYear || !heroMake || !heroModel}
                className="w-full bg-[#0f172a] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                Check Compatibility
              </button>

              {activeVehicle && (
                <div className="mt-2 text-center">
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Active: {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Bento 3: Promo Code Coupon Card (Span 4) */}
        <div className="md:col-span-6 lg:col-span-4 bg-[#fbbf24] rounded-3xl p-5 sm:p-6 flex items-center justify-between shadow-xs text-slate-900 border border-amber-300">
          <div>
            <div className="text-xs font-black text-slate-800 opacity-75 uppercase tracking-wider">PROMO CODE</div>
            <div className="text-2xl font-black text-slate-900 tracking-wider font-mono mt-0.5">SAVE10</div>
            <button
              onClick={() => copyAndApply('SAVE10')}
              className="mt-2 text-[11px] font-black underline hover:text-slate-700 cursor-pointer flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Click to Apply to Cart
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-900 font-bold">10% Off Sitewide</div>
            <div className="text-[11px] text-slate-800 opacity-80 mt-0.5">Min. ₹0 Orders</div>
            <span className="inline-block mt-2 bg-slate-900 text-[#fbbf24] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              Active Now
            </span>
          </div>
        </div>

        {/* Bento 4: Popular Categories Grid (Span 4) */}
        <div className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 text-lg">Popular Categories</h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setView('catalog');
              }}
              className="text-xs text-blue-600 hover:text-blue-700 font-bold cursor-pointer hover:underline"
            >
              View All 8 Categories →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES_LIST.slice(0, 6).map((cat) => (
              <div
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name as any);
                  setView('catalog');
                }}
                className="bg-slate-50 hover:bg-slate-100 p-3.5 rounded-2xl flex flex-col items-center text-center gap-2 cursor-pointer transition-all border border-slate-100 hover:border-slate-300 group"
              >
                <div className="w-10 h-10 bg-white rounded-full shadow-xs flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {categoryIcons[cat.name] || '📦'}
                </div>
                <span className="text-[11px] font-bold text-slate-700 line-clamp-1 group-hover:text-slate-900">
                  {cat.name.replace(' & Electrical', '').replace(' & Performance', '').replace(' & Care', '')}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. FEATURED PRODUCTS BENTO ROW */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Featured High-Performance Parts</h3>
            <p className="text-xs text-slate-500">Tested and verified by certified master mechanics</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setView('catalog');
            }}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 3. VALUE PROPOSITIONS BENTO TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">100% Fitment Guarantee</h4>
            <p className="text-xs text-slate-500 mt-0.5">Free return shipping if a part doesn't fit your selected car.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Free 2-Day Air on ₹1,999+</h4>
            <p className="text-xs text-slate-500 mt-0.5">Direct fulfillment from 6 nationwide regional warehouses.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">90-Day Hassle-Free Returns</h4>
            <p className="text-xs text-slate-500 mt-0.5">Unopened items refunded with zero restocking fees.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">OEM Certified Specs</h4>
            <p className="text-xs text-slate-500 mt-0.5">Factory equivalent durability and manufacturer warranties.</p>
          </div>
        </div>
      </div>

      {/* 4. FLASH DEALS SECONDARY BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-slate-950 flex flex-col justify-between shadow-xs">
          <div>
            <span className="bg-slate-950 text-[#fbbf24] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Limited Stock
            </span>
            <h3 className="text-2xl font-black mt-3 leading-tight font-mono">
              WEEKEND GARAGE BLOWOUT
            </h3>
            <p className="text-xs text-slate-900 font-medium mt-2 leading-relaxed">
              Score ₹500 flat discount on orders over ₹5,000. Upgrade power tools, diagnostic scanners, and full brake conversions.
            </p>
          </div>

          <div className="pt-6">
            <div className="p-3 bg-slate-950/10 rounded-2xl border border-slate-950/20 mb-3">
              <span className="text-[10px] font-bold uppercase text-slate-800">Coupon Code</span>
              <p className="text-lg font-black font-mono">GEAR500</p>
            </div>
            <button
              onClick={() => copyAndApply('GEAR500')}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Apply ₹500 Code
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base">Discounted Parts On Sale</h3>
            <button
              onClick={() => setView('deals')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              See All Deals →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dealsProducts.slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <VehicleSelectorModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />
    </div>
  );
};
