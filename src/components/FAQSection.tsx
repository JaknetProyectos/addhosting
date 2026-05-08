"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Terminal, ChevronRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { faqsEnglish, faqsSpanish } from "@/lib/data/questions";

export function FAQSection() {
  const t = useTranslations("FAQ");
  const locale = useLocale()
  const faqs = locale == "es" ? faqsSpanish : faqsEnglish;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* COLUMN 1: ILLUSTRATION & TECH STATS */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-xl aspect-square mx-auto lg:mx-0 group">
              {/* Hologram Effect behind image */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1)_0%,_transparent_70%)] animate-pulse" />

              {/* Decorative Frame */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500/30 rounded-br-3xl" />

              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("imageAlt")}
                fill
                className="object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(34,197,94,0.2)] group-hover:scale-105 rounded-xl transition-transform duration-700"
              />

              {/* Floating Info Badge */}
              <div className="absolute top-10 right-0 bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl p-4 rounded-2xl shadow-2xl animate-bounce duration-[5000ms]">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-orange-500" />

                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {t("knowledgeBase")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: FAQ CONTENT */}
          <div className="order-1 lg:order-2">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-green-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
                {t("title")}{" "}
                <span className="text-orange-500">
                  {t("titleHighlight")}
                </span>
                <span className="text-green-500">.</span>
              </h2>

              <p className="text-zinc-500 font-medium leading-relaxed max-w-lg">
                {t("description")}
              </p>
            </div>

            {/* ACCORDION TECH STYLE */}
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl px-6 transition-all duration-300 data-[state=open]:border-green-500/50 data-[state=open]:bg-zinc-900/40 group"
                >
                  <AccordionTrigger className="text-left text-zinc-300 hover:text-white py-6 text-base font-bold tracking-tight hover:no-underline [&[data-state=open]>svg]:rotate-90 [&[data-state=open]]:text-green-500">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-zinc-600 group-data-[state=open]:text-green-500/50 transition-colors">
                        [0{index + 1}]
                      </span>

                      {faq.question}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-zinc-500 pb-6 leading-relaxed font-medium border-t border-zinc-800/50 pt-4">
                    <div className="flex gap-4">
                      <ChevronRight className="w-4 h-4 text-orange-500 shrink-0 mt-1" />

                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}