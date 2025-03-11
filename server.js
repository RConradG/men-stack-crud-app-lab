// dependencies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Meal = require("./models/meal");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

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
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));


// helper functions

const formatMeals = (meals) => {
  return meals.map(meal => ({
    ...meal.toObject(),
    date: meal.date ? meal.date.toISOString().split("T")[0] : "", // Extract YYYY-MM-DD
  }));
};

// Root path/route "HomePage"
// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /meals
app.get("/meals", async (req, res) => {
  const allMeals = await Meal.find();
  const formattedMeals = formatMeals(allMeals);
  res.render("meals/index.ejs", { meals: formattedMeals });
});

// GET /meal/new - Create a new meal
app.get("/meals/new", (req, res) => {
  res.render("meals/new.ejs");
});

// UPDATE /meals
app.get("/meals/:mealId/edit", async (req, res) => {
  const foundMeal = await Meal.findById(req.params.mealId);

  const formattedMeal = { // formats date
    ...foundMeal.toObject(),
    date: foundMeal.date ? foundMeal.date.toISOString().split("T")[0] : "",
  };
  res.render("meals/edit.ejs", {
    meal: formattedMeal,
  });
});

// POST /meals
app.post("/meals", async (req, res) => {
  if(req.body.containsFiber === "on") {
    req.body.containsFiber = true;
  } else {
    req.body.containsFiber = false;
  }

  await Meal.create(req.body);
  res.redirect("/meals");
});

// UPDATE /meal:mealId
app.put("/meals/:mealId", async (req, res) => {
  if(req.body.containsFiber === "on") {
    req.body.containsFiber = true;
  } else {
    req.body.containsFiber = false;
  }
  await Meal.findByIdAndUpdate(req.params.mealId, req.body);
  res.redirect(`/meals/${req.params.mealId}`);
});

// DELETE /meals
app.delete("/meals/:mealId", async (req, res) => {
  await Meal.findByIdAndDelete(req.params.mealId);
  res.redirect("/meals");
});

app.get("/meals/:mealId", async (req, res) => {
  const foundMeal = await Meal.findById(req.params.mealId);

  const formattedMeal = {
    ...foundMeal.toObject(),
    date: foundMeal.date ? foundMeal.date.toISOString().split("T")[0] : "",
  };
  res.render("meals/show.ejs", { meal: formattedMeal });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


