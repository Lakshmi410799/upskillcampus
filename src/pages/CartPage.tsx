import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  CheckCircle2, 
  X, 
  Car,
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    discountAmount, 
    setView,
    openProductDetail,
    setSelectedCategory
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 1999;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.freeShipping ? 0 : 199;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.18; // 18% GST standard in India
  const grandTotal = Math.max(0, taxableAmount + shippingFee + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyCoupon(promoInput.trim());
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    setPromoError('');
    const res = applyCoupon(code);
    if (!res.success) {
      setPromoError(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-3xl flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">YOUR SHOPPING CART IS EMPTY</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Looks like you haven't added any automotive parts or tools yet. Browse our catalog with guaranteed fitment.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <button
            id="empty-cart-shop-btn"
            onClick={() => {
              setSelectedCategory(null);
              setView('catalog');
            }}
            className="px-8 py-3 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-full transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse Auto Parts</span>
            <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">SHOPPING CART</h1>
          <p className="text-xs text-slate-500">Review your order before proceeding to simulated checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Free Shipping Progress Bento Card */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/80 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="font-bold text-emerald-700">🎉 You unlocked FREE 2-Day Air Shipping!</span>
            ) : (
              <span className="text-slate-700 font-medium">
                Add <strong className="text-slate-900 font-mono font-bold">{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Standard Shipping!</strong>
              </span>
            )}
          </div>
          <span className="font-mono text-slate-500 text-[11px]">Threshold: ₹1,999.00</span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              progressToFreeShipping >= 100 ? 'bg-emerald-500' : 'bg-[#fbbf24]'
            }`}
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Cart Grid: Items List (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Items Bento Card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-slate-100 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-hidden">
            {cart.map(item => {
              const itemTotal = item.product.price * item.quantity;

              return (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => openProductDetail(item.product.id)}
                      className="w-20 h-20 object-cover rounded-2xl bg-slate-100 shrink-0 cursor-pointer border border-slate-200 hover:opacity-85 transition-opacity"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-amber-600 uppercase">{item.product.brand}</span>
                        <span className="text-[10px] text-slate-400 font-mono">SKU: {item.product.sku}</span>
                      </div>
                      <h3
                        onClick={() => openProductDetail(item.product.id)}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      {item.selectedVehicle && (
                        <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <Car className="w-3 h-3" />
                          <span>Fits {item.selectedVehicle.year} {item.selectedVehicle.make} {item.selectedVehicle.model}</span>
                        </p>
                      )}
                      <p className="text-xs font-mono font-bold text-slate-700">
                        {formatCurrency(item.product.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-slate-900 text-xs px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price & Delete */}
                    <div className="text-right min-w-[80px]">
                      <p className="text-base font-black text-slate-900 font-mono">{formatCurrency(itemTotal)}</p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-rose-600 hover:underline transition-colors mt-0.5 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Shopping button */}
          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setView('catalog');
              }}
              className="text-xs font-bold text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              ← Continue Shopping Catalog
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Coupon Application */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Promo Code / Gift Card
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-800">{appliedCoupon.code}</p>
                      <p className="text-[10px] text-slate-500">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SAVE10"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 uppercase placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24] font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-rose-600">{promoError}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <span>Try:</span>
                    <button type="button" onClick={() => handleQuickCoupon('SAVE10')} className="text-blue-600 underline font-mono cursor-pointer">SAVE10</button>
                    <span>•</span>
                    <button type="button" onClick={() => handleQuickCoupon('GEAR500')} className="text-blue-600 underline font-mono cursor-pointer">GEAR500</button>
                  </div>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Savings ({appliedCoupon?.code})</span>
                  <span className="font-mono font-bold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono font-bold text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatCurrency(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST Tax (18%)</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Total Amount</span>
                <span className="font-mono text-xl text-slate-900">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              id="proceed-to-checkout-btn"
              onClick={() => {
                setView('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-6 bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Trust Assurance */}
            <div className="space-y-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Fitment Guaranteed on verified vehicles</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>90-Day Free return policy with zero restocking fees</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
