import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import { 
  X, 
  CheckCircle2, 
  Package, 
  Truck, 
  Home, 
  Clock, 
  PhoneCall, 
  MapPin, 
  Play, 
  RotateCcw,
  ShoppingBag
} from 'lucide-react';

const statusSteps: { status: OrderStatus; icon: React.ReactNode; label: string }[] = [
  { status: 'Order Placed', icon: <Clock className="w-4 h-4" />, label: 'Order Placed' },
  { status: 'Packed by Store', icon: <Package className="w-4 h-4" />, label: 'Packed by Store' },
  { status: 'Out for Local Delivery', icon: <Truck className="w-4 h-4" />, label: 'Out for Local Delivery' },
  { status: 'Delivered', icon: <Home className="w-4 h-4" />, label: 'Delivered' }
];

export const OrderTrackerModal: React.FC = () => {
  const { 
    orders, 
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    advanceOrderStatus, 
    addToCart,
    setIsCartOpen 
  } = useStore();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (!isOrderTrackerOpen) return null;

  const currentOrder = selectedOrderId 
    ? orders.find((o) => o.id === selectedOrderId) || orders[0]
    : orders[0];

  const getStepState = (stepStatus: OrderStatus, orderStatus: OrderStatus) => {
    const orderIndex = statusSteps.findIndex((s) => s.status === orderStatus);
    const stepIndex = statusSteps.findIndex((s) => s.status === stepStatus);

    if (stepIndex < orderIndex) return 'completed';
    if (stepIndex === orderIndex) return 'active';
    return 'pending';
  };

  const handleReorder = (items: typeof currentOrder.items) => {
    items.forEach(({ product, quantity }) => {
      addToCart(product, quantity);
    });
    setIsOrderTrackerOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div id="order-tracker-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOrderTrackerOpen(false)}
      />

      <div id="order-tracker-card" className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 bg-amber-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-700" />
            <h2 className="font-extrabold text-slate-900 text-lg">Order Tracking & History</h2>
          </div>

          <button
            id="close-order-tracker-btn"
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl mx-auto">
                📦
              </div>
              <h3 className="font-bold text-slate-800 text-base">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Place an express order from our local fresh market to track real-time delivery status here.
              </p>
            </div>
          ) : (
            <>
              {/* Order Selection Tabs */}
              {orders.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                  {orders.map((o) => (
                    <button
                      key={o.id}
                      id={`order-tab-${o.id}`}
                      onClick={() => setSelectedOrderId(o.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        currentOrder.id === o.id
                          ? 'bg-emerald-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {o.id} • ${o.total.toFixed(2)}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Selected Order Details */}
              <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      Order ID: #{currentOrder.id}
                    </span>
                    <span className="text-xs text-slate-500">{currentOrder.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                      {currentOrder.status}
                    </span>

                    {/* Simulate Next Stage Demo Button */}
                    {currentOrder.status !== 'Delivered' && (
                      <button
                        id={`simulate-status-${currentOrder.id}`}
                        onClick={() => advanceOrderStatus(currentOrder.id)}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                        title="Simulate Next Status Stage"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-900" />
                        Advance Status
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated Status Stepper */}
                <div className="py-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {statusSteps.map((step) => {
                      const state = getStepState(step.status, currentOrder.status);
                      return (
                        <div
                          key={step.status}
                          className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                            state === 'completed'
                              ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900'
                              : state === 'active'
                              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-102'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              state === 'active'
                                ? 'bg-amber-400 text-slate-900'
                                : state === 'completed'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {state === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                          </div>
                          <span className="text-xs font-bold leading-tight">{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Delivery Map / Rider Info */}
                {currentOrder.status !== 'Delivered' && (
                  <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-amber-300">
                          🚴
                        </div>
                        <div>
                          <p className="font-bold">{currentOrder.riderName}</p>
                          <p className="text-[11px] text-emerald-300">{currentOrder.riderPhone}</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${currentOrder.riderPhone}`}
                        className="bg-emerald-800 hover:bg-emerald-700 p-2 rounded-xl text-amber-300 flex items-center gap-1 font-semibold text-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Call Rider
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-1 border-t border-emerald-800">
                      <Clock className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Estimated Arrival: <strong className="text-white font-bold">{currentOrder.estimatedDeliveryTime}</strong></span>
                    </div>
                  </div>
                )}

                {/* Delivery Address */}
                <div className="text-xs space-y-1 text-slate-700 pt-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    Delivery Destination:
                  </p>
                  <p>{currentOrder.deliveryAddress.fullName} • {currentOrder.deliveryAddress.phone}</p>
                  <p>{currentOrder.deliveryAddress.street} (Landmark: {currentOrder.deliveryAddress.landmark})</p>
                </div>

                {/* Order Items Breakdown */}
                <div className="pt-3 border-t border-amber-200/60 space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Ordered Products:</span>
                  <div className="divide-y divide-amber-200/50">
                    {currentOrder.items.map(({ product, quantity }) => (
                      <div key={product.id} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={product.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-semibold text-slate-900">{quantity}x {product.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-sm font-extrabold text-slate-900 border-t border-amber-200">
                    <span>Total Paid</span>
                    <span className="text-emerald-700">${currentOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Re-order Button */}
                <div className="pt-2">
                  <button
                    id={`reorder-btn-${currentOrder.id}`}
                    onClick={() => handleReorder(currentOrder.items)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Re-order These Items
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
