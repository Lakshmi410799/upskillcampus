import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { isVehicleCompatible } from '../data/mockVehicles';
import { formatCurrency } from '../utils/currency';
import { Star, ShoppingCart, Heart, CheckCircle2, AlertTriangle, ShieldCheck, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { openProductDetail, addToCart, activeVehicle, isWishlisted, toggleWishlist } = useApp();
  const [isAdding, setIsAdding] = useState(false);

  const fitsActive = isVehicleCompatible(product.compatibleVehicles, product.universalFit, activeVehicle);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, activeVehicle || undefined);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (layout === 'list') {
    return (
      <div
        id={`product-card-${product.id}`}
        onClick={() => openProductDetail(product.id)}
        className="group relative flex flex-col md:flex-row items-stretch bg-white border border-slate-200/80 hover:border-slate-300 rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full md:w-56 h-48 bg-slate-100 rounded-2xl shrink-0 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badges && product.badges.length > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#fbbf24] text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
              {product.badges[0]}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
              wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">{product.brand}</span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-xs text-slate-500">{product.category}</span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>

            {/* Fitment Indicator */}
            {activeVehicle && (
              <div className="mt-2.5">
                {product.universalFit ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-xl">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Universal Fit
                  </span>
                ) : fitsActive ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Guaranteed fit for {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    May not fit {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount})</span>
              </div>

              <button
                id={`add-to-cart-${product.id}`}
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all active:scale-95 disabled:opacity-50"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#fbbf24]" />
                {isAdding ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => openProductDetail(product.id)}
      className="group relative flex flex-col justify-between bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 rounded-2xl mb-3.5 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.inStock ? (
            <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
              IN STOCK
            </span>
          ) : (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
              OUT OF STOCK
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#fbbf24] text-slate-900 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
            wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Stock warning */}
        {product.stockCount <= 5 && product.stockCount > 0 && (
          <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-md">
            Only {product.stockCount} left
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & SKU */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-amber-600 tracking-wider uppercase">{product.brand}</span>
            <span className="text-slate-400 font-mono text-[10px]">{product.sku}</span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {product.name}
          </h4>

          {/* Short specs / category */}
          <p className="text-xs text-slate-500 mb-2.5 line-clamp-1">{product.shortDescription || product.category}</p>

          {/* Fitment Indicator */}
          {activeVehicle ? (
            <div className="mb-3">
              {product.universalFit ? (
                <div className="flex items-center gap-1 text-[11px] text-sky-700 bg-sky-50 border border-sky-200 px-2 py-1 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Universal Fit</span>
                </div>
              ) : fitsActive ? (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Fits Your Vehicle</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Check Compatibility</span>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-1 text-[11px] text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>{product.universalFit ? 'Universal Application' : 'Vehicle Specific'}</span>
            </div>
          )}
        </div>

        {/* Pricing & Quick Add Button */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-slate-900">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through ml-1.5">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <button
            id={`add-to-cart-grid-${product.id}`}
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="bg-slate-100 hover:bg-[#fbbf24] text-slate-900 p-2.5 rounded-xl transition-colors cursor-pointer group-hover:bg-[#fbbf24]"
            title="Add to Cart"
          >
            {isAdding ? (
              <Check className="w-4 h-4 text-emerald-700 font-bold" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
