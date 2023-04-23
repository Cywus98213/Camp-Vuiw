const express = require("express");
const router = express.Router();
const AppError = require("../AppError");
const Campground = require("../models/campground");
const Reviews = require("../models/review");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/", async (req, res) => {
  const camps = await Campground.find({});
  res.status(200).send(camps);
});

router.get("/:id", async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid campground id", 400));
  }
  try {
    const camp = await Campground.findById(req.params.id).populate("reviews");
    if (!camp) {
      next(new AppError("Campground not found!!", 404));
    } else {
      res.status(200).send(camp);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  console.log(`Campground Edited: ${req.params.id}`);
  const edit = await Campground.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Edited successful");
});

router.delete("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You must sign in first.");
  } else {
    const deleteCamp = await Campground.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successful");
  }
});

router.delete("/:id/reviews/:reviewid", async (req, res) => {
  const { id, reviewid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Reviews.findByIdAndDelete(reviewid);
  res.status(200).send("Review Deleted");
});

router.post("/create", async (req, res) => {
  const camp = new Campground(req.body);
  await camp.save();
  res.status(200).send("Created successful");
});

router.post("/:id/reviews", async (req, res) => {
  console.log("New Review Added");
  const camp = await Campground.findById(req.params.id);
  const review = new Reviews(req.body);
  camp.reviews.push(review);
  const test = await review.save();
  await camp.save();
  res.status(200).send("Review Added");
});

module.exports = router;
