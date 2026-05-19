export function funnelLeadNotificationHtml({
  name,
  email,
  businessName,
  recommendedPlan,
  projectType,
  budget,
  requiresManualReview,
  manualReviewFlags,
  estimatedTotal,
  submittedAt,
}: {
  name: string;
  email: string;
  businessName?: string;
  recommendedPlan: string;
  projectType: string;
  budget?: string;
  requiresManualReview: boolean;
  manualReviewFlags: string[];
  estimatedTotal: number;
  submittedAt: string;
}): string {
  const headerBg = requiresManualReview ? '#ff4444' : '#000000';
  const headerText = requiresManualReview ? '&#9888; MANUAL REVIEW NEEDED' : 'NEW FUNNEL LEAD';

  const businessRow = businessName
    ? `<tr><td style="padding:8px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">BUSINESS</td></tr>
       <tr><td style="font-size:13px;color:#666666;">${businessName}</td></tr>`
    : '';

  const budgetRow = budget
    ? `<tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">BUDGET</td></tr>
       <tr><td style="font-size:15px;font-weight:700;color:#000000;">${budget}</td></tr>`
    : '';

  const flagsRows = requiresManualReview && manualReviewFlags.length > 0
    ? `<tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">REVIEW FLAGS</td></tr>
       ${manualReviewFlags.map(f => `<tr><td style="font-size:13px;font-weight:700;color:#cc0000;">&bull; ${f}</td></tr>`).join('')}`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="border:3px solid #000000;max-width:560px;width:100%;">
        <!-- Header -->
        <tr><td style="background:${headerBg};padding:20px 32px;">
          <p style="margin:0;color:#ffffff;font-size:14px;font-weight:900;letter-spacing:3px;">${headerText}</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">CONTACT</td></tr>
            <tr><td style="font-size:15px;font-weight:700;color:#000000;">${name} &middot; ${email}</td></tr>
            ${businessRow}
            <tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">RECOMMENDED PLAN</td></tr>
            <tr><td><span style="display:inline-block;font-size:18px;font-weight:900;color:#000000;background:#FFE500;padding:4px 10px;">${recommendedPlan}</span></td></tr>
            <tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">PROJECT TYPE</td></tr>
            <tr><td style="font-size:15px;font-weight:700;color:#000000;">${projectType}</td></tr>
            <tr><td style="padding:16px 0 0;font-size:11px;font-weight:900;letter-spacing:2px;color:#666666;text-transform:uppercase;">ESTIMATED TOTAL</td></tr>
            <tr><td style="font-size:15px;font-weight:700;color:#000000;">$${estimatedTotal.toLocaleString()}</td></tr>
            ${budgetRow}
            ${flagsRows}
            <tr><td style="padding:24px 0 8px;"><hr style="border:none;border-top:1px solid #dddddd;margin:0;"></td></tr>
            <tr><td style="font-size:11px;color:#999999;">Submitted: ${submittedAt}</td></tr>
            <tr><td style="font-size:11px;color:#999999;">Source: presale_funnel &middot; 48hours.live/presale</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
