const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" },
    //   user : {type : mongoose.Schema.Types
    tourName: { type: String, required: true },
    tourImage: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    description: { type: String },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    // selectedcar: { type: String },
  },
  { timestamps: true }
);

const tourModel = mongoose.model("tours", tourSchema);

module.exports = tourModel;
