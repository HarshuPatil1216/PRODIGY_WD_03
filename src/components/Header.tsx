import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Truck, 
  Search, 
  X, 
  HelpCircle, 
  SlidersHorizontal,
  MapPin,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    orders, 
    filters, 
    setFilters, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsOrderTrackerOpen,
    setIsSupportOpen,
    setIsFilterSidebarOpen
  } = useStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const activeOrder = orders.length > 0 ? orders[0] : null;

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      {/* Top Banner Notice */}
      <div id="top-announcement-bar" className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>🌱 Express 45-Min Local Delivery | Use code <strong className="text-amber-300 font-bold underline">LOCAL15</strong> for 15% OFF orders over $25</span>
        <span className="hidden md:inline-block opacity-75">| Sourced within 20 miles</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            id="mobile-filter-trigger"
            onClick={() => setIsFilterSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/80 transition-colors cursor-pointer"
            aria-label="Open Filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          <a id="brand-logo-link" href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold">🌿</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                Neighborhood <span className="text-emerald-600">Fresh</span>
              </span>
              <span className="text-[11px] font-medium text-emerald-800/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-600" /> Sector 14 Market • 45m Express
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search organic strawberries, sourdough, raw honey..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-white border border-amber-200 rounded-full pl-10 pr-9 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
          />
          {filters.searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Order Tracker Link */}
          <button
            id="order-tracker-trigger"
            onClick={() => setIsOrderTrackerOpen(true)}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:bg-amber-100/80 hover:text-emerald-700 transition-colors flex items-center gap-2 font-medium text-sm cursor-pointer"
            title="Track Your Order"
          >
            <div className="relative">
              <Truck className="w-5 h-5" />
              {activeOrder && activeOrder.status !== 'Delivered' && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
              )}
            </div>
            <span className="hidden lg:inline">Track Order</span>
            {orders.length > 0 && (
              <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                {orders.length}
              </span>
            )}
          </button>

          {/* Wishlist Link */}
          <button
            id="wishlist-trigger"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:bg-amber-100/80 hover:text-rose-600 transition-colors flex items-center gap-2 font-medium text-sm cursor-pointer"
            title="View Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            <span className="hidden lg:inline">Saved</span>
            {wishlist.length > 0 && (
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Help & Support */}
          <button
            id="support-chat-trigger"
            onClick={() => setIsSupportOpen(true)}
            className="p-2 rounded-xl text-slate-700 hover:bg-amber-100/80 transition-colors cursor-pointer hidden sm:flex items-center gap-1 text-sm font-medium"
            title="Store Support & FAQ"
          >
            <HelpCircle className="w-5 h-5 text-slate-600" />
            <span className="hidden xl:inline">Help</span>
          </button>

          {/* Cart Drawer Button */}
          <button
            id="cart-drawer-trigger"
            onClick={() => setIsCartOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3.5 py-2 rounded-xl shadow-sm shadow-emerald-600/20 flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer ml-1"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-600 shadow-xs">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-sm hidden sm:inline">
              ${cartSubtotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="mobile-search-input"
            type="text"
            placeholder="Search produce, bakery, honey..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-white border border-amber-200 rounded-full pl-10 pr-9 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shadow-xs"
          />
          {filters.searchQuery && (
            <button
              id="clear-mobile-search"
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
