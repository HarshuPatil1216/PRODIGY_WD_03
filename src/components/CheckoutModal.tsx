import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const landmarks = [
  'Sector 14 Main Market Gate',
  'Opposite Central Public Library',
  'Near City Park North Entrance',
  'Behind Heritage Metro Station',
  'Beside St. Mary School Plaza'
];

export const CheckoutModal: React.FC = () => {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, placeOrder } = useStore();

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [street, setStreet] = useState('742 Oak Ridge Drive, Apt 4B');
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0]);
  const [timeSlot, setTimeSlot] = useState('Instant 45-Min Express Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 25 ? 0 : 2.99;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + deliveryFee + tax).toFixed(2));

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    placeOrder(
      {
        fullName,
        phone,
        street,
        landmark: selectedLandmark,
        deliveryTimeSlot: timeSlot
      },
      paymentMethod === 'upi' ? 'UPI / QR Scan' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card',
      0
    );
  };

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div id="checkout-modal-card" className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-amber-200/80 bg-amber-50/60 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg">Express Local Checkout</h2>
            <p className="text-xs text-slate-500 font-medium">
              Step {step === 'details' ? '1 of 2: Delivery Address' : '2 of 2: Payment Method'}
            </p>
          </div>

          <button
            id="close-checkout-modal-btn"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {step === 'details' ? (
            <form id="checkout-details-form" onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    Recipient Full Name
                  </label>
                  <input
                    id="checkout-fullname-input"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Phone Number for Express Rider
                  </label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Street Address & Flat Number
                </label>
                <input
                  id="checkout-street-input"
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              {/* Local Landmark Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Nearby Local Landmark (For faster rider routing)
                </label>
                <select
                  id="checkout-landmark-select"
                  value={selectedLandmark}
                  onChange={(e) => setSelectedLandmark(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  {landmarks.map((lm) => (
                    <option key={lm} value={lm}>
                      {lm}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Delivery Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Instant 45-Min Express Delivery',
                    'Today 6:00 PM - 8:00 PM',
                    'Tomorrow Morning 8 AM - 10 AM'
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      id={`slot-btn-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                id="checkout-next-to-payment-btn"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer mt-4"
              >
                <span>Continue to Payment (${total.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Delivery Summary Banner */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Delivering to: {fullName}</span>
                  <button
                    onClick={() => setStep('details')}
                    className="text-emerald-700 hover:underline cursor-pointer"
                  >
                    Edit Address
                  </button>
                </div>
                <p className="text-slate-600">{street} • Landmark: {selectedLandmark}</p>
                <p className="text-emerald-800 font-semibold">{timeSlot}</p>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Select Payment Method:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    id="payment-upi-btn"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-amber-400" />
                    <span className="text-xs font-bold">UPI / QR Scan</span>
                  </button>

                  <button
                    type="button"
                    id="payment-cod-btn"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-6 h-6 text-amber-400" />
                    <span className="text-xs font-bold">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    id="payment-card-btn"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-amber-400" />
                    <span className="text-xs font-bold">Credit/Debit Card</span>
                  </button>
                </div>
              </div>

              {/* Dynamic QR or Card Info */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center text-center space-y-2">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Scan QR Code with any UPI App</span>
                  <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm or Banking App</span>
                </div>
              )}

              {/* Security note */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by 256-bit encrypted secure local marketplace gateway.</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>

                <button
                  id="confirm-place-order-btn"
                  onClick={handleCompleteOrder}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Place Order (${total.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
