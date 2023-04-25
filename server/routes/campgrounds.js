const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Reviews = require("../models/review");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const ObjectId = mongoose.Types.ObjectId;

const PrivateKey = process.env.SECRET_KEY;

router.get("/", async (req, res) => {
  const camps = await Campground.find({});
  res.status(200).send(camps);
});

router.get("/checkUser", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ err: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, PrivateKey);
    return res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    return res.status(401).json({ err: "Token is invalid" });
  }
});

router.get("/:id", async (req, res) => {
  const camp = await Campground.findById(req.params.id)
    .populate("reviews")
    .populate("creator"._id);
  if (!camp) {
    res.status(400).send("Not Found!");
  } else {
    res.status(200).send(camp);
  }
});

router.put("/:id", async (req, res) => {
  console.log(`Campground Edited: ${req.params.id}`);
  const edit = await Campground.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Edited successful");
});

router.delete("/:id", async (req, res) => {
  const deleteCamp = await Campground.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted successful");
});

router.delete("/:id/reviews/:reviewid", async (req, res) => {
  const { id, reviewid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Reviews.findByIdAndDelete(reviewid);
  res.status(200).send("Review Deleted");
});

router.post("/create", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ error: Unauthorized });
  }

  try {
    const decoded = await jwt.verify(token, PrivateKey);
    const camp = new Campground(req.body);
    await camp.save();
    return res.status(200).send("Created successful");
  } catch (err) {
    return res.status(401).json({ err });
  }
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
