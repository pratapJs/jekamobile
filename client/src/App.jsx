import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AccessibilityWidget from './components/AccessibilityWidget';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AccessibilityWidget />
      <div className="flex flex-col min-h-screen bg-light font-sans text-slate-800">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />


            <Route path="/admin-portal" element={<Login />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
