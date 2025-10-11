const forgotPasswordMailGenerator = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'We got a request to change the password for Node Backend.',
      action: {
        instructions: 'Please click here to update the password',
        button: {
          color: '#22BC66',
          text: 'Update',
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

module.exports = { forgotPasswordMailGenerator };
