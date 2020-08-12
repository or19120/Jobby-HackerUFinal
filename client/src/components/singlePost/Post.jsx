import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../actions/post";
import PostItem from "../allPosts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = (props) => {
  const { post, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(props.match.params.id));
  }, []);
  return loading || post === null ? (
    <Loader />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn btn-primary">
        Go Back
      </Link>
      <PostItem post={post} />
      <CommentForm post={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

export default Post;
