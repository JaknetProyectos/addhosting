"use client";

import { Check, Plus, ShoppingCart, Layers } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

import { useLocale, useTranslations } from "next-intl";
import { fullServicesEnglish, fullServicesSpanish } from "@/lib/data/services";

export function AdditionalServicesSection() {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations("AdditionalServices");
  const locale = useLocale()
  const fullServices = locale == "es" ? fullServicesSpanish : fullServicesEnglish;

  const handleAddToCart = (service: typeof fullServices[0]) => {
    addItem({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      sku: service.sku,
    });
  };

  return (
    <section className="py-24 bg-black relative">
      {/* Separador visual superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
              {t("title1")}{" "}
              <span className="text-green-500">{t("titleHighlight")}</span>
              <span className="text-orange-500">+</span>
            </h2>

            <p className="text-zinc-500 font-medium leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <Layers className="w-10 h-10 text-orange-500 opacity-50" />

            <div className="flex flex-col">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">
                {t("addons")}
              </span>

              <span className="text-zinc-500 text-xs font-mono">
                {t("status")}
              </span>
            </div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fullServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-zinc-900/20 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-7 transition-all duration-500 hover:bg-zinc-900/40"
            >
              {/* Card Decoration */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-100 group-hover:text-orange-500 transition-all">
                <Plus className="w-5 h-5" />
              </div>

              <div className="flex flex-col h-full">
                {/* Title & Desc */}
                <div className="mb-6">
                  <h3 className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-green-500 transition-colors mb-3">
                    {service.name}
                  </h3>

                  <p className="text-zinc-500 text-sm font-medium leading-snug min-h-[40px]">
                    {service.description}
                  </p>
                </div>

                {/* Price Block */}
                <div className="mb-6 p-4 bg-black/40 border border-zinc-800/50 rounded-xl">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                      MXN
                    </span>

                    <span className="text-3xl font-black text-white tracking-tighter">
                      $
                      {service.price.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-tighter">
                      {t("serial")}{" "}
                      {service.sku.replace("SKU: ", "")}
                    </span>

                    <span className="text-[10px] font-black text-orange-500 uppercase">
                      + IVA
                    </span>
                  </div>
                </div>

                {/* Features List */}
                {service.features.length > 0 && (
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-4 h-4 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-green-500" />
                        </div>

                        <span className="text-zinc-400 text-xs font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                <button
                  onClick={() => handleAddToCart(service)}
                  className="group/btn relative w-full py-4 bg-zinc-800 hover:bg-orange-600 text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />

                  <span>{t("addToCart")}</span>

                  {/* Hover effect light */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}