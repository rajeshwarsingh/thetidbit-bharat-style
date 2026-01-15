import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, Grid, List } from 'lucide-react';
import SEO from './SEO';
import ProductCard from './ProductCard';
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, PRODUCT } from '../constants';

const AllProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS.length > 1 ? ALL_PRODUCTS : [PRODUCT];

    // Filter by category
    if (categoryFilter !== 'all') {
      products = products.filter(p => 
        p.category.some(c => c.toLowerCase().includes(categoryFilter.replace('-', ' ')))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.category.some(c => c.toLowerCase().includes(query))
      );
    }

    return products;
  }, [categoryFilter, searchQuery]);

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
    setShowFilters(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('search', e.target.value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  return (
    <>
      <SEO 
        title="All Products - TheTidbit Handmade Jute Bags"
        description="Browse our complete collection of handmade jute bags. Sling bags, rounded sling bags, and handbags. Eco-friendly, sustainable fashion. Free delivery across India."
        canonicalUrl="https://bharat.style/products"
        type="website"
      />

      <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  All Products
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 pl-10 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Filter Button (Mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center gap-2"
                >
                  <Filter size={18} />
                  Filters
                </button>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex gap-2 border border-stone-300 dark:border-stone-700 rounded-xl p-1 bg-white dark:bg-stone-800">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 sticky top-24">
                <h2 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                  Categories
                </h2>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      categoryFilter === 'all'
                        ? 'bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-green/80 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}
                  >
                    All Products
                  </button>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        categoryFilter === category.slug
                          ? 'bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-green/80 font-semibold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filter Overlay */}
            {showFilters && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-stone-900 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-stone-900 dark:text-stone-100">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-stone-600 dark:text-stone-400"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        categoryFilter === 'all'
                          ? 'bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-green/80 font-semibold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      All Products
                    </button>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          categoryFilter === category.slug
                            ? 'bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-green/80 font-semibold'
                            : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <main className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-stone-600 dark:text-stone-400 mb-4">
                    No products found
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-brand-green dark:text-brand-green/80 font-semibold hover:underline"
                  >
                    View all products
                  </Link>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-6'
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showTag />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
