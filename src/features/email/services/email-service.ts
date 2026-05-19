'use server';

import { getResendClient, EMAIL_FROM } from '@/shared/lib/resend';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
  if (error) {
    console.error('[email-service] sendEmail error:', error);
  }
}
