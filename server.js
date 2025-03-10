// dependencies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Meal = require("./models/meal.js");

// initialize express app
const app = express();

// config code
dotenv.config();

// Mongoose/MongoDB event listeners
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});



//middleware functions







// Root path/route "HomePage"
// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/meals/new", (req, res) => {
  res.render("meals/new.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});