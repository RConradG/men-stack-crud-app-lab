const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  date: Date,
  mealNumber: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  containsFiber: Boolean,
  fiberContent: Number,

});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;