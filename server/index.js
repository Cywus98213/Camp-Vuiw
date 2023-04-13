const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/schema");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/campgrounds", async (req, res) => {
  const camps = await Campground.find({});
  res.status(200).send(camps);
});

app.get("/campgrounds/:id", async (req, res) => {
  const camp = await Campground.findById(req.params.id);
  res.status(200).send(camp);
});

app.put("/campgrounds/:id", async (req, res) => {
  console.log(`Campground Edited: ${req.params.id}`);
  const edit = await Campground.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Edited successful");
});

app.delete("/campgrounds/:id", async (req, res) => {
  const deleteCamp = await Campground.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted successful");
});

app.post("/campgrounds/create", async (req, res) => {
  console.log("New Campground Created");
  const camp = new Campground(req.body);
  await camp.save();
  res.status(200).send("Created successful");
});

app.listen("3000", () => {
  console.log("listening to port 3000");
});
