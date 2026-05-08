"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, Shield, ChevronRight, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-black"
    >
      {/* BACKGROUND EFFECTS */}
      {/* Gradiente base profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(34,197,94,0.05)_0%,_transparent_50%),_radial-gradient(circle_at_80%_70%,_rgba(249,115,22,0.05)_0%,_transparent_50%)]" />

      {/* Grid de ingeniería/tecnológico */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Circuit pattern overlay rediseñado (Verde Neón) */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="tech-circuit" width="25" height="25" patternUnits="userSpaceOnUse">
              <path
                d="M0 12.5 L12.5 12.5 L12.5 0 M25 12.5 L12.5 12.5 M12.5 25 L12.5 12.5"
                fill="none"
                stroke="#22c55e"
                strokeWidth="0.2"
              />
              <rect
                x="11.5"
                y="11.5"
                width="2"
                height="2"
                fill="#22c55e"
                className="animate-pulse"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#tech-circuit)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT CONTENT */}
          <div className="text-center lg:text-left">
            {/* Badge de estado */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-6 group hover:border-green-500 transition-colors cursor-default">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-green-500 transition-colors">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic">
              {t("title.before")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                {t("title.highlight")}
              </span>
              <span className="text-green-500">.</span>
            </h1>

            <p className="text-zinc-400 text-lg mb-10 max-w-xl leading-relaxed font-medium">
              {t.rich("description", {
                white: (chunks) => (
                  <span className="text-white">{chunks}</span>
                ),
                green: (chunks) => (
                  <span className="text-green-500">{chunks}</span>
                ),
              })}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contacto"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_40px_rgba(234,88,12,0.3)] hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10">{t("buttons.startProject")}</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/planes"
                className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold rounded-xl hover:bg-zinc-800 hover:text-green-500 hover:border-green-500 transition-all"
              >
                <Activity className="w-5 h-5" />
                {t("buttons.viewPlans")}
              </Link>
            </div>
          </div>

          {/* ILLUSTRATION COMPONENT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square scale-110">
              {/* Glow Aura (Naranja y Verde) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/5 blur-[80px] rounded-full" />

              {/* Elementos flotantes tecnológicos */}
              <div className="absolute top-10 left-0 w-16 h-16 bg-zinc-900/80 border border-zinc-700 rounded-2xl flex items-center justify-center backdrop-blur-xl animate-bounce duration-[3000ms] shadow-2xl z-20">
                <Shield className="w-8 h-8 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              <div className="absolute bottom-20 right-0 w-14 h-14 bg-zinc-900/80 border border-zinc-700 rounded-full flex items-center justify-center backdrop-blur-xl animate-bounce duration-[4000ms] shadow-2xl z-20">
                <Zap className="w-6 h-6 text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
              </div>

              {/* Rocket Image con Filtro de Contraste Alto */}
              <div className="relative w-full h-full z-10 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <Image
                  src="https://plus.unsplash.com/premium_vector-1721829207640-7791bc00e17a?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={t("imageAlt")}
                  fill
                  className="object-contain rounded-xl filter brightness-110 contrast-125"
                  priority
                />
              </div>

              {/* Decorative Tech Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-zinc-800 rounded-full scale-125 opacity-20 border-dashed animate-spin duration-[20s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-green-500/20 rounded-full scale-110 opacity-30 animate-reverse-spin duration-[15s]" />
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR REDISEÑADO */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            {t("scroll")}
          </span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-orange-500 via-green-500 to-transparent rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        .animate-reverse-spin {
          animation: reverse-spin linear infinite;
        }
      `}</style>
    </section>
  );
}