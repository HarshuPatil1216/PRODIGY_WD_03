import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, FilterState, Category, Toast, ChatMessage, Review } from '../types';
import { mockProducts } from '../data/mockProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  filters: FilterState;
  activeOrder: Order | null;
  selectedProduct: Product | null;
  toasts: Toast[];
  
  // UI States
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderTrackerOpen: boolean;
  isSupportOpen: boolean;
  isFilterSidebarOpen: boolean;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;

  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  setSelectedProduct: (product: Product | null) => void;
  
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsOrderTrackerOpen: (open: boolean) => void;
  setIsSupportOpen: (open: boolean) => void;
  setIsFilterSidebarOpen: (open: boolean) => void;

  placeOrder: (
    deliveryDetails: {
      fullName: string;
      phone: string;
      street: string;
      landmark: string;
      deliveryTimeSlot: string;
    },
    paymentMethod: string,
    promoCodeDiscount: number
  ) => Order;

  advanceOrderStatus: (orderId: string) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  addProductReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'verified'>) => void;

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
}

const initialFilters: FilterState = {
  category: 'All',
  searchQuery: '',
  priceRange: [0, 30],
  inStockOnly: false,
  selectedFarm: 'All',
  selectedTags: [],
  sortBy: 'featured'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('neighborhood_market_products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('neighborhood_market_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('neighborhood_market_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('neighborhood_market_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! Welcome to Neighborhood Fresh Market. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['What is fresh today?', 'Delivery timings & fee', 'Where is my order?']
    }
  ]);

  // Persist local storage
  useEffect(() => {
    localStorage.setItem('neighborhood_market_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('neighborhood_market_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('neighborhood_market_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('neighborhood_market_products', JSON.stringify(products));
  }, [products]);

  const activeOrder = orders.length > 0 ? orders[0] : null;

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added ${quantity}x ${product.name} to cart!`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((c) => c.product.id === productId);
    setCart((prev) => prev.filter((c) => c.product.id !== productId));
    if (item) {
      addToast(`Removed ${item.product.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      if (exists) {
        addToast(`Removed ${product?.name || 'Item'} from saved wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Saved ${product?.name || 'Item'} to wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isProductInWishlist = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const placeOrder = (
    deliveryAddress: {
      fullName: string;
      phone: string;
      street: string;
      landmark: string;
      deliveryTimeSlot: string;
    },
    paymentMethod: string,
    discountAmount: number
  ): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFee = subtotal >= 25 ? 0 : 2.99;
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + deliveryFee + tax - discountAmount).toFixed(2));

    const newOrder: Order = {
      id: `NF-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      tax,
      total,
      status: 'Order Placed',
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryTime: '35 - 45 Mins',
      riderName: 'Alex Rivera (Express Local Rider)',
      riderPhone: '+1 (555) 234-8901'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
    addToast(`Order ${newOrder.id} successfully placed! Track status below.`, 'success');

    return newOrder;
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const statuses: Order['status'][] = [
            'Order Placed',
            'Packed by Store',
            'Out for Local Delivery',
            'Delivered'
          ];
          const currentIndex = statuses.indexOf(order.status);
          if (currentIndex < statuses.length - 1) {
            const nextStatus = statuses[currentIndex + 1];
            addToast(`Order ${order.id} updated: ${nextStatus}`, 'info');
            return { ...order, status: nextStatus };
          }
        }
        return order;
      })
    );
  };

  const addProductReview = (productId: string, newReviewData: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const createdReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [createdReview, ...p.reviews];
          const avgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [createdReview, ...prev.reviews];
        const avgRating = Number(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        return {
          ...prev,
          reviews: updatedReviews,
          rating: avgRating,
          reviewCount: updatedReviews.length
        };
      });
    }

    addToast('Thank you! Your review has been published.', 'success');
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = "I'm happy to help you with your order or questions about our fresh market!";
      let quickReplies: string[] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('fresh today') || lower.includes('produce') || lower.includes('recommend')) {
        replyText = "Harvested fresh this morning: Strawberries from Green Valley, Heirloom Tomatoes, and Fresh Hydroponic Lettuce! You can filter by 'Fresh Produce' above.";
        quickReplies = ['Show Fresh Produce', 'Delivery timings & fee'];
      } else if (lower.includes('delivery') || lower.includes('timing') || lower.includes('fee')) {
        replyText = 'We deliver express within 45 mins in a 15-mile radius. Delivery is $2.99 or FREE for orders over $25!';
        quickReplies = ['Minimum order amount?', 'Do you deliver in glass bottles?'];
      } else if (lower.includes('order') || lower.includes('where is my')) {
        if (orders.length > 0) {
          const latest = orders[0];
          replyText = `Your latest order #${latest.id} is currently: **${latest.status}**. Estimated delivery in ${latest.estimatedDeliveryTime}!`;
          quickReplies = ['Track Order Now', 'Contact Rider'];
        } else {
          replyText = "You don't have any active orders right now. Add items to your cart and check out to receive live express tracking!";
          quickReplies = ['Browse Bakery', 'Browse Fresh Produce'];
        }
      } else if (lower.includes('gluten') || lower.includes('organic')) {
        replyText = 'We clearly tag all our products! Look for the Organic, Gluten-Free, and Vegan badges on product cards, or use the Filter sidebar.';
      } else {
        replyText = "Thanks for asking! Our store is open 7 AM - 9 PM daily. All items are locally sourced within 20 miles to ensure maximum freshness and zero preservatives.";
        quickReplies = ['What is fresh today?', 'Where is my order?'];
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies
      };

      setChatMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        filters,
        activeOrder,
        selectedProduct,
        toasts,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isOrderTrackerOpen,
        isSupportOpen,
        isFilterSidebarOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isProductInWishlist,
        setFilters,
        resetFilters,
        setSelectedProduct,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsOrderTrackerOpen,
        setIsSupportOpen,
        setIsFilterSidebarOpen,
        placeOrder,
        advanceOrderStatus,
        addToast,
        removeToast,
        addProductReview,
        chatMessages,
        sendChatMessage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
