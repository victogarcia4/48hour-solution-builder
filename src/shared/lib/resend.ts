import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const fromName = process.env.RESEND_FROM_NAME || '48H Studio';
const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@48hours.live';

export const EMAIL_FROM = `${fromName} <${fromEmail}>`;
export const NOTIFY_EMAIL = fromEmail;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://48hours.live';
