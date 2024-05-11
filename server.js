const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// require("dotenv").config();

//  Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(
  "mongodb+srv://kirangundala7:KcgSweety8@cluster0.5cmjhpj.mongodb.net/carbooking?retryWrites=true&w=majority"
);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});
connection.on("error", () => {
  console.log("Mongo DB Connection Error");
});

// Routes

app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));
app.use("/api/tours/", require("./routes/tourRoute"));
// app.use("/api/emails/", require("./routes/emailRoute"));
app.get("/", (req, res) => res.send("Hello World!"));

// Server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
