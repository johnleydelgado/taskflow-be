// src/utils/emailTemplates.ts

export function taskApprovalTemplate(opts: {
    taskTitle: string,
    link: string,
    managerName?: string,
  }) {
  const { taskTitle, link, managerName = 'Your Manager'  } = opts;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Approval Request</title>
  </head>
  <body style="margin:0;padding:0;background-color:#FCFBFE;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FCFBFE;padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FCFBFE;border-radius:8px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color:#6D54CF;padding:20px;text-align:center;color:#FCFBFE;font-family:sans-serif;font-size:24px;">
                Task Approval Request
              </td>
            </tr>
  
            <!-- Body -->
            <tr>
              <td style="padding:30px;font-family:sans-serif;color:#333333;line-height:1.5;">
                <p>Hi there,</p>
                <p><strong>${managerName}</strong> has created a new task for you:</p>
  
                <h2 style="font-size:20px;color:#6D54CF;margin:20px 0 10px;">${taskTitle}</h2>
  
                <p>Please review and respond by clicking the button below.</p>
  
                <p style="text-align:center;margin:30px 0;">
                  <a href="${link}" 
                     style="background-color:#5746AF;color:#FCFBFE;text-decoration:none;padding:12px 24px;border-radius:4px;display:inline-block;font-weight:bold;">
                    Review & Respond
                  </a>
                </p>
  
                <p>If the button above doesn’t work, copy and paste the following URL into your browser:</p>
                <p style="word-break:break-all;color:#555555;font-size:14px;">${link}</p>
              </td>
            </tr>
  
            <!-- Footer -->
            <tr>
              <td style="background-color:#f0f0f0;padding:20px;text-align:center;font-family:sans-serif;font-size:12px;color:#777777;">
                <p>This email was sent by TaskFlow Approver Website.</p>
                <p>&copy; ${(new Date()).getFullYear()} TaskFlow Inc. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
    `;
}
  