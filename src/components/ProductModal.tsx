import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Star, 
  Heart, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  ShoppingBag,
  Send,
  Leaf
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isProductInWishlist, 
    addProductReview 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalQty, setModalQty] = useState(1);
  
  // Review form state
  const [newRating, setNewRating] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!selectedProduct) return null;

  const isWishlisted = isProductInWishlist(selectedProduct.id);
  const activeImage = selectedProduct.galleryImages[activeImageIndex] || selectedProduct.image;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    addProductReview(selectedProduct.id, {
      author: authorName,
      rating: newRating,
      comment: reviewComment
    });

    setAuthorName('');
    setReviewComment('');
    setNewRating(5);
  };

  return (
    <div id="product-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      <div id="product-modal-card" className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row my-auto">
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column - Gallery */}
        <div className="w-full md:w-1/2 bg-amber-50/50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-200/60">
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-amber-200/50">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {selectedProduct.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {selectedProduct.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProduct.galleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    id={`thumb-btn-${i}`}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === i
                        ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Farm Origin Story Box */}
          <div className="mt-6 bg-emerald-900/5 border border-emerald-800/15 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Direct Farm Source</span>
            </div>
            <p className="font-semibold text-slate-800">{selectedProduct.farmOrigin.name}</p>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 font-medium pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {selectedProduct.farmOrigin.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {selectedProduct.farmOrigin.harvestTime}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed italic pt-1">
              "{selectedProduct.farmOrigin.story}"
            </p>
          </div>
        </div>

        {/* Right Column - Info, Actions & Reviews */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-6 max-h-[85vh] md:max-h-none">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                {selectedProduct.category}
              </span>
              <button
                id="modal-wishlist-toggle"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="p-2 text-slate-500 hover:text-rose-600 rounded-full transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              {selectedProduct.name}
            </h2>

            {/* Ratings & Price */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-slate-900 text-sm ml-1">
                    {selectedProduct.rating}
                  </span>
                </div>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-600 underline cursor-pointer">
                  {selectedProduct.reviewCount} customer reviews
                </span>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">
                  ${selectedProduct.price.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500">per {selectedProduct.unit}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-700 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedProduct.tags.map((tag, idx) => (
              <span key={idx} className="bg-amber-100/70 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Select Quantity:</span>
              <div className="flex items-center bg-white border border-amber-200 rounded-xl overflow-hidden shadow-2xs">
                <button
                  id="modal-qty-decrease"
                  onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-slate-900">{modalQty}</span>
                <button
                  id="modal-qty-increase"
                  onClick={() => setModalQty((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              id="modal-add-to-cart-btn"
              onClick={() => {
                addToCart(selectedProduct, modalQty);
                setSelectedProduct(null);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-5 h-5" />
              Add {modalQty} to Cart • ${(selectedProduct.price * modalQty).toFixed(2)}
            </button>
          </div>

          {/* Delivery & Guarantee Callouts */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-slate-700 border border-slate-200">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Delivered in 45 mins</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-slate-700 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Fresh Guarantee</span>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Customer Reviews ({selectedProduct.reviews.length})
            </h3>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Write a Review:</span>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Rating:</span>
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewRating(s)}
                      className="cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${s <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Your Name (e.g. Maria G.)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                required
              />

              <textarea
                placeholder="How was the freshness, taste, and packaging?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 h-16 resize-none"
                required
              />

              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Publish Review
              </button>
            </form>

            {/* Review List */}
            <div className="space-y-3">
              {selectedProduct.reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                      {rev.verified && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.2 rounded-md">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
