const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User.model");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route POST users
//@desc Adding a new user
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "A valid email is required!").isEmail(),
    check("password", "Password must be at least 6 characters long!").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors:
    if (!errors.isEmpty())
      return res.status(400).json({ erorrs: errors.array() });
    const { name, email, password } = req.body;
    try {
      //checking if the user already exists:
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      //user is not found:
      //checking if the user has a Gravatar for his picture. Setting size to 200, making sure we are getting clean images, and making a default image.

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //hashing password:
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      //creating the new user:
      user = new User({
        name,
        email,
        password: hashed,
        avatar,
      });
      await user.save();
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
