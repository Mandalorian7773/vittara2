import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import ProductsPage from './components/ProductsPage';

const page = () => {
  return (
    <main className="min-h-screen bg-black antialiased">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <ProductsPage />
    </main>
  )
}

export default page
