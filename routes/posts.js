const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const Post = require("../models/Post.model");

//////GENERAL/////////////

//@route GET posts
//@desc get all posts. This is private so only logged in users can see the posts, likes, etc...
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    // sorting the posts by the newest first using the sort method.
    const allPosts = await Post.find().sort({ date: -1 });
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching all posts" });
  }
});

//@route GET posts/:id
//@desc get a specific post by the id of the post.
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found!" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching all posts" });
  }
});

//@route POST posts
//@desc Creating a new post,only loggid in users can create.
//@access Private
router.post(
  "/",
  [auth, [check("text", "Post text is required!").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });
    try {
      // bringing the user who is connected
      const user = await User.findById(req.user._id).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found!" });

      let post = new Post({
        text: req.body.text,
        user: req.user._id,
        name: user.name,
        avatar: user.avatar,
      });
      post = await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ msg: "Error finishing the task!" });
    }
  }
);

//@route DELETE posts/:id
//@desc Deleting a post by its ID. We make sure that the user sending the request is the owner of the post
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ msg: "Post not found!" });
    if (post.user.toString() != req.user._id)
      return res.status(401).send({ msg: "Unatuorized to do this action!" });
    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error finishing the task!" });
  }
});

///////////LIKES&COMMENTS////////////

//@route put posts/like/:id
//@desc Like a post by the id. must be logged in of course.
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ msg: "Post not found!" });
    //checking if the user already liked the post (can only like once)
    if (
      post.likes.filter((like) => like.user.toString() == req.user._id).length >
      0
    )
      return res.status(400).json({ msg: "Post already liked" });
    post.likes.push({ user: req.user._id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ msg: "Error finishing the task!" });
  }
});

//@route put posts/unlike/:id
//@desc unlike a post by the id. can only be done after liking.
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ msg: "Post not found!" });
    let index;
    //checking if the user already liked the post
    const temp = post.likes.filter((like, i) => {
      if (like.user.toString() == req.user._id) {
        index = i;
        return true;
      }
      return false;
    });
    if (temp.length == 0)
      return res.status(400).json({ msg: "Post wasn't liked" });
    //unliking:
    post.likes.splice(index, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ msg: "Error finishing the task!" });
  }
});

//@route POST posts/comment/:postId
//@desc Creating a new comment,only logged in in users can comment.
//@access Private
router.post(
  "/comment/:postId",
  [auth, [check("text", "Comment text is required!").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });
    try {
      // bringing the user who is connected
      const user = await User.findById(req.user._id).select("-password");
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ msg: "Post not found!" });

      const comment = {
        text: req.body.text,
        user: req.user._id,
        name: user.name,
        avatar: user.avatar,
      };
      //adding the comment
      post.comments.unshift(comment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      res.status(500).json({ msg: "Error finishing the task!" });
    }
  }
);

//@route DELETE posts/comment/:postId/:commentId
//@desc Delete a comment within a post
//@access Private
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = await Post.findById(postId);
    let index;
    //finding the comment from the array.
    const comment = post.comments.find((comment, i) => {
      if (comment._id.toString() == commentId) {
        index = i;
        return comment;
      }
    });

    //checking if there is a comment
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    //making sure that the user who owns the comment is the one who deletes it.
    if (comment.user.toString() != req.user._id)
      return res.status(401).json({ msg: "Unautorized!" });

    //deleting the comment
    post.comments.splice(index, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ msg: "Error finishing the task!" });
  }
});
module.exports = router;
