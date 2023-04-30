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

router.get("/", async (req, res) => {
  const camps = await Campground.find({});
  res.status(200).send(camps);
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

router.put("/:id", verifyToken, async (req, res) => {
  console.log(`Campground Edited: ${req.params.id}`);
  const edit = await Campground.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Edited successful");
});

router.delete("/:id", verifyToken, async (req, res) => {
  const deleteCamp = await Campground.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted successful");
});

router.post("/create", verifyToken, async (req, res) => {
  console.log(req.body);
  // const camp = new Campground(req.body);
  // await camp.save();
  // return res.status(200).send("Created successful");
});

module.exports = router;
