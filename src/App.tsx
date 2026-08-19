import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { DealsPage } from './pages/DealsPage';
import { AffiliatePage } from './pages/AffiliatePage';
import { LoginPage } from './pages/LoginPage';

const MainContent: React.FC = () => {
  const { view } = useApp();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      {view === 'home' && <HomePage />}
      {view === 'catalog' && <CatalogPage />}
      {view === 'product-detail' && <ProductDetailPage />}
      {view === 'cart' && <CartPage />}
      {view === 'checkout' && <CheckoutPage />}
      {view === 'order-confirmation' && <OrderConfirmationPage />}
      {view === 'account' && <AccountPage />}
      {view === 'admin' && <AdminPage />}
      {view === 'deals' && <DealsPage />}
      {view === 'affiliate' && <AffiliatePage />}
      {(view === 'login' || view === 'auth') && <LoginPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#f1f5f9] text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
        <Header />
        <MainContent />
        <Footer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
