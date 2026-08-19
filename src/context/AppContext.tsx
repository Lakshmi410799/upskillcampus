import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, UserProfile, Vehicle, Coupon, AppView, Category } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, MOCK_COUPONS } from '../data/mockProducts';
import { SAMPLE_USER_VEHICLES } from '../data/mockVehicles';
import { formatCurrency } from '../utils/currency';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  view: AppView;
  setView: (view: AppView) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  selectedCategory: Category | 'All' | null;
  setSelectedCategory: (cat: Category | 'All' | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  resetDefaultProducts: () => void;

  // Vehicle Selection
  activeVehicle: Vehicle | null;
  setActiveVehicle: (vehicle: Vehicle | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, vehicle?: Vehicle) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  lastOrder: Order | null;
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // User Auth & Profile
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  addUserVehicle: (vehicle: Vehicle) => void;
  removeUserVehicle: (index: number) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  CART: 'partworks_cart_v1',
  WISHLIST: 'partworks_wishlist_v1',
  ORDERS: 'partworks_orders_v1',
  USER: 'partworks_user_v1',
  VEHICLE: 'partworks_active_vehicle_v1',
  PRODUCTS: 'partworks_products_v1',
  ADMIN: 'partworks_admin_auth_v1',
};

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '(555) 382-9012',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  defaultAddress: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '(555) 382-9012',
    streetAddress: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'United States'
  },
  savedVehicles: SAMPLE_USER_VEHICLES,
  createdAt: '2024-09-15'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation state
  const [view, setView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products state (localStorage sync)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Active vehicle state
  const [activeVehicle, setActiveVehicleState] = useState<Vehicle | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.VEHICLE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const setActiveVehicle = (vehicle: Vehicle | null) => {
    setActiveVehicleState(vehicle);
    try {
      if (vehicle) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.VEHICLE, JSON.stringify(vehicle));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.VEHICLE);
      }
    } catch {
      // ignore
    }
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { product: INITIAL_PRODUCTS[0], quantity: 1, selectedVehicle: SAMPLE_USER_VEHICLES[0] }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-brk-01', 'prod-bat-01'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // User profile state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Admin status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Product actions
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-custom-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to inventory.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, stockCount: Math.max(0, newStock), inStock: newStock > 0 }
          : p
      )
    );
  };

  const resetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Reset product catalog to default demo data.');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, vehicle?: Vehicle) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedVehicle: vehicle || item.selectedVehicle || activeVehicle || undefined }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVehicle: vehicle || activeVehicle || undefined }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to cart!`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount Calculation
  const discountAmount = React.useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minSpend && cartSubtotal < appliedCoupon.minSpend) {
      return 0;
    }
    if (appliedCoupon.discountPercent) {
      return (cartSubtotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.discountAmount) {
      return Math.min(cartSubtotal, appliedCoupon.discountAmount);
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find(c => c.code === cleanCode);
    if (!found) {
      return { success: false, message: `Promo code "${code}" is invalid. Try "SAVE10" or "PROFIT20"` };
    }
    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Code "${found.code}" requires a minimum order of ${formatCurrency(found.minSpend)}. Current subtotal is ${formatCurrency(cartSubtotal)}.`
      };
    }
    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied: ${found.description}!`);
    return { success: true, message: `Applied ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (
    orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>
  ): Order => {
    const randomId = `PW-${Math.floor(10000 + Math.random() * 90000)}`;
    const randomTracking = `1Z${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 3);

    const fullOrder: Order = {
      ...orderData,
      id: randomId,
      date: today.toISOString().split('T')[0],
      trackingNumber: randomTracking,
      carrier: 'UPS Ground 2-Day Air',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Deduct stock
    setProducts(prev =>
      prev.map(prod => {
        const itemInOrder = orderData.items.find(i => i.product.id === prod.id);
        if (itemInOrder) {
          const updatedStock = Math.max(0, prod.stockCount - itemInOrder.quantity);
          return {
            ...prod,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return prod;
      })
    );

    setOrders(prev => [fullOrder, ...prev]);
    setLastOrder(fullOrder);
    clearCart();
    setAppliedCoupon(null);

    return fullOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} marked as ${status}.`);
  };

  // User Auth
  const login = (email: string, name?: string) => {
    const demoName = name || (email.includes('@') ? email.split('@')[0] : 'Demo Driver');
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: demoName.charAt(0).toUpperCase() + demoName.slice(1),
      email,
      phone: '(555) 234-5678',
      savedVehicles: user?.savedVehicles.length ? user.savedVehicles : SAMPLE_USER_VEHICLES,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const signup = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: '',
      savedVehicles: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    showToast(`Account created! Welcome to PartWorks, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out.', 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
    showToast('Profile settings saved successfully.');
  };

  const addUserVehicle = (vehicle: Vehicle) => {
    if (!user) {
      // Save to active vehicle even if guest
      setActiveVehicle(vehicle);
      showToast(`Vehicle set to ${vehicle.year} ${vehicle.make} ${vehicle.model}`);
      return;
    }
    const updatedVehicles = [...user.savedVehicles, vehicle];
    setUser({ ...user, savedVehicles: updatedVehicles });
    setActiveVehicle(vehicle);
    showToast(`Added ${vehicle.year} ${vehicle.make} ${vehicle.model} to My Garage!`);
  };

  const removeUserVehicle = (index: number) => {
    if (!user) return;
    const updated = user.savedVehicles.filter((_, i) => i !== index);
    setUser({ ...user, savedVehicles: updated });
    showToast('Vehicle removed from garage.', 'info');
  };

  // Admin Auth
  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN, 'true');
    showToast('Admin mode unlocked.');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN);
    showToast('Logged out of Admin Portal.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        selectedProductId,
        openProductDetail,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetDefaultProducts,
        activeVehicle,
        setActiveVehicle,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        lastOrder,
        createOrder,
        updateOrderStatus,
        user,
        login,
        signup,
        logout,
        updateUserProfile,
        addUserVehicle,
        removeUserVehicle,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
