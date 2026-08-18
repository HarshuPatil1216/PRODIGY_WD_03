import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Heart, Plus, Minus, Eye, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    cart, 
    addToCart, 
    updateCartQuantity, 
    toggleWishlist, 
    isProductInWishlist, 
    setSelectedProduct 
  } = useStore();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isProductInWishlist(product.id);

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl border border-amber-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Card Image Area */}
        <div className="relative aspect-4/3 w-full bg-amber-50 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 pointer-events-none z-10">
            {product.badges.slice(0, 2).map((badge, i) => (
              <span
                key={i}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                  badge === 'Organic'
                    ? 'bg-emerald-600 text-white'
                    : badge === 'Top Seller'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-white/90 text-slate-800 backdrop-blur-xs'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Wishlist Button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600 shadow-xs backdrop-blur-xs transition-colors cursor-pointer z-10"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>

          {/* Quick View Overlay Button */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              Quick View
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 space-y-2">
          {/* Farm Origin Subtitle */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-800/80">
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{product.farmOrigin.name}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold ml-1 text-slate-900">{product.rating}</span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Card Footer Price & Add Button */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            per {product.unit}
          </span>
        </div>

        {/* Counter or Add to Cart Button */}
        {quantityInCart > 0 ? (
          <div className="flex items-center bg-emerald-50 border border-emerald-300 rounded-xl overflow-hidden shadow-2xs">
            <button
              id={`decrease-cart-${product.id}`}
              onClick={() => updateCartQuantity(product.id, -1)}
              className="px-2.5 py-1.5 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-bold text-emerald-950 min-w-5 text-center">
              {quantityInCart}
            </span>
            <button
              id={`increase-cart-${product.id}`}
              onClick={() => updateCartQuantity(product.id, 1)}
              className="px-2.5 py-1.5 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => addToCart(product)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>
    </div>
  );
};
