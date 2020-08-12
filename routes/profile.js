const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const request = require("request");
const config = require("config");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

//@route GET profile/me
//@desc Getting back the info for the current user.Must provide token
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    //searching for the current user in the database. we also add his avatar and name by using the populate function. (the opposite of select that we used when ommitting the password in signin.)
    let profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(404).json({ msg: "Profile not found!" });
    res.json(profile);
  } catch (error) {
    res.status(500).send({ msg: "Could not complete the task" });
  }
});

//@route POST profile
//@desc creating or updating a profile
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required!").not().isEmpty(),
      check("skills", "Skills is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //building the profile by the schema. not all fields are mandatory so we are checking them.
    const profileFields = {};
    profileFields.user = req.user._id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills
        .toString()
        .split(",")
        .map((skill) => skill.trim());
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        //profile exists, that means that we need to update its data.
        profile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          //new:true returns the document after the update
          { new: true }
        );
      }
      //profile wasn't found, so we need to create a new one:
      else profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: "Error completing the task" });
    }
  }
);

//@route GET profile
//@desc returns ALL profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    //we are adding the user avatar and name from the user ID.
    const profiles = await Profile.find().populate("user", ["avatar", "name"]);
    if (!profiles) return res.status(404).json({ msg: "No Profiles Found!" });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task" });
  }
});

//@route GET profile/user/:userId
//@desc returns the profile by userId (not the profile id)
//@access Public
router.get("/user/:userId", async (req, res) => {
  try {
    //we are adding the user avatar and name from the user ID.
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["avatar", "name"]);
    if (!profile) return res.status(404).json({ msd: "Profile not found!" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task" });
  }
});

////////////////EXPERIENCE////////////////

//@route PUT profile/experience
//@desc Add experience to the array in the profile(its added AFTER sign up.)
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required!").not().isEmpty(),
      check("company", "Company is required!").not().isEmpty(),
      check("from", "Beggining date is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const experienceToAdd = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      //finding the profile to add the experience to
      const profileToAddTo = await Profile.findOne({ user: req.user._id });
      //using unshift to add to the beggining and not to the end of the array
      profileToAddTo.experience.unshift(experienceToAdd);
      await profileToAddTo.save();
      return res.json(profileToAddTo);
    } catch (error) {
      res.status(500).json({ msg: "Error completing the task! " });
    }
  }
);

//@route DELETE profile/experience/:id
//@desc Deleting experience object from the experience array
//@access Private
router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    // changing the experience array to contain all objects except for the selected id to delete.
    profile.experience = profile.experience.filter(
      (job) => job._id != req.params.id
    );
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task! " });
  }
});

//@route DELETE profile
//@desc delete the profile ,user and the posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //removing user posts
    await Post.deleteMany({ user: req.user._id });

    //removing a profile
    await Profile.findOneAndRemove({ user: req.user._id });
    //removing the user
    await User.findOneAndRemove({ _id: req.user._id });
    res.json({ msg: "User and profile deleted!" });
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task" });
  }
});

////////////////EDUCATION///////////////////

//@route PUT profile/education
//@desc Add education to the array in the profile(its added AFTER sign up.)
//@access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required!").not().isEmpty(),
      check("degree", "Degree is required!").not().isEmpty(),
      check("fieldofstudy", "Field of study is required!").not().isEmpty(),
      check("from", "Beggining date is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const educationToAdd = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      //finding the profile to add the experience to
      let profileToAddTo = await Profile.findOne({ user: req.user._id });
      //using unshift to add to the beggining and not to the end of the array
      profileToAddTo.education.unshift(educationToAdd);
      await profileToAddTo.save();
      return res.json(profileToAddTo);
    } catch (error) {
      res.status(500).json({ msg: "Error completing the task! " });
    }
  }
);

//@route DELETE profile/education/:id
//@desc Deleting education object from the education array
//@access Private
router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    // changing the experience array to contain all objects except for the selected id to delete.
    profile.education = profile.education.filter(
      (info) => info._id != req.params.id
    );
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task! " });
  }
});

//@route GET profile/github/:user
//@desc Get repository for a user from github if he inserted his handle
//@access Public

router.get("/github/:user", async (req, res) => {
  try {
    //we will use request package to make api calls to the github api.
    const options = {
      uri: `https://api.github.com/users/${
        req.params.user
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubCliendId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (err, response, body) => {
      if (err) console.log(error);
      if (response.statusCode != 200)
        return res.status(404).json({ msg: "Github profile not found" });
      res.json(JSON.parse(body));
    });
  } catch (error) {
    res.status(500).json({ msg: "Error completing the task! " });
  }
});

module.exports = router;
