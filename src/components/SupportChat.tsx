import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronDown, 
  HelpCircle, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

const faqItems = [
  {
    q: 'What is the delivery radius & timing?',
    a: 'We deliver within a 15-mile radius from Sector 14 Market. Orders placed between 7:00 AM and 8:30 PM are delivered in under 45 minutes.'
  },
  {
    q: 'How does the 100% Freshness Guarantee work?',
    a: 'If any organic fruit, bread, or dairy item does not meet your quality standards upon delivery, notify us in chat within 2 hours for an instant refund or replacement.'
  },
  {
    q: 'Is there a minimum order for free delivery?',
    a: 'Delivery is $2.99 for small orders. Orders over $25 qualify for 100% FREE Express Delivery!'
  },
  {
    q: 'How does the Returnable Glass Bottle program work?',
    a: 'For whole milk and olive oil in glass bottles, simply hand your rinsed empty bottles back to our express rider on your next order to earn $0.50 store credit per bottle.'
  }
];

export const SupportChat: React.FC = () => {
  const { 
    isSupportOpen, 
    setIsSupportOpen, 
    chatMessages, 
    sendChatMessage 
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  const handleQuickReplyClick = (replyText: string) => {
    sendChatMessage(replyText);
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle */}
      {!isSupportOpen && (
        <button
          id="floating-support-chat-trigger"
          onClick={() => setIsSupportOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-500"
          aria-label="Open Store Support & Live Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-600 animate-pulse" />
          </div>
          <span className="hidden sm:inline text-xs font-bold">Ask Local Market AI</span>
        </button>
      )}

      {/* Support Drawer / Modal Widget */}
      {isSupportOpen && (
        <div id="support-chat-overlay" className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSupportOpen(false)}
          />

          <div id="support-chat-panel" className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-amber-200/80 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-lg shadow-xs">
                  🌿
                </div>
                <div>
                  <h2 className="font-extrabold text-sm">Neighborhood Fresh Assistant</h2>
                  <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Support • Sector 14 Store
                  </p>
                </div>
              </div>

              <button
                id="close-support-chat-btn"
                onClick={() => setIsSupportOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body & FAQ Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/20">
              {/* FAQ Accordions Box */}
              <div className="bg-white p-3 rounded-2xl border border-amber-200/70 shadow-xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 pb-1 border-b border-amber-200/50">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Frequently Asked Questions</span>
                </div>

                <div className="space-y-1.5">
                  {faqItems.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="rounded-xl border border-amber-200/60 overflow-hidden text-xs">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-2.5 bg-amber-50/40 text-left font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-2.5 bg-white text-slate-600 leading-relaxed border-t border-amber-200/40">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 pt-2">
                <div className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Live AI Assistant Chat
                </div>

                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-1 ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-xs'
                          : 'bg-white text-slate-800 border border-amber-200/80 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <span className={`text-[10px] block text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Quick Replies */}
                    {msg.quickReplies && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReplyClick(reply)}
                            className="bg-emerald-100/90 text-emerald-900 hover:bg-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-300 transition-colors cursor-pointer"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-amber-200 flex gap-2">
              <input
                id="support-chat-input"
                type="text"
                placeholder="Ask about farm sources, delivery, items..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                id="send-chat-msg-btn"
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
