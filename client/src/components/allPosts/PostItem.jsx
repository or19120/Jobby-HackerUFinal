import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeOrUnlike, deletePost } from "../../actions/post";
const PostItem = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { _id, text, user, name, avatar, likes, comments, date } = props.post;
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button
          onClick={(e) => dispatch(likeOrUnlike(_id, "like"))}
          type="button"
          className="btn btn-success"
        >
          <i className="fas fa-thumbs-up"></i>
          {likes.length > 0 && <span> {likes.length}</span>}
        </button>
        <button
          onClick={(e) => dispatch(likeOrUnlike(_id, "unlike"))}
          type="button"
          className="btn btn-dark"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count"> {comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => dispatch(deletePost(_id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
