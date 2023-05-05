if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Reviews = require("../models/review");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
const ObjectId = mongoose.Types.ObjectId;

const PrivateKey = process.env.SECRET_KEY || "mysecretkey";

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

router.put("/:id", upload.array("images"), async (req, res) => {
  console.log(`Campground Edited: ${req.params.id}`);
  const edit = await Campground.findByIdAndUpdate(req.params.id, req.body);
  const imgs = req.files.map((file) => ({
    path: file.path,
    filename: file.filename,
  }));
  edit.images.push(...imgs);
  await edit.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await edit.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  res.status(200).send("Edited successful");
});

router.delete("/:id", verifyToken, async (req, res) => {
  const deleteCamp = await Campground.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted successful");
});

router.post(
  "/create",
  verifyToken,
  upload.array("images"),
  async (req, res) => {
    try {
      const campground = new Campground(req.body);
      campground.images = req.files.map((file) => ({
        path: file.path,
        filename: file.filename,
      }));
      await campground.save();
      res.status(200).json({ message: "Create Successful." });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
);

module.exports = router;
