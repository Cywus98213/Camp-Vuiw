const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const newUser = await User.register(user, password);
  console.log(newUser);
});

module.exports = router;
