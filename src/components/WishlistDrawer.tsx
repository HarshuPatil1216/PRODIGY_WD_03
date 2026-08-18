import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { 
    products, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    isWishlistOpen, 
    setIsWishlistOpen 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div id="wishlist-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div id="wishlist-drawer-panel" className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 bg-amber-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-xs">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Saved Wishlist</h2>
              <p className="text-xs text-slate-500 font-medium">
                {wishlistedProducts.length} saved {wishlistedProducts.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            id="close-wishlist-drawer-btn"
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-2xl">
                ❤️
              </div>
              <h3 className="font-bold text-slate-800 text-base">Your Wishlist is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Click the heart icon on any fresh produce or bakery item to save it for later.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                id={`wishlist-item-${product.id}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/40 border border-amber-200/60 shadow-2xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-amber-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs text-slate-500">
                    ${product.price.toFixed(2)} / {product.unit}
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <button
                      id={`wishlist-add-to-cart-${product.id}`}
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>

                    <button
                      id={`remove-wishlist-${product.id}`}
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
