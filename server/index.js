const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppError = require("./AppError");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/users");

const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");
const usersRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(user.authenticate()));
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);
app.use("/", usersRoutes);

app.use((req, res, next) => {
  next(new AppError("Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!!" } = err;
  res.status(status).send(message);
});

app.listen("3000", () => {
  console.log("listening to port 3000");
});
