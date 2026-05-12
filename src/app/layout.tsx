import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Sistemas Avante | Hosting, VPS y Soluciones Web",
    template: "%s | Sistemas Avante",
  },
  description:
    "Sistemas Avante ofrece servicios de hosting, VPS, dominios, servidores cloud y soluciones web profesionales para empresas y emprendedores. Infraestructura confiable, soporte técnico y alto rendimiento para tus proyectos digitales.",
  keywords: [
    "hosting web",
    "hosting México",
    "servidores VPS",
    "cloud hosting",
    "registro de dominios",
    "servidores dedicados",
    "hosting empresarial",
    "alojamiento web",
    "soluciones cloud",
    "soporte técnico hosting",
    "hosting cPanel",
    "infraestructura web",
    "Sistemas Avante",
  ],
  authors: [{ name: "Sistemas Avante" }],
  creator: "Sistemas Avante",
  publisher: "Sistemas Avante",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No definimos lang aquí porque lo hará el layout dinámico
    <html suppressHydrationWarning={true}>
      <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/same-runtime/dist/index.global.js" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}