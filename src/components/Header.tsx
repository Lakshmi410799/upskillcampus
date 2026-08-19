import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import { VehicleSelectorModal } from './VehicleSelectorModal';
import { 
  Wrench, 
  Search, 
  ShoppingCart, 
  User, 
  Car, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Package, 
  LayoutDashboard, 
  LogOut, 
  Percent
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/mockProducts';

export const Header: React.FC = () => {
  const {
    view,
    setView,
    user,
    logout,
    activeVehicle,
    cartCount,
    cartSubtotal,
    wishlist,
    products,
    openProductDetail,
    setSelectedCategory
  } = useApp();

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Search filtering
  const matchingProducts = searchInput.trim().length > 1
    ? products.filter(p => {
        const query = searchInput.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchSku = p.sku.toLowerCase().includes(query);
        const matchVehicle = p.compatibleVehicles.some(
          v => v.make.toLowerCase().includes(query) || v.model.toLowerCase().includes(query)
        );
        return matchName || matchBrand || matchCategory || matchSku || matchVehicle;
      }).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsSearchOpen(false);
      setView('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f172a] text-white shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#fbbf24] text-slate-900 text-xs font-bold py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Guaranteed Vehicle Fitment or Money Back
          </span>
          <div className="mx-auto md:mx-0 flex items-center gap-2">
            <span>⚡ Free 2-Day Shipping on orders ₹1,999+</span>
            <span className="opacity-40">|</span>
            <span>Use Code <strong className="font-black underline tracking-wider">SAVE10</strong> for 10% Off</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[11px]">
            <span>24/7 Support: 1-800-PART-WORKS</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          id="header-logo-btn"
          onClick={() => {
            setView('home');
            setSelectedCategory(null);
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden shrink-0"
        >
          <div className="w-8 h-8 bg-[#fbbf24] rounded-lg flex items-center justify-center text-[#0f172a] shadow-xs group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 font-black" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            PART<span className="text-[#fbbf24]">WORKS</span>
          </span>
        </button>

        {/* Vehicle Selector Header Pill */}
        <div className="hidden lg:block shrink-0">
          <button
            id="header-vehicle-selector-btn"
            onClick={() => setIsVehicleModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              activeVehicle
                ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 hover:bg-amber-400/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white'
            }`}
          >
            <Car className={`w-3.5 h-3.5 ${activeVehicle ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="max-w-[150px] truncate">
              {activeVehicle ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}` : 'Select Vehicle'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Bento Search Input */}
        <div ref={searchRef} className="relative flex-1 max-w-md mx-2 sm:mx-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="header-search-input"
              type="text"
              placeholder="Search parts (e.g. Brake Pads, 10W-40)..."
              value={searchInput}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsSearchOpen(true);
              }}
              className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-8 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && matchingProducts.length > 0 && (
            <div 
              id="search-autocomplete-dropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800 max-h-96 overflow-y-auto"
            >
              <div className="p-2.5 bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Auto Parts ({matchingProducts.length})</span>
                <span className="text-[#fbbf24]">Exact Fit</span>
              </div>
              {matchingProducts.map(prod => (
                <div
                  key={prod.id}
                  id={`search-item-${prod.id}`}
                  onClick={() => {
                    openProductDetail(prod.id);
                    setIsSearchOpen(false);
                    setSearchInput('');
                  }}
                  className="p-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-10 h-10 object-cover rounded-lg bg-slate-950 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#fbbf24] uppercase">{prod.brand}</span>
                      <span className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{prod.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-white">{formatCurrency(prod.price)}</p>
                  </div>
                </div>
              ))}
              <div className="p-2 bg-slate-950 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setView('catalog');
                  }}
                  className="text-xs font-semibold text-[#fbbf24] hover:underline"
                >
                  View All Search Results →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium shrink-0">
          {/* Wishlist button */}
          <button
            id="header-wishlist-btn"
            onClick={() => setView('account')}
            title="Saved Wishlist"
            className="relative cursor-pointer text-slate-300 hover:text-[#fbbf24] transition-colors hidden sm:flex items-center"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#fbbf24] text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div ref={userMenuRef} className="relative">
            <button
              id="header-user-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-[#fbbf24] transition-colors text-xs font-medium"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">{user ? user.name.split(' ')[0] : 'Account'}</span>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div 
                id="user-account-dropdown"
                className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-slate-200 divide-y divide-slate-800"
              >
                {user ? (
                  <>
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setView('account');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 text-slate-300 hover:text-white"
                      >
                        <Package className="w-4 h-4 text-[#fbbf24]" />
                        Order History
                      </button>
                      <button
                        onClick={() => {
                          setView('account');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 text-slate-300 hover:text-white"
                      >
                        <Car className="w-4 h-4 text-[#fbbf24]" />
                        My Garage ({user.savedVehicles.length})
                      </button>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setView('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 text-[#fbbf24]"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Demo Portal
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-800 flex items-center gap-2.5 text-rose-400 hover:text-rose-300"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-3 space-y-2">
                    <p className="text-xs text-slate-400 text-center">Sign in to manage your garage and orders</p>
                    <button
                      id="header-signin-btn"
                      onClick={() => {
                        setView('login');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full py-2 bg-[#fbbf24] hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl transition-colors text-center block shadow-xs cursor-pointer"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon with Counter */}
          <button
            id="header-cart-btn"
            onClick={() => setView('cart')}
            className="relative cursor-pointer text-slate-300 hover:text-[#fbbf24] transition-colors flex items-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#fbbf24] text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Secondary Nav Bar with Bento Chips */}
      <nav className="hidden lg:block bg-slate-900/90 border-t border-slate-800 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Categories dropdown */}
            <div ref={categoryMenuRef} className="relative">
              <button
                id="header-categories-dropdown-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-[#fbbf24] hover:bg-slate-800 rounded-full transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isCategoryMenuOpen && (
                <div 
                  id="categories-popup-menu"
                  className="absolute left-0 top-full mt-1 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 divide-y divide-slate-800"
                >
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setView('catalog');
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-bold text-[#fbbf24] hover:bg-slate-800 rounded-lg"
                    >
                      Browse All Categories ({products.length})
                    </button>
                  </div>
                  <div className="py-1">
                    {CATEGORIES_LIST.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedCategory(cat.name as any);
                          setView('catalog');
                          setIsCategoryMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setView('catalog');
              }}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                view === 'catalog' ? 'bg-slate-800 text-[#fbbf24]' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Parts
            </button>

            <button
              onClick={() => setView('deals')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
                view === 'deals' ? 'bg-slate-800 text-[#fbbf24]' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Percent className="w-3 h-3" />
              <span>Deals & Codes</span>
            </button>

            <button
              onClick={() => setView('affiliate')}
              className="px-3 py-1.5 text-slate-400 hover:text-slate-200 rounded-full transition-colors"
            >
              Affiliate (8%)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="header-admin-shortcut"
              onClick={() => setView('admin')}
              className="text-[11px] font-bold text-slate-900 bg-[#fbbf24] hover:bg-amber-300 px-3 py-1 rounded-full transition-colors flex items-center gap-1 shadow-xs"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="lg:hidden bg-slate-950 border-t border-slate-800 p-4 space-y-4 text-sm"
        >
          <button
            onClick={() => {
              setIsVehicleModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left"
          >
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#fbbf24]" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Vehicle Filter</p>
                <p className="text-xs font-bold text-white">
                  {activeVehicle ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}` : 'Select Vehicle'}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setView('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-semibold text-xs text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                setView('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-semibold text-xs text-left"
            >
              Catalog
            </button>
            <button
              onClick={() => {
                setView('deals');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-amber-400/10 text-amber-300 font-semibold text-xs text-left"
            >
              Deals
            </button>
            <button
              onClick={() => {
                setView('account');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-semibold text-xs text-left"
            >
              Account
            </button>
          </div>
        </div>
      )}

      <VehicleSelectorModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />
    </header>
  );
};
