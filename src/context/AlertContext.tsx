"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Terminal, Zap, ShieldAlert } from "lucide-react";
import Image from "next/image";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// SISTEMA DE ESTILOS "DARK TECH"
const typeStyles: Record<
  AlertType,
  {
    badge: string;
    iconWrap: string;
    iconColor: string;
    button: string;
    titleColor: string;
    borderColor: string;
    glow: string;
  }
> = {
  success: {
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
    iconWrap: "bg-green-500/10 border-green-500/30",
    iconColor: "text-green-500",
    button: "bg-green-600 hover:bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    titleColor: "text-white",
    borderColor: "border-green-500/30",
    glow: "shadow-[0_0_50px_rgba(34,197,94,0.1)]",
  },
  error: {
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
    iconWrap: "bg-red-500/10 border-red-500/30",
    iconColor: "text-red-500",
    button: "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    titleColor: "text-white",
    borderColor: "border-red-500/30",
    glow: "shadow-[0_0_50px_rgba(239,68,68,0.1)]",
  },
  warning: {
    badge: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    iconWrap: "bg-orange-500/10 border-orange-500/30",
    iconColor: "text-orange-500",
    button: "bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    titleColor: "text-white",
    borderColor: "border-orange-500/30",
    glow: "shadow-[0_0_50px_rgba(249,115,22,0.1)]",
  },
  info: {
    badge: "bg-zinc-800 text-zinc-400 border-zinc-700",
    iconWrap: "bg-zinc-900 border-zinc-800",
    iconColor: "text-orange-500",
    button: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",
    titleColor: "text-white",
    borderColor: "border-zinc-800",
    glow: "shadow-none",
  },
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
    if (options?.onClose) {
      options.onClose();
    }
    // Tiempo para la animación de salida
    setTimeout(() => setOptions(null), 200);
  }, [options]);

  const type = options?.type || "info";
  const styles = typeStyles[type];
  
  const DefaultIcon =
    type === "success"
      ? CheckCircle
      : type === "error"
      ? ShieldAlert
      : type === "warning"
      ? AlertTriangle
      : Info;

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {isOpen && options && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay con desenfoque técnico */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={hideAlert}
          />

          {/* Modal HUD Style */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            className={`relative w-full max-w-md bg-zinc-950 border ${styles.borderColor} rounded-[2rem] overflow-hidden ${styles.glow} animate-in zoom-in slide-in-from-bottom-4 duration-300 shadow-2xl`}
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />

            {/* Header / Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-900 bg-black px-6 py-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-zinc-600" />
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-md border ${styles.badge}`}
                >
                  System_{type}
                </span>
              </div>

              <button
                onClick={hideAlert}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
                aria-label="Cerrar alerta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-8 relative">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-800" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-800" />

              {/* Icon wrap */}
              <div className="flex justify-center mb-8">
                <div className={`relative w-20 h-20 ${styles.iconWrap} flex items-center justify-center rounded-2xl border rotate-3 group`}>
                  <div className={`-rotate-3 transition-transform ${styles.iconColor}`}>
                    {options.icon || <DefaultIcon className="h-10 w-10 drop-shadow-[0_0_10px_currentColor]" />}
                  </div>
                  {/* Animación de pulso interna */}
                  <div className={`absolute inset-0 rounded-2xl border ${styles.borderColor} animate-ping opacity-20`} />
                </div>
              </div>

              {/* Image support */}
              {options.image && (
                <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <Image
                    src={options.image}
                    alt="Alert Contextual"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
              )}

              {/* Text Content */}
              <div className="text-center mb-10">
                <h3
                  id="alert-title"
                  className={`text-2xl font-black italic uppercase tracking-tighter ${styles.titleColor} mb-4`}
                >
                  {options.title}
                </h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium px-2">
                  {options.message}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={hideAlert}
                className={`group relative w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] transition-all overflow-hidden flex items-center justify-center gap-3 ${styles.button}`}
              >
                <span className="relative z-10">{options.confirmText || "Confirmar Protocolo"}</span>
                <Zap className="w-4 h-4 relative z-10 group-hover:scale-125 transition-transform" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
              
              <div className="mt-6 text-center">
                 <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-widest">Security Link: ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe ser usado dentro de AlertProvider");
  }
  return context;
};