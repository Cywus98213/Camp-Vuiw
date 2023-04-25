const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const PrivateKey = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    // Hash password using bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user document
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      hashedpassword: passwordHash,
    });

    // Save new user document to database
    await user.save();

    // Respond with success message
    res.json({ message: "User registered successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ username: req.body.username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password using bcrypt
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.hashedpassword
    );

    // Check if password is correct
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      res.status(200);
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, PrivateKey, {
      expiresIn: "1h",
    });

    // Respond with JWT
    res.json({ token: token, userId: user.id });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
