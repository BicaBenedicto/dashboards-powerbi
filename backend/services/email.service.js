require('dotenv').config();
const nodemailer = require('nodemailer');

const env = process.env;
  console.log(env.MAIL_HOST, env.MAIL_PORT, env.MAIL_AUTH_USER, env.MAIL_AUTH_PASSWORD);
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
  let t = '';
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
