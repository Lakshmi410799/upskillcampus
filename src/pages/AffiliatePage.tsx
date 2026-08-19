import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import { 
  Users, 
  Percent, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  TrendingUp, 
  Share2, 
  Award,
  Sparkles
} from 'lucide-react';

export const AffiliatePage: React.FC = () => {
  const { user, showToast } = useApp();
  const [affiliateCode, setAffiliateCode] = useState(user ? `GEARHEAD-${user.name.split(' ')[0].toUpperCase()}` : 'GEARHEAD-AARAV');
  const [customLink, setCustomLink] = useState(`https://partworks.demo/ref?code=${affiliateCode}`);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(customLink);
    setIsCopied(true);
    showToast('Affiliate referral link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Bento Header */}
      <div className="rounded-3xl bg-[#0f172a] p-8 sm:p-10 text-white shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24] text-slate-950 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>PartWorks Creator & Mechanic Affiliate Network</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          EARN 8% COMMISSIONS ON EVERY AUTO PART REFERRAL
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
          Are you a YouTube mechanic, automotive Instagram creator, forum builder, or racing enthusiast? Share your favorite parts with your audience and earn monthly payouts with 45-day cookie tracking.
        </p>
      </div>

      {/* Program Highlights Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="p-3 w-fit rounded-2xl bg-amber-100 text-amber-700 font-black text-xl font-mono">
            ₹
          </div>
          <h3 className="font-bold text-slate-900 text-base">8% Baseline Commission</h3>
          <p className="text-xs text-slate-500">Earn ₹800 on every ₹10,000 brake kit or battery purchased through your unique link.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="p-3 w-fit rounded-2xl bg-emerald-100 text-emerald-700">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">45-Day Cookie Window</h3>
          <p className="text-xs text-slate-500">Get credited for purchases made within 45 days of a customer clicking your link.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <div className="p-3 w-fit rounded-2xl bg-blue-100 text-blue-700">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Direct UPI / Bank Payouts</h3>
          <p className="text-xs text-slate-500">Automated simulated monthly disbursements with zero payout thresholds.</p>
        </div>
      </div>

      {/* Interactive Affiliate Generator Bento Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">YOUR SIMULATED AFFILIATE PORTAL</h2>
            <p className="text-xs text-slate-500">Generate links and track your simulated referrals</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Active Partner
          </span>
        </div>

        {/* Custom Referral Link Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Custom Referral Link</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              readOnly
              value={customLink}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-mono focus:outline-hidden"
            />
            <button
              onClick={handleCopyLink}
              className="px-6 py-3 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" /> : <Copy className="w-4 h-4 text-[#fbbf24]" />}
              <span>{isCopied ? 'Link Copied!' : 'Copy Referral Link'}</span>
            </button>
          </div>
        </div>

        {/* Simulated Metrics stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500">Total Clicks</p>
            <p className="text-xl font-bold font-mono text-slate-900 mt-1">1,248</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500">Referred Orders</p>
            <p className="text-xl font-bold font-mono text-slate-900 mt-1">64</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500">Conversion Rate</p>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1">5.1%</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500">Simulated Earnings</p>
            <p className="text-xl font-bold font-mono text-slate-900 mt-1">{formatCurrency(38600)}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
