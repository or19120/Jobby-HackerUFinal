const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User.model");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@route GET auth
//@desc Returning the user data based on auth middleware. User must be signed in and provide a token.
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    //finding the user but omitting the password field.
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Error completing the task");
  }
});

//@route POST auth
//@desc log in a user and authenticate him. Also generates a token.
//@access Public
router.post(
  "/",
  [
    check("email", "A valid email is required!").isEmail(),
    check("password", "Password is required!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors:
    if (!errors.isEmpty())
      return res.status(400).json({ erorrs: errors.array() });
    const { email, password } = req.body;
    try {
      //checking if the user exists with email:
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong email or password" }] });
      // checking password:
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong email or password" }] });
      //   creating a token
      const payload = {
        user: {
          _id: user._id,
        },
      };
      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
