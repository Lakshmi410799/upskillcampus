import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShippingAddress, PaymentDetails } from '../types';
import { formatCurrency } from '../utils/currency';
import { 
  Lock, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  Smartphone,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Car
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    discountAmount, 
    user, 
    createOrder, 
    setView 
  } = useApp();

  const [fullName, setFullName] = useState(user?.defaultAddress?.fullName || user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.defaultAddress?.email || user?.email || 'aarav.sharma@example.com');
  const [phone, setPhone] = useState(user?.defaultAddress?.phone || user?.phone || '+91 98765 43210');
  const [streetAddress, setStreetAddress] = useState(user?.defaultAddress?.streetAddress || '42 MG Road, Indiranagar');
  const [apartment, setApartment] = useState(user?.defaultAddress?.apartment || 'Apartment 302, Greenview');
  const [city, setCity] = useState(user?.defaultAddress?.city || 'Bengaluru');
  const [state, setState] = useState(user?.defaultAddress?.state || 'Karnataka');
  const [zipCode, setZipCode] = useState(user?.defaultAddress?.zipCode || '560038');
  const [country, setCountry] = useState(user?.defaultAddress?.country || 'India');

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping calculation
  let shippingFee = 0;
  if (shippingMethod === 'standard') {
    shippingFee = cartSubtotal >= 1999 || appliedCoupon?.freeShipping ? 0 : 199;
  } else if (shippingMethod === 'express') {
    shippingFee = 399;
  } else if (shippingMethod === 'overnight') {
    shippingFee = 699;
  }

  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.18; // 18% GST
  const grandTotal = Math.max(0, taxableAmount + shippingFee + estimatedTax);

  const handleFillDemoData = () => {
    setFullName('Rajesh Vance');
    setEmail('rajesh.vance@speedshop.com');
    setPhone('+91 98450 12345');
    setStreetAddress('1204 Auto Cluster, MIDC');
    setApartment('Bay #3');
    setCity('Pune');
    setState('Maharashtra');
    setZipCode('411019');
    setCountry('India');
    setCardNumber('4242 4242 4242 4242');
    setCardExp('09/29');
    setCardCvc('731');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !streetAddress || !city || !state || !zipCode) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway delay (1.2s)
    setTimeout(() => {
      const address: ShippingAddress = {
        fullName,
        email,
        phone,
        streetAddress,
        apartment,
        city,
        state,
        zipCode,
        country
      };

      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
        cardLastFour: paymentMethod === 'card' ? cardNumber.replace(/\s+/g, '').slice(-4) || '4242' : undefined,
        cardBrand: 'Visa',
        cardExp
      };

      createOrder({
        status: 'Processing',
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        tax: estimatedTax,
        total: grandTotal,
        shippingAddress: address,
        paymentDetails
      });

      setIsProcessing(false);
      setView('order-confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500 space-y-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <p>Your cart is empty. Please add parts before checking out.</p>
        <button onClick={() => setView('catalog')} className="px-6 py-2.5 bg-[#0f172a] text-white font-bold rounded-full">
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Checkout Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulated 256-Bit SSL Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            CHECKOUT
          </h1>
        </div>

        <button
          type="button"
          onClick={handleFillDemoData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
        >
          ⚡ Autofill Demo Customer
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Column (Bento Cards: Shipping Address, Shipping Method, Payment) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Shipping Address */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-slate-900">Shipping & Delivery Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Email Address (Order tracking) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address or Area"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Apt, Suite, Unit, Flat #</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">State / Province *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">PIN / Postal Code *</label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#fbbf24]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-slate-900">Shipping Delivery Speed</h2>
            </div>

            <div className="space-y-3 text-xs">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  shippingMethod === 'standard'
                    ? 'border-[#fbbf24] bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="w-4 h-4 text-slate-900 focus:ring-[#fbbf24]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Ground Standard (3-5 Business Days)</p>
                    <p className="text-slate-500 text-[11px]">Free nationwide for orders ₹1,999+</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-slate-900">
                  {cartSubtotal >= 1999 || appliedCoupon?.freeShipping ? 'FREE' : formatCurrency(199)}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  shippingMethod === 'express'
                    ? 'border-[#fbbf24] bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="w-4 h-4 text-slate-900 focus:ring-[#fbbf24]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Express Priority 2-Day Air</p>
                    <p className="text-slate-500 text-[11px]">Guaranteed dispatch within 12 hours</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-slate-900">{formatCurrency(399)}</span>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  shippingMethod === 'overnight'
                    ? 'border-[#fbbf24] bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'overnight'}
                    onChange={() => setShippingMethod('overnight')}
                    className="w-4 h-4 text-slate-900 focus:ring-[#fbbf24]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Next-Day Rush Delivery</p>
                    <p className="text-slate-500 text-[11px]">Direct courier priority delivery</p>
                  </div>
                </div>
                <span className="font-bold font-mono text-slate-900">{formatCurrency(699)}</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-bold text-slate-900">Payment Details (Simulated)</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#fbbf24] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google_pay')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'google_pay'
                    ? 'border-[#fbbf24] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#fbbf24] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#fbbf24] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Pay on Delivery</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#fbbf24]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Security CVV</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Order Summary Bento Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Review Cart ({cart.length} Parts)
            </h2>

            {/* Micro thumbnail list */}
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity} × {formatCurrency(item.product.price)}</p>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Savings</span>
                  <span className="font-mono font-bold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({shippingMethod})</span>
                <span className="font-mono font-bold text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : formatCurrency(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Total Due</span>
                <span className="font-mono text-xl text-slate-900">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              id="place-order-submit-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-[#fbbf24] hover:bg-amber-400 disabled:bg-slate-200 text-slate-950 font-bold text-sm rounded-full transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Simulating Payment Authorization...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Simulated Order ({formatCurrency(grandTotal)})</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-500">
              This is a student prototype demo. No real money or card transaction will be processed.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};
