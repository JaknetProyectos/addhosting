"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Check,
  Shield,
  Zap,
  Target,
  Users,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { FAQSection } from "@/components/FAQSection";
import { useTranslations } from "next-intl";

export default function NosotrosPage() {
  const t = useTranslations("AboutPage");

  const benefits = [
    {
      title: t("benefits.items.support"),
      icon: Globe,
      color: "text-orange-500",
    },
    {
      title: t("benefits.items.security"),
      icon: Shield,
      color: "text-green-500",
    },
    {
      title: t("benefits.items.uptime"),
      icon: Zap,
      color: "text-orange-500",
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">

        {/* Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HERO HEADER */}
          <div className="text-center mb-20">

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
              <Users className="w-3.5 h-3.5 text-green-500" />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
              {t.rich("hero.title", {
                orange: (chunks) => (
                  <span className="text-orange-500">{chunks}</span>
                ),
                green: (chunks) => (
                  <span className="text-green-500">{chunks}</span>
                ),
              })}
            </h1>
          </div>

          {/* CONTENT GRID */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE MODULE */}
            <div className="relative group">

              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative w-full aspect-square max-w-md mx-auto">

                <div className="absolute inset-0 border border-zinc-800 rounded-3xl translate-x-4 translate-y-4 -z-10" />

                <div className="absolute inset-0 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-sm p-8">

                  <Image
                    src="https://moderngeeks.com/wp-content/uploads/Web-Hosting-mg.jpg"
                    alt={t("imageAlt")}
                    fill
                    className="object-contain p-12 filter brightness-110 rounded-xl drop-shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-black border border-green-500/30 p-4 rounded-2xl shadow-2xl animate-bounce duration-[4000ms]">

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />

                    <span className="text-[10px] font-black uppercase text-white tracking-widest italic">
                      {t("floatingBadge")}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* CONTENT MODULE */}
            <div className="space-y-12">

              <div>

                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-orange-500" />

                  {t("content.title")}
                </h2>

                <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                  {t.rich("content.description", {
                    green: (chunks) => (
                      <span className="text-green-500 italic font-bold">
                        {chunks}
                      </span>
                    ),
                    orange: (chunks) => (
                      <span className="text-orange-500 italic font-bold">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
              </div>

              {/* BENEFITS */}
              <div>

                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">
                  {t("benefits.title")}
                </h2>

                <div className="grid gap-4">

                  {benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-5 bg-zinc-900/20 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all hover:bg-zinc-900/40"
                    >

                      <div className="flex-shrink-0 w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">

                        <Check className={`w-6 h-6 ${benefit.color}`} />
                      </div>

                      <h3 className="text-white font-black italic uppercase tracking-tight text-lg">
                        {benefit.title}
                      </h3>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <Footer />
    </main>
  );
}