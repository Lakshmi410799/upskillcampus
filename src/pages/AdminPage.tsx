import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Category, Order } from '../types';
import { CATEGORIES_LIST } from '../data/mockProducts';
import { formatCurrency } from '../utils/currency';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Boxes, 
  ShieldCheck, 
  RotateCcw,
  Eye,
  X,
  CreditCard
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    showToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'inventory' | 'orders'>('overview');
  const [inventorySearch, setInventorySearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Brake Systems');
  const [newPrice, setNewPrice] = useState<number>(2499);
  const [newStock, setNewStock] = useState<number>(20);
  const [newSku, setNewSku] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800');

  // KPI Calculations
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const lowStockCount = products.filter(p => p.stockCount <= 5).length;

  // Chart Data: Sales per category
  const categorySalesData = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const cat = item.product.category;
        counts[cat] = (counts[cat] || 0) + item.product.price * item.quantity;
      });
    });

    const list = Object.entries(counts).map(([name, value]) => ({
      name: name.split(' ')[0], // short name
      fullName: name,
      value: Math.round(value)
    }));

    if (list.length === 0) {
      return [
        { name: 'Brakes', value: 45000 },
        { name: 'Batteries', value: 38000 },
        { name: 'Engine', value: 29000 },
        { name: 'Lighting', value: 18000 },
        { name: 'Electronics', value: 22000 }
      ];
    }
    return list;
  }, [orders]);

  // Chart Data: Revenue timeline
  const revenueChartData = useMemo(() => {
    return [
      { day: 'Mon', revenue: 42000 },
      { day: 'Tue', revenue: 68000 },
      { day: 'Wed', revenue: 95000 },
      { day: 'Thu', revenue: 81000 },
      { day: 'Fri', revenue: 124000 },
      { day: 'Sat', revenue: 156000 },
      { day: 'Sun', revenue: totalRevenue > 0 ? totalRevenue : 110000 }
    ];
  }, [totalRevenue]);

  const COLORS = ['#0f172a', '#fbbf24', '#3b82f6', '#10b981', '#8b5cf6'];

  const filteredInventory = useMemo(() => {
    if (!inventorySearch.trim()) return products;
    const q = inventorySearch.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.sku.toLowerCase().includes(q)
    );
  }, [products, inventorySearch]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBrand || !newSku) {
      alert('Please fill all required fields');
      return;
    }

    const newProd: Product = {
      id: `part-${Date.now()}`,
      name: newName,
      shortDescription: newDescription.slice(0, 80) || newName,
      brand: newBrand,
      category: newCategory,
      price: Number(newPrice),
      sku: newSku.toUpperCase(),
      description: newDescription,
      inStock: newStock > 0,
      stockCount: Number(newStock),
      rating: 5.0,
      reviewCount: 0,
      images: [newImage],
      features: ['OEM standard fitment', 'Mechanic grade durability'],
      specifications: [{ name: 'Category', value: newCategory }],
      compatibleVehicles: [],
      universalFit: true,
      warranty: '1 Year Warranty',
      weightLbs: 5.2,
      reviews: []
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    setNewName('');
    setNewBrand('');
    setNewSku('');
    setNewDescription('');
    showToast('New product added to catalog successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demo Control Center</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            MERCHANT ADMIN PORTAL
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#fbbf24]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Bento Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
            activeAdminTab === 'overview'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          Analytics & KPIs
        </button>

        <button
          onClick={() => setActiveAdminTab('inventory')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
            activeAdminTab === 'inventory'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
            activeAdminTab === 'orders'
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Orders ({orders.length})
        </button>
      </div>

      {/* Tab 1: KPI Overview & Charts */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Revenue (Demo)</span>
                <span className="font-bold text-emerald-600 font-mono text-sm">₹</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {formatCurrency(totalRevenue)}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">↑ +18.4% from last week</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Orders</span>
                <ShoppingCart className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {totalOrdersCount}
              </p>
              <p className="text-[11px] text-slate-500">100% Simulated Delivery</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Avg. Order Value</span>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {formatCurrency(avgOrderValue)}
              </p>
              <p className="text-[11px] text-slate-500">Industry benchmark: ₹10,000</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Low Stock Alerts</span>
                <AlertCircle className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {lowStockCount} Parts
              </p>
              <p className="text-[11px] text-rose-600 font-medium">Need replenishment</p>
            </div>
          </div>

          {/* Charts Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Revenue Trend Chart */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Weekly Simulated Revenue Trend (₹)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueChartData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#fbbf24" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Pie Chart */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Sales by Category</h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categorySalesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categorySalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Sales']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Inventory Management */}
      {activeAdminTab === 'inventory' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200/80 rounded-3xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products by SKU or name..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredInventory.length} of {products.length} products
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredInventory.map(prod => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={prod.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{prod.name}</p>
                          <p className="text-[11px] text-slate-500">{prod.brand}</p>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-600">{prod.sku}</td>
                      <td className="p-4 text-slate-600">{prod.category}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{formatCurrency(prod.price)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.stockCount <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prod.stockCount} in stock
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Order Fulfillment */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-900">#{o.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{o.shippingAddress.fullName}</p>
                        <p className="text-[11px] text-slate-500">{o.shippingAddress.city}, {o.shippingAddress.state}</p>
                      </td>
                      <td className="p-4">{o.items.length} parts</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{formatCurrency(o.total)}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add New Auto Part</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Part Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. StopTech High-Carbon Brake Rotors"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brembo"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">SKU Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BRK-8821"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    {CATEGORIES_LIST.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Price (₹)</label>
                  <input
                    type="number"
                    step="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Initial Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  placeholder="Key features, specifications, and fitment details..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f172a] text-white font-bold rounded-xl cursor-pointer"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
