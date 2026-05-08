"use client";

import Image from "next/image";
import Link from "next/link";
import { Cpu, Server, HardDrive, ArrowUpRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { basicServicesEnglish, basicServicesSpanish } from "@/lib/data/services";

export function ServicesSection() {
  const t = useTranslations("ServicesSection");
  const locale = useLocale()
  const basicServices = locale == "es" ? basicServicesSpanish : basicServicesEnglish;

  
  return (
    <section id="servicios" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header simplificado y potente */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
              {t("title.before")} <span className="text-orange-500">{t("title.highlight")}</span>
              <span className="text-green-500">.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm font-medium max-w-xs border-l border-zinc-800 pl-6">
            {t("description")}
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {basicServices.map((service, index) => (
            <Link
              key={index}
              href="/servicios"
              className={`group relative bg-zinc-900/30 border ${service.accent} ${service.hoverAccent} rounded-2xl p-8 transition-all duration-500 hover:bg-zinc-900/50 flex flex-col h-full`}
            >
              {/* Card Header: Tag + Arrow */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-black border border-zinc-800 text-zinc-400 group-hover:text-green-500 group-hover:border-green-500/50 transition-colors">
                  {service.tag}
                </span>
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              {/* Icon Container */}
              <div className="relative w-24 h-24 mb-8 mx-auto lg:mx-0">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-all" />
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100"
                />
              </div>

              {/* Text content */}
              <div className="mt-auto">
                <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Bottom "Scanline" effect */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-green-500 group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}