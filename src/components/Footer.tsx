import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Mail, 
  CheckCircle2, 
  CreditCard,
  Lock,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/mockProducts';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory, products } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#0f172a] text-slate-400 text-sm mt-auto">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#fbbf24] flex items-center justify-center text-[#0f172a] font-black">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">
                PART<span className="text-[#fbbf24]">WORKS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your premier direct-to-consumer auto parts supplier. Precision fitment for OEM replacement brake systems, AGM starting batteries, engine filters, and mechanic tools.
            </p>

            {/* Newsletter Subscription Bento Tile */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 max-w-sm">
              <h5 className="text-xs font-bold text-white mb-1.5">
                Join Gearhead Club for ₹500 Off
              </h5>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Use promo code <strong>GEAR15</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-[#fbbf24]"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-3 py-1.5 bg-[#fbbf24] hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Join</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Categories</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.slice(0, 5).map(cat => (
                <li key={cat.name}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.name as any);
                      setView('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#fbbf24] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#fbbf24] font-semibold hover:underline"
                >
                  View All Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Service</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('login')} className="hover:text-[#fbbf24] transition-colors cursor-pointer">
                  Sign In / Create Account
                </button>
              </li>
              <li>
                <button onClick={() => setView('account')} className="hover:text-[#fbbf24] transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setView('account')} className="hover:text-[#fbbf24] transition-colors cursor-pointer">
                  My Garage & Fitment
                </button>
              </li>
              <li>
                <button onClick={() => setView('deals')} className="hover:text-[#fbbf24] transition-colors cursor-pointer">
                  Coupons & Promo Codes
                </button>
              </li>
              <li>
                <span className="text-slate-500">Shipping Policy (Free ₹1,999+)</span>
              </li>
              <li>
                <span className="text-slate-500">90-Day Return Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Company & Programs */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company & Portal</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('affiliate')} className="text-[#fbbf24] font-semibold hover:underline">
                  Affiliate Network (8% Comm)
                </button>
              </li>
              <li>
                <button onClick={() => setView('admin')} className="hover:text-[#fbbf24] transition-colors flex items-center gap-1">
                  <span>Admin Demo Portal</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Commercial Wholesale</span>
              </li>
              <li>
                <span className="text-slate-500">About PartWorks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bento Status Footer Bar */}
      <div className="h-10 bg-slate-900 border-t border-slate-800 flex items-center px-6 sm:px-8 text-[11px] font-medium text-slate-400 justify-between">
        <div className="flex gap-4">
          <span>© {new Date().getFullYear()} PartWorks Demo</span>
          <span className="hidden sm:inline hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hidden sm:inline hover:text-white cursor-pointer">Terms of Service</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <strong className="text-slate-200">{products.length * 150}+</strong> Parts in Stock
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Nationwide 2-Day Air Shipping
          </span>
        </div>
      </div>
    </footer>
  );
};
