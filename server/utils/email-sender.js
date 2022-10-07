const nodemailer = require("nodemailer");
const { EMAIL_SENDER_SERVICE, EMAIL_SENDER_USERNAME, EMAIL_SENDER_PASSWORD } =
  process.env;

exports.async_send_mail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SENDER_SERVICE,
      auth: {
        user: EMAIL_SENDER_USERNAME,
        pass: EMAIL_SENDER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "Sample Email",
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
  } catch (e) {
    console.log("Can't send an email.");
  }
};
