import nodemailer from "nodemailer";

type SendArgs = { to: string; subject: string; html: string };

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });
  } else {
    const test = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: test.user, pass: test.pass },
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html }: SendArgs) {
  const t = await getTransporter();
  const info = await t.sendMail({
    from: process.env.MAIL_FROM || "no-reply@example.com",
    to,
    subject,
    html,
  });
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) console.log("📧 Mail preview:", preview);
}
