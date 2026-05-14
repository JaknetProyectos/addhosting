"use client";

import { useState, useEffect } from "react";
import { X, Gift, Zap, Package, ShieldCheck, Terminal, Mail, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useContact } from "@/hooks/useContact";

const REWARDS = [
  { id: 1, label: "MOD-01", discount: "10% OFF" },
  { id: 2, label: "MOD-02", discount: "15% OFF" },
  { id: 3, label: "MOD-03", discount: "5% OFF" },
  { id: 4, label: "MOD-04", discount: "20% OFF" },
];

export default function OfferModal() {
  const t = useTranslations("OfferModal");
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Selección, 2: Registro, 3: Éxito
  const [selectedReward, setSelectedReward] = useState<typeof REWARDS[0] | null>(null);

  const { sendContactForm, isLoading } = useContact();

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectGift = (reward: typeof REWARDS[0]) => {
    setSelectedReward(reward);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!email || !selectedReward) return;

    const result = await sendContactForm({
      nombre: "Usuario Promo",
      email,
      telefono: "N/A",
      mensaje: `Cupón reclamado: ${selectedReward.discount} (${selectedReward.label})`,
      asunto: `SOLICITUD DE CUPÓN ${selectedReward.discount}`,
      servicioDeseado: "Cupón Promocional",
      presupuesto: "",
    });

    if (result.success) {
      setStep(3);
      setTimeout(() => setIsOpen(false), 4000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      {/* Container Principal HUD */}
      <div className="relative bg-zinc-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(234,88,12,0.15)] max-w-lg w-full overflow-hidden animate-in zoom-in duration-500">
        
        {/* Scanlines Decorativas */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-20" />

        {/* Botón Cerrar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-zinc-600 hover:text-orange-500 transition-all z-20 hover:rotate-90"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 relative">
          
          {/* Header del Sistema */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <Terminal size={16} className="text-orange-500" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/40 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/60 italic">
              System_Incoming_Payload
            </span>
          </div>

          {/* PASO 1: SELECCIÓN DE REGALOS */}
          {step === 1 && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">
                Suministros <span className="text-orange-500">Detectados</span>
              </h2>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                Hemos interceptado 4 módulos de datos. Selecciona uno para revelar tu bono de descuento exclusivo.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {REWARDS.map((reward) => (
                  <button
                    key={reward.id}
                    onClick={() => handleSelectGift(reward)}
                    className="group relative flex flex-col items-center justify-center p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-orange-500/50 transition-all hover:bg-orange-500/5 active:scale-95"
                  >
                    <Package className="w-10 h-10 text-zinc-700 group-hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_#f97316] transition-all mb-3" />
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase tracking-widest">
                      {reward.label}
                    </span>
                    {/* Glow effect hover */}
                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 2: FORMULARIO (EXTRACCIÓN) */}
          {step === 2 && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-20 h-20 bg-zinc-900 border-2 border-orange-500 rounded-2xl flex items-center justify-center rotate-3">
                    <span className="text-2xl font-black text-orange-500 italic">
                      {selectedReward?.discount.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white text-center italic uppercase mb-2">
                ¡Módulo <span className="text-orange-500">Desbloqueado!</span>
              </h3>
              <p className="text-zinc-500 text-center text-sm mb-8">
                Ingresa tu email para vincular el cupón de <span className="text-white font-bold">{selectedReward?.discount}</span> a tu cuenta de cliente.
              </p>

              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ADMIN@DOMAIN.COM"
                    className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-zinc-700 font-mono"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !email}
                  className="group relative w-full h-14 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black uppercase italic tracking-widest text-sm rounded-2xl transition-all overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Sincronizando...</span>
                  ) : (
                    <>
                      <span>Reclamar Recompensa</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: ÉXITO */}
          {step === 3 && (
            <div className="text-center py-6 animate-in zoom-in">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-green-500 w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-3">
                Protocolo <span className="text-green-500">Exitoso</span>
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Tu descuento ha sido asignado. Recibirás una confirmación en tu terminal en breve. Redirigiendo...
              </p>
            </div>
          )}

          {/* Footer Decorativo */}
          <div className="mt-10 flex justify-between items-center text-[9px] font-mono text-zinc-700 tracking-[0.2em] border-t border-zinc-900 pt-6">
            <span>SECURE_LINK: ACTIVE</span>
            <span className="flex items-center gap-1">
              <Zap size={10} className="text-orange-500" /> ENCRYPTION: AES-256
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}