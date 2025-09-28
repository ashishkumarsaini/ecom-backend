const { emailVerificationMailGenerator } = require('./email-verification');
const { sendEmail } = require('./node-mailer');

module.exports = {
  sendEmail,
  emailVerificationMailGenerator,
};
