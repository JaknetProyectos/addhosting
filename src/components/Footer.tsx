"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Zap, ChevronRight, Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer
      id="contacto"
      className="bg-black border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Glow decorativo de fondo */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600/5 blur-[100px] rounded-full" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-600/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* TOP SECTION: LOGO & MISSION */}
        <div className="flex flex-col items-center text-center mb-20">
          <Link href="/" className="group flex items-center gap-3 mb-8">
            <div className="relative flex items-center justify-center w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-orange-500 transition-all shadow-2xl">
              <Zap className="w-7 h-7 text-orange-500 fill-orange-500 group-hover:text-green-500 group-hover:fill-green-500 transition-colors" />
            </div>

            <div className="flex flex-col items-start leading-none">
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                ADD<span className="text-orange-500">+</span>HOST
              </span>

              <span className="text-[8px] font-bold tracking-[0.4em] text-zinc-600 uppercase">
                {t("secureTerminal")}
              </span>
            </div>
          </Link>

          <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            {t("mission")}
          </p>
        </div>

        {/* MIDDLE SECTION: LINKS & CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black italic uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              {t("navigation")}
            </h4>

            <ul className="space-y-4">
              {[
                { label: t("home"), href: "/" },
                { label: t("about"), href: "/nosotros" },
                { label: t("services"), href: "/servicios" },
                { label: t("plans"), href: "/planes" },
                { label: t("contact"), href: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-white flex items-center gap-2 group transition-colors text-sm font-bold"
                  >
                    <ChevronRight className="w-3 h-3 text-zinc-800 group-hover:text-orange-500 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure */}
          <div>
            <h4 className="text-white font-black italic uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {t("infrastructure")}
            </h4>

            <ul className="space-y-4">
              {[
                t("sharedHosting"),
                t("vpsHosting"),
                t("dedicatedHosting"),
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/servicios"
                    className="text-zinc-500 hover:text-green-500 transition-colors text-sm font-bold flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black italic uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              {t("hqTerminal")}
            </h4>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition-colors">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />

                <span className="text-zinc-500 text-xs font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">
                  AV. INSURGENTES SUR 64, INT. 311A, PISO 3, COL. JUÁREZ,
                  CUAUHTÉMOC, C.P. 06600 CDMX.
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl group hover:border-green-500/30 transition-colors">
                  <Phone className="w-5 h-5 text-green-500 shrink-0" />

                  <span className="text-zinc-300 text-sm font-bold">
                    55 5533 0816
                  </span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl group hover:border-orange-500/30 transition-colors">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />

                  <span className="text-zinc-300 text-sm font-bold">
                    soporte@add-host.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT METHODS TECH STYLE */}
        <div className="flex flex-col items-center gap-6 mb-12 py-8 border-y border-zinc-900">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
            {t("securePayments")}
          </span>

          <div className="flex flex-wrap justify-center gap-6 opacity-50 hover:opacity-100 transition-opacity hover:brightness-150">
            {/* Visa */}
            <div className="bg-white px-4 py-1 rounded-md h-8 flex items-center transition-all">
              <span className="text-[#1a1f71] font-black italic text-lg tracking-tighter">
                VISA
              </span>
            </div>

            {/* Mastercard */}
            <div className="bg-white px-4 py-1 rounded-md h-8 flex items-center">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#eb001b] rounded-full mr-[-8px]" />
                <div className="w-5 h-5 bg-[#f79e1b] opacity-80 rounded-full" />
              </div>
            </div>

            {/* Tech Badge */}
            <div className="border border-zinc-800 px-4 py-1 rounded-md h-8 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-green-500" />

              <span className="text-zinc-500 font-bold text-[10px] uppercase">
                {t("pciCompliant")}
              </span>
            </div>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest text-center lg:text-left">
            © {currentYear}{" "}
            <span className="text-zinc-400">
              ADD HOST INFRASTRUCTURE
            </span>
            . {t("copyright")}
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              {
                label: t("refundPolicy"),
                href: "/reembolso",
              },
              {
                label: t("termsPolicy"),
                href: "/terminos",
              },
              {
                label: t("privacyPolicy"),
                href: "/privacidad",
              },
            ].map((legal) => (
              <Link
                key={legal.label}
                href={legal.href}
                className="text-zinc-600 hover:text-orange-500 text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}