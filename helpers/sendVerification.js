const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerification = async (data) => {
  const email = {
    ...data,
    from: "lordferro@gmail.com",
  };

  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendVerification;
