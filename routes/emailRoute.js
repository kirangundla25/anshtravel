const express = require("express");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../controllers/emailController");
const bookingDataModel = require("../models/bookingDataModel");

const {
  customerEmailTemplate,
  adminEmailTemplate,
} = require("../utils/emailTemplate");
const router = express.Router();
const {
  customerBookingEmail,
  adminBookingEmail,
} = require("../utils/bookingEmailTemplate");

router.post("/sendEmail", async (req, res) => {
  const { name, email, phone, passengers, additionlComment } = req.body;
  if (!name || !email || !phone || !passengers) {
    return res
      .status(400)
      .send("Email, name, phone and passengers are required");
  }

  try {
    // Send email to customer
    sendEmail(
      email,
      `Welcome ${name}`,
      customerEmailTemplate(name, email, phone, passengers, additionlComment)
    );

    // Send email to admin
    sendEmail(
      process.env.REACT_APP_SMTP_MAIL,
      "Notification from Ansh tours and travels",
      adminEmailTemplate(name, email, phone, passengers, additionlComment)
    );

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails");
  }
});

router.post("/sendBookingEmail", async (req, res) => {
  const {
    tour,
    name,
    email,
    pickupaddress,
    dropoffaddress,
    phone,
    passengers,
    bookedTimeSlots,
    additionlComment,
  } = req.body;
  console.log(req.body);
  try {
    // const tours = await bookingDataModel.find({ tour }).populate("tour").exec();

    // Send email to customer
    sendEmail(
      email,
      `Hello ${name}! Thank you for contacting Ansh Tours and Travels`,
      customerBookingEmail(name, email)
    );

    // Send email to admin
    sendEmail(
      process.env.REACT_APP_SMTP_MAIL,
      `Booking request for ${dropoffaddress} from ${name}`,
      adminBookingEmail(
        tour,
        name,
        email,
        pickupaddress,
        dropoffaddress,
        phone,
        passengers,
        bookedTimeSlots,
        additionlComment
      )
    );
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails");
  }
});

module.exports = router;
