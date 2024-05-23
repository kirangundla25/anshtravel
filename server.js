const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

//  Middleware
app.use(express.json());
app.use(express.static("public/media"));
app.use(
  cors({
    // origin: "https://anshtravelspot.com",
    // methods: ["GET", "POST"],
  })
);

// DB Connection
mongoose.connect(process.env.REACT_APP_DATABASE_URL);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});
connection.on("error", () => {
  console.log("Mongo DB Connection Error");
});

// Routes
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));
app.use("/api/tours/", require("./routes/tourRoute"));
app.use("/api/emails/", require("./routes/emailRoute"));
app.get("/", (req, res) => res.send("Welcome!"));

// Server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
