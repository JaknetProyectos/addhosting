"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

interface ContactData {
    nombre: string;
    email: string;
    mensaje: string;
    telefono?: string;
    asunto?: string;
    servicioDeseado?: string;
    presupuesto?: string;
}

export function useContact() {
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale()

    const sendContactForm = async (data: ContactData) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/${locale ?? "es"}/api/contacto`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Error al enviar el mensaje");
            }

            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error desconocido";
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendContactForm,
        isLoading,
    };
}