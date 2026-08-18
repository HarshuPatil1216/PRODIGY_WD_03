export type Category = 
  | 'All' 
  | 'Fresh Produce' 
  | 'Bakery & Breads' 
  | 'Dairy & Eggs' 
  | 'Local Pantry' 
  | 'Honey & Preserves' 
  | 'Artisan Crafts';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  unit: string; // e.g. "kg", "500g", "loaf", "jar", "pack"
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  badges: string[]; // e.g. ["Organic", "Local Farm", "Top Seller"]
  farmOrigin: {
    name: string;
    location: string;
    distanceKm: number;
    harvestTime: string;
    story: string;
  };
  description: string;
  nutritionInfo?: {
    calories: string;
    carbs: string;
    protein: string;
    fiber: string;
  };
  inStock: boolean;
  stockCount: number;
  tags: string[]; // e.g. ["Gluten-Free", "Vegan", "No Preservatives", "Handcrafted"]
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Order Placed' | 'Packed by Store' | 'Out for Local Delivery' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    landmark: string;
    deliveryTimeSlot: string;
  };
  paymentMethod: string;
  estimatedDeliveryTime: string; // e.g. "45 mins" or "5:30 PM Today"
  riderName?: string;
  riderPhone?: string;
}

export interface FilterState {
  category: Category;
  searchQuery: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  selectedFarm: string;
  selectedTags: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}
