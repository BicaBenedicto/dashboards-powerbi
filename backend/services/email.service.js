require('dotenv').config();
const nodemailer = require('nodemailer');

const env = process.env;

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: true,
  auth: {
    user: env.MAIL_AUTH_USER,
    pass: env.MAIL_AUTH_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

async function send(to, subject, text, html = null) {
  try {
    const message = {
      from: env.MAIL_AUTH_USER,
      to,
      subject,
      text,
      html,
    };
    return await transporter.sendMail(message);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  send,
};
