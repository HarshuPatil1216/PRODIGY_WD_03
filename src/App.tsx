import React, { useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SupportChat } from './components/SupportChat';
import { ToastContainer } from './components/ToastContainer';
import { ArrowUpDown, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const MainContent: React.FC = () => {
  const { products, filters, setFilters, resetFilters } = useStore();

  // Filter & Sort products dynamically
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (filters.category !== 'All' && product.category !== filters.category) {
          return false;
        }

        // Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchFarm = product.farmOrigin.name.toLowerCase().includes(q);
          const matchDescription = product.description.toLowerCase().includes(q);
          const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));

          if (!matchName && !matchCategory && !matchFarm && !matchDescription && !matchTags) {
            return false;
          }
        }

        // Price Range
        if (product.price > filters.priceRange[1]) {
          return false;
        }

        // In Stock
        if (filters.inStockOnly && !product.inStock) {
          return false;
        }

        // Farm Origin
        if (filters.selectedFarm !== 'All' && product.farmOrigin.name !== filters.selectedFarm) {
          return false;
        }

        // Selected Tags
        if (
          filters.selectedTags.length > 0 &&
          !filters.selectedTags.every((tag) => product.tags.includes(tag))
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return b.reviewCount - a.reviewCount;
        return 0; // featured default
      });
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      <Header />
      <CategoryNav />

      <main className="flex-1 max-w-7xl w-full mx-auto pb-16">
        <HeroBanner />

        {/* Catalog Container */}
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start mt-4">
          <FilterSidebar />

          {/* Product Grid Area */}
          <div className="flex-1 w-full space-y-4">
            {/* Toolbar: Counter & Sorting */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <span>Showing <strong className="text-emerald-700">{filteredProducts.length}</strong> fresh local items</span>
                {filters.category !== 'All' && (
                  <span className="bg-amber-100 text-slate-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    in {filters.category}
                  </span>
                )}
              </div>

              {/* Sorting Selection */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
                <select
                  id="catalog-sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any
                    }))
                  }
                  className="bg-amber-50/80 border border-amber-200/80 text-xs font-bold text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                >
                  <option value="featured">Featured Local Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-amber-200/80 p-12 text-center space-y-3">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="font-bold text-slate-800 text-lg">No matching products found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your price range, clearing tag filters, or searching for broader terms like "produce" or "honey".
                </p>
                <button
                  id="no-results-reset-btn"
                  onClick={resetFilters}
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <WishlistDrawer />
      <SupportChat />
      <ToastContainer />

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100/80 border-t border-emerald-900 mt-12 py-10 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span>🌿</span>
              <span>Neighborhood Fresh Market</span>
            </div>
            <p className="text-emerald-200/70 leading-relaxed">
              Your hyperlocal market connecting urban households with local organic farms, artisan bakeries, and craft studios within 20 miles.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 text-sm">Express Operating Hours</h4>
            <p className="text-emerald-200/80">Monday - Sunday: 7:00 AM - 9:00 PM</p>
            <p className="text-emerald-200/80">Express Delivery: 45 Mins Average</p>
            <p className="text-amber-400 font-semibold mt-1">Sector 14 Central Hub</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 text-sm">Customer Quality Guarantee</h4>
            <ul className="space-y-1">
              <li>• 100% Organic & Non-GMO Standards</li>
              <li>• Zero Preservative Bakery Goods</li>
              <li>• Glass Bottle Return Program ($0.50 Credit)</li>
              <li>• Instant 2-Hour Refund Guarantee</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 text-sm">Support & Contact</h4>
            <p className="text-emerald-200/80">Direct Line: +1 (555) 019-FRESH</p>
            <p className="text-emerald-200/80">Support: hello@neighborhoodfresh.market</p>
            <div className="mt-2 inline-block bg-emerald-900 border border-emerald-800 text-amber-300 px-3 py-1 rounded-lg font-mono">
              Market ID: #NF-LOC-2026
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/60">
          <p>© 2026 Neighborhood Fresh & Local Market. All rights reserved.</p>
          <p>Handcrafted for local community sustainability & fresh living.</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
