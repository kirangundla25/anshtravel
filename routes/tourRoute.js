const express = require("express");
const router = express.Router();
const Tour = require("../models/tourModel");

router.get("/getalltours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.send(tours);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addtour", async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();
    res.send("Tour added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/edittour", async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.body._id });
    tour.tourName = req.body.tourName;
    tour.tourImage = req.body.tourImage;
    tour.tourPrice = req.body.tourPrice;
    tour.description = req.body.description;
    
    await tour.save();

    res.send("Tour details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletetour", async (req, res) => {
  try {
    await Tour.findOneAndDelete({ _id: req.body.tourid });

    res.send("Tour deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
