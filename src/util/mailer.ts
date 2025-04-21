import nodemailer from 'nodemailer';
import ENV from 'src/constants/ENV';
const transporter = nodemailer.createTransport({
  host:     ENV.EmailHost,      
  port:     ENV.EmailPort,       
  secure:   ENV.EmailSecure,     
  auth: {
    user: ENV.EmailUser,         
    pass: ENV.EmailPass,         
  },
});

export async function sendEmail(opts: {
  to: string,
  subject: string,
  text?: string,
  html?: string,
}) {
  return transporter.sendMail({
    from:    ENV.EmailFrom,
    to:      opts.to,
    subject: opts.subject,
    text:    opts.text,
    html:    opts.html,
  });
}
