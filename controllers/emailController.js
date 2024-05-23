const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.REACT_APP_SMTP_HOST,
  port: process.env.REACT_APP_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.REACT_APP_SMTP_MAIL, // generated ethereal user
    pass: process.env.REACT_APP_SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { name, email, phone, passengers, additionlComment } = req.body;
  console.log(phone);
  var mailOptions = {
    from: process.env.REACT_APP_SMTP_MAIL,
    to: process.env.REACT_APP_SMTP_MAIL,
    subject: "Enquiry from Ansh tours and travels",
    // text: additionlComment,
    html: `<div>
    Name: ${name}<br/> Email: ${email}<br/> Phone: ${phone.countryCode} ${phone.areaCode}${phone.phoneNumber}<br/> Passengers: ${passengers}<br/> Message: ${additionlComment}
    </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail };
