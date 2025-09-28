const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Ecommerce',
      link: 'https://e-commerce.com',
    },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    auth: {
      user: process.env.MAIL_TRAP_USER_NAME,
      pass: process.env.MAIL_TRAP_USER_PASS,
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const mailConfig = {
    from: 'mail@ecommerce.com',
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    return await transporter.sendMail(mailConfig);
  } catch (error) {
    console.error(
      '❌ Failed to send email, make sure to provide correct MAILTRAP credential in the .env',
      error
    );
  }
};

module.exports = { sendEmail };
