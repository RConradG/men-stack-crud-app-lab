// dependencies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Meal = require("./models/meal");

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
app.use(express.urlencoded({ extended: false}));






// Root path/route "HomePage"
// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/meals/new", (req, res) => {
  res.render("meals/new.ejs");
});

// POST /meals
app.post("/meals", async (req, res) => {
  
  if(req.body.containsFiber === "on") {
    req.body.containsFiber = true;
  } else {
    req.body.containsFiber = false;
  }
  await Meal.create(req.body);
  // res.redirect("/meals/new");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});