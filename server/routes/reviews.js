const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Reviews = require("../models/review");

router.post("/", async (req, res) => {
  console.log("New Review Added");
  const camp = await Campground.findById(req.params.id);
  const review = new Reviews(req.body);
  camp.reviews.push(review);
  const test = await review.save();
  await camp.save();
  res.status(200).send("Review Added");
});

router.delete("/:reviewid", async (req, res) => {
  const { id, reviewid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Reviews.findByIdAndDelete(reviewid);
  res.status(200).send("Review Deleted");
});

module.exports = router;
