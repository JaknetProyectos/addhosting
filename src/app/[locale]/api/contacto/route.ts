import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      mensaje,
      asunto,
    } = body;

    if (!nombre || !email || !mensaje || !asunto) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    /* =========================
       📩 EMAIL AL ADMIN (LOG DE ENTRADA)
    ========================== */
    const adminHTML = `
    <div style="background-color:#000000; padding:40px 10px; font-family:Arial, sans-serif;">
      <table align="center" width="100%" style="max-width:600px; background-color:#09090b; border:1px solid #ea580c; border-collapse:separate; border-radius:12px; overflow:hidden;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:25px; background-color:#141414; border-bottom:1px solid #27272a;">
            <div style="color:#ea580c; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:3px; margin-bottom:5px;">System Alert: Contact_Form</div>
            <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:900; font-style:italic; text-transform:uppercase;">Nueva <span style="color:#ea580c;">Transmisión</span></h1>
          </td>
        </tr>
        <tr>
          <td style="padding:30px;">
            <!-- DATA GRID -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #18181b;">
                  <div style="color:#52525b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">Remitente</div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">${nombre}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #18181b;">
                  <div style="color:#52525b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">Uplink</div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">${email}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #18181b;">
                  <div style="color:#52525b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">Canal / Tel</div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">${telefono || "N/A"}</div>
                </td>
              </tr>
            </table>

            <!-- SUBJECT BOX -->
            <div style="background-color:#000000; border:1px solid #27272a; padding:15px; border-radius:8px; margin-bottom:20px;">
              <div style="color:#ea580c; font-size:9px; text-transform:uppercase; font-weight:bold; margin-bottom:8px;">Asunto</div>
              <div style="color:#ffffff; font-size:14px; font-family:monospace;">${asunto}</div>
            </div>

            <!-- MESSAGE BOX -->
            <div style="background-color:#000000; border:1px solid #18181b; padding:20px; border-radius:8px;">
              <div style="color:#52525b; font-size:9px; text-transform:uppercase; font-weight:bold; margin-bottom:10px;">Contenido del Mensaje</div>
              <div style="color:#a1a1aa; font-size:14px; line-height:1.6; font-family:monospace;">${mensaje}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:15px; background-color:#141414; text-align:center;">
             <div style="color:#3f3f46; font-size:9px; font-family:monospace; text-transform:uppercase;">Terminal_ID: ${Math.random().toString(16).toUpperCase().slice(2,8)}</div>
          </td>
        </tr>
      </table>
    </div>
    `;

    await resend.emails.send({
      from: "Sistemas Avante <soporte@sistemasavante.com>",
      to: ["soporte@sistemasavante.com"],
      subject: `[UPLINK] ${asunto} - ${nombre}`,
      html: adminHTML,
    });

    /* =========================
       📩 EMAIL AL CLIENTE (CONFIRMACIÓN DE PROTOCOLO)
    ========================== */
    const customerHTML = `
    <div style="background-color:#000000; padding:40px 10px; font-family:Arial, sans-serif;">
      <table align="center" width="100%" style="max-width:600px; background-color:#09090b; border:1px solid #27272a; border-radius:24px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:40px 30px; text-align:center; background: linear-gradient(to bottom, #141414, #09090b);">
            <div style="width:40px; height:2px; background-color:#22c55e; margin:0 auto 20px auto;"></div>
            <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:900; font-style:italic; text-transform:uppercase; letter-spacing:-0.5px;">Mensaje <span style="color:#22c55e;">Recibido</span></h1>
            <p style="color:#71717a; font-size:13px; margin-top:10px;">Hemos establecido una conexión segura con tu consulta.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 30px 30px 30px;">
            <p style="color:#a1a1aa; font-size:14px; line-height:1.6;">
              Hola <strong style="color:#ffffff;">${nombre}</strong>, tu mensaje ha sido inyectado en nuestro sistema de soporte. Nuestro equipo técnico revisará los parámetros de tu solicitud a la brevedad.
            </p>

            <div style="margin:25px 0; padding:20px; background-color:#000000; border:1px solid #18181b; border-radius:12px;">
              <div style="color:#22c55e; font-size:9px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Referencia de Consulta</div>
              <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-bottom:4px;">${asunto}</div>
              <div style="color:#52525b; font-size:12px; font-style:italic; border-top:1px solid #18181b; padding-top:10px; margin-top:10px;">"${mensaje.substring(0, 100)}${mensaje.length > 100 ? "..." : ""}"</div>
            </div>

            <p style="color:#52525b; font-size:12px; text-align:center;">
              Si necesitas añadir datos adicionales, responde directamente a este canal.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px; background-color:#141414; text-align:center; border-top:1px solid #18181b;">
            <p style="color:#3f3f46; font-size:10px; margin:0; text-transform:uppercase; letter-spacing:1px;">Equipo de Respuesta — Sistemas Avante</p>
          </td>
        </tr>
      </table>
    </div>
    `;

    await resend.emails.send({
      from: "Sistemas Avante <soporte@sistemasavante.com>",
      to: [email],
      subject: "Protocolo de Contacto Iniciado — Sistemas Avante",
      html: customerHTML,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Error contacto:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el mensaje" },
      { status: 500 }
    );
  }
}