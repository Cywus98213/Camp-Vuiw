const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Reviews = require("../models/review");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const PrivateKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, PrivateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

router.post("/", verifyToken, async (req, res) => {
  const camp = await Campground.findById(req.headers.campid);
  const review = new Reviews(req.body);
  camp.reviews.push(review);
  await review.save();
  await camp.save();
  res.status(200).send("review created");
});

router.delete("/:reviewid", verifyToken, async (req, res) => {
  const { id, reviewid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Reviews.findByIdAndDelete(reviewid);
  res.status(200).send("Review Deleted");
});

module.exports = router;
