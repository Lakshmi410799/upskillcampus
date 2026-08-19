import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { VehicleSelectorModal } from '../components/VehicleSelectorModal';
import { isVehicleCompatible } from '../data/mockVehicles';
import { formatCurrency } from '../utils/currency';
import { Review } from '../types';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  RotateCcw, 
  Car, 
  ChevronRight, 
  Plus, 
  Minus, 
  Zap, 
  Check, 
  Share2, 
  Wrench, 
  FileText, 
  MessageSquare,
  Sparkles,
  Lock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    activeVehicle, 
    addToCart, 
    setView, 
    setSelectedCategory, 
    isWishlisted, 
    toggleWishlist,
    showToast,
    updateProduct
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'fitment' | 'reviews' | 'install'>('specs');
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Find active product
  const product = products.find(p => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-slate-500">
        <p>Product not found.</p>
        <button onClick={() => setView('catalog')} className="mt-4 px-6 py-2.5 bg-[#0f172a] text-white font-bold rounded-full">
          Back to Catalog
        </button>
      </div>
    );
  }

  const fitsActive = isVehicleCompatible(product.compatibleVehicles, product.universalFit, activeVehicle);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeVehicle || undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeVehicle || undefined);
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle.trim() || 'Verified Purchase Review',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 0
    };

    const updatedReviews = [newReview, ...product.reviews];
    const newRating = Number(
      (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
    );

    updateProduct(product.id, {
      reviews: updatedReviews,
      rating: newRating,
      reviewCount: updatedReviews.length
    });

    setIsWriteReviewOpen(false);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    showToast('Your customer review has been submitted!');
  };

  // Related products from same category or brand
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-8">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setView('home')} className="hover:text-slate-900 transition-colors">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => {
            setSelectedCategory(product.category);
            setView('catalog');
          }} 
          className="hover:text-slate-900 transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Info Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery & Fitment Bento */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badges && product.badges.length > 0 && (
              <span className="absolute top-4 left-4 bg-[#fbbf24] text-slate-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-xs">
                {product.badges[0]}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:text-slate-900'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#fbbf24] scale-95 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Vehicle Fitment Box below images */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Vehicle Compatibility</span>
              </div>
              <button
                id="pdp-change-vehicle-btn"
                onClick={() => setIsVehicleModalOpen(true)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                {activeVehicle ? 'Change Vehicle' : 'Select Vehicle'}
              </button>
            </div>

            {product.universalFit ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-medium">
                <ShieldCheck className="w-5 h-5 shrink-0 text-sky-600" />
                <span><strong>Universal Fit Part:</strong> Compatible with all standard 12V automotive vehicle platforms.</span>
              </div>
            ) : activeVehicle ? (
              fitsActive ? (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>
                    <strong>Guaranteed Fit:</strong> Verified for your{' '}
                    <strong>{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong>.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>
                    <strong>Notice:</strong> This part does not match standard fitment for your{' '}
                    {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}.
                  </span>
                </div>
              )
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Select your vehicle to confirm 100% bolt-on compatibility.</span>
                <button
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#0f172a] text-white font-bold rounded-lg shrink-0 ml-2 text-xs"
                >
                  Verify Fit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Title, Price, Buy Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">{product.brand}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500">SKU: {product.sku}</span>
              {product.oemPartNumber && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-400">OEM: {product.oemPartNumber}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Ratings anchor */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} reviews)
              </span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Read Reviews
              </button>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-5 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              <div>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Stepper & Add to Cart Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 rounded-xl hover:bg-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-black font-mono text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 rounded-xl hover:bg-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3.5 px-6 bg-[#fbbf24] hover:bg-amber-400 disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-bold text-sm rounded-2xl transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity} to Cart ({formatCurrency(product.price * quantity)})</span>
                </button>
              </div>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#fbbf24]" />
                <span>Instant Checkout</span>
              </button>
            </div>

            {/* Guarantees mini bento list */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Free 2-Day Air (₹1,999+)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>90-Day Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Secure Simulated Pay</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Interactive Bento Tabs: Specs, Fitment, Reviews, Install */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'specs' ? 'bg-[#0f172a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('fitment')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'fitment' ? 'bg-[#0f172a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Vehicle Fitment Database ({product.compatibleVehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'bg-[#0f172a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Customer Reviews ({product.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'install' ? 'bg-[#0f172a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Installation & Warranty
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Key Features & Engineering</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Dimensional & Material Specs</h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                  <span className="font-semibold text-slate-500">Brand</span>
                  <span className="font-bold text-slate-900">{product.brand}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-semibold text-slate-500">Category</span>
                  <span className="font-bold text-slate-900">{product.category}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                  <span className="font-semibold text-slate-500">Shipping Weight</span>
                  <span className="font-bold text-slate-900">{product.weightLbs} lbs</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-semibold text-slate-500">Warranty Coverage</span>
                  <span className="font-bold text-slate-900">{product.warranty}</span>
                </div>
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className={`grid grid-cols-2 p-3 ${idx % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                    <span className="font-semibold text-slate-500">{spec.name}</span>
                    <span className="font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fitment */}
        {activeTab === 'fitment' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              {product.universalFit
                ? 'This is a universal accessory and fits most passenger vehicles, light trucks, and SUVs.'
                : 'Direct OEM fitment verified for the following production years and chassis codes:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {product.compatibleVehicles.map((v, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{v.year} {v.make} {v.model}</p>
                    {v.trim && <p className="text-slate-500 text-[11px]">{v.trim}</p>}
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Direct Fit
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Verified Driver Reviews</h3>
                <p className="text-xs text-slate-500">Average rating: {product.rating} / 5.0</p>
              </div>
              <button
                onClick={() => setIsWriteReviewOpen(true)}
                className="px-4 py-2 bg-[#0f172a] text-white hover:bg-slate-800 font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {/* Review submission modal/form */}
            {isWriteReviewOpen && (
              <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Submit Your Part Review</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Mike T.)"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value={5}>5 Stars - Outstanding Performance</option>
                    <option value={4}>4 Stars - Great Quality</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Below Expectation</option>
                    <option value={1}>1 Star - Poor Fit</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Review Headline (e.g. Perfect fit on 2022 F-150)"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Share details about installation, fitment, or performance..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#fbbf24] hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'opacity-30'}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-xs text-slate-900">{rev.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <span className="font-semibold text-slate-700">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <Check className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Install & Warranty */}
        {activeTab === 'install' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Professional Installation Recommended</h4>
              <p>Torque all lug nuts, caliper bracket bolts, or electrical terminals strictly to original manufacturer service manual specifications.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Manufacturer Warranty Details</h4>
              <p>Backed by PartWorks and manufacturer {product.warranty}. Covers material defects and normal operating failures under street driving conditions.</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Related Products Bento Showcase */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Complementary & Similar Parts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <VehicleSelectorModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />
    </div>
  );
};
