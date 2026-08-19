import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../utils/currency';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Printer, 
  Mail, 
  ArrowRight, 
  Car, 
  Clock, 
  MapPin, 
  CreditCard,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, setView, setSelectedCategory } = useApp();
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // Latest order
  const latestOrder = orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#0f172a', '#10b981', '#3b82f6']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!latestOrder) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500 space-y-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <p>No active order found.</p>
        <button onClick={() => setView('catalog')} className="px-6 py-2.5 bg-[#0f172a] text-white font-bold rounded-full">
          Browse Catalog
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Success Bento Hero Header */}
      <div className="text-center space-y-3 bg-white border border-slate-200/80 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Payment Verified & Authorized</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">THANK YOU FOR YOUR ORDER!</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Order <strong className="text-slate-900 font-mono">#{latestOrder.id}</strong> has been received by the regional warehouse for priority packaging and dispatch.
          </p>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowEmailPreview(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>Preview Order Confirmation Email</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Live Simulated Shipping Tracking Stepper */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Simulated Live Shipment Tracking</h3>
            <p className="text-xs text-slate-500">Carrier: BlueDart / Delhivery Priority • Tracking #: <strong className="font-mono text-slate-800">{latestOrder.trackingNumber}</strong></p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-slate-900 px-3 py-1 rounded-full">
            Estimated Delivery: 2-3 Business Days
          </span>
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto text-xs">✓</div>
            <p className="font-bold text-slate-900">Order Placed</p>
            <p className="text-[10px] text-slate-400 font-mono">Today, Just now</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-[#fbbf24] text-slate-950 font-bold flex items-center justify-center mx-auto text-xs animate-pulse">2</div>
            <p className="font-bold text-slate-900">Warehouse Picking</p>
            <p className="text-[10px] text-amber-700 font-mono">In Progress</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-xs">3</div>
            <p className="font-semibold text-slate-500">Carrier Handover</p>
            <p className="text-[10px] text-slate-400 font-mono">Pending</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-xs">4</div>
            <p className="font-semibold text-slate-500">Out for Delivery</p>
            <p className="text-[10px] text-slate-400 font-mono">Pending</p>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Ordered Items Table (8 cols) */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
            Items in This Shipment ({latestOrder.items.reduce((s, i) => s + i.quantity, 0)})
          </h3>

          <div className="divide-y divide-slate-100">
            {latestOrder.items.map(item => (
              <div key={item.product.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-xl bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{item.product.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Brand: <strong className="text-slate-800">{item.product.brand}</strong> • SKU: {item.product.sku}
                    </p>
                    {item.selectedVehicle && (
                      <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        <span>Fits {item.selectedVehicle.year} {item.selectedVehicle.make} {item.selectedVehicle.model}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-mono font-bold text-slate-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Qty: {item.quantity} × {formatCurrency(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Summary (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Delivery Destination
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">{latestOrder.shippingAddress.fullName}</p>
              <p>{latestOrder.shippingAddress.streetAddress}</p>
              {latestOrder.shippingAddress.apartment && <p>{latestOrder.shippingAddress.apartment}</p>}
              <p>{latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} {latestOrder.shippingAddress.zipCode}</p>
              <p className="text-slate-400 font-mono pt-1">{latestOrder.shippingAddress.phone}</p>
              <p className="text-slate-400">{latestOrder.shippingAddress.email}</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-3 text-xs shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Payment Breakdown
            </h3>
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-mono text-slate-900 font-semibold">{formatCurrency(latestOrder.subtotal)}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({latestOrder.couponCode})</span>
                <span className="font-mono">-{formatCurrency(latestOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="font-mono text-slate-900 font-semibold">
                {latestOrder.shippingFee === 0 ? 'FREE' : formatCurrency(latestOrder.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST Tax</span>
              <span className="font-mono text-slate-900 font-semibold">{formatCurrency(latestOrder.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Paid</span>
              <span className="font-mono text-slate-900 text-base font-black">{formatCurrency(latestOrder.total)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setView('account')}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
        >
          View All Orders in Account
        </button>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setView('catalog');
          }}
          className="px-6 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
        </button>
      </div>

      {/* Simulated Email Modal */}
      {showEmailPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">Simulated Email Confirmation</h3>
              </div>
              <button onClick={() => setShowEmailPreview(false)} className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer">✕ Close</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3 font-sans">
              <div className="border-b border-slate-200 pb-2 text-slate-500">
                <p><strong>From:</strong> orders@partworks-auto.com</p>
                <p><strong>To:</strong> {latestOrder.shippingAddress.email}</p>
                <p><strong>Subject:</strong> Order Confirmation #{latestOrder.id} - PartWorks</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900">Hi {latestOrder.shippingAddress.fullName},</p>
                <p>We've received your order and our certified warehouse team is currently pulling and boxing your parts.</p>
                <p className="font-mono bg-white p-2 rounded-lg text-slate-900 border border-slate-200">
                  Tracking #: {latestOrder.trackingNumber}
                </p>
                <p>Thank you for choosing PartWorks!</p>
              </div>
            </div>

            <button
              onClick={() => setShowEmailPreview(false)}
              className="w-full py-2.5 bg-[#0f172a] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
