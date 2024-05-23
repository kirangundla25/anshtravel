const express = require("express");
const router = express.Router();
const Tour = require("../models/tourModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/media")) {
      fs.mkdirSync("public/media");
    }
    cb(null, "public/media");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only Images are allowed"));
    }
    cb(null, true);
  },
});

router.get("/getalltours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.send(tours);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Routes
router.post(
  "/addtour",
  upload.array("uploaded_Images", 10),
  async (req, res) => {
    const { tourName, tourPrice, description } = req.body;
    let filePath = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      filePath = req.files.map((file) => file.path);
    }

    try {
      const newTour = new Tour({
        tourName,
        tourPrice,
        description,
        uploaded_Images: filePath,
      });
      await newTour.save();
      res.status(200).json(newTour);
      console.log(newTour);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

// Update Item Route
router.put(
  "/edittour/:id",
  upload.array("uploaded_Images", 10),
  async (req, res) => {
    try {
      const { tourName, tourPrice, description } = req.body;
      const uploaded_Images = req.files.map((file) => file.filename);
      const newTour = await Tour.findByIdAndUpdate(
        req.params.id,
        { tourName, tourPrice, description, uploaded_Images },
        { new: true }
      );
      if (!newTour) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(newTour);
      console.log(newTour);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// router.post(
//   "/addtour",
//   upload.array("uploaded_Images", 12),
//   async (req, res) => {
//     const { tourName, tourPrice, description } = req.body;
//     let filePath = [];
//     if (Array.isArray(req.files) && req.files.length > 0) {
//       for (let uploaded_Image of req.files) {
//         filePath.push("/" + uploaded_Image.path);
//       }
//     }
//     try {
//       const newTour = new Tour({
//         tourName,
//         tourPrice,
//         description,
//         uploaded_Images: filePath,
//       });
//       await newTour.save();
//       res.send("Tour added successfully");
//       console.log(newTour);
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   }
// );

router.post("/deletetour", async (req, res) => {
  try {
    await Tour.findOneAndDelete({ _id: req.body.tourid });

    res.send("Tour deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
