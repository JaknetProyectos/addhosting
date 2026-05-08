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
        {
          success: false,
          error: "Email requerido",
        },
        {
          status: 400,
        }
      );
    }

    const itemsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding:12px;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)">
              ${item.name} x${item.quantity}
            </td>

            <td style="padding:12px;color:#67e8f9;text-align:right;border-bottom:1px solid rgba(255,255,255,.08)">
              MXN ${(item.price * item.quantity).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
        })}
            </td>
          </tr>
        `
      )
      .join("");

    /**
     * EMAIL NEGOCIO
     */
    await resend.emails.send({
      from: "Decoramoderna <informacion@decoramoderna.com>",
      to: "informacion@decoramoderna.com",
      subject: `Nuevo pedido #${orderId}`,

      html: `
        <div
          style="
            background:#070b16;
            padding:40px 20px;
            font-family:Arial,sans-serif;
            color:white;
          "
        >
          <div
            style="
              max-width:700px;
              margin:auto;
              background:#0f172a;
              border-radius:24px;
              padding:32px;
              border:1px solid rgba(255,255,255,.08);
            "
          >
            <h1
              style="
                color:#c084fc;
                text-align:center;
                margin-bottom:32px;
              "
            >
              🌌 Nuevo Pedido Recibido
            </h1>

            <div
              style="
                background:#111827;
                border-radius:18px;
                padding:24px;
                margin-bottom:24px;
              "
            >
              <p style="color:#67e8f9;">Orden</p>

              <h2>#${orderId}</h2>

              <hr style="border-color:rgba(255,255,255,.08);" />

              <p style="color:#67e8f9;">Cliente</p>

              <p>
                ${customer.firstName} ${customer.lastName}
              </p>

              <p>${customer.email}</p>

              <p>${customer.phone}</p>

              <hr style="border-color:rgba(255,255,255,.08);" />

              <p style="color:#67e8f9;">Dirección</p>

              <p>${customer.address}</p>

              <p>
                ${customer.city}, ${customer.state}
              </p>

              <p>
                ${customer.country}, ${customer.postalCode}
              </p>
            </div>

            <div
              style="
                background:#111827;
                border-radius:18px;
                padding:24px;
              "
            >
              <h3 style="color:#67e8f9;margin-bottom:20px;">
                Productos
              </h3>

              <table width="100%" cellspacing="0" cellpadding="0">
                ${itemsHtml}
              </table>

              <div
                style="
                  margin-top:24px;
                  text-align:right;
                  font-size:24px;
                  font-weight:bold;
                  color:#f472b6;
                "
              >
                Total: MXN ${total.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
      })}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    /**
     * EMAIL CLIENTE
     */
    await resend.emails.send({
      from: "Decoramoderna <ventas@decoramoderna.com>",
      to: customer.email,
      subject: `Confirmación de pedido #${orderId}`,

      html: `
    <div
      style="
        background:#070b16;
        padding:40px 20px;
        font-family:Arial,sans-serif;
        color:white;
      "
    >
      <div
        style="
          max-width:700px;
          margin:auto;
          background:#0f172a;
          border-radius:24px;
          padding:32px;
          border:1px solid rgba(255,255,255,.08);
        "
      >
        <h1
          style="
            text-align:center;
            color:#67e8f9;
            margin-bottom:24px;
            font-size:34px;
          "
        >
          ✨ Pago Confirmado
        </h1>

        <p
          style="
            color:#e2e8f0;
            font-size:16px;
            line-height:28px;
          "
        >
          Hola ${customer.firstName},
        </p>

        <p
          style="
            color:#cbd5e1;
            font-size:16px;
            line-height:28px;
          "
        >
          Tu pago fue procesado correctamente y tu pedido ya está siendo preparado.
        </p>

        <div
          style="
            margin:32px 0;
            padding:24px;
            border-radius:18px;
            background:#111827;
            border:1px solid rgba(103,232,249,.15);
          "
        >
          <p
            style="
              color:#67e8f9;
              margin-bottom:8px;
              font-size:14px;
              text-transform:uppercase;
            "
          >
            Número de orden
          </p>

          <h2
            style="
              color:#c084fc;
              margin-top:0;
              margin-bottom:24px;
              font-size:28px;
            "
          >
            #${orderId}
          </h2>

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              border-collapse:collapse;
            "
          >
            ${itemsHtml}
          </table>

          <div
            style="
              margin-top:24px;
              padding-top:20px;
              border-top:1px solid rgba(255,255,255,.08);
              text-align:right;
            "
          >
            <p
              style="
                color:#94a3b8;
                margin-bottom:6px;
                font-size:14px;
              "
            >
              Total pagado
            </p>

            <p
              style="
                color:#f472b6;
                font-size:28px;
                font-weight:bold;
                margin:0;
              "
            >
              MXN ${total.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
      })}
            </p>
          </div>
        </div>

        <div
          style="
            background:#111827;
            border-radius:18px;
            padding:24px;
            margin-top:24px;
          "
        >
          <p
            style="
              color:#67e8f9;
              margin-bottom:16px;
              font-size:14px;
              text-transform:uppercase;
            "
          >
            Datos de facturación
          </p>

          <p style="margin:0 0 8px 0;color:#fff;">
            ${customer.firstName} ${customer.lastName}
          </p>

          <p style="margin:0 0 8px 0;color:#cbd5e1;">
            ${customer.email}
          </p>

          <p style="margin:0 0 8px 0;color:#cbd5e1;">
            ${customer.phone}
          </p>

          <p style="margin:0;color:#94a3b8;">
            ${customer.address},
            ${customer.city},
            ${customer.state},
            ${customer.country},
            CP ${customer.postalCode}
          </p>
        </div>

        <div
          style="
            margin-top:40px;
            text-align:center;
          "
        >
          <p
            style="
              color:#94a3b8;
              font-size:14px;
              margin-bottom:8px;
            "
          >
            Gracias por confiar en Decoramoderna Hosting
          </p>

          <p
            style="
              color:#64748b;
              font-size:12px;
            "
          >
            Este correo fue generado automáticamente.
          </p>
        </div>
      </div>
    </div>
  `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error enviando correos",
      },
      {
        status: 500,
      }
    );
  }
}