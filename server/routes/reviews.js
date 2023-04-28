const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Reviews = require("../models/review");

// router.post("/", async (req, res) => {
//   console.log(req.body);
// });

router.delete("/:reviewid", async (req, res) => {
  const { id, reviewid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Reviews.findByIdAndDelete(reviewid);
  res.status(200).send("Review Deleted");
});

module.exports = router;
