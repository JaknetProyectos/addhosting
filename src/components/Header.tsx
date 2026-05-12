"use client";

import { useState, useTransition } from "react";
import { Menu, X, ChevronDown, Globe, Zap } from "lucide-react";
import { CartButton } from "./Cart";
import { useLocale, useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/routing";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: t("languages.en"), flag: "🇺🇸" },
    { code: "es", name: t("languages.es"), flag: "🇲🇽" },
  ];

  const switchLanguage = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO TECH STYLE */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative flex items-center justify-center w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-lg group-hover:border-orange-500 transition-all">
              <Zap className="w-6 h-6 text-orange-500 fill-orange-500 group-hover:text-green-500 group-hover:fill-green-500 transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                Sistemas<span className="text-orange-500">+</span>Avante
              </span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
                {t("brand.infrastructure")}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: t("nav.home"), href: "/" },
              { name: t("nav.about"), href: "/nosotros" },
              { name: t("nav.services"), href: "/servicios" },
              { name: t("nav.plans"), href: "/planes" },
              { name: t("nav.contact"), href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-orange-500 hover:bg-zinc-900/50 rounded-lg transition-all"
              >
                {item.name}
              </Link>
            ))}

            {/* SELECTOR DE IDIOMA TECH */}
            <div className="relative p-6">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                disabled={isPending}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  isLangOpen
                    ? "border-green-500 bg-green-500/5 text-green-500"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                } transition-all text-xs font-black uppercase tracking-widest`}
              >
                <Globe className="w-3.5 h-3.5" />
                {locale}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          locale === lang.code
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          {lang.name}
                        </span>
                        {locale === lang.code && (
                          <div className="w-1 h-1 bg-orange-500 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-4 px-4">
              <CartButton />
            </div>
          </nav>

          {/* MOBILE: BOTONES ACCIÓN */}
          <div className="md:hidden flex items-center gap-3">
            <CartButton />
            <button
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:border-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-zinc-800 bg-black animate-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-2">
              {[
                { name: t("nav.home"), href: "/" },
                { name: t("nav.about"), href: "/nosotros" },
                { name: t("nav.services"), href: "/servicios" },
                { name: t("nav.plans"), href: "/planes" },
                { name: t("nav.contact"), href: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-lg font-black italic uppercase tracking-tighter text-zinc-400 hover:text-orange-500 transition-all border-l-2 border-transparent hover:border-orange-500 hover:bg-orange-500/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-zinc-800 my-4 mx-4" />

              <div className="px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4">
                  {t("mobile.selectLanguage")}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all ${
                        locale === lang.code
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : "border-zinc-800 text-zinc-500"
                      }`}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}