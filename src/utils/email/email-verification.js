const emailVerificationMailGenerator = (firstName, verificationUrl) => {
  return {
    body: {
      name: firstName,
      intro: `Welcome ${firstName} ! We're very excited to have you on board.`,
      action: {
        instructions: 'To get started, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

module.exports = { emailVerificationMailGenerator };
