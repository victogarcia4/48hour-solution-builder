export function contactNotificationHtml({
  name,
  email,
  businessName,
  message,
  submittedAt,
}: {
  name: string;
  email: string;
  businessName?: string;
  message?: string;
  submittedAt: string;
}): string {
  const businessRow = businessName
    ? `<tr><td style="padding:8px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">BUSINESS</td></tr>
       <tr><td style="font-size:15px;font-weight:700;color:#000000;">${businessName}</td></tr>`
    : '';

  const messageRow = message
    ? `<tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">MESSAGE</td></tr>
       <tr><td style="font-size:14px;line-height:1.6;color:#333333;background:#f5f5f5;padding:12px;border:1px solid #dddddd;">${message.replace(/\n/g, '<br>')}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="border:3px solid #000000;max-width:560px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#FFE500;padding:20px 32px;border-bottom:3px solid #000000;">
          <p style="margin:0;color:#000000;font-size:14px;font-weight:900;letter-spacing:3px;">NEW CONTACT SUBMISSION</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">NAME</td></tr>
            <tr><td style="font-size:15px;font-weight:700;color:#000000;">${name}</td></tr>
            <tr><td style="padding:8px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">EMAIL</td></tr>
            <tr><td style="font-size:15px;font-weight:700;color:#000000;">${email}</td></tr>
            ${businessRow}
            ${messageRow}
            <tr><td style="padding:24px 0 0;border-top:1px solid #dddddd;margin-top:24px;"></td></tr>
            <tr><td style="font-size:11px;color:#999999;">Submitted: ${submittedAt}</td></tr>
            <tr><td style="font-size:11px;color:#999999;">Source: contact_form &middot; 48hours.live</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
