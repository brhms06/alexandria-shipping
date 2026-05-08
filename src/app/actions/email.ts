"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  content: string;
}

export async function sendShipmentUpdateEmail({ to, subject, content }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Alexandria Logistics <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: content.replace(/\n/g, '<br/>'),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    return { success: false, error: err.message };
  }
}
