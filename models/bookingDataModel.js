const mongoose = require("mongoose");

const bookingDataSchema = new mongoose.Schema(
  {
    // car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" },
    //   user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "tours" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    pickupaddress: { type: String, required: true },
    dropoffaddress: { type: String, required: true },
    phone: { type: Number, required: true },
    passengers: { type: Number, required: true },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    additionlComment: { type: String },
  },
  { timestamps: true }
);

const bookingDataModel = mongoose.model("bookings", bookingDataSchema);

module.exports = bookingDataModel;
