import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://quickgentech.com/images/logo/logo.png";
const COMPANY_EMAIL = "support@quickgentech.com";
const FROM_ADDRESS = "QuickGen <no-reply@quickgentech.com>";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── 1. Notify the company ──────────────────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: "rafayniazi962@gmail.com",
      subject: `New contact message from ${name}`,
      html: companyContactHtml({ name, email, message }),
    });

    // ── 2. Confirmation to the sender ─────────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: "rafayniazi962@gmail.com",
      subject: "We received your message — QuickGen",
      html: userConfirmationHtml({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ── Email templates ────────────────────────────────────────────────────────────

function companyContactHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Contact Message</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#18181b;padding:28px 40px;text-align:center;">
            <img src="${LOGO_URL}" alt="QuickGen" width="140" style="display:block;margin:0 auto;max-width:140px;" />
          </td>
        </tr>
        <!-- Red accent bar -->
        <tr><td style="background:#C0392B;height:4px;"></td></tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#18181b;">New Contact Message</h2>
            <p style="margin:0 0 28px;font-size:14px;color:#71717a;">A visitor has submitted the contact form.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:12px 16px;background:#f4f4f5;border-radius:8px 8px 0 0;border-bottom:1px solid #e4e4e7;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#a1a1aa;">Name</span><br>
                  <span style="font-size:15px;color:#18181b;font-weight:600;">${escapeHtml(name)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f4f4f5;border-bottom:1px solid #e4e4e7;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#a1a1aa;">Email</span><br>
                  <a href="mailto:${escapeHtml(email)}" style="font-size:15px;color:#C0392B;font-weight:600;text-decoration:none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f4f4f5;border-radius:0 0 8px 8px;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#a1a1aa;">Message</span><br>
                  <p style="margin:6px 0 0;font-size:15px;color:#18181b;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
                </td>
              </tr>
            </table>

            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#C0392B;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;">Reply to ${escapeHtml(name)}</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e4e4e7;text-align:center;">
            <p style="margin:0;font-size:12px;color:#a1a1aa;">© ${new Date().getFullYear()} QuickGen Technologies. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function userConfirmationHtml({ name }: { name: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We got your message</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#18181b;padding:28px 40px;text-align:center;">
            <img src="${LOGO_URL}" alt="QuickGen" width="140" style="display:block;margin:0 auto;max-width:140px;" />
          </td>
        </tr>
        <!-- Red accent bar -->
        <tr><td style="background:#C0392B;height:4px;"></td></tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#71717a;line-height:1.7;">
              Hi <strong style="color:#18181b;">${escapeHtml(name)}</strong>, thanks for reaching out! We've received your message and our team will be in touch shortly.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#71717a;line-height:1.7;">
              In the meantime, feel free to explore our work or learn more about how we bring hardware and software ideas to life.
            </p>

            <div style="text-align:center;">
              <a href="https://quickgentech.com/work" style="display:inline-block;background:#C0392B;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;">Explore Our Work</a>
            </div>
          </td>
        </tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e4e4e7;"></td></tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#71717a;">Have more questions? Reach us at</p>
            <a href="mailto:support@quickgentech.com" style="font-size:13px;font-weight:700;color:#C0392B;text-decoration:none;">support@quickgentech.com</a>
            <p style="margin:16px 0 0;font-size:12px;color:#a1a1aa;">© ${new Date().getFullYear()} QuickGen Technologies. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
