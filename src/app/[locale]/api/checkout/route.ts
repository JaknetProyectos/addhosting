// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CheckoutBody {
  orderId: string;
  total: number;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    const { orderId, total, customer, items } = body;

    if (!customer?.email) {
      return NextResponse.json(
        { success: false, error: "Email requerido" },
        { status: 400 }
      );
    }

    // Estilo de fila para productos (Diseño de Terminal)
    const itemsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding:15px 10px; border-bottom:1px solid #18181b;">
              <div style="color:#71717a; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px; margin-bottom:4px;">Recurso</div>
              <div style="color:#ffffff; font-size:14px; font-weight:bold;">${item.name} <span style="color:#52525b; font-weight:normal;">x${item.quantity}</span></div>
            </td>
            <td style="padding:15px 10px; border-bottom:1px solid #18181b; text-align:right; vertical-align:bottom;">
              <div style="color:#22c55e; font-family:monospace; font-weight:bold; font-size:14px;">
                MXN ${(item.price * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </div>
            </td>
          </tr>
        `
      )
      .join("");

    /**
     * EMAIL NEGOCIO (LOG DE SISTEMA)
     */
    await resend.emails.send({
      from: "Sistemas Avante <soporte@sistemasavante.com>",
      to: "soporte@sistemasavante.com",
      subject: `[LOG_PEDIDO] #${orderId} - Acción Requerida`,
      html: `
        <div style="background-color:#000000; padding:40px 10px; font-family:Arial, sans-serif;">
          <table align="center" width="100%" style="max-width:600px; background-color:#09090b; border:1px solid #27272a; border-radius:16px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:30px; background-color:#141414; border-bottom:1px solid #27272a;">
                <table width="100%">
                  <tr>
                    <td>
                      <div style="color:#ea580c; font-size:10px; font-weight:black; text-transform:uppercase; letter-spacing:3px; margin-bottom:8px;">Notificación de Red</div>
                      <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:900; font-style:italic; text-transform:uppercase;">Nuevo Pedido <span style="color:#ea580c;">Inyectado</span></h1>
                    </td>
                    <td style="text-align:right;">
                       <div style="display:inline-block; padding:4px 10px; background-color:#ea580c; color:#ffffff; font-size:10px; font-weight:bold; border-radius:4px; font-family:monospace;">ID: ${orderId}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <div style="color:#52525b; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; font-weight:bold;">Datos del Nodo (Cliente)</div>
                <div style="background-color:#000000; border:1px solid #18181b; padding:20px; border-radius:12px; margin-bottom:30px;">
                  <p style="color:#ffffff; margin:0 0 10px 0; font-size:15px;"><strong>${customer.firstName} ${customer.lastName}</strong></p>
                  <p style="color:#a1a1aa; margin:0 0 5px 0; font-size:13px;">Email: ${customer.email}</p>
                  <p style="color:#a1a1aa; margin:0 0 5px 0; font-size:13px;">Tel: ${customer.phone}</p>
                  <p style="color:#71717a; margin:15px 0 0 0; font-size:12px; font-family:monospace; line-height:1.5;">
                    LOCALIDAD: ${customer.address}, ${customer.city}, ${customer.state}, ${customer.postalCode}
                  </p>
                </div>

                <div style="color:#52525b; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; font-weight:bold;">Manifiesto de Carga</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHtml}
                  <tr>
                    <td style="padding:20px 10px; text-align:right; color:#71717a; font-size:13px;">VALOR TOTAL</td>
                    <td style="padding:20px 10px; text-align:right; color:#ffffff; font-size:22px; font-weight:900; font-style:italic;">MXN ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; background-color:#000000; text-align:center; border-top:1px solid #18181b;">
                <div style="color:#27272a; font-size:9px; text-transform:uppercase; letter-spacing:2px; font-family:monospace;">Terminal Log - Sistemas Avante 2026</div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    /**
     * EMAIL CLIENTE (CONFIRMACIÓN TECH)
     */
    await resend.emails.send({
      from: "Sistemas Avante <soporte@sistemasavante.com>",
      to: customer.email,
      subject: `Confirmación de Protocolo #${orderId}`,
      html: `
        <div style="background-color:#000000; padding:40px 10px; font-family:Arial, sans-serif;">
          <table align="center" width="100%" style="max-width:600px; background-color:#09090b; border:1px solid #27272a; border-radius:24px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:40px 30px; text-align:center; background: linear-gradient(to bottom, #141414, #09090b);">
                <div style="width:50px; height:2px; background-color:#22c55e; margin:0 auto 20px auto;"></div>
                <h1 style="color:#ffffff; margin:0; font-size:32px; font-weight:900; font-style:italic; text-transform:uppercase; letter-spacing:-1px;">Pago <span style="color:#22c55e;">Confirmado</span></h1>
                <p style="color:#71717a; font-size:14px; margin-top:10px;">Tu protocolo #${orderId} ha sido procesado con éxito.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 30px;">
                <div style="padding:25px; background-color:#000000; border:1px solid #18181b; border-radius:16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${itemsHtml}
                    <tr>
                      <td style="padding:25px 0 0 0;">
                        <div style="color:#52525b; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px;">Estado de Cuenta</div>
                        <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:5px;">Liquidado</div>
                      </td>
                      <td style="padding:25px 0 0 0; text-align:right;">
                        <div style="color:#52525b; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px;">Créditos Totales</div>
                        <div style="color:#22c55e; font-size:24px; font-weight:900; margin-top:5px;">MXN ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <table width="100%" style="background-color:#0f0f0f; border-radius:12px; padding:20px;">
                  <tr>
                    <td>
                      <div style="color:#ea580c; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Dirección de Enlace</div>
                      <p style="color:#a1a1aa; font-size:12px; margin:0; line-height:1.6; font-family:monospace;">
                        ${customer.firstName} ${customer.lastName}<br>
                        ${customer.address}, ${customer.city}<br>
                        ${customer.state}, ${customer.country} CP ${customer.postalCode}
                      </p>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:30px; text-align:center;">
                  <p style="color:#52525b; font-size:12px; line-height:1.5;">
                    Gracias por confiar en el ecosistema de <strong>Sistemas Avante</strong>.<br>
                    Nuestro equipo técnico ya está preparando tu infraestructura.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; background-color:#141414; text-align:center;">
                <p style="color:#3f3f46; font-size:10px; margin:0; text-transform:uppercase; letter-spacing:1px;">Este es un mensaje automático generado por el Core de Avante.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Error enviando correos" },
      { status: 500 }
    );
  }
}