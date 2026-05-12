"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Terminal,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useAlert } from "@/context/AlertContext";
import { useTranslations } from "next-intl";

export default function ContactoPage() {
  const t = useTranslations("ContactPage");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const { isLoading, sendContactForm } = useContact();
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await sendContactForm({
      nombre: formData.name,
      email: formData.email,
      asunto: formData.subject,
      mensaje: formData.message,
    });

    if (result.success) {
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } else {
      console.error(result.error);

      showAlert({
        title: t("alert.errorTitle"),
        type: "error",
        message: result.error || t("alert.errorMessage"),
      });
    }
  };

  const contactItems = [
    {
      title: t("contact.phoneTitle"),
      value: "55 5533 0816",
      icon: Phone,
      color: "text-green-500",
    },
    {
      title: t("contact.emailTitle"),
      value: "soporte@sistemasavante.com",
      icon: Mail,
      color: "text-orange-500",
    },
    {
      title: t("contact.addressTitle"),
      value:
        "AVENIDA INSURGENTES SUR 64, INT. 311A, PISO 3, OFI. 311A - C, COL. JUAREZ, CUAUHTEMOC, C.P.06600 CIUDAD DE MÉXICO.",
      icon: MapPin,
      color: "text-green-500",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Header />

      {/* HERO */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
            <MessageSquare className="w-3.5 h-3.5 text-orange-500" />

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

      {/* CONTACT GRID */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* FORM */}
            <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

              <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-8 flex items-center gap-3">
                <Terminal className="w-5 h-5 text-green-500" />
                {t("form.title")}
              </h2>

              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>

                  <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">
                    {t("success.title")}
                  </h3>

                  <p className="text-zinc-500 font-medium font-mono text-sm uppercase tracking-widest">
                    {t("success.description")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                        {t("form.nameLabel")}
                      </label>

                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        required
                        placeholder={t("form.namePlaceholder")}
                        className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                        {t("form.emailLabel")}
                      </label>

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder={t("form.emailPlaceholder")}
                        className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                      {t("form.subjectLabel")}
                    </label>

                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject: e.target.value,
                        })
                      }
                      required
                      placeholder={t("form.subjectPlaceholder")}
                      className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                      {t("form.messageLabel")}
                    </label>

                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      required
                      rows={5}
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium resize-none"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-5 px-6 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>{t("form.submit")}</span>
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </button>
                </form>
              )}
            </div>

            {/* INFO */}
            <div className="space-y-8">

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8">

                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {t("contact.title")}
                </h2>

                <div className="space-y-8">
                  {contactItems.map((item, i) => (
                    <div key={i} className="flex gap-6 group">

                      <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-zinc-600 transition-colors shadow-xl">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                          {item.title}
                        </h3>

                        <p className="text-white font-bold text-sm md:text-base leading-snug tracking-tight">
                          {item.value}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* STATUS */}
              <div className="bg-orange-600/10 border border-orange-500/20 rounded-3xl p-6 flex items-center justify-between">

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

                  <div>
                    <p className="text-xs font-black text-white uppercase italic tracking-tighter">
                      {t("status.online")}
                    </p>

                    <p className="text-[10px] text-zinc-500 font-mono">
                      {t("status.response")}
                    </p>
                  </div>
                </div>

                <div className="h-8 w-px bg-zinc-800" />

                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    {t("status.server")}
                  </p>

                  <p className="text-[10px] text-green-500 font-mono">
                    {t("status.optimal")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

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