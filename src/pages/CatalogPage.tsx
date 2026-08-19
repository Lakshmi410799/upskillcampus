import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { VehicleSelectorModal } from '../components/VehicleSelectorModal';
import { isVehicleCompatible } from '../data/mockVehicles';
import { CATEGORIES_LIST } from '../data/mockProducts';
import { formatCurrency } from '../utils/currency';
import { Category, Product } from '../types';
import { 
  Filter, 
  Car, 
  CheckCircle2, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  ChevronDown,
  Star
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    products, 
    activeVehicle, 
    setActiveVehicle, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(true);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'reviews'>('featured');

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach(p => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (product.category !== selectedCategory) return false;
      }

      // Vehicle compatibility filter
      if (activeVehicle && onlyCompatible) {
        const fits = isVehicleCompatible(product.compatibleVehicles, product.universalFit, activeVehicle);
        if (!fits) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchSku && !matchCat) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) return false;
      }

      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [products, selectedCategory, activeVehicle, onlyCompatible, searchQuery, selectedBrands, onlyInStock, priceRange, minRating]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'featured':
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setSearchQuery('');
    setOnlyInStock(false);
    setMinRating(0);
    setPriceRange([0, 600]);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    (selectedCategory && selectedCategory !== 'All') ||
    selectedBrands.length > 0 ||
    searchQuery !== '' ||
    onlyInStock ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 600;

  return (
    <div className="space-y-6">
      
      {/* 1. Vehicle Fitment Bento Banner */}
      <div className="rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white shadow-xs border border-slate-200/80">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl shrink-0 ${activeVehicle ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {activeVehicle ? 'Vehicle Fitment Filter' : 'Select Vehicle'}
              </span>
              {activeVehicle && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Exact Fitment Guaranteed
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {activeVehicle
                ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} ${activeVehicle.trim || ''}`
                : 'No vehicle selected — Choose your car for guaranteed compatibility'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {activeVehicle ? (
            <>
              <button
                id="catalog-change-vehicle-btn"
                onClick={() => setIsVehicleModalOpen(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Change Vehicle
              </button>
              <button
                id="catalog-clear-vehicle-btn"
                onClick={() => setActiveVehicle(null)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Clear vehicle filter"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              id="catalog-select-vehicle-btn"
              onClick={() => setIsVehicleModalOpen(true)}
              className="w-full md:w-auto px-5 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Car className="w-4 h-4 text-[#fbbf24]" />
              <span>Select Your Vehicle</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Category Bento Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            !selectedCategory || selectedCategory === 'All'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          All Parts ({products.length})
        </button>
        {CATEGORIES_LIST.map(cat => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name as Category)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0f172a] text-[#fbbf24] shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Catalog Layout: Bento Filter Sidebar + Bento Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-slate-900 text-sm">Filter Catalog</h3>
            </div>
            {hasActiveFilters && (
              <button
                id="reset-filters-btn"
                onClick={handleResetFilters}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Vehicle Fitment Switch */}
          {activeVehicle && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-300 bg-white text-slate-900 focus:ring-[#fbbf24]"
                />
                <span>Only show parts that fit my {activeVehicle.model}</span>
              </label>
            </div>
          )}

          {/* Quick Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24]"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-slate-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">Price Range</span>
              <span className="text-slate-900 font-mono font-black">{formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}</span>
            </div>
            <input
              type="range"
              min={0}
              max={30000}
              step={500}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-slate-900 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>₹0</span>
              <span>₹15,000</span>
              <span>₹30,000+</span>
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Brands ({allBrands.length})
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 rounded-sm border-slate-300 bg-slate-50 text-slate-900 focus:ring-[#fbbf24]"
                  />
                  <span className="truncate font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Availability</label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900 font-medium">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-3.5 h-3.5 rounded-sm border-slate-300 bg-slate-50 text-slate-900 focus:ring-[#fbbf24]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Customer Rating</label>
            <div className="space-y-1 text-xs">
              {[4.8, 4.5, 4.0].map(ratingVal => (
                <button
                  key={ratingVal}
                  type="button"
                  onClick={() => setMinRating(minRating === ratingVal ? 0 : ratingVal)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    minRating === ratingVal ? 'bg-amber-50 text-slate-900 font-bold border border-amber-200' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{ratingVal}+ Stars</span>
                  </div>
                  {minRating === ratingVal && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* Header Controls Bar */}
          <div className="bg-white border border-slate-200/80 p-4 rounded-3xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <p className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900 font-bold">{sortedProducts.length}</strong> auto parts
                {selectedCategory && selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-2.5 py-1.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#fbbf24]"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="reviews">Most Popular (Reviews)</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl">
                <button
                  id="view-grid-btn"
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layout === 'grid' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  id="view-list-btn"
                  onClick={() => setLayout('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layout === 'list' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-medium">Active:</span>
              {selectedCategory && selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-800 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 text-slate-400 hover:text-slate-700" /></button>
                </span>
              )}
              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1 bg-white text-slate-800 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                  {b}
                  <button onClick={() => toggleBrand(b)}><X className="w-3 h-3 text-slate-400 hover:text-slate-700" /></button>
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-800 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 text-slate-400 hover:text-slate-700" /></button>
                </span>
              )}
              {onlyInStock && (
                <span className="inline-flex items-center gap-1 bg-white text-slate-800 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                  In Stock Only
                  <button onClick={() => setOnlyInStock(false)}><X className="w-3 h-3 text-slate-400 hover:text-slate-700" /></button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-blue-600 hover:underline font-bold text-xs ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products List or Empty State */}
          {sortedProducts.length > 0 ? (
            <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} layout={layout} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-4 shadow-xs">
              <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No parts matched your exact filters</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {activeVehicle
                  ? `No parts in this category matched ${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}. Try adjusting price, brands, or turning off the strict vehicle filter.`
                  : 'Try adjusting your search query, price range, or category filter.'}
              </p>
              <button
                id="empty-reset-filters-btn"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      <VehicleSelectorModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />
    </div>
  );
};
