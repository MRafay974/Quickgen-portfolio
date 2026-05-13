import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://quickgentech.com/images/logo/logo.png";
const COMPANY_EMAIL = "jobs@quickgentech.com";
const FROM_ADDRESS = "QuickGen <no-reply@quickgentech.com>";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const position = String(formData.get("position") ?? "").trim();
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Convert resume file to Resend attachment if provided
    const attachments: { filename: string; content: Buffer }[] = [];
    if (resumeFile && resumeFile.size > 0) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      attachments.push({
        filename: resumeFile.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    // ── 1. Notify the company ──────────────────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: COMPANY_EMAIL,
      subject: `Career Application — ${position} (${name})`,
      html: companyApplicationHtml({ name, email, phone, position }),
      attachments,
    });

    // ── 2. Confirmation to the applicant ─────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Your application was received — QuickGen",
      html: userConfirmationHtml({ name, position }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[careers/route]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ── Email templates ────────────────────────────────────────────────────────────

function companyApplicationHtml({
  name,
  email,
  phone,
  position,
}: {
  name: string;
  email: string;
  phone: string;
  position: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Career Application</title></head>
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
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#18181b;">New Career Application</h2>
            <p style="margin:0 0 28px;font-size:14px;color:#71717a;">A candidate has submitted an application via the careers page.</p>

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
              ${
                phone
                  ? `<tr>
                <td style="padding:12px 16px;background:#f4f4f5;border-bottom:1px solid #e4e4e7;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#a1a1aa;">Phone</span><br>
                  <span style="font-size:15px;color:#18181b;font-weight:600;">${escapeHtml(phone)}</span>
                </td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding:12px 16px;background:#f4f4f5;border-radius:0 0 8px 8px;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#a1a1aa;">Position Applied</span><br>
                  <span style="font-size:15px;color:#18181b;font-weight:600;">${escapeHtml(position)}</span>
                </td>
              </tr>
            </table>

            ${
              true
                ? `<p style="margin:20px 0 0;font-size:13px;color:#71717a;">Resume/CV is attached to this email if provided.</p>`
                : ""
            }

            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#C0392B;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;">Reply to Applicant</a>
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

function userConfirmationHtml({
  name,
  position,
}: {
  name: string;
  position: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application Received</title></head>
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
            <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#18181b;">Application received<span style="color:#C0392B;">.</span></h1>
            <p style="margin:0 0 24px;font-size:15px;color:#71717a;line-height:1.7;">
              Hi <strong style="color:#18181b;">${escapeHtml(name)}</strong>, we've successfully received your application for the <strong style="color:#18181b;">${escapeHtml(position)}</strong> role.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#71717a;line-height:1.7;">
              Our team reviews every application carefully. If your background is a great fit, we'll reach out to schedule an initial conversation. We appreciate your interest in joining the QuickGen team!
            </p>

            <div style="background:#f4f4f5;border-left:4px solid #C0392B;border-radius:4px;padding:16px 20px;margin-bottom:32px;">
              <p style="margin:0;font-size:13px;color:#52525b;line-height:1.6;">
                <strong>Position:</strong> ${escapeHtml(position)}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

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
            <p style="margin:0 0 8px;font-size:13px;color:#71717a;">Questions? Reach us at</p>
            <a href="mailto:jobs@quickgentech.com" style="font-size:13px;font-weight:700;color:#C0392B;text-decoration:none;">jobs@quickgentech.com</a>
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
