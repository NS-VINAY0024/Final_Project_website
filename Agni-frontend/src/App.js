import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext'; // Import NotificationProvider

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Map from './components/layout/components/Map';
import Items from './components/layout/components/ItemsDisplay';
import AuthPages from './components/auth/AuthPages';
import About from './components/layout/components/About';
import Contact from './components/layout/components/Contact';
import Settings from './components/layout/components/settings';
import Profile from './components/layout/components/profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import ProductList from './pages/Products/productList';
import ProductDetail from './pages/Products/productDetail';
import PaymentPage from './pages/Payment/PaymentPage';
import FinalBillPage from './pages/FinalBill/FinalBillPage';

const useAuthPageCheck = () => {
  const location = useLocation();
  return (
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/reset-password'
  );
};

const App = () => {
  const isAuthPage = useAuthPageCheck();
  const location = useLocation();

  const isNotFoundPage = location.pathname !== '/' && ![
    '/login', '/items', '/map', '/about', '/contact', '/settings', '/profile', '/cart', '/products', '/products/:id', '/payment', '/final-bill', '/signup', '/forgot-password', '/reset-password'
  ].includes(location.pathname);

  return (
    <CartProvider>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col">
          {/* Render Header and Footer only if not on auth pages and not on NotFound page */}
          {!isAuthPage && !isNotFoundPage && <Header />}

          <main className="flex-grow bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<AuthPages />} />
              <Route path="/signup" element={<AuthPages />} />
              <Route path="/forgot-password" element={<AuthPages />} />
              <Route path="/reset-password" element={<AuthPages />} />

              {/* Main routes */}
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Items />} />
              <Route path="/map" element={<Map />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Profile and Settings routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

              {/* Cart and product routes */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              {/* Payment and Final Bill routes */}
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/final-bill" element={<FinalBillPage />} />

              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Render Footer only if not on auth pages and not on NotFound page */}
          {!isAuthPage && !isNotFoundPage && <Footer />}
        </div>
      </NotificationProvider>
    </CartProvider>
  );
};

export default App;
