"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdditionalServicesSection } from "@/components/AdditionalServicesSection";
import Image from "next/image";
import Link from "next/link";
import { Shield, Cpu, ChevronRight, Activity } from "lucide-react";

export default function ServiciosPage() {
  const t = useTranslations("servicesPage");

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
            <Activity className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            {t.rich("hero.title", {
              orange: (chunks) => (
                <span className="text-orange-500">{chunks}</span>
              ),
              green: (chunks) => (
                <span className="text-green-500">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* --- DETAILED SERVICES SECTIONS --- */}

      {/* 1. Shared Hosting */}
      <section className="py-24 relative border-y border-zinc-900 bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-green-500/50">
                  {t("shared.class")}
                </span>
                <div className="h-px flex-grow bg-zinc-800" />
              </div>

              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
                {t.rich("shared.title", {
                  orange: (chunks) => (
                    <span className="text-orange-500">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
                {t("shared.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-zinc-800 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden">
                  <span>{t("shared.button")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <Image
                src="https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("shared.imageAlt")}
                width={450}
                height={450}
                className="mx-auto relative z-10 rounded-xl filter drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VPS Hosting */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full opacity-100" />

              <Image
                src="https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("vps.imageAlt")}
                width={450}
                height={450}
                className="mx-auto rounded-xl relative z-10"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-orange-500/50">
                  {t("vps.class")}
                </span>
                <div className="h-px flex-grow bg-zinc-800" />
              </div>

              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
                {t.rich("vps.title", {
                  green: (chunks) => (
                    <span className="text-green-500">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
                {t("vps.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-zinc-800 hover:bg-green-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden">
                  <span>{t("vps.button")}</span>

                  <Cpu className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Hosting */}
      <section className="py-24 relative border-t border-zinc-900 bg-zinc-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-zinc-600">
                  {t("dedicated.class")}
                </span>
                <div className="h-px flex-grow bg-zinc-800" />
              </div>

              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-white">
                {t.rich("dedicated.title", {
                  orange: (chunks) => (
                    <span className="text-orange-500">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
                {t("dedicated.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden">
                  <span>{t("dedicated.button")}</span>

                  <Shield className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("dedicated.imageAlt")}
                width={450}
                height={450}
                className="mx-auto rounded-xl drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              />
            </div>
          </div>
        </div>
      </section>

      <AdditionalServicesSection />

      <Footer />

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </main>
  );
}