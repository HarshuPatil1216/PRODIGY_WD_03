import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    addToast 
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
  const [appliedPromoName, setAppliedPromoName] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 25;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = subtotal >= freeDeliveryThreshold || cart.length === 0 ? 0 : 2.99;
  
  const discountAmount = Number((subtotal * appliedDiscountRate).toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + deliveryFee + tax - discountAmount).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');

    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'LOCAL15') {
      setAppliedDiscountRate(0.15);
      setAppliedPromoName('LOCAL15 (15% OFF)');
      addToast('Applied 15% discount code!', 'success');
    } else if (cleanCode === 'FRESH20') {
      setAppliedDiscountRate(0.20);
      setAppliedPromoName('FRESH20 (20% OFF)');
      addToast('Applied 20% discount code!', 'success');
    } else {
      setPromoError('Invalid code. Try LOCAL15 for 15% off.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscountRate(0);
    setAppliedPromoName('');
    setPromoCode('');
    addToast('Promo code removed', 'info');
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Content */}
      <div id="cart-drawer-panel" className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 bg-amber-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Your Fresh Basket</h2>
              <p className="text-xs text-slate-500 font-medium">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-amber-100/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-emerald-900 text-emerald-100 p-3 text-xs font-medium space-y-1">
          {amountNeededForFreeDelivery > 0 ? (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-300" />
                Add <strong className="text-amber-300">${amountNeededForFreeDelivery.toFixed(2)}</strong> more for <strong>FREE Delivery</strong>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You qualify for FREE Express Delivery!</span>
            </div>
          )}
          <div className="w-full bg-emerald-950 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                🧺
              </div>
              <h3 className="font-bold text-slate-800 text-base">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Browse our fresh produce, bakery goods, and artisan crafts to add items.
              </p>
              <button
                id="empty-cart-browse-btn"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                id={`cart-item-${product.id}`}
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

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-white border border-amber-200 rounded-lg overflow-hidden shadow-2xs">
                      <button
                        id={`cart-qty-decrease-${product.id}`}
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="px-2 py-1 text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">{quantity}</span>
                      <button
                        id={`cart-qty-increase-${product.id}`}
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="px-2 py-1 text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-slate-900 text-sm">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  id={`remove-cart-item-${product.id}`}
                  onClick={() => removeFromCart(product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-amber-200 bg-amber-50/60 space-y-3.5">
            {/* Promo Code Input */}
            <div className="space-y-1">
              {!appliedPromoName ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="promo-code-input"
                      type="text"
                      placeholder="Promo code (e.g. LOCAL15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                  <button
                    id="apply-promo-btn"
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3.5 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-emerald-100/80 border border-emerald-300 rounded-xl text-xs">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    {appliedPromoName}
                  </span>
                  <button
                    id="remove-promo-btn"
                    onClick={handleRemovePromo}
                    className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {promoError}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Delivery Fee</span>
                <span className="font-bold text-slate-900">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-amber-200">
                <span>Total Amount</span>
                <span className="text-emerald-700">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                id="clear-cart-btn"
                onClick={clearCart}
                className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Clear entire cart"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <button
                id="proceed-to-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm transition-all active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
