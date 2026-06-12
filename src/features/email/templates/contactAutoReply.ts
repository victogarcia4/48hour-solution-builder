export function contactAutoReplyHtml({
  userName,
  siteUrl,
}: {
  userName: string;
  siteUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="border:3px solid #000000;max-width:560px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#000000;padding:20px 32px;">
          <p style="margin:0;color:#ffffff;font-size:20px;font-weight:900;letter-spacing:-1px;">48H LIVE</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:22px;font-weight:900;">Hi ${userName},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">
            Thanks for reaching out! We received your message and will get back to you within <strong>24 hours</strong>.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#333333;">
            In the meantime, get an instant estimate for your project — takes less than 2 minutes.
          </p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td align="center">
              <a href="${siteUrl}/presale"
                style="display:inline-block;background:#FFE500;color:#000000;padding:14px 36px;font-weight:900;font-size:14px;text-decoration:none;border:3px solid #000000;letter-spacing:1px;">
                GET MY INSTANT PRICE
              </a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f5f5f5;padding:16px 32px;border-top:3px solid #000000;">
          <p style="margin:0 0 4px;font-size:12px;color:#666666;text-align:center;">
            You're receiving this because you submitted the contact form at
            <a href="${siteUrl}" style="color:#000000;">${siteUrl.replace('https://', '')}</a>.
          </p>
          <p style="margin:0;font-size:12px;color:#666666;text-align:center;">48H Live &middot; info@48hours.live</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
