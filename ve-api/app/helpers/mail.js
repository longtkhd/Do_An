import nodemailer from 'nodemailer';
import { systemConfig } from '@configs';

const sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: systemConfig.HOST_MAIL,
      pass: systemConfig.HOST_MAIL_PASS,
    },
  });
  const mainOptions = {
    from: "UetVirtualEvent(uetvirtualevent.com) <notification@uetvirtualevent.com>",
    to: email,
    subject: subject,
    html: html,
  };
  return await transporter.sendMail(mainOptions);
};

export { sendMail };
