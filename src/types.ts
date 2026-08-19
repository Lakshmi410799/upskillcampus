export type Category = 
  | 'Brake Pads'
  | 'Batteries'
  | 'Tires & Wheels'
  | 'Engine Parts'
  | 'Lights & Bulbs'
  | 'Electronics & Audio'
  | 'Tools & Garage'
  | 'Accessories & Care';

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  trim?: string;
  engine?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockCount: number;
  inStock: boolean;
  images: string[];
  badges?: string[];
  description: string;
  shortDescription: string;
  universalFit: boolean;
  compatibleVehicles: Vehicle[];
  specifications: ProductSpec[];
  features: string[];
  reviews: Review[];
  warranty: string;
  weightLbs: number;
  oemPartNumber?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVehicle?: Vehicle;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay' | 'cod';
  cardLastFour?: string;
  cardBrand?: string;
  cardExp?: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  defaultAddress?: ShippingAddress;
  savedVehicles: Vehicle[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  freeShipping?: boolean;
}

export type AppView = 
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'admin'
  | 'auth'
  | 'login'
  | 'deals'
  | 'affiliate';
