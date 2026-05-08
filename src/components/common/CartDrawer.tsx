"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black p-6">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-black">Your Cart ({totalItems})</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-2xl font-light hover:opacity-50 transition"
              aria-label="Close cart"
            >
              ×
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
                <div className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-300">🛒</div>
                <p className="text-sm font-light text-gray-500 uppercase tracking-widest">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-md border border-black px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-6 border-b border-gray-50 pb-8">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                    {item.image && (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="flex flex-grow flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-black uppercase tracking-tight">{item.name}</h3>
                        <p className="text-sm font-medium text-black">${item.price}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-lg font-light hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium min-w-[24px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-lg font-light hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-black p-8 space-y-6 bg-gray-50">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Subtotal</span>
                <span className="text-3xl font-light tracking-tighter text-black">${totalPrice}</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                Shipping and taxes calculated at checkout. Free shipping on orders over $100.
              </p>
              <button 
                className="w-full rounded-md border border-black bg-black text-white py-5 text-xs font-bold tracking-[0.4em] uppercase transition hover:bg-transparent hover:text-black"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
