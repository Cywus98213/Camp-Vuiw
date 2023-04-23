const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    user.setPassword(password); // set the password using the setPassword() method
    const newUser = await user.save(); // save the user to the database
    res
      .status(200)
      .send(
        "Congratulations! Your account has been created successfully, Redirecting please wait"
      );
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send(info);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send(info);
      }
      return res.status(200).send("Login successful, Redirecting....");
    });
  })(req, res, next);
});

module.exports = router;
