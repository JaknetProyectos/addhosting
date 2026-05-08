"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Globe, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUsSection");

  const benefits = [
    { title: t("benefits.support"), icon: Globe },
    { title: t("benefits.security"), icon: ShieldCheck },
    { title: t("benefits.uptime"), icon: Zap },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-green-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* CONTENT COLUMN */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
              <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                {t("badge")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mb-8">
              {t("title.before")} <span className="text-orange-500">{t("title.highlight")}</span>?
              <span className="text-green-500">.</span>
            </h2>

            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium">
              {t.rich("description", {
                white: (chunks) => <span className="text-white">{chunks}</span>,
                green: (chunks) => <span className="text-green-500">{chunks}</span>,
                orange: (chunks) => <span className="text-orange-500">{chunks}</span>,
              })}
            </p>

            {/* BENEFITS MODULES */}
            <div className="grid sm:grid-cols-1 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold tracking-tight">{benefit.title}</span>
                    <div className="flex items-center gap-1">
                       <CheckCircle2 className="w-3 h-3 text-green-500" />
                       <span className="text-[10px] uppercase text-zinc-600 font-black tracking-widest">
                        {t("verified")}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_rgba(234,88,12,0.2)] hover:scale-[1.02]"
            >
              {t("cta")}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ILLUSTRATION COLUMN */}
          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative Tech Elements behind the server */}
              <div className="absolute inset-0 border border-zinc-800 rounded-3xl rotate-3 scale-105" />
              <div className="absolute inset-0 border border-green-500/10 rounded-3xl -rotate-3 scale-105" />
              
              {/* HUD Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-zinc-900 rounded-full opacity-50" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-orange-500/30 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-green-500/30 rounded-bl-3xl" />

              {/* Server Image */}
              <div className="relative w-full h-full p-8 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-transparent rounded-full blur-3xl group-hover:from-orange-600/10 transition-all" />
                <Image
                  src="https://plus.unsplash.com/premium_photo-1682146029185-198922bd8350?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Infrastructure Unit"
                  fill
                  className="object-contain relative z-10 filter brightness-110 contrast-110 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Status Indicator Floating */}
              <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl z-20 backdrop-blur-xl">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-3 h-3 bg-green-500 rounded-full" />
                       <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">
                        {t("status.label")}
                       </span>
                       <span className="text-xs font-bold text-white leading-none">
                        {t("status.value")}
                       </span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}