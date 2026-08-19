import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleSelectorModal } from '../components/VehicleSelectorModal';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../utils/currency';
import { 
  User, 
  Package, 
  Car, 
  Heart, 
  MapPin, 
  CreditCard, 
  LogOut, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { 
    user, 
    orders, 
    products, 
    wishlist, 
    activeVehicle, 
    setActiveVehicle, 
    removeUserVehicle, 
    logout, 
    login, 
    setView,
    openProductDetail,
    addToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'garage' | 'wishlist' | 'address'>('orders');
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Wishlist products
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // If not logged in, show simple quick login
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-900 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-slate-900">CUSTOMER ACCOUNT LOGIN</h2>
          <p className="text-xs text-slate-500">Sign in to manage your garage, view order tracking, and save parts</p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setView('login')}
            className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-full transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Sign In / Create Account</span>
            <ExternalLink className="w-4 h-4 text-[#fbbf24]" />
          </button>
          <button
            onClick={() => login('aarav.sharma@example.com', 'Aarav Sharma')}
            className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-xs rounded-full transition-all cursor-pointer"
          >
            Quick 1-Click Demo Login (Aarav Sharma)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* User Header Profile Bento Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#fbbf24] text-slate-950 font-black text-2xl flex items-center justify-center shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold uppercase">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email} • {user.savedVehicles.length} Vehicles in Garage</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Add Vehicle to Garage</span>
          </button>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Account Bento Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('garage')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'garage'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>My Garage ({user.savedVehicles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('address')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'address'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Addresses & Preferences</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3 shadow-xs">
              <Package className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">No orders placed yet</h3>
              <p className="text-xs text-slate-500">Your simulated completed orders will show up here with tracking numbers.</p>
              <button
                onClick={() => setView('catalog')}
                className="px-5 py-2 bg-[#0f172a] text-white font-bold text-xs rounded-full cursor-pointer"
              >
                Shop Catalog
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">Order #{order.id}</span>
                    <span className="text-slate-400 ml-2 font-mono">{order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                      {order.status}
                    </span>
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.items.map(item => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} • {item.product.brand}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500">
                  <span>Tracking: <strong className="font-mono text-slate-800">{order.trackingNumber}</strong></span>
                  <span className="text-emerald-700 font-medium">Delivering to {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Garage */}
      {activeTab === 'garage' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Vehicles in Your Garage</h3>
              <p className="text-xs text-slate-500">Switch active vehicle to automatically filter for exact fitment</p>
            </div>
            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className="px-4 py-2 bg-[#0f172a] text-white hover:bg-slate-800 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Add Vehicle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.savedVehicles.map(v => {
              const isActive = activeVehicle?.year === v.year && activeVehicle?.make === v.make && activeVehicle?.model === v.model;

              return (
                <div
                  key={`${v.year}-${v.make}-${v.model}`}
                  className={`p-6 rounded-3xl border-2 transition-all shadow-xs flex flex-col justify-between space-y-4 bg-white ${
                    isActive ? 'border-[#fbbf24]' : 'border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl ${isActive ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        <Car className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{v.year} {v.make} {v.model}</h4>
                        {v.trim && <p className="text-slate-500 text-xs">{v.trim}</p>}
                        {isActive && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                            Active Filtering Car
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeUserVehicle(v)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove from garage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {!isActive && (
                      <button
                        onClick={() => setActiveVehicle(v)}
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Set as Active
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setActiveVehicle(v);
                        setView('catalog');
                      }}
                      className="flex-1 py-2 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Shop Parts for This
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Saved Wishlist Parts ({wishlist.length})</h3>
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3 shadow-xs">
              <Heart className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500">Click the heart icon on any part to save it here for later.</p>
              <button
                onClick={() => setView('catalog')}
                className="px-5 py-2 bg-[#0f172a] text-white font-bold text-xs rounded-full cursor-pointer"
              >
                Explore Parts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlistedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Addresses */}
      {activeTab === 'address' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-xs max-w-xl">
          <h3 className="text-base font-bold text-slate-900">Primary Delivery Address</h3>
          {user.defaultAddress ? (
            <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900">{user.defaultAddress.fullName}</p>
              <p>{user.defaultAddress.streetAddress}</p>
              {user.defaultAddress.apartment && <p>{user.defaultAddress.apartment}</p>}
              <p>{user.defaultAddress.city}, {user.defaultAddress.state} {user.defaultAddress.zipCode}</p>
              <p className="text-slate-500 pt-1">{user.defaultAddress.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No default address saved yet. It will be remembered on your next checkout.</p>
          )}
        </div>
      )}

      <VehicleSelectorModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />
    </div>
  );
};
