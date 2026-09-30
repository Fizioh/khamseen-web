import { Resend } from "resend";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM ?? "Khamseen <waitlist@khamseen.tech>";
  const notifyTo = process.env.WAITLIST_NOTIFY_TO ?? "waitlist@khamseen.tech";

  if (!apiKey) {
    return NextResponse.json({ error: "Waitlist not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  const notify = await resend.emails.send({
    from,
    to: [notifyTo],
    subject: `[Khamseen] Waitlist signup`,
    text: `New waitlist signup:\n\n${email}\n\n— khamseen-web`,
  });

  if (notify.error) {
    console.error("Resend notify failed", notify.error);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  const confirm = await resend.emails.send({
    from,
    to: [email],
    subject: "Khamseen — waitlist received",
    text: [
      "Thanks — you're on the Khamseen waitlist.",
      "",
      "We will reach out when Control Center early access opens (M2).",
      "",
      "— Khamseen",
    ].join("\n"),
  });

  if (confirm.error) {
    console.error("Resend confirm failed", confirm.error);
  }

  return NextResponse.json({ ok: true });
}
