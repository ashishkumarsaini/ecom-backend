const { emailVerificationMailGenerator } = require('./email-verification');
const { forgotPasswordMailGenerator } = require('./forgot-password');
const { sendEmail } = require('./node-mailer');

module.exports = {
  sendEmail,
  emailVerificationMailGenerator,
  forgotPasswordMailGenerator,
};
