"use client";

import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/cart-store";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowRight,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Cart() {
  const t = useTranslations("cartDrawer");

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-black z-[70] shadow-[[-20px_0_50px_rgba(0,0,0,0.5)]] border-l border-zinc-800 flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-900 bg-zinc-950/50">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-orange-500" />

              <h2 className="text-sm font-black italic uppercase tracking-[0.2em] text-white">
                {t("header.title")}
              </h2>
            </div>

            <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">
              {t("header.session")}{" "}
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center border border-dashed border-zinc-800">
                <Package className="w-8 h-8 text-zinc-700" />
              </div>

              <div>
                <p className="text-zinc-500 font-black italic uppercase text-xs tracking-widest">
                  {t("empty.title")}
                </p>

                <p className="text-zinc-700 text-[10px] mt-1 font-mono uppercase">
                  {t("empty.description")}
                </p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-zinc-900/30 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="absolute top-0 left-4 w-8 h-[1px] bg-orange-500/50" />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-black italic uppercase tracking-tight text-sm group-hover:text-orange-500 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-tighter">
                      {t("item.serial")} {item.sku}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex items-center gap-1 bg-black rounded-lg border border-zinc-800 p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-zinc-300 w-8 text-center font-mono text-xs font-bold">
                      {item.quantity.toString().padStart(2, "0")}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-green-500 font-black text-sm tracking-tighter">
                      $
                      {(item.price * item.quantity).toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </p>

                    <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">
                      {t("item.tax")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-zinc-950 border-t border-zinc-900 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  {t("footer.total")}
                </span>

                <span className="text-zinc-400 text-[9px] font-mono uppercase">
                  {t("footer.taxNote")}
                </span>
              </div>

              <div className="text-right">
                <p className="text-white font-black text-3xl tracking-tighter italic">
                  <span className="text-xs text-zinc-600 not-italic mr-1">
                    MXN
                  </span>

                  $
                  {getTotalPrice().toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/carrito"
                onClick={closeCart}
                className="group relative block w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl text-center transition-all duration-300 overflow-hidden shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" />

                  <span>{t("footer.checkout")}</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </Link>

              <button
                onClick={clearCart}
                className="w-full py-2 text-zinc-600 hover:text-zinc-400 text-[9px] font-black uppercase tracking-[0.3em] transition-colors"
              >
                {t("footer.clear")}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}

export function CartButton() {
  const t = useTranslations("cartDrawer");

  const { toggleCart, getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleCart}
      aria-label={t("button.openCart")}
      className="group relative p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-orange-500/50 transition-all duration-300"
    >
      <ShoppingCart className="w-5 h-5 text-zinc-400 group-hover:text-orange-500 transition-colors" />

      {mounted && totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-lg bg-orange-600 text-[10px] font-black text-white shadow-[0_0_15px_rgba(234,88,12,0.5)] animate-in zoom-in">
          {totalItems}
        </span>
      )}
    </button>
  );
}