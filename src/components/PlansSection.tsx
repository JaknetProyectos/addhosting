"use client";

import { useCartStore } from "@/lib/cart-store";
import { Link } from "@/i18n/routing";

import { Check, ShoppingCart, Zap, ShieldCheck, Box } from "lucide-react";
import { useTranslations } from "next-intl";

export function PlansSection({ plans }: { plans: any[] }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations("PlansSection");

  const handleAddToCart = (plan: any) => {
    addItem({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      sku: plan.sku,
    });
  };

  return (
    <section id="planes" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decor - Sutiles luces de ambiente */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER TECH STYLE */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
            <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              {t("badge")}
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">
            {t("title.before")} <span className="text-orange-500">{t("title.highlight")}</span>
            <span className="text-green-500">.</span>
          </h2>
          
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.rich("description", {
              italic: (chunks) => (
                <span className="text-zinc-300 italic">{chunks}</span>
              ),
            })}
          </p>
        </div>

        {/* PLANS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative bg-zinc-900/40 border transition-all duration-500 rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "border-orange-500/50 shadow-[0_0_40px_rgba(234,88,12,0.15)] ring-1 ring-orange-500/20"
                  : "border-zinc-800 hover:border-green-500/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg z-20">
                  {t("recommended")}
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Plan Name & Icon */}
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-orange-500 transition-colors">
                    {plan.name}
                  </h3>
                  <div className={`p-2 rounded-lg bg-black border ${plan.highlighted ? 'border-orange-500/30' : 'border-zinc-800'}`}>
                    <Box className={`w-5 h-5 ${plan.highlighted ? 'text-orange-500' : 'text-green-500'}`} />
                  </div>
                </div>

                <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium min-h-[60px]">
                  {plan.description}
                </p>

                {/* Pricing Block */}
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-xs font-black text-zinc-600 uppercase">
                    MXN
                  </span>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    ${plan.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-mono text-zinc-600 bg-black px-2 py-0.5 rounded border border-zinc-800">
                    SKU: {plan.sku.replace("SKU: ", "")}
                  </span>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                    {t("plusVat")}
                  </span>
                </div>

                {/* Features List */}
                <div className="flex-grow">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">
                    {t("specifications")}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-3 group/item">
                        <div className="mt-1 flex-shrink-0">
                          <Check className={`w-4 h-4 ${plan.highlighted ? 'text-orange-500' : 'text-green-500'}`} />
                        </div>
                        <span className="text-zinc-400 text-sm group-hover/item:text-zinc-200 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleAddToCart(plan)}
                  className={`w-full group/btn relative py-4 px-6 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 overflow-hidden ${
                    plan.highlighted
                      ? "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                      : "bg-zinc-800 text-zinc-300 hover:bg-green-600 hover:text-black border border-zinc-700 hover:border-green-500"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM PLAN MODULE */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                  {t("custom.title.before")}{" "}
                  <span className="text-green-500">
                    {t("custom.title.highlight")}
                  </span>
                </h3>
                <p className="text-zinc-500 text-sm font-medium mt-1">
                  {t("custom.description")}
                </p>
                <p className="text-[10px] font-mono text-zinc-700 mt-2">
                  ID: SEER-CUSTOM-INFRA
                </p>
              </div>
            </div>
            
            <Link href={"/personalizado"} className="w-full md:w-auto">
              <button className="w-full md:w-auto py-4 px-10 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                {t("custom.button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}